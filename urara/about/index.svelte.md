---
title: 关于
date: 2021-10-05
lastmod: 2021-10-05
priority: ['About', 0]
cover: 'assets/bg.webp'
---

## 关于我

藍 aka 蓝

地球人，目标赴日。

追求普世价值，讨厌集权专制和国家 / 民族主义者。

巴别：

<div class="overflow-x-auto">
<table class="table w-full rounded-box overflow-hidden my-4 children:children:(border-none text-dark-900)">
  <tr>
    <th class="!bg-green-300 text-xl font-semibold">zh-N</th> 
    <td class="!bg-green-100">我能以地道的中文交流。</td>
  </tr>
  <tr>
    <th class="!bg-cyan-300 text-xl font-semibold">en-2</th> 
    <td class="!bg-cyan-100">I have intermediate knowledge of English.</td>
  </tr>
  <tr>
    <th class="!bg-blue-300 text-xl font-semibold">ja-1</th> 
    <td class="!bg-blue-100">私は簡単な日本語を話せます。</td>
  </tr>
</table>
</div>

### 联系

我主要使用这两种 IM 软件：

- Telegram @kwaabot
- Discord 917#1929

Telegram 请说明来自我的博客，Discord 请在添加之前在评论区留言；以免被当作垃圾信息处理。

如果需要其他联系方式，可以通过以上方式联系我获取。

### 编程

主要是前端，但是很多都沾一点（即全沾）

面向 Google & MDN & StackOverflow 编程，还点了一些 Linux 技能（Arch & Debian 用户）

进化路线：JavaScript(this 真不会) => ESNext(离不开语法糖) => Node.js/NPM(会用) => TypeScript(新手上路)

比较熟悉：

- JavaScript(ESNext) / Node.js & NPM # All-In-JS
- MDUI / Bootstrap / jQuery # 老三样
- TailwindCSS / WindiCSS / DaisyUI / SvelteKit # 写完 Urara 熟练度高了不少，全程 @apply
- Arch / Debian / Docker # 的启动与关闭（雾）

会一点：

- TypeScript # 勉强写 Interface / Type 程度的能力
- Python # 会用 pip 和写点脚本程度的能力
- Express / Koa # 用过，确实只会一点
- Angular # 用过，确实只会一点

还想学：

- Elixir # 没有人能拒绝管道操作符，如果有就定义一个宏
- Phoenix & LiveView # 以后有灵感的话想试试
- Rust # 都进 Linux 内核了，我的眼光没错（就是提不起劲学）
- React & GraphQL # 要恰饭，而我又不太想用 Vue

### 游戏

PC & VR 玩家，设备 Valve Index。
这几年囤积了不少游戏，就不详细写了；可以直接联系我。
游戏库包括但不限于 MC(JE&BE), CS:GO, R6S, GTAV, GBVS, DL... 喜欢玩 FPS 但是很菜。

> **不玩任何国服**

### 音乐

播放列表由 VOCALOID + Anisong + J-POP 组成

也很喜欢折腾设备和软件，在本站可以看到不少我[关于耳机的想法](iem-idea)（虽然没几个能做出来）。

播放器：

- foobar2000
- HQPlayer 4 Desktop EVALUATION
- Studio One 3 Artist Piapro Edition

设备：

- Chord Mojo
- HiBy R3
- Enjoy The X

耳机：

- [IEM-AXE_P8](project-axe-p8)
- SONY XBA-H3

## 关于本站

本站创建于 2019 年 10 月，是我的第四个博客（内容全部清除算一次）。
时间线：

```text
2015-09: 第一个博客，使用 WordPress. | destroyed
2017-08: 第二个博客，使用 ZeroNet. | unknown
2018-07: 第三个博客，使用 Typecho. | destroyed
2019-10: 第四个博客，使用 Hexo. | blog.917.moe
2020-08: 博客重构. | kwaa.dev
2021-10: 博客重构, 使用 SvelteKit/Urara. | kwaa.dev
```

还有什么要做的吗？

- 更换 .ai 域名
  - 我很早就想换成 .ai 域名了，但因为价格较高且不好起名字所以目前没换。
- ENS/IPFS 分站
  - 接上一条。xxxai.eth 或 xxxai.eth.link

## 友链申请

大体沿用之前的友链标准。

请先让我知道你想要申请友链，确认通过后互相添加。

- 先友后链：与我有过至少一次交流
  - 回复评论每条算一次。IM 软件消息每条算一次。
- **没有备案号，不是 .cn 或其他中国特色域名**
  - **非常重要：我真的很讨厌这类东西。**虽然也不喜欢，但萌国 ICP 之类不在此条“备案号”的范围内。
