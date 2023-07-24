---
title: '2023 年 7 月：我最近在写什么'
created: 2023-07-23
summary: 写了不少东西，但是感觉都不太能单独出一篇 Introducing，所以就有了这篇文章。
---

写了不少东西，但是感觉都不太能单独出一篇 Introducing，所以就有了这篇文章。

## FFF Flavored Frontmatter 1.0

[GitHub](https://github.com/importantimport/fff) [文档](https://fff.js.org)

经过一年的迭代，FFF 终于 1.0 辣！所以我把它放在第一位。

这是什么？这是一套为静态博客生成器准备的 Frontmatter 变量定义。

### 用例

> 这里演示的是 FFF 的转换功能。

假设我有一个 Hexo 博客，而现在准备将它迁移到 Urara（或其他兼容 FFF 的博客框架 / 模板）。

这些文章的 Frontmatter 像这样：

```yaml
title: '构思——又一个博客生成器「Urara」'
date: 2021-05-11 16:14:00
updated: 2021-08-18 11:31:00
comment: true
categories:
  - 折腾
tags:
  - Svelte
  - SvelteKit
  - WindiCSS
thumbnail: https://kwaa.dev/p/urara/urara.webp
```

由于 [Hexo 本身的预定义参数](https://hexo.io/zh-cn/docs/front-matter.html)不是很完整，其中一些是主题自行设置的。

Urara 在 `mdsvex.config.ts` 中导入了 Remark FFF:

```ts
import remarkFFF from 'remark-fff'

remarkPlugins: [
  [
    remarkFFF,
    {
      presets: [],
      target: 'mdsvex'
    }
  ],
  ...,
],
```

这里安装 `fff-transform-presets` 包，使用其中的 Hexo 预设，并编写一个将 `thumbnail` 转换为 `image` 的简单预设：

```diff
import remarkFFF from 'remark-fff'
+ import { hexo } from 'fff-transform-presets'

remarkPlugins: [
  [
    remarkFFF,
    {
-     presets: [],
+     presets: [
+       hexo,
+       { image: 'thumbnail' }
+     ],
      target: 'mdsvex'
    }
  ]
]
```

它会处理所有文章的 Frontmatter，而不需要一个个手动修改。

不过是不是还忘了什么？对了，我之前的博客使用 `https://kwaa.dev/p/*`，而不是现在的 `https://kwaa.dev/*`。

所以现在改成一个复杂一些的预设，它将自动删除图片路径中的 `/p`：

```ts
import remarkFFF from 'remark-fff'
import { hexo } from 'fff-transform-presets'

remarkPlugins: [
  [
    remarkFFF,
    {
      presets: [
        hexo,
        {
          image: ({ thumbnail }) =>
            thumbnail?.startsWith('https://kwaa.dev/p/')
              ? 'https://kwaa.dev/p/urara/urara.webp'.replace('/p/', '/')
              : thumbnail
        }
      ],
      target: 'mdsvex'
    }
  ],
  ...,
],
```

就是这样！

## Shiraha

[GitHub](https://github.com/importantimport/shiraha) [文档 & 演示](https://shiraha.js.org/)

用无类 CSS 创建 Material Design 3 组件的尝试。

体积在同类库里算是比较大的，但相对实现的东西也更多。

现状是在根据子项目的需求来写对应样式。

### Lume Theme Shiraha

[GitHub](https://github.com/importantimport/lume_theme_shiraha) [文档 & 演示](https://lume.shiraha.js.org/)

为以后本站再次迁移准备的博客主题，目前完成度不高。

## A2C / A2Z

[GitHub](https://github.com/importantimport/a2)

Aria2 的 JSON-RPC 客户端和网页前端。由于后者没怎么写，在这里就先跳过吧。

A2C（JSON-RPC 客户端）本身的实现很优雅，只用到了作为 JSON-RPC 协议实现的 `async-call-rpc` 和 Fetch, Event 等平台无关 API。

它的大部分代码都是不会被打包的类型定义，包括了所有 JSON-RPC 接口和大部分设置项（及对应 TSDoc 文档）。

在 pkg-size，它打包后的体积是 3.6KB gzipped（包括依赖），优于其他同类库：

- [a2c@0.1.2 - 3.6KB gzipped](https://pkg-size.dev/a2c)
- [aria2@4.1.2 - 79KB gzipped](https://pkg-size.dev/aria2)
- [aria2c@0.0.6 - 4.7KB gzipped](https://pkg-size.dev/aria2c)
- [libaria2@1.0.95 - 23KB gzipped](https://pkg-size.dev/libaria2)
- [maria2@0.3.0 - 5.5KB gzipped](https://pkg-size.dev/maria2)

甚至针对特殊用例（比如要使用 WebSocket），你还可以自己实现 `async-call-rpc` 的 EventBasedChannel 并复用 A2C 的类型定义。

这样打包后 A2C 本身将是 0KB。是不是很不错？

## 小项目

由于没什么可说的，我尽量一句话带过：

### Seia

[GitHub](https://github.com/importantimport/seia) [演示](https://seia.js.org/)

用于展示 Webmention 的组件。发布为 Web Components，因此与框架无关且易于使用。

### MCU Extra

[GitHub](https://github.com/importantimport/mcu-extra) [文档](https://importantimport.github.io/mcu-extra/mcu-extra.html)

`@importantimport/material-color-utilities` 的续作，作为附加模块发布。

包含了之前就有但上游仍未修复的 bug 修复补丁，以及抢先体验 Tone-based Scheme。

### FRWR

[GitHub](https://github.com/importantimport/frwr)

灵感来自 [maxboeck/webring](https://github.com/maxboeck/webring) 的 Webring 模板，使用 Deno Fresh。

### Kagaya

[GitHub](https://github.com/importantimport/kagaya)

免构建静态博客的一个尝试，在浏览器上构建 Lit 组件，以 AFFiNE 作为 CMS。

~~样式懒得写了，所以现在还是 No-CSS~~

### Comet

[GitHub](https://github.com/kwaa/comet)

基于 Docker Compose 的旁路网关套件，使用 Naiveproxy, HAProxy 和 sing-box。

## Lume

我现在是 Lume Member，写了 UnoCSS 和 TOML 插件，为 JSON 插件添加 JSONC 扩展，以及支持 YAML / TOML 格式的 Frontmatter。

## One More Thing... Hatsu!

[GitHub](https://github.com/importantimport/hatsu)

我一直有这个想法，不过到现在才创建这个项目。

叫 Hatsu（初）的原因是，这是我的第一个 Rust 项目，也是我的第一个 ActivityPub 项目。

它的最终目标是用 Rust 全家桶把 Bridgy Fed 重新实现一遍，并使用 Feed 而不是 Webmention 来检测更新。

想象一下：在搭建 Hatsu 实例以后，只需要设置 `./well-known/*` 跳转即可将你的静态博客同步到 Fediverse，使用现有域名作为账号（例如 `@kwaa.dev@kwaa.dev`），并且全自动保持更新。如果你还能设置 `rel="alternate"`，还可以从 Mastodon 客户端通过原文链接搜索到对应 Fediverse 帖文。

如果你也想参与：欢迎加入！可以通过本文评论区或 Matrix 联系我。
