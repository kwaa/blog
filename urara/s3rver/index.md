---
title: 'S3RVER - 使用 Arch Linux 的 ALL-IN-ONE 服务器'
date: 2020-02-02 20:20:00
updated: 2020-02-23 10:10:10
comment: true
categories:
  - 折腾
tags:
  - 服务器
  - Arch Linux
descr: 新的一年我终于有预算在家里摆一小只服务器了。
---

新的一年我终于有预算在家里摆一小只服务器了。

<!-- more -->

继 1OCALHOST(平板/笔记本) 和 COMPUTE2(台式机) 后，这是我现有的第三个机器；就叫它 S3RVER 吧。

## 需求和配置选择

我全都要！不太贵，低功耗，小巧；高性能（相对 NAS 常用的赛扬奔腾来说）。
最后选择了 R5-2400GE：这是 R5-2400G 的低功耗版，只有 35W TDP。~~AMD yes~~

| 合计                      | 2440 |
| ------------------------- | ---- |
| 二手 R5-2400GE 准系统     | 1300 |
| 镁光 16G DDR4-3200 内存条 | 420  |
| 三星 256G PM981a 固态盘   | 300  |
| 西数 2T WD20SPZX 机械盘   | 420  |

## 系统安装

我最喜欢的 Arch，装了好几次已经轻车熟路了。
之前用的都是 EXT4，这次试一试 btrfs

| 分区方案       |      |       |       |
| -------------- | ---- | ----- | ----- |
| /dev/nvme0n1p1 | 512M | /boot | fat32 |
| /dev/nvme0n1p2 | 238G | /     | btrfs |
| /dev/sda1      | 1.8T | /home | btrfs |

用 cfdisk 分区，然后格式化并创建子卷：

```bash
mkfs.fat -F32 /dev/nvme0n1p1
mkfs.btrfs -f /dev/nvme0n1p2
mkfs.btrfs -f /dev/sda1
mount /dev/nvme0n1p2 /mnt
cd /mnt
btrfs subvol create rootfs
mkdir -p /mnt/home
mount /dev/sda1 /mnt/home
cd /mnt/home
btrfs subvol create homefs
```

接下来挂载子卷：

```bash
cd ~
umount /dev/sda1
umount /dev/nvme0n1p2
mount /dev/nvme0n1p2 /mnt -o subvol=rootfs,compress=lzo,noatime,discard,ssd,space_cache
mkdir -p /mnt/home
mount /dev/sda1 /mnt/home -o subvol=homefs,compress-force=lzo,noatime,autodefrag,space_cache
mkdir -p /mnt/boot
mount /dev/nvme0n1p1 /mnt/boot
```

修改 mirrorlist，安装系统和生成 fstab：

```bash
nano /etc/pacman.d/mirrorlist #我就是喜欢用nano
pacman -Syy
pacman -S archlinux-keyring
pacstrap -i /mnt base base-devel linux linux-firmware
genfstab -U /mnt >> /mnt/etc/fstab
cat /mnt/etc/fstab
```

用 arch-chroot 进入安装好的系统，安装 grub：

```bash
pacman -S dosfstools grub efibootmgr
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=arch --recheck
grub-mkconfig -o /boot/grub/grub.cfg
```

安装部分就告一段落了，装个 neofetch 作为尾声。

```bash
pacman -S neofetch
neofetch
```

## 其他配置

```bash
pacman -S ufw fail2ban #防火墙
pacman -S zsh grml-zsh-config #zsh&配置
useradd -m -g wheel -s zsh b917 #添加用户
passwd b917 #设置用户密码
```

### AUR 助手

说到 Arch 的优点，当然少不了 AUR；
这里我选择了自己常用的 yay。

```bash
cd /tmp
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
```

### proxychains-ng

活在墙国，免不了要使用代理：我直接设置成台式机的 v2ray SOCKS 端口。

```bash
pacman -S proxychains-ng
nano /etc/proxychains.conf
```

### Docker&Portainer

这次的核心就是 Docker，我会把大多数服务都放进 Docker 里运行。Portainer 是 Docker 的图形化管理界面，我用官方文档的方式安装 Portainer，并修改为 44301 端口。

```bash
pacman -S docker
systemctl start docker
systemctl enable docker
docker pull portainer/portainer
docker volume create portainer_data
docker run -d -p 44300:8000 -p 44301:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer
```

## 安装在系统的服务

### Samba

> Samba 是 SMB/CIFS 网络协议的重新实现，可以在 Linux 和 Windows 系统间进行文件，打印机共享。

Samba 我用来做什么？当然是放 Steam 游戏！自己电脑的 1T 机械盘已经快满了。我设置为分享 /home 目录，也就是整个 WD20SPZX。

```bash
pacman -S samba #安装 Samba
nano /etc/samba/smb.conf #配置 smb.conf
smbpasswd -a b917 #创建用户
systmctl start smb nmb #启动服务
systemctl enable smb nmb #激活开机自启
```

我的 smb.conf 配置：

```ini
[global]
    workgroup = WORKGROUP
    server string = S3RVER Samba %v
    netbios name = S3RVER
    log file = /var/log/samba/%m.log
    log level = 3
    max log size = 50
    security = user
    passdb backend = tdbsam
[home]
    comment = Linux home
    path = /home
    public = yes
    writable = yes
    printable = no
    valid users = b917
```

## 安装在 Docker 的服务

### joshava/cloudflare-ddns

本来路由器一直挂着 No-IP.com 的 DDNS，不过域名实在不怎么好看。正好现在有一台 24 小时开机的设备了，就试试 Cloudflare DDNS。

使用之前要先在 Cloudflare - My Profile - API Tokens 创建一个新的 Token，点击 Start with a template 后选择 Edit zone DNS 并设置域名即可。

```bash
docker pull joshava/cloudflare-ddns
touch /home/b917/ddns-config.yaml #创建配置文件
nano /home/b917/ddns-config.yaml #编辑配置文件
docker run -d -v /home/b917/ddns-config.yaml:/app/config.yaml hoshava/cloudflare-ddns
```

config.yaml 的示例：

```yaml
auth:
  scopedToken: token-input-here
domains:
  - name: foo.example.com
    type: A
    proxied: false
    create: true
    zoneId: zoneid-input-here
```
