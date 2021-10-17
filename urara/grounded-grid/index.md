---
title: 'Grounded Grid / KGPT 资料整理 & 笔记'
date: 2021-09-17
lastmod: 2021-09-28
tags:
  - 静电耳放
  - Kevin Gilmore
  - Head-Case
  - Grounded Grid
  - KGPT
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

首先是资料难找。不像 Linkwitz 的音箱直接用 miniDSP，这是要自己打板焊接的。

唯一比较有用地方也就 Head-Case，但必须把一个线程从头翻到尾。（Grounded Grid 作为 KGSSHV Carbon 的儿子和 KGSSHV 的孙子，找不到有效信息还得翻它们的线程）

## 准备

现在买不到 Kemet 550V 680uF 的电容（GRHV 需要四个），有货了就准备开始。

### PCB-Gerber

目前最新的 Google Drive 链接是 [folders/1r3g2TAtBUaBdiMorTWX7yYgeJ7maQbYW](https://drive.google.com/drive/folders/1r3g2TAtBUaBdiMorTWX7yYgeJ7maQbYW?usp=sharing)

Grounded Grid / GRHV 相关的文件有：

- gg.zip（Grounded Grid 耳放板）
- kgsshvpssicfetsinglenewrightsws3 - CADCAM.zip（GRHV 单片瘦版右侧 1.81）
- kgsshvpssicfetsinglenewrightsws.zip（GRHV 单片瘦版右侧 v1.8）
- grhvrightnocap2.zip（GRHV 单片无电容位版右侧 v1.81）
- grhvleftnocap2.zip（GRHV 单片无电容位版左侧 v1.8）

所以 GRHV 能下载到的最新版本 gerber 文件是右侧 1.81，左侧 1.8。因为无电容版
