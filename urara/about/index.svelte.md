---
title: 关于
created: 2021-10-05
updated: 2022-04-15
flags:
  - unlisted
---

<script lang="ts">
  import Profile from '$lib/components/extra/profile.svelte'
</script>

## 关于我

<Profile subname="zh-N / en-2 / ja-1" bio={`地球人。<br>追求普世价值，讨厌民族主义者<span class="hidden">：小粉红，战狼，五毛</span>。<br>欢迎联系，请说明来自博客以免被当作垃圾信息。`} >

<div class="flex flex-col md:flex-row gap-4 mt-4">
<a href="https://t.me/kwaabot" rel="noopener external" target="_blank" class="group flex-1 relative overflow-hidden btn btn-block normal-case border-none no-underline bg-[#26a5e4] hover:bg-[#0088cc]">
  <svg class="absolute w-16 h-16 left-10 opacity-20 fill-white transform-gpu transition-transform ease-in-out duration-500 group-hover:scale-125" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
  <span class="z-10 !text-white">@kwaabot</span>
</a>
<a href="https://discord.com/users/349550824202043392" rel="noopener external" target="_blank" class="group flex-1 relative overflow-hidden btn btn-block normal-case border-none no-underline bg-[#5865f2] hover:bg-[#7983f5]">
<svg class="absolute w-16 h-16 right-10 opacity-20 fill-white transform-gpu transition-transform ease-in-out duration-500 group-hover:scale-125" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
  <span class="z-10 !text-white">917#1929</span>
</a>
</div>
</Profile>

### PGP

我目前主要使用的 PGP 密钥：

```text
pub   rsa4096/0x896478D978EB0000 2022-01-07 [C] [expires: 2024-04-22]
      F9D4 3DF6 8ED4 1062 3D89  8619 8964 78D9 78EB 0000
uid                   [ultimate] 藍+85CD <kwa@kwaa.dev>
sub   ed25519/0xDE79FF189995830E 2022-04-22 [S]
sub   cv25519/0x774062A28FBA3BD4 2022-04-22 [E]
sub   ed25519/0x4D5B17F0943CD268 2022-04-22 [A]
```

你可以通过以下方式获取对应公钥的最新版本：

```bash
gpg --fetch-keys https://kwaa.dev/pgp/0x896478D978EB0000.asc
```

#### 加密信息

欢迎使用上面的公钥向我发送加密信息。

#### 签名策略

截至目前（2022 年 5 月）我不会对任何公钥进行签名。

### 编程

主要是前端，不过很多都沾一点（即全沾）

面向 Google & MDN & StackOverflow 编程，还点了一些 Linux 技能（Arch & Debian 用户）

进化路线：JavaScript(this 真不会) => ESNext(离不开语法糖) => Node.js/NPM(会用) => TypeScript(新手上路)

开始尝试函数式编程。

> `+++` 不敢写精通 / `++` 熟练 / `+` 了解 / `-` 会用

#### 语言

`++ JavaScript (+ TypeScript)` `++ HTML` `+ CSS` `- Python`

#### 前端框架 / 库

`++ MDUI/Bootstrap` `++ Svelte/SvelteKit` `++ WindiCSS/TailwindCSS/DaisyUI` `- jQuery`

#### 后端框架 / 库

`- Express/Koa`

#### 环境

`++ Nodejs/NPM` `++ Linux` `+ Docker` `+ GitHub` `- Git`

### 游戏

- PC & VR 玩家
- SteamVR - Valve Index
- Steam, Uplay, Origin, Epic, Xbox for PC 都在用
- 讨厌那些不在地球上的服

> 2022-04: 去年整了三年 XGPU，今年坐等 Starfield

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

- [Nectar Hive](/nectar-hive)
- [IEM-AXE_P8](/project-axe-p8)
- SONY XBA-H3

## 关于本站

本站创建于 2019 年 10 月，是我的 ~~第四~~ 第五个博客（内容全部清除算一次）
目前从 Hexo 迁移到自己设计的 Urara，站点部署在 ~~Cloudflare Workers Site~~ Vercel。

依赖项：

- 前端框架：Svelte / SvelteKit
- Markdown 预处理器：MDsveX / Remark / Rehype
- CSS 框架 / 组件库：~~WindiCSS~~ TailwindCSS + DaisyUI
- 代码高亮：~~Shiki~~ Shiki Twoslash

时间线：

- 2015-09: 第一个博客，使用 WordPress | destroyed
- 2017-08: 第二个博客，使用 ZeroNet | unknown
- 2018-01: 第三个博客，使用 Typecho - typecho-theme-material | destroyed
- 2018-03: 第四个博客，使用 Hexo - hexo-theme-material | destroyed - 已转移部分文章
- 2019-10: 第五个博客，使用 Hexo - 写了 hexo-theme-m | blog.917.moe
- 2020-08: 重写 hexo-theme-m | kwaa.dev
- 2021-10: 博客重构，在 MDsveX & SvelteKit 的基础上写了 Urara | kwaa.dev

还有什么要做的吗？

- 更换 .ai 域名
  - 我很早就想换成 .ai 域名了，但因为价格较高且不好起名字所以目前没换。
- ENS/IPFS 分站
  - 接上一条。xxxai.eth 或 xxxai.eth.link
  - 主网这 gas 看样子是降不下来了

## 友链申请

大体沿用之前的友链标准：

请先让我知道你想要交换友链，确认后互相添加。

- 先友后链：与我有过至少一次交流
  - 不管在哪里和因为什么，只要我回复了就算。
