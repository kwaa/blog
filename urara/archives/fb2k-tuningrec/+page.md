---
title: 'Foobar2000 调教记录'
date: 2018-08-25 17:00:00
tags:
  - Foobar2000
  - 音频
summary: 很久没有水文章了，最近身边设备大换血就顺便写篇 FB2K 的折腾记录。
---

> 你正在查看一篇远古文章，已优化排版但不保证内容有效。

很久没有水文章了，最近身边设备大换血就顺便写篇 FB2K 的折腾记录。

## 下载&安装

截至本文发布前（2018-08-25），最新版本为 1.4 Final。

英文原版可以直接在[官网](http://www.foobar2000.org/download)下载，[Asion 的博客](http://blog.sina.com.cn/go2spa)提供汉化版下载。注: 部分杀毒软件(如 Windows Defender)会报毒, 可以先拖进[VirusTotal](https://www.virustotal.com/#/home/upload)看看。

## 基础配置

汉化版安装过程中可自选一些组件安装, 这里我直接完整安装。（ESLyric / WASAPI 等常用组件都有）

在选项 - 输出中选择“WASAPI(事件): OUTPUT”或“WASAPI(推送): OUTPUT”即可。

在选项 - 媒体库里设置音乐文件夹，简单的设置就完成了。

## 主题

我不用主题，主要是因为能找到的皮肤要么风格老旧，要么花花绿绿或者极致简陋。

布局的话随个人喜好吧，这里就略过。

## 桌面歌词 & 歌词搜索设置

ESLyric 这段可能是字数最多的（笑）

首先在 ESLyric 设置里把歌词搜索匹配度调到 60 以下（匹配度高的话部分歌曲搜不到歌词）

子设置搜索，推荐如图设置：

![Settings](/archives/fb2k-tuningrec/1.webp)

默认的桌面歌词是真难看。虽然不怎么用，但在这里给出我的配色方案：

![Color](/archives/fb2k-tuningrec/2.webp)

- 未播放: 上 R156 G167 B181, 下 R205 G212 B219
- 已播放: 上 R0 G91 B234, 下 R0 G198 B251

可以在[WebGradients.com](https://webgradients.com/)找到更多渐变配色，这里我用的就是其中一种

## 组件拓展

这里安利我喜欢的组件并附上链接。

[foo_dsp_src_resampler](http://www.foobar2000.org/components/view/foo_dsp_src_resampler): 一个很成熟(过气?)的重采样器. 它使用著名的 Secret Rabbit Code 算法(libsamplerate 0.1.9), 而该算法以前主要用于专业 DAT 机录制 CD 的过程中. (用这玩意会消耗更多的 CPU 资源)

[foo_dsp_effect](http://www.foobar2000.org/components/view/foo_dsp_effect): 音效, 这个就不用我介绍了. 顺便一说, 把 Pitch Shift 拉到-0.32 可以感受 432hz 音乐[[来源请求](https://zh.wikipedia.org/wiki/%E6%9D%A5%E6%BA%90%E8%AF%B7%E6%B1%82)]
