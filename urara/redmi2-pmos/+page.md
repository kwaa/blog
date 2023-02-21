---
title: '为红米 2 刷入 postmarketOS Edge + GNOME Mobile'
created: 2023-02-22
updated: 2023-02-22
tags:
  - Linux
  - postmarketOS
  - AsteroidOS
---

在一加 6T 翻车小半年后，我终于入了第二部用来刷 pmOS 的手机——红米 2。

那么这次会不会出问题呢？既然这篇文章发出来了，就代表我没有翻车。

## 前言

网上已经有很多小米 2 刷 pmOS 的教程了，为什么我还要写一篇？

- 通过 pmbootstrap 安装
- GNOME Mobile
- （也许）详细的后续设置

## 准备

一个能流畅访问互联网的 Arch Linux 系统。

安装 android-tools 和 pmbootstrap：`paru -S android-tools pmbootstrap`

按照 [LineageOS 的安装教程](https://wiki.lineageos.org/devices/wt88047/install)，首先辨认一下型号：

- wt88047: 2014811, 2014812, 2014817 2014818, 2014819, 2014821
- wt86047: 2014813, 2014112

我手上是型号为 `2014813` 的红米 2 增强版 / 移动 4G。

由于到手时已经是 MIUI 9.2 (Android 5.1) 系统，这里不需要更新固件。（同样推荐买已经是 Android 5.1 的增强版，省事）

按照常规方式开启 OEM 解锁和 USB 调试，并检查可用性。

## lk2nd

FOSS Bootloader！

从 [GitHub Releases](https://github.com/msm8916-mainline/lk2nd/releases) 下载最新的 [lk2nd-msm8916.img](https://github.com/msm8916-mainline/lk2nd/releases/download/0.14.0/lk2nd-msm8916.img)（本文编写时为 0.14.0）

fastboot 刷入：

```bash
fastboot flash boot lk2nd-msm8916.img
fastboot reboot
```

## pmbootstrap

pmbootstrap 就算挂了代理也非常折磨，所以这里全程通过 --mirror-pmOS 和 --mirror-alpine 使用 tuna 镜像。

注意在运行下面命令前不要升级桌面系统内核（否则会报错找不到模块，需要重启解决）

按照 [Wiki](<https://wiki.postmarketos.org/wiki/Qualcomm_Snapdragon_410/412_(MSM8916)#Installation_using_pmbootstrap>) 的步骤安装：

```bash
pmbootstrap --mirror-pmOS="https://mirrors.tuna.tsinghua.edu.cn/postmarketOS/" --mirror-alpine="https://mirrors.tuna.tsinghua.edu.cn/alpine/" init

# 目录，直接回车
Work path:

# 更新通道，直接回车
Channel: edge

# 厂商
Vendor: xiaomi

# 设备代号
Device codename: wt88047

# 启用闭源固件，直接回车
Enable this package? (y/n) [y]:

# 设置 Provider，直接回车
Provider [default]:

# 用户名
Username: user

# 桌面环境，gnome-mobile
User Interface: gnome-mobile

# 不需要修改，直接回车
Change them? (y/n) [n]:

# 额外包，这里我就先不安装了
Extra packages [none]:

# 使用本机时区替换 GMT，直接回车
Use this timezone instead of GMT? (y/n) [y]:

# 语言，直接回车
Choose default locale for installation [C.UTF-8]:

# 设备名
Device hostname (short form, e.g. 'foo') [xiaomi-wt88047]:

# 直接回车
Build outdated packages during 'pmbootstrap install'? (y/n) [y]:
```

```bash
# 安装
pmbootstrap --mirror-pmOS="https://mirrors.tuna.tsinghua.edu.cn/postmarketOS/" --mirror-alpine="https://mirrors.tuna.tsinghua.edu.cn/alpine/" install

# 设置密码，输两遍
New password:
Retype new password:

# 刷入
pmbootstrap --mirror-pmOS="https://mirrors.tuna.tsinghua.edu.cn/postmarketOS/" --mirror-alpine="https://mirrors.tuna.tsinghua.edu.cn/alpine/" flasher flash_rootfs --partition userdata

# 擦除系统分区
fastboot erase system

# 重启
fastboot reboot
```

屏幕灰线是在加载！是在加载！是在加载！（重要的事情说三遍）

现在我得到了一个运行 FOSS bootloader 和 Mainline Linux 的红米 2！

但是跑 GNOME Mobile 还是不那么流畅的。

## 后续设置

推荐阅读 [postmarketOS 使用技巧：中文化、執行 Android APP、手機跑 Docker | Ivon 的部落格](https://ivonblog.com/posts/postmarketos-tips/)

本节在其基础上删改和增补了一些内容。

_在这行字删掉之前持续更新_

### 禁用 Modem Manager

不需要插卡的玩具——禁用它以节省一些性能。

```bash
sudo service stop modemmanager
sudo rc-update del modemmanager
```

### 语言和时区

```bash
# 设置时区
sudo ln -sf /usr/share/zoneinfo/Asia/Taipei /etc/localtime
# 安装 Noto CJK 字体
sudo apk add font-noto-cjk
# 编辑默认环境变量
sudo nano /etc/environment
```

```ini title="/etc/environment"
LANG=zh_TW.UTF-8
LC_CTYPE="zh_TW.UTF-8"
LC_NUMERIC="zh_TW.UTF-8"
LC_TIME="zh_TW.UTF-8"
LC_COLLATE="zh_TW.UTF-8"
LC_MONETARY="zh_TW.UTF-8"
LC_MESSAGES="zh_TW.UTF-8"
LC_PAPER="zh_TW.UTF-8"
LC_NAME="zh_TW.UTF-8"
LC_ADDRESS="zh_TW.UTF-8"
LC_TELEPHONE="zh_TW.UTF-8"
LC_MEASUREMENT="zh_TW.UTF-8"
LC_IDENTIFICATION="zh_TW.UTF-8"
LC_ALL=
```

### Docker

```bash
sudo apk add docker docker-compose
sudo service docker start
sudo rc-update add docker
```

### Flatpak

使用 [SJTUG](https://mirror.sjtu.edu.cn/docs/flathub) 的 flathub 镜像。

> 注意：部分软件会回源导致很慢

```bash
sudo apk add flatpak
sudo flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
sudo flatpak remote-modify flathub --url=https://mirror.sjtu.edu.cn/flathub
```

我更倾向于直接从 Alpine / pmOS 获取，只作备用。

### Waydroid

...不会有人想在骁龙 410 跑 Waydroid 吧？我是不指望了。

如果真的想，可以看看 [Waydroid + postmarketOS 使用教學，Linux 執行 Android APP | Ivon 的部落格](https://ivonblog.com/posts/postmarketos-waydroid/)

### IM

> 待补充：显然我没怎么使用

#### Telegram

```bash
sudo apk add telegram-desktop
```

注意——在 GNOME Mobile 上无法弹出键盘。

Useful:

- [add the gnome-mobile UI (!3404) · Merge requests · postmarketOS / pmaports · GitLab](https://gitlab.com/postmarketOS/pmaports/-/merge_requests/3404)
  - **Known issues**: Keyboard doesn't pop up on apps like telegram desktop
- [A way to bring up on-screen keyboard manually (#11) · Issues · Jonas Dreßler / gnome-shell · GitLab](https://gitlab.gnome.org/verdre/gnome-shell/-/issues/11)
  - Some apps simply don't bring up the keyboard properly / automatically at all leaving you without the ability to type into text fields etc.

#### Matrix

```bash
sudo apk add fractal
```

### 截图

这么好玩的系统，怎么能不截图晒一下呢？

但由于我用的是 GNOME Mobile，`grim` 会报错。

可选的似乎只有 GNOME 自家截图：

```bash
sudo apk add gnome-screenshot
```

在应用列表里找到“截图”，使用方式和桌面一样。

### Fcitx5

推荐阅读 [Fcitx5 rime on pinephone postmarketOS](https://joelboulder.com/posts/2022/04/07/fcitx5-rime-pinephone-postmarketos/)

我决定用和 Linux 桌面同样的 Fcitx5。

TODO...

- fcitx5
- fcitx5-chinese-addons
- [fcitx5-pinyin-zhwiki](https://github.com/felixonmars/fcitx5-pinyin-zhwiki)
- [fcitx5-pinyin-moegirl](https://github.com/outloudvi/mw2fcitx/wiki/fcitx5-pinyin-moegirl)

## 机型推荐

小米 Mix 2S 以外都是 postmarketOS 社区设备。

还有像是小米 Note 2，这玩意到现在就没几个不烧屏的（有也卖的贵）我就不推荐了；

此外 一加 6 / 6T / Poco F1 这三款还能刷 Kupfer (Arch Linux ARM)

- **红米 2 增强版（骁龙 410）**
  - 只推荐增强版 (2G RAM + 16G ROM)
  - 不要和红米 2A 搞混，后者刷不了
  - 性能差但是便宜
- **小米 Mix 2S（骁龙 845）**
  - 还没进社区设备，不过页面显示兼容性很好
  - 有一块完整的屏幕
- **一加 6T（骁龙 845）**
  - 刷 pmOS 屏幕可能无法触摸，务必注意
    - 我亲自购买，亲自踩坑
  - 水滴屏，没什么好说的
- **一加 6 / Poco F1（骁龙 845）**
  - 不太确定是否有上面同样的问题
  - 刘海屏真的很难看
  - （也许）比较便宜
- **PinePhone / PinePhonePro**
  - 生态（兼容性）最好
  - 性价比低
  - 难买

## 附加 - bass@AsteroidOS - LG Watch Urbane

> 本段写于 2022 年 10 月，不舍得删掉就保留了。

这款手表在 AsteroidOS 网站上是兼容性最好的，所以？买！

第一次用智能手表，感觉 Android Wear 还是有不少可玩性的（但是这配置已经带不动了）

然后我开始刷 AsteroidOS。从网站下载两个文件：

- [asteroid-image-bass.ext4](https://release.asteroidos.org/nightlies/bass/asteroid-image-bass.ext4)
- [zImage-dtb-bass.fastboot](https://release.asteroidos.org/nightlies/bass/zImage-dtb-bass.fastboot)

别忘了给手表解锁 bootloader。有点新鲜... 就是有点担心变砖。

通过 fastboot 刷入：

```bash
fastboot flash userdata asteroid-image-bass.ext4
fastboot flash boot zImage-dtb-bass.fastboot
fastboot continue
```

好，现在我有一个运行 Linux 的手表了！然而并没有什么用，甚至不那么智能（因为没什么第三方软件）。

唯一比较有意思的是可以 SSH 到手表并安装 neofetch。

```bash
ssh ceres@192.168.2.15
opkg update
opkg upgrade
opkg install neofetch
neofetch
```
