---
title: 'Project AXE - 旗舰耳机 DIY 计划'
date: 2020-04-07 20:20:00
updated: 2020-09-03 23:54:00
comment: true
categories:
  - 音频
tags:
  - DIY
  - IEM
  - 入耳式耳机
---

众所周知，21 世纪的旗舰 IEM 相当昂贵。

我既想拥有一个旗舰 IEM 又认为市售品比起 STAX SR-009S、Abyss 1266 之类的大耳来说溢价过高，就产生了自己设计一个的想法。

<!-- more -->

既然是旗舰级，那当然要十单元！静电！
(Balanced)Armature, Electrostatic, X(10)；干脆就叫 AXE 好了。

但是去年的我并不知道，这个玩意会拖了快一年时间还没完成；并且足足让我花了四五千（单元 + 工具）。

## 原型 2019.07 ~

Project AXE 最初方案基本照搬 [dhruvmeena96 的设计](https://www.head-fi.org/threads/home-made-iems.430688/post-15070746)，做了一些小修改和额外加了一个 30017 用来实现类似 CK100 的音染。

> IEM-AXE (ver2019.8) 10 单元 5 分频 3 导管

- 38D1XJ007Mi(串联) - L-pad(4.7Ω, 4.7Ω) - 并管黄阻尼(4700)
- 33AJ007i(串联) - 串 47Ω - 并 15uF - 并管黄阻尼(4700)
- 2389D(半线圈并联) - 串 2.2uF - 棕阻尼(1000)
- EST65DA01(并联) - 串 470nF - 并管灰阻尼(320)
- 30017 - 中频串 2.2uF - 高频串 470nF - 并管灰阻尼(320)

去年的我画不好分频，焊出来声音有问题然后被人咕了。

之后又摸了半年（直到有钱把工具买齐为止），L-pad 在第一次测试中不可用，我打算修改到一般的低频电阻。

在这期间某宝也能买到 EST65QB02 了，2020 年的 AXE 设计去掉了 30017 并把静电单元改为 EST65QB02，但我并没有钱买新的静电单元(一个七百多呢) 原型只好继续用 EST65DA01，也就是八单元。

## 新生 2020.05 ~

到这里旧 AXE 和新 AXE 已经不是一个东西了。
我目前更倾向于先把旧 AXE 做完自用，满足我对旗舰入耳式耳机的需求；新 AXE 考虑到预算不足暂且搁置。
[一年后的成果：IEM-AXE_P8](https://kwaa.dev/p/project-axe-p8)

IEM-AXE ver2020.9 将中低频改回了并联，并用 RC 低通替代了 L-pad。

> IEM-AXE (ver2020.9) 10 单元 4 分频 3 导管

- 38D1XJ007Mi(并联) - RC 低通(串 100Ω, 并 100uF) - 并管黄阻尼(4700)
- 33AJ007i(并联) - 并管黄阻尼(4700)
- 2389D(半线圈并联) - 串 2.2uF - 绿阻尼(1500)
- EST65QB02(并联) - 串 470nF - 白阻尼(680)

作为旗舰规格自然要带一个开关，用来调整低频：

- BASS-LIGHT (IEM-AXE_BL, 参考 [Harman IE Target 2019 without bass](https://github.com/jaakkopasanen/AutoEq/blob/master/compensation/harman_in-ear_2019v2_wo_bass.png))
- BASS-HEAVY (IEM-AXE_BH, 参考 [Harman IE Target 2019](https://github.com/jaakkopasanen/AutoEq/blob/master/compensation/harman_in-ear_2019v2.png))

## 外观

~~面板打算使用某宝买的银箔碎碳板，配正反金属贴；
腔体透黑+金属出音嘴，这个还是等样品做完之后放成品图吧。~~ 参见 IEM-AXE_P8

## 总结

还没做完怎么就总结了呢？总之我想到什么说什么了。

- 首先，找人帮忙的时候绝对要做好被咕的准备。
- 其次，直接挑战旗舰是不明智的。

最后是我为了这个计划买的工具：

- 万用表 优利德 UT61E ￥ 270
- 电烙铁 二手晨美数显 T12 焊台 ￥ 150
- 人工耳 小黑 IEC711 仿真耳 带底座精密版本+声卡 ￥ 1000
- 固化灯 36W 镇流器版加强灯+四支 LED 套装 ￥ 270
- 打磨机 世新 204+102L ￥ 250

工具两千左右，单元和其他材料大概有三千。

惨痛的教训：没钱就不要尝试做多动铁耳机！但我买都买了，也只好忍痛做完。
