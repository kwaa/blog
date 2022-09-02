---
title: 在 Ventoy 基础上安装 Arch Linux 并复用引导
image: /ventoy-archlinux/arch.webp
created: 2022-05-05
summary: 只用来当安装盘不是白费了我这 NVMe 固态？那可不行，于是就有了这篇文章。
tags:
  - Arch Linux
  - Ventoy
---

> 图片来源 / Image Source: [r/linuxmasterrace](https://www.reddit.com/r/linuxmasterrace/comments/9luu1l/_/)

## 序言

我去年买了个 A2000 512G 装 Ventoy，ISO 放了不少——什么 Arch, BlackArch, WinPE, Win11... 不过好像也就当安装盘用。

那不是白费了我这 NVMe 固态？这可不行，于是就有了这篇文章。

## 准备

### 安装 Ventoy

首先往硬盘里装 [Ventoy](https://ventoy.net)，这是什么之类的废话我也就不多说了。

在 `配置选项 - 分区设置` 里勾选 `在磁盘最后保留一段空间`，大小按个人喜好，这里我选择 128G。

### Distro Grub Themes

Ventoy 自带的 GRUB 主题我就评价一个字——**丑**,换一个漂亮又简洁的 [Distro Theme](https://www.gnome-look.org/p/1482847) 吧。

Files 往下翻找到 arch.tar，下载解压到 `/ventoy/themes/arch` 里，进 VentoyPlugson 修改配置。

### 下载 ArchISO

[Arch Linux - Downloads](https://archlinux.org/download) 往下翻找到合适的镜像下载。

命名格式是 `archlinux-yyyy.mm.dd-x86_64.iso`，下载完塞进 Ventoy 的分区里。

### BIOS 设置

开机按 <kbd>DEL</kbd> 进 BIOS，关闭 Secure Boot。

在启动顺序里将 UEFI USB Device 切换到首位，重启电脑进入 Ventoy > Arch ISO。

ArchISO 在 UEFI 下是纯黑背景：如果在启动时看到 Arch LOGO，那就代表没有正确设置。

## 安装

进入 ArchISO 后基本按 [Installation guide](https://wiki.archlinux.org/title/Installation_guide) 进行操作，但一些细节不同。

### 网络 & 更新时间

```bash
ip a # 查看网卡和已分配的 IP 地址
ping archlinux.org -c 4 # 检查网络连接
timedatectl set-ntp true # 更新系统时间
```

### 分区 & 格式化 & 挂载

作为体验过 EXT4+LVM 和 BtrFS 的小白鼠我本来是想用 ZFS 的，但翻了翻感觉作为移动硬盘确实用不到那些高级功能，所以选择了 F2FS。

lsblk 找到自己的硬盘是 `/dev/sdc`，cfdisk 用最后那块 128G 的 Free Space 创建一个分区 `/dev/sdc3`，格式化为 F2FS。

我并不想在这里拥有额外的复杂度，所以不会为 swap 和 home 单独分区；把 `/dev/sdc3` 挂载到 `/mnt`。

```bash
lsblk # 列出块设备
cfdisk # 分区
mkfs.f2fs /dev/sdc3 # 格式化分区
mount /dev/sdc3 /mnt # 挂载分区
```

### 安装 & Fstab & Chroot

使用 pacstrap 安装基础包：

```bash
pacstrap /mnt base base-devel linux-zen linux-firmware nano dhcpcd neofetch
```

linux 在这里替换为 linux-zen，有一些性能优化。虽然也可以用 xanmod，不过它在 AUR 里就很折腾。

根据我的需要往后面加了 nano, dhcpcd 和 neofetch，其他软件包也可以一起写在后面。

生成 Fstab 文件：

```bash
genfstab -U /mnt >> /mnt/etc/fstab
cat /mnt/etc/fstab
```

记下这个分区的 UUID，Ventoy 自定义配置需要用到。

Chroot 到新安装的系统：

```bash
arch-chroot /mnt
```

### 基本设置

先简单设置一下。详细说明我就跳过了，毕竟 Installation guide 都有。

```bash
systemctl enable --now dhcpcd # 开机启动 dhcpcd
ln -sf /usr/share/zoneinfo/Region/Asia/Taipei /etc/localtime # 修改时区
hwclock --systohc # 生成 /etc/adjtime
nano /etc/locale.conf # 设定 LANG 变量
nano /etc/locale.gen # 编辑 locale.gen
locale-gen # 生成 locale 信息
echo localhost > /etc/hostname # 修改主机名
passwd # 设置 root 密码
```

然后重启。

```bash
exit
umount -R /mnt
reboot
```

### Ventoy 自定义菜单

这里参考了 [Plugin.grub_menu . Ventoy](https://www.ventoy.net/cn/plugin_grubmenu.html) 和 [在已安装 Ventoy 的移动设备上安装 Linux 与配置引导](https://lpwmm.blog.csdn.net/article/details/119056455)。

回到主系统后在 `ventoy` 目录下创建一个 `ventoy_grub.cfg`，如下填写（替换成 fstab 中的 UUID）：

```text
menuentry "Arch Linux" --class=custom {
    set root=($vtoydev,gpt3)
    linux /boot/vmlinuz-linux root=UUID=ddd7c6b2-d457-45cb-8cd9-ec2c8211c393
    initrd /boot/initramfs-linux.img
    boot
}
menuentry '<-- Return to previous menu [Esc]' --class=vtoyret VTOY_RET {
    echo 'Return ...'
}
```

重启进入 Ventoy，按 <kbd>F6</kbd> 就会显示自定义菜单，到这里已经可以正常引导了。
