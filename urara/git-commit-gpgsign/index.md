---
title: '使用 GPG 为 Git commit 签名'
date: 2021-11-23
categories:
  - 笔记
tags:
  - GitHub
  - GitHub Desktop
  - Git
  - GPG
descr: 为了好看，我为 Urara 的所有 commit 设置了 GPG 签名。
cover: /git-commit-gpgsign/cover.webp
---

为了好看，我为 [Urara](https://github.com/importantimport/urara) 的所有 commit 设置了 GPG 签名。

> 又水一篇文章？

下面是我的操作步骤：

## 准备

我目前的开发环境是 Windows 电脑 (VSCode / GitHub Desktop) + Arch Linux 家用服务器 (SMB / Node / Git / GPG)，
由于一般不太有像我这么折腾的，所以权当记录。

在我写本文的时候已经为 Git 提前设置好了 user.name, user.email 和 SSH-RSA 验证。

## 为 VSCode Remote-SSH 配置签名

### 创建 GPG 密钥对 (Linux)

之前我没有在服务器上使用过 GPG，所以直接创建。

使用 --quick-gen-key 一键生成：

> 使用的邮件地址需要在 GitHub 绑定；如果开启了邮件地址保密，则需要使用 GitHub 提供的 @users.noreply.github.com 邮件地址。

> 如果是 Windows，可能需要先启动 daemon: gpg-agent --daemon

```bash
gpg --quick-gen-key "kwaabot <19530615+username@users.noreply.github.com>" future-default cert never
```

- future-default: 使用新的 ed25519/cv25519 算法
- cert: 用于验证
- never: 永不过期

接下来要为生成的密钥对设置密码，直接不填跳过。

### 设置 GPG-Agent 缓存 (Linux)

如果上面不小心设置了又不想次次输密码，就需要配置 GPG-Agent 缓存。

在 `~/.gnupg/` 创建一个名为 `gpg-agent.conf` 的文件：

```bash
default-cache-ttl 31536000 # 365天
max-cache-ttl 31536000 # 365天
```

重新加载 GPG-Agent 并测试第二次是否不需要再输入密码。

```bash
gpg-connect-agent reloadagent /bye
echo "Hello World" | gpg --clearsign
echo "Hello World" | gpg --clearsign
```

#### error: gpg failed to sign the data?

把 `export GPG_TTY=$(tty)` 加到 `~/.zshrc`, `~/.bashrc` 或者其他什么 shrc 里。

### 设置 Git 使用私钥进行签名 (Linux)

看一眼生成的密钥对。

```bash
gpg --list-secret-keys --keyid-format=long

/home/user/.gnupg/pubring.kbx
---------------------------
sec   ed25519/8A73844222166F60 2021-11-23 [C]
      DD7E4A7D0D06F6E8432B94B58A73844222166F60
uid                 [ultimate] kwaabot <19530615+username@users.noreply.github.com>
```

在这里，`8A73844222166F60` 是密钥 ID。

导出（复制输出的公钥并[添加到 GitHub 账户](https://docs.github.com/cn/authentication/managing-commit-signature-verification/adding-a-new-gpg-key-to-your-github-account)）并配置 git，`--global` 表示全局启用。

```bash
gpg --export -a 8A73844222166F60 # 导出公钥
git config --global user.signingkey 8A73844222166F60 # 指定密钥
git config --global commit.gpgsign true # 全局签名
```

但这只是为 Linux 环境的 git 进行了配置，对于 GitHub Desktop 是无效的。

所以我绕过 GitHub Desktop 提交 commit 不就行了？VSCode > 打开远程窗口 > Connect to Host，启动！

虽然操作起来挺繁琐的，但是得到了好看的 Verified。（并且可以用 gitmoji 之类生成 commit 信息的插件，算是捡到个芝麻吧）

## 为 GitHub Desktop 配置签名

在完成上一章的几天后：

我仔细考虑了一下，既觉得 VSCode 的 Remote-SSH 功能过于繁琐，也不想装一个 _我认为很臃肿的_ Git for Windows；
有什么好办法直接为 GitHub Desktop 配置签名呢？

有，那就是直接修改 GitHub Desktop 内置 git.exe 的配置。

不得不说这玩意藏得挺深，要不是能搜索到 git.exe 我真以为它集成进 GitHub Desktop 里面了。

### 安装 GPG (Gpg4win, Windows)

在此之前还是得安装 [GPG (Gpg4win)](https://gpg4win.org/download.html)，因为无论如何都绕不开它。
安装完进命令提示符测试一下：

```text
C:\\Users\\User> gpg --version

gpg (GnuPG) 2.2.28
libgcrypt 1.8.8
Copyright (C) 2021 g10 Code GmbH
License GNU GPL-3.0-or-later <https://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Home: C:/Users/<User>/AppData/Roaming/gnupg
Supported algorithms:
Pubkey: RSA, ELG, DSA, ECDH, ECDSA, EDDSA
Cipher: IDEA, 3DES, CAST5, BLOWFISH, AES, AES192, AES256, TWOFISH,
        CAMELLIA128, CAMELLIA192, CAMELLIA256
Hash: SHA1, RIPEMD160, SHA256, SHA384, SHA512, SHA224
Compression: Uncompressed, ZIP, ZLIB, BZIP2
```

### 导出之前生成的 GPG 密钥对 (Linux)

```bash
gpg --export -a 8A73844222166F60 # 导出公钥到 public_key.asc
gpg --export-secret-keys -a 8A73844222166F60 # 导出私钥到 private_key.asc
```

### 导入到 Gpg4win (Windows)

打开 Kleopatra，点“导入”选中之前导出的两个文件然后点“是”。

### 设置 GPG-Agent 缓存 (Windows)

还是打开 Kelopatra，上面有个“设置”。

配置 Kelopatra > GnuPG System > Private Keys 第一个 Expire cached PINs after N seconds，填入想要的秒数（我直接 31536000）

### 设置 GitHub Desktop 使用私钥进行签名 (Windows)

重点来了！找到 GitHub Desktop 安装目录，像这样：`C:\Users\<User>\AppData\Local\GitHubDesktop\`

打开里面版本号最新的一个文件夹（在写这篇文章时是 app-2.9.4），然后是 `resources\app\git\cmd`；
这就是 git.exe 目录了。在命令提示符下进入这个目录然后进行相同的配置：

```bash
git config --global user.signingkey 8A73844222166F60 # 指定密钥
git config --global commit.gpgsign true # 全局签名
```

尝试提交一个 commit，它有用。

![Verified](/git-commit-gpgsign/verified.webp)

完结！由于内置 git.exe 的目录包含版本号，所以理论上遇到软件更新会需要重新设置。

在我写完这篇文章的时候还没遇到更新，不过应该也快了——2.9.5 发布了 beta 版本。