- **没有 ICP 备案号，不是 .cn 或其他中国特色域名**
  - **非常重要。**萌国 ICP 之类由于不具备实际作用，不在此条“备案号”的范围内。

关键的就上面这些了。那么需要的数据格式：

```ts
export type Friend = {
  id: string // HTML id
  link?: string // 网站 URL
  html?: string // 自定义模板，可选
  title?: string // 网站标题
  name?: string // 用户名
  avatar?: string // 头像，可选
  descr?: string // 描述，可选
  class?: {
    /** online / offline 样式用于显示在线状态，一般不会加。 */
    avatar?: string // 可供自定义的头像类名（默认模板）
    /**
     * 通常来说：
     * rounded-full 圆形头像
     * mask mask-squircle 超椭圆头像
     * mask mask-hexagon 六边形头像
     * mask mask-triangle 三角形头像（不会真有人想用这个吧）
     * ring ring-primary ring-offset-base-100 ring-offset-2 头像外环，一般不会加。
     */
    img?: string // 可供自定义的图片类名（默认模板）
  }
}
```

或者... 自由发挥！

提供一块和默认排版一样的空间，在**不影响观感且我能接受**的前提下自由使用 HTML 标签和 WindiCSS / DaisyUI 类名。

- 只能是类名，不能是 CSS / JS
- 可以通过 `data-theme="name"` 强制设置 daisyUI 主题，但我不保证主题一直有效（随时可能修改或删除主题且不会通知）
- 图片 / SVG 最多三张，图片必须带 loading="lazy"
- 嵌套不能过于复杂

对于这类友链，我提供了一个 [Tailwind Play](https://play.tailwindcss.com/0AHHfFWTgL) 用于二次修改，内含一个默认组件（可能不会及时更新）。

然后是本站的信息：

```ts
export const kwaa: Friend = {
  id: 'kwaa',
  link: 'https://kwaa.dev',
  title: './kwaa.dev',
  name: '藍' || '藍#+85CD',
  avatar: [
    'https://kwaa.dev/assets/any@512.webp' // 头像面积不大时使用，分辨率可选 192/512/1024
    'https://kwaa.dev/assets/maskable@512.webp' // 头像面积较大时使用，分辨率可选 192/512/1024
    'any@base64: 见下' // 24px，几乎不拖累加载速度；但需要 style="image-rendering:pixelated" 或 class="image-render-pixel"
  ],
  descr: '[DATA EXPUNGED]',
}
```

[any@base64-无背景](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAVFBMVEUAAADW29T///+5wcc4ODjz8OZVVVX/7MkVFRXtrpqTJiVHKxPZOjr/+/QICz3/07d1TCNErbkaSXtgERn59vb//OPSzMzuuwKZne20srL0mIyWGwWygNgKAAAAAXRSTlMAQObYZgAAAOtJREFUKM9djwuSwyAMQ2vsBDBJyK/tfu5/z5W6aYZUMB7QQwZuhwIkwnq7KIgqTFQJV3/USQX+OoE0fqfLIh0kCtKC31VGEEGqBezdydixfAARnNeRKZDmClE4mFE/gAKpTjFOcgEde01fa4wrDjRAlGNf7vdF5QKEzSJUCRpftmFwrbW6vEGYXwEzHzi2BvCF1ve9/7hvDSgqBJYQeHxrA4oqAskA9ocpwUkIkrvbnppvlNnMUkn+9B4r+CdAAACVM5yJnBnA9U+8wCzncPgRynP6V+WGIQZyzMWspwzrTEASSi4F/kHCy/4DaDYJuEU/v5oAAAAASUVORK5CYII=)

[any@base64-有背景](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAUVBMVEUICz3W29T///+5wccaSXtErbk4ODjz8OZVVVX/7MkVFRXtrpqTJiVHKxPZOjr/+/T/07d1TCNgERn59vb//OPSzMzuuwKZne20srL0mIyWGwVwQ6mkAAAA9UlEQVQoz1WOCbLDIAxDMQYngMna9i/3P2hlGjpEMB7QQzbukoeIrLqbPDHDRCV/91d2TPCDAxn8iWOkCSIGGcF/oBWEkBqB9Z5onazcAfrjPa+WAhlGEMPBTtxBCMEAAzG7lBwBwLzAZL3cT0gp4MEAiG2d8fGITDdA1ixBWweXT8eyKG/bptSB31tARBdbxwDshzLPs/6pHgOoTAYkI/D85Q6ir5UZgSwA51MYIMboopEGsqrKmRl+B7uI5Jr1pTNO8L8AAQBU2/6bKMUCGP/CD0RKaTPgJ6js+aPNLggZKCWVKjKbBOcC0Fr5WmqFfxHfhrwBRawLyITR1qYAAAAASUVORK5CYII=)

交换友链即代表你已知悉并理解：

- 本站**涉政**。
  - **Politics is everywhere.**
- 本站作为 Urara 的试验台，随时可能有无法访问，但通常不会持续很久。

## 捐赠

如果你想。

- ETH/xDAI/BSC: 0xaBdB3f715198A4d7e6591b6ebBE8Ccf235e5D752
  - 唯一指定钱包地址，建议使用 xDAI（因为 gas 费低）
- XMR: 4BBo16A619wCSWS4rsS2gMihjfhi4nTLdabTAwadJFVoBrGU3qhn6kRXSHmBXXfgURJa5mngD5QekDnNkUPhprGv2VwVPqA
  - 基本没在用，最好先跟我说一声

## 留言板

那么下面是留言板。
