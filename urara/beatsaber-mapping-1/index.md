---
title: '如何制作一张 Beat Saber 谱面（一）准备篇'
date: 2021-02-28 22:22:22
updated: 2021-03-06 05:45:55
categories:
  - 笔记
tags:
  - Beat Saber
  - ChroMapper
  - Unity
cover: beatsaber-mapping-1/beatsaber.webp
descr: 最近一直没什么可以拿来写博客的东西，直到我开始想自制 Beat Saber 谱面；这是本站第一个连载文章。
---

最近一直没什么可以拿来写博客的东西，直到我开始想自制 Beat Saber 谱面；这是本站第一个连载文章。

由于已经事先搜索，我的准备从[Mapping | BSMG Wiki](https://bsmg.wiki/mapping/)开始。

参考快速入门，我首先需要做的是下载[音频编辑器 Audacity](https://www.audacityteam.org/)和谱面编辑器。不考虑官方编辑器的主要原因有两个：一是它有点难用（我已经试过了），二是不支持一些进阶功能。

社区编辑器在 [Wiki](https://bsmg.wiki/mapping/#community-editors) 里列出了三种：MMA2, Beatmapper.map 和 ChroMapper。区别很明显，我当然选择了功能最丰富的 [ChroMapper](https://github.com/Caeden117/ChroMapper)! 它可以通过 Patreon 捐助或自行编译获得，显然我并不会想为了谱面编辑器而每个月付出至少 5$。

于是就这样，本文正式从一台 Windows 10 20H1 x64 的电脑起步。

## Unity

> 很多时间都浪费在安装这该死的软件上。

我参考了 Repo 的 [BUILD.md](https://github.com/Caeden117/ChroMapper/blob/dev/BUILD.md)。~~那么首先我需要安装 [Unity Hub](https://unity3d.com/get-unity/download)~~ 装你妈呢，登录需要绑手机号就因为我是芝麻仁？就因为我是芝麻仁？就因为我是芝麻仁？就因为我是芝麻仁？就因为我是芝麻仁？就因为我是芝麻仁？就因为我是芝麻仁？就因为我是芝麻仁？就因为我是芝麻仁？就因为我是芝麻仁？

经过测试，只要一直开着 Netch 就不会被芝麻特供版恶心到。还好甲骨文 CN2GIA 足够快——于是我顺利通过 **_Google_** 登录了账号，并顺便白嫖了一年 Student Plan。

所以正常 Unity Hub 的主界面是这样的：

![unityhub1](beatsaber-mapping-1/unityhub1.webp)

截至写这篇文章的时候 ChroMapper 主分支使用的 Unity 版本是 2019.3.0f6，所以我通过 [Unity I tell you](https://unityitellyou.github.io/DownloadInfos/2019.x.json/Unity%202019.x) 找到 2019.3.0 并点击 "Unity Hub 下载"。或者也可以使用[这个链接](unityhub://2019.3.0f6/27ab2135bccf)，它省了你点几下鼠标以及滑动滚轮的事。

勾选 Windows Build Support 就可以安装了，安装完毕后此部分完成。

## ChroMapper

> 和上面比起来简直不要太轻松

首先下载代码，在 GitHub 的 [master](https://github.com/Caeden117/ChroMapper/tree/master) 或 [dev](https://github.com/Caeden117/ChroMapper/tree/dev) 分支点击 "Code" 后 "Download ZIP" 即可。由于我尝试编译时开发分支报错，所以使用主分支源码。

将下载的压缩包`ChroMapper-master.zip`解压，得到一个同名文件夹。在 Unity Hub 的 "项目" 中添加项目并选中同名文件夹。导入项目后会是这样：

![unityhub2](beatsaber-mapping-1/unityhub2.webp)

经过几分钟的加载（如果有弹窗，就点击 Continue），进入主界面后在左上角 `File > Build And Run`，选择一个文件夹存放编译后的文件。

![unityeditor](beatsaber-mapping-1/unityeditor.webp)

最后... 既然编译完了那也没什么好说的了，下期见。

## One More Thing

如果你找到这篇文章是想获取 ChroMapper，又不想遭芝麻版 Unity 的罪；那么我准备了一份不错的礼物。

[ipfs://](ipfs://QmZy86M8fB9izJPASdGdTeQdroeGwrjkaguQRkHUTg5VKF?filename=ChroMapper.7z) | [ipfs.io](https://ipfs.io/ipfs/QmZy86M8fB9izJPASdGdTeQdroeGwrjkaguQRkHUTg5VKF?filename=ChroMapper.7z) | [cloudflare-ipfs.com](https://cloudflare-ipfs.com/ipfs/QmZy86M8fB9izJPASdGdTeQdroeGwrjkaguQRkHUTg5VKF?filename=ChroMapper.7z)
