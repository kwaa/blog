---
title: 'Project 1ST - 电子分频耳机 DIY 计划'
created: 2020-06-09 21:00:00
updated: 2020-06-30 05:30:00
categories:
  - 音频
tags:
  - DIY
  - IEM
  - 入耳式耳机
  - 模拟信号处理器
---

## 设计 2020.01 ~

对，我在 Project AXE 被击坠的那段时间有了现在你看到这些东西的想法。

Project 1ST 是由一对六单元耳机头，两条 2.5mm TRRS 对录线和一个普通便携耳放大小的数字信号处理器组成的有源电子分频耳机系统。这个耳机系统不涉及数模转换部分。

<!-- more -->

### 耳机，接口和线材

耳机不内置**普通**的功率分频器，直连 2.5mm 母座；
腔体使用透明光固化树脂公模，具备异形 PCB 面板和金属出音嘴。
（PCB 正面焊盘方便焊接，背面阻焊/焊盘图案算是客制项目之一）

耳机部分我取名为 IVX，没有理由。

> IEM-IVX「MASTER」6 单元 3 分频 3 导管

- 38D1XJ007Mi/8a(并联) - 2mm\*12mm 导音管
- 33AP007(并联) - 2mm\*12mm 导音管
- 2389D(半线圈并联) - 2mm\*12mm 导音管

模拟信号接口使用 2.5mm TRRS 单输入双输出，另外提供一个 3.5mm TRS 输入。电源开关/交叉反馈开关和音量旋钮。

线材也就是两条编在一起而已，用料暂定 Sommer Cicada 4 芯 1.5 米。

大概像是这样：

![demo](/project-1st/demo.webp)

2.5mm 插针定义：

![trrs](/project-1st/trrs.webp)

### 模拟信号处理器

> ASP-NE0「MIXER」

这套耳机系统的灵魂也是最麻烦的部分，做这个我觉得有必要使用一部分洞洞板。

交叉反馈、分频点和 EQ（如果有）完全根据耳机设计，以实现最佳效果。

仿照 Orion ASP 画的 Function Block Diagram，随进度更新：

![diagram](/project-1st/diagram.webp)

#### IB - 输入缓冲

没想好

#### VC - 音量控制

没想好，暂定 PGA4311？

#### XF - 交叉反馈

不太了解，但我想试试！
拥有不同的听感不是很棒吗？反正可以手动开关。

#### LR - 三路分频

作为一个 Linkwitz 信徒，我当然会选择四阶 Linkwitz-Riley 滤波器。

打算耳机原型做好以后用 Equalizer APO，foobar2000 和 [foo_dsp_xover](http://xover.sourceforge.net/) 插件先决定好分频点，再根据分频点设计 PCB。

电路直接搬 TI 参考设计 [TIDU035](http://www.ti.com/lit/ug/tidu035/tidu035.pdf)，用 OPA1604 运放。

#### AMP - 功率放大

耳放部分我给起了一个好听的名字—— Mori 森

众木成森，它专为多声道/低功耗设计（实际上也是搬的 TI 参考设计，稍作修改）；一片 INA1620 并联接一端输出。

这次是三分频六声道，所以也就叫 Mori 2X6。

这个放大器为 1ST 耳机系统专用，所以不需要额外的增益开关。

#### POWER - 电源

出于省事，我打算用二或四块 9V 电池供电，并联成 ±9V。
这样也不用考虑充电了，简洁万岁！