- 提交的数据格式完整且变更后及时通知
  - 头像链接要始终有效（没头像可以不填，但不能时不时失效），换域名提醒等

关键的就上面这些了。那么数据格式：

```ts
type Friend = {
	title: string // 网站标题 什么都可以。（昵称，站点标题，或者昵称 + 站点标题）
	url: string // 网站 URL
	descr?: string // 描述，可选。我没什么想法所以最好不要让我想
	avatar?: string // 头像 URL，没有或不稳定可以不填。
}
```

或者... 自由发挥！

提供一块和默认排版一样的空间 `w-full h-64`，在**不影响观感且我能接受**的前提下自由使用 HTML 标签和 WindiCSS / DaisyUI 类名。

- 只能是已有的类名，不能是 CSS / JS / SVG
- 可以通过 data-theme="" 强制设置 DaisyUI 主题，但我不保证主题一直有效
- 图片最多三张，必须带 loading="lazy"
- 嵌套不能过于复杂

对于这类友链，请直接给 Tailwind Play / Windi Play / Codepen 链接。

然后是本站的信息：

```ts
export const kwaa: Friend = {
  title: './kwaa.dev' || '藍', // 本站标题和我的网络ID
  url: 'https://kwaa.dev',
  descr: '[DATA EXPUNGED]', // 没什么好描述，我建议
  avatar: [
    'https://kwaa.dev/assets/any@512.webp' // 头像面积不大时使用，分辨率可选 192/512/1024
    'https://kwaa.dev/assets/maskable@512.webp' // 头像面积较大时使用，分辨率可选 192/512/1024
    'any@base64: 见下' // 24px，几乎不拖累加载速度；但需要 style="image-rendering:pixelated" 或 class="image-render-pixel"
  ],
  banner: 'https://kwaa.dev/assets/bg.webp' // 需要背景图时使用
}
```

[any@base64-无背景](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAVFBMVEUAAADW29T///+5wcc4ODjz8OZVVVX/7MkVFRXtrpqTJiVHKxPZOjr/+/QICz3/07d1TCNErbkaSXtgERn59vb//OPSzMzuuwKZne20srL0mIyWGwWygNgKAAAAAXRSTlMAQObYZgAAAOtJREFUKM9djwuSwyAMQ2vsBDBJyK/tfu5/z5W6aYZUMB7QQwZuhwIkwnq7KIgqTFQJV3/USQX+OoE0fqfLIh0kCtKC31VGEEGqBezdydixfAARnNeRKZDmClE4mFE/gAKpTjFOcgEde01fa4wrDjRAlGNf7vdF5QKEzSJUCRpftmFwrbW6vEGYXwEzHzi2BvCF1ve9/7hvDSgqBJYQeHxrA4oqAskA9ocpwUkIkrvbnppvlNnMUkn+9B4r+CdAAACVM5yJnBnA9U+8wCzncPgRynP6V+WGIQZyzMWspwzrTEASSi4F/kHCy/4DaDYJuEU/v5oAAAAASUVORK5CYII=)

[any@base64-有背景](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAUVBMVEUICz3W29T///+5wccaSXtErbk4ODjz8OZVVVX/7MkVFRXtrpqTJiVHKxPZOjr/+/T/07d1TCNgERn59vb//OPSzMzuuwKZne20srL0mIyWGwVwQ6mkAAAA9UlEQVQoz1WOCbLDIAxDMQYngMna9i/3P2hlGjpEMB7QQzbukoeIrLqbPDHDRCV/91d2TPCDAxn8iWOkCSIGGcF/oBWEkBqB9Z5onazcAfrjPa+WAhlGEMPBTtxBCMEAAzG7lBwBwLzAZL3cT0gp4MEAiG2d8fGITDdA1ixBWweXT8eyKG/bptSB31tARBdbxwDshzLPs/6pHgOoTAYkI/D85Q6ir5UZgSwA51MYIMboopEGsqrKmRl+B7uI5Jr1pTNO8L8AAQBU2/6bKMUCGP/CD0RKaTPgJ6js+aPNLggZKCWVKjKbBOcC0Fr5WmqFfxHfhrwBRawLyITR1qYAAAAASUVORK5CYII=)

## 捐赠

如果你想。

- ETH/xDAI: 0xaBdB3f715198A4d7e6591b6ebBE8Ccf235e5D752
  - 唯一指定钱包地址，目前不使用 BSC 及其他公链。什么 Token 都收，但建议使用 xDAI（因为 gas 费低）

## 留言板

那么下面是留言板。
