---
title: 'MIKU LAND 2021 SUMMER VACATION 参加记录'
date: 2021-08-22 12:12:12
updated: 2021-09-07 16:14:12
categories:
  - 笔记
tags:
  - 初音ミク
  - MIKULAND
  - VirtualCast
photo: /mikuland-2021summer/warerawahare.avif
---

前天 Miku 官号投了一首 [満開ダイビング](https://youtu.be/t9eRhC-GAWs)，让我知道了有 [MIKU LAND](https://mikuland.com/) 这么个玩意。~~别问为什么 [Happy Coaster](https://youtu.be/KG-Q2v2kdsw) 那会不知道，问就是只顾着听歌了没注意~~

<!-- more -->

> **一句话评价：不推荐。如果真的很想体验可以只花 800 円买通行证，不推荐任何限定グッズ**

Miku + VR, 还等什么？当然是掏钱了！
尽管之前的游戏 [初音ミク VR](https://store.steampowered.com/app/707300) 我不太满意，但有新东西出来我还是肯定会试试的。

需要在 [THE SEED ONLINE](https://seed.online) 注册账号并[购买通行证](https://seed.online/products/07ae305320780e33400a9d7fc7db817f20d8a80990d5e903641e557b62223735)。

让我康康都支持哪些支付方式...

- クレジットカード（信用卡），挺正常的不过现在我 VISA 卡注销了
- BitCash，什么玩意？
- WebMoney，不懂。
- NET CASH，？？？
- ドコモ払い（docomo）... 认识但没看懂。
- ソフトバンクまとめて支払い（软银）... 认识但没看懂。
- Alipay 国際決済（支付宝）

居然支持支付宝？！那就废话不多说，直接买。

中间会经过一个 `fep.sps-system.com` 的域名，得开全局或者添加条件，不然会无响应。
然后支付宝告诉我：

> **系统有点儿忙，一会儿再试试。** > **错误码：SECONDARY_MERCHANT_STATUS_ERROR**

搜了一下是因为商户状态异常，然后我就给 support 发了个机翻邮件；一天后得到回复说由于各种原因没办法用支付宝，让我考虑其他支付方式——就是你了，BitCash！淘宝就能买到。支付搞定。

## 网络问题

然后是一个非常经典的问题——我身处芝麻，自然要通过芝麻防火墙。VirtualCast 无法直连且没有加速器支持，网络就成了一个很大的问题。

首先尝试了一下 Netch 连 Naiveproxy，Udpblocked。
难道只能把某一台机器上的 caddy 下掉换成 v2ray / trojan? 我不想这么做，所以翻出来了 wireguard。

我也不想在这篇文章里看到一大串命令行代码，所以就不搬了。省略掉过程，最终得到了一个 [FullConeNat](https://github.com/Chion82/netfilter-full-cone-nat), 通过 udp2raw&udpspeeder 提升性能的 wireguard 代理。

## 游戏设置

启动 VirtualCast，在进入 Studio 或 Room 之前会在桌面显示一个菜单，点击右上角的 CONNECT 然后登录之前注册的 THE SEED ONLINE 账号。

## 商品

我都买了些什么：

- [MIKU LAND 2021 SUMMER VACATION 有料エリア入場パス 800 VCC](https://seed.online/products/07ae305320780e33400a9d7fc7db817f20d8a80990d5e903641e557b62223735)
  - 不算太亏，至少差不多逛完了。
- [デジタルフィギュア 雪ミク（SNOW MIKU 2021 Ver.） 4950 VCC](https://seed.online/products/7af3c229c8acf737f21b7904b0e77af39c78ec1bd1e60821e9d9357111a4638a)
  - 血亏。本来以为是玩家模型，结果只是一个可以摆姿势的虚拟等身手办？怪我不懂日语。
- [「ロキ」お面 700 VCC](https://seed.online/products/b9af87fe8b0164361fc49dbe88d9ebfdf1965e8275bdb318006d749517d4b867)
  - 相比上一位这点小钱也就不算什么了，我很好奇买这个米奇头能不能收到钱。

## 会场点评

进入 Room 后，通过 B 键菜单 => ルーム => おすすめ，选择某个房间进入。

![room-1](mikuland-2021summer/room-1.avif)

![room-2](mikuland-2021summer/room-2.avif)

### 広場

广场没什么好说的。
展示墙有三个限定 WH-1000XM4 拿一下，可以听听歌（我为什么不去油管听？）；其他的属于鸡肋，基本都是些没意思的广告。

#### 事件 - ミク夏音頭 / Bon Odori with Miku

感觉不错，但我之后再来就没看到 Miku 了。

![bonodori-1](mikuland-2021summer/bonodori-1.avif)

![bonodori-2](mikuland-2021summer/bonodori-2.avif)

![bonodori-3](mikuland-2021summer/bonodori-3.avif)

![bonodori-4](mikuland-2021summer/bonodori-4.avif)

#### 事件 - グリーティング / Greeting / 问候

没遇到。

#### 事件 - ミニライブ / Mini Live / 迷你直播

没遇到。会场チケット？什么玩意？

#### 事件 - フォトコンテスト / Photo contest / 摄影比赛

雨我无瓜。

#### ミクアウトドアショップ / MIKU Outdoor shop / MIKU 户外商店

这些商店本来是不打算写进来的，但是我拍了照片不发又觉得可惜，所以就有了这一节。

![outdoorshop-1](mikuland-2021summer/outdoorshop-1.avif)

![outdoorshop-2](mikuland-2021summer/outdoorshop-2.avif)

#### ミクアートギャラリー / MIKU Art gallery / MIKU 美术馆

少数让我满意的场景，因为有画可以看。
尽管我可以去 pixiv 或者把图片拖到 NeosVR，但这个场景比较有气氛不是吗？

![artgallery-1](mikuland-2021summer/artgallery-1.avif)

![artgallery-2](mikuland-2021summer/artgallery-2.avif)

![artgallery-3](mikuland-2021summer/artgallery-3.avif)

#### リズムゲーム / Rhythm game / 节奏游戏

不如 Beat Saber... 行吧，比没有强。毕竟是游戏里的游戏。
主要玩法就是用手接住飘下来的音符，还有两个手部装备检测握力（这个操作就比较难受）。
玩起来还行但是没什么打击感，只有【満開ダイビング】和【われらはハレ】两首歌。
如果想单买这个节奏游戏得 2000 円（而且 MV 播放功能还是会场限定的），人傻钱多了属于是。
毕竟我在会场玩是不需要再花 2000 円的并且有 MV，所以还算比较满意。

嗯... 没有截图。

### スノードームイルミネーション / SnowGlobe Illumination / 雪球照明

一般，就看看雪雕。

最离谱的是打雪仗场地里手套是单卖的，收费 1000 円。

![snowglobeillumination-1](mikuland-2021summer/snowglobeillumination-1.avif)

![snowglobeillumination-2](mikuland-2021summer/snowglobeillumination-2.avif)

#### 事件 - 雪ミクスノーショー-Fondant Step-

我最期待的，但是没等到。你妈的为什么！！！
最后一天 19:40 的时候场景黑化（加载中），但是因为芝麻网络我死活没加载出来。错过了。

### マーメイドステージ / Mermaid Stage / 美人鱼舞台

没意思，只是一个海底场景。虽然我可以跑到上面去坐潜艇，但评价并不会因为这么个小玩意而改变。

![左拥右抱](mikuland-2021summer/mermaidstage-1.avif)

![花了快一万日元的富裕老哥](mikuland-2021summer/mermaidstage-2.avif)

![鸭子坐单独来一张](mikuland-2021summer/mermaidstage-3.avif)

### パラソルビーチ / Parasol Beach / 阳伞沙滩

也没什么意思，只是一个沙滩场景。拍照点也不能像潜艇那样移动。
根据现实时间会出现日落，就有人鱼 Miku 和... 这哪位来着？

![parasolbeach-1](mikuland-2021summer/parasolbeach-1.avif)

### ホラーハウス / Horror House / 恐怖之家

前半段我感觉还行（然而看不懂日语）
后面就连不上服务器掉线了。

## 总评

自己没买好，不是我想看的内容。
800 円的通行证算小亏吧... 血亏 **_5000_** 円，小亏 **_1500_** 円。
要玩 VirtualCast，你需要一个优秀的互联网线路。如果我网络连接良好的话通行证就不算小亏了，但并不好...

## 题外话

第一天体验完就去买了 [Hop Step Sing! Happy People](https://store.steampowered.com/app/1722140/Hop_Step_Sing_Happy_People)，VR MV 确实很顶。

最后一天我在油管又看到有个 [初音ミク GALAXY LIVE 2021](https://youtu.be/U71kYRnZNk4)，只支持手机 "VR" 就离谱。就不能搞点阳间的吗？

最后放几张合影，这篇文章就这么结束了。这些质量很高的图片会让我感觉没那么亏，但实际上还是血亏。

![snowglobeillumination-3](mikuland-2021summer/snowglobeillumination-3.avif)

![snowglobeillumination-4](mikuland-2021summer/snowglobeillumination-4.avif)

![snowglobeillumination-5](mikuland-2021summer/snowglobeillumination-5.avif)
