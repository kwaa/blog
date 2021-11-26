---
title: '让电脑音频输出的左右声道互换'
date: 2018-03-15 11:00:00
tags:
  - EqualizerAPO
  - 音频
descr: 这次这篇玩意是给和我一样设备各种问题的人准备的。
---

> 你正在查看一篇远古文章，已优化排版但不保证内容有效。

这次这篇玩意是给和我一样设备各种问题的人准备的。

## 前言

历经两年终于装好的解码器回到了我手上。
试听下来一切都感觉良好，不过玩游戏的时候终于发现了哪里不对——

### 左右声道反了.

进"声音"板块看了一下, Windows 并没有提供相关功能的设置。
只能引用腊肉的话, 自己动手丰衣足食了。
经过一番 Google 以后找到了解决方案. (Search the f\*cking web)

### 下载 EqualizerAPO

在[SourceForge](https://sourceforge.net/projects/equalizerapo/)可以直接下载。

### 配置

下载安装以后在程序列表点击进入设置。

在“播放设备”选择好需要调整的输出接口, 然后重启电脑：

![Configuration](/archives/equalizerapo-lr/config.webp)

重启完毕后打开 Configuration Editor，点击一下下面的绿色 + 号, 选择 Comment。
输入`Copy: L=R R=L` 然后点击一下开关图标，让它变成白色.
文件 - 保存, 这样左右声道互换的配置就完成了。

### 后话

EqualizerAPO 还有很多功能（不过我短时间内用不到）, 以后可能会发其他一些关于它其他作用的文章.
