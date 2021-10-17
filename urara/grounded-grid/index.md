---
title: 'Grounded Grid 资料整理 & 笔记'
date: 2021-09-17
lastmod: 2021-10-18
tags:
  - Grounded Grid
descr: 去年年底我就有制作 Grounded Grid 的想法，但直到出现这篇文章为止还是没正式开工。嗯... 在我做出来之前会一直更新进度，直到放弃或者做出来为止。
---

去年年底我就有制作 Grounded Grid 的想法，但直到出现这篇文章为止还是没正式开工。
嗯... 在我做出来之前会一直更新进度，直到放弃或者做出来为止。

## 序章

### Grounded Grid 是什么？

Grounded Grid 是由 Kevin gilmore 设计的静电耳放，算是 KGSSHV Carbon 的电子管版本。

### 为什么不是 KGSSHV Carbon / KGBH / DIY T2

虽然 KGSSHV Carbon 和 Grounded Grid 差别很小，但晶体管机的材料更难买一点。再就是我喜欢 Grounded Grid 这个命名

KGBH 太老了。虽然有比较新的 BJT 版，但我也实在不太感兴趣。

T2... 虽然确实可以说是最好的选择，但 KG 版很多买不到的元件，mini 版又不分享 gerber 文件无法自己打板只能团购。

### 直接买不好吗

这就要说到一个问题了：众所周知越高端的东西性价比越低，而静电恰好位于金字塔顶。

考虑到 SR-009S （和现在新的 SR-X9K）推出以后 009 已经降了不少，在**最好**的那些耳机里性价比勉强能说有一战之力的话；静电耳放就是完全的坑爹了。

STAX 官放一直在挤牙膏，最新的 700T/700S 我一看... 一万九？打扰了。

DIY 嘛，主流的也就 KG 系了。但是价格——好家伙 Grounded Grid 订金一万五。我满打满算（金狮 KT77 + 光音 4CP-2506S）材料钱也超不过它定金一半吧？

### 制作难点

首先是资料难找，必须把一个线程从头翻到尾——找不到有效信息还得翻 KGSSHV Carbon 和 KGSSHV 的线程

然后是材料难凑，基本总有一些元件缺货或者停售。像

## 准备

### PCB-Gerber

[Gerbers](https://www.head-case.org/forums/topic/17783-google-drive-for-gerbers-seems-broken-but-drive-folder-for-schematics-seems-ok/?tab=comments#comment-864655)

Grounded Grid / GRHV 相关的文件有：

- gg.zip（Grounded Grid 耳放板）
- kgsshvpssicfetsinglenewrightsws3 - CADCAM.zip（GRHV 单片瘦版右侧 1.81）
- kgsshvpssicfetsinglenewrightsws.zip（GRHV 单片瘦版右侧 v1.8）
- grhvrightnocap2.zip（GRHV 单片无电容位版右侧 v1.81）
- grhvleftnocap2.zip（GRHV 单片无电容位版左侧 v1.8）

GRHV 能下载到的最新版本 gerber 文件是右侧 1.81，左侧 1.8。

所以我需要两片 Grounded Grid 耳放板和两片 GRHV 单片瘦版右侧。
为什么只需要右侧？左侧有用不到的低压电源部分——虽然不打算做 GRLV，但可以用淘宝的 STUDER900 低压电源。打板种类越少越省钱是这样了。

### BOM

Head-Case 找到的 BOM 列表有：

- [GG by joehpj](https://www.head-case.org/forums/topic/12452-grounded-grid/page/5/?tab=comments#comment-737324)
- [GRHV by joehpj](https://www.head-case.org/forums/topic/12894-blue-hawaii-bjt-build-thread/?tab=comments#comment-760209)
- [GRHV by Hirsch2k](https://www.head-case.org/forums/topic/12330-kgsshv-carbon-build-thread/page/62/?tab=comments#comment-806732)

但 GRHV 所需的元件并不全都有货，之后我会按照 PCB 丝印和上面这些单独整理一个 BOM 表。

> 未完待续...
