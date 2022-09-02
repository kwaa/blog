---
title: 'RE:Introducing Urara'
created: 2022-04-12
tags:
  - Urara
  - SvelteKit
  - MDsveX
  - TailwindCSS
image: /intro-urara/re.webp
summary: 去年的 Introducing Urara 感觉没写好，索性就重新介绍一下吧。
---

去年的 [Introducing Urara](https://kwaa.dev/intro-urara) 感觉没写好，索性就重新介绍一下吧。

## 缘起

玩自建博客也有些年头，不过我开始写主题是从 Hexo 开始了。

从瞎改 Hexo-Theme-Material 起步，到基于 MDUI 的 Hexo-Theme-M；大概 2020 年底开始我打算自己写一个博客生成器，打算用 Sapper + TailwindCSS。

就这么来到了 2021 年三月：正好赶上 SvelteKit 发布，打了点基础疯狂摸鱼，之后基于 daisyUI 重写界面... 直到十月基于 Urara 的新博客正式部署。

之后？之后当然是持续更新了，翻回去年的版本比较的话一眼就能看出来区别很大。

## 简介

Urara 是一套 **2022** 年的博客启动模板，在已有依赖项全部优点的基础上提供了简洁现代的界面和动画、出色的 IndieWeb 兼容性和免于分离静态文件夹的文件管理。

## 技术栈

在 2022 年它们... 依然很时髦！

虽然确实说不上新了（特别是当我换回 PostCSS + TailwindCSS），但显然 95% 以上的静态博客都还在用传统生成器。

### SvelteKit + TypeScript

在那个时间点上确实没什么好选的，我选了 Sapper 并在真正开坑的时候迎来了 SvelteKit 第一个公开测试版，就是这样。

Svelte 和 TypeScript 的组合足够时髦，同时也彻底甩掉了 Hexo 的包袱（以及生态）。当时我只是想着没用过 TS 正好试试，但确实也拖累了一些加载性能。

现在？现在有了 Astro 这么个神奇玩意——部分水合（Partial Hydration）真的太香了！

不过我目前不考虑移植到 Astro，除非 SvelteKit 到 1.0 还不出部分水合。

#### MDsveX

MDsveX 是 Svelte 的 Markdown 预处理器。

它能够转换 Markdown 并利用 Remark / Rehype 生态的插件，同时带来 MDX 支持。

MDX？Markdown for the component era（组件时代的 Markdown），也就是说可以直接在 Markdown 文档里写 Svelte（并充分利用原子化 CSS）。

自由度非常高！比如这是一个简单的计数器：

> daisyUI 提供的 countdown 样式，按到 99 以上就不显示了。

<script>
	let count = 0
	const click = () => count += 1
</script>

<button class="btn gap-1" on:click={click}>
	clicks:
  <span class="countdown">
    <span style="--value:{count}"></span>
  </span>
</button>

```html
<script>
  let count = 0
  const click = () => (count += 1)
</script>

<button class="btn gap-1" on:click="{click}">
  clicks:
  <span class="countdown">
    <span style="--value:{count}"></span>
  </span>
</button>
```

### PostCSS + TailwindCSS

我一开始就准备用 TailwindCSS，但很快就在 [svelte-add](https://github.com/svelte-add/windicss) 里认识了 [WindiCSS](https://windicss.org)：它更快，（不考虑插件的情况下）更好，还有很 cool 的 Attributify Mode。

所以 Urara 从大概四月开始是基于 WindiCSS 的，随后五月就出现了个 [惊天 bug](https://github.com/windicss/vite-plugin-windicss/issues/167)，我也索性摸鱼了一两个月；随后就是缓慢开发直到八九月决定用 daisyUI，这才算是正式起步。

随着我用到的 daisyUI 组件越来越多，问题也随之而来：WindiCSS 的 Transform API 很多毛病，像什么 button hover / tooltip 都得我手写 CSS 修复。2022 年初我实在受不了了，索性换回 TailwindCSS。

TailwindCSS 也有不少缺点：

- （截至 2022 年 4 月）不支持纯 ESM 配置文件
  - 我实在讨厌在 `.js` 文件的目录里出现 `.cjs`，所以通过 Vite 直接调用 ESM 文件。
  - 这直接导致 VSCode 里 Tailwind CSS IntelliSense 打开就弹窗——因为 Tailwind 本身不支持 ESM 所以它也不支持，suck。
  - 即使这样我还是完全不想看到 `.cjs` 所以没打算改回去
- 大部分 Utility Class 比起 WindiCSS 自由度较低
  - 比如说字体大小，WindiCSS 可以用 `text-12xl`，Tailwind 最高只到 9xl
  - 基本遇到个比较特殊的值就得用方括号
  - JIT 出现之前遗留下来的毛病，很可能不会改进了
- 需要 PostCSS
  - PostCSS 在我眼里特别鸡肋。

但由于 Urara 已经和 daisyUI 深度绑定，基本算是回不去了——希望有朝一日能换成 UnoCSS 吧。

#### daisyUI

非常好的 UI 库，组件丰富并且多主题。

其他似乎没什么值得评价的了，非要说的话文档里某面红底旗子非常碍我眼。

> uBlock Origin 为什么是神

### Shiki Twoslash

Shiki 与 Urara 的契合度并不是很好，但它本身确实没什么可挑的。

我认为这就是当下最好的语法高亮，特别是换了 Shiki Twoslash 以后。举个例子：

```ts twoslash title="$lib/config/site.ts" {19}
export type SiteConfig = {
  /** site protocol. for example: `https://` */
  protocol: string
  /** site domain. for example: `example.com` */
  domain: string
  /** site title. */
  title: string
  /** site subtitle. */
  subtitle?: string
  /** site lang. `<html lang={site.lang}>` */
  lang?: string
  /** site description. `<meta name="description" content={site.description}>` */
  descr?: string
}

export const site: SiteConfig = {
  protocol: 'https://',
  domain: 'kwaa.dev',
  title: './kwaa.dev',
  lang: 'zh',
  descr: '[DATA EXPUNGED]'
}
```

看来它并不能识别 TSDoc，但可以显示类型和高亮！

遗憾的是一些 Twoslash 功能目前并不可用（比如 `---cut---`），这就是上面我说 “契合度并不是很好” 的原因了。

## 功能

### IndieWeb 支持

Urara 全面支持 IndieWeb 生态。在我看来这比起区块链更像是所谓的 Web 3.0，可惜本身过于小众以至于我最近才真正了解它。

#### RelMeAuth

RelMeAuth 可以让你通过网站的 `rel="me"` 链接进行验证，并以自己的域名登录一些支持这一方式的网站。（比如 [webmention.io](https://webmention.io)）

目前它在 Urara 的实现方式是这样：

```html
<link rel="me" href="https://github.com/kwaa" />
<link rel="me" href="https://kwaa.moe/@kwa" />
```

#### Post Kinds + microformats2

帖子全部以 microformats2 格式标记并支持多种 [IndieWeb 帖子类型](https://indieweb.org/posts)：

- 📔 笔记 / note
- 📄 文章 / article
- 📷 照片 / photo
- 💬 回复 / reply

只需要在 Front Matter 中设置 `layout` 为相应值即可。

```md title="/urara/intro-urara/re.md" {2}
---
title: 'RE:Introducing Urara'
layout: 'article'
tags:
  - Urara
  - SvelteKit
  - MDsveX
  - TailwindCSS
descr: 去年的 Introducing Urara 感觉没写好，索性就重新介绍一下吧。
---

去年的 [Introducing Urara](https://kwaa.dev/intro-urara) 感觉没写好，索性就重新介绍一下吧。
```

其他不支持的类型是因为没想好界面设计，同时也欢迎提出建议。

#### Webmention

Webmention 是一个稍有门槛的 W3C 标准，用于跨站交互（而不仅限于评论）。

目前 Urara 可以通过 [webmention.io](https://webmention.io) 提供的服务接收和展示各种类型的 Webmention（评论 in-reply-to、喜欢 like-of、转贴 repost-of、收藏 bookmark-of、提及 mention-of 和 rsvp？），并提供一个手动发送表单和通过 [commentpara.de](https://commentpara.de) 进行匿名互动的链接。

> [点这里到下面试试](#post-comment)

> 理论上也可以获取来自 Twitter 的提及，但由于我目前不使用 Twitter 而无法测试。

#### 迈入联邦宇宙

想要更多？Urara 内置 [Bridgy](https://brid.gy) 和 [Bridgy Fed](https://fed.brid.gy) 配置，通过简单设置就可以将帖子联合发布到 Fediverse、Twitter、GitHub 与 Flickr。

还是简单介绍一下吧：Bridgy 通过连接已有账号来将博客文章发布到目标网站，并把目标网站用户的反应转换回 Webmention 以显示在博客。

Bridgy Fed 则更加高级：它不需要 Fediverse 账号，直接通过重定向 /.well-known/ 目录把网站本身作为 Fediverse 实例。

显而易见的是作为静态网站加入联邦宇宙或多或少会有些缺陷，Bridgy 兼容性较好但功能不如 Bridgy Fed，Fed 目前似乎只兼容 Mastodon。（不支持 Pleroma [[#12](https://github.com/snarfed/bridgy-fed/issues/12), [#122](https://github.com/snarfed/bridgy-fed/issues/122)]，Misskey 我没有测试）

缺点摆在这里了，但优点也非常明显：

- 零服务器成本
- 美观且能够充分自定义的 UI
- 利用所有来自上游的功能如 MDX / Twoslash

> 目前我的博客文章使用 Bridgy 发布到 [@dotdev@kwaa.moe](https://kwaa.moe/@dotdev)，提及、转嘟、回复和 Emoji Reactions （也叫 reacji) 以外的喜爱/收藏都会被同步。

<!-- > 在这里试试？ -->

### All In One 目录

MDsveX 有个缺点就是文章要放进 `/src/routes` 目录里，不然就得自己想办法写调用函数。

而图片又得放到 `/static` 目录，那么有什么办法能把它们塞一起吗？

有，我写了一个 `urara.js` 脚本来把 `/urara` 文件夹下的内容根据扩展名自动复制到 `/src/routes` 和 `/static` 两个目录；它有开发和构建两种模式，开发时会监听文件夹变化并自动复制，构建时则是一次性复制。

缺点是暂时不能同时使用 `/src/routes/xxx/yyy.svelte` 和 `/urara/xxx/zzz.svelte.md`，我打算在 RC 版本解决这个问题。

> 但只要都塞到 `/urara` 文件夹不就没有问题了吗？

顺便一提它使用了 Vite 同款的 `chalk` 为输出信息上色，所以看起来非常和谐。

```js
const log = (color, msg, dest) =>
  console.log(
    chalk.dim(new Date().toLocaleTimeString() + ' ') +
      chalk.magentaBright.bold('[urara] ') +
      chalk[color](msg + ' ') +
      chalk.dim(dest ?? '')
  )
```

### Front Matter 自动填充

我写了一个 Remark 插件来做这件事。

默认会自动生成 `slug`、`path` 和 `toc`，重命名 `{date, lastmod}` 为 `{created, updated}`（遗留问题，过一两个月就清理掉），从 `fs.statSync()` 自动填充创建和修改时间，并为没有 layout 的帖子设置 `layout: article`。

```js
const remarkUraraFm =
  () =>
  (tree, { data, filename }) => {
    const filepath = filename.split('/src/routes')[1]
    let { dir, name } = parse(filepath)
    if (!data.fm) data.fm = {}
    // Generate slug & path
    data.fm.slug = filepath
    data.fm.path = join(dir, `/${name}`.replace('/index', '').replace('.svelte', ''))
    // Auto-set layout as article
    if (!data.fm.layout) data.fm.layout = 'article'
    // Generate ToC
    if (data.fm.toc !== false) {
      let [slugs, toc] = [new Slugger(), []]
      visit(tree, 'heading', node => {
        toc.push({
          depth: node.depth,
          title: toString(node),
          slug: slugs.slug(toString(node))
        })
      })
      data.fm.toc = toc
    }
    // Rename {date, lastmod} to {created, updated}
    if (data.fm.date) data.fm.created = data.fm.date
    if (data.fm.lastmod) data.fm.updated = data.fm.lastmod
    // Auto-read created & updated
    if (!data.fm.created || !data.fm.updated) {
      const { ctime, mtime } = statSync(new URL(`./urara${filepath}`, import.meta.url))
      if (!data.fm.created) data.fm.created = ctime
      if (!data.fm.updated) data.fm.updated = mtime
    }
  }
```

### 主题 / 评论偏好记忆

在没有手动切换主题时，默认跟随系统在 Light / Dark 两个基本主题中选择。一旦切换主题它就会被储存到 localStorage 中，下次进入网站自动读取。

### 配件完整

虽然这算不上什么功能，不过没什么好写的我还是把它写进来了。

从一开始就有 [Atom Feed](/atom.xml) / [Sitemap](/sitemap.xml) / [Web app manifest](/manifest.webmanifest) / Service Worker 全家桶，并在后续更新中带来了 WebSub（曾用名 PubSubHubbub）（起这个名字的多少是有点大病）支持。

之后？之后我打算把 ServiceWorker 改改（比如换成 `vite-plugin-pwa`）并增加 JSON Feed。

## 设计

Urara 是为一个**随意**的博客而设计的。

随意就是每篇文章我不一定会想放一张封面（没有就是没有，用随机图片多少有点意味不明），不一定会写一些描述，但在这个基础上它不能太难看。

### 克制

它在屏幕空间和色彩的使用上都很克制。手机就是相当简洁的纯色，电脑也只多了一层卡片；很多鲜艳的颜色都要鼠标或拇指按上去才会显示。

文章页面只有文章和目录，不会有什么最近文章、相关推荐、分类、标签之类的东西占据视线。干净！

Theme-M 时期的汉堡包彩蛋也不打算继承，取而代之的只是一个简洁够用的导航栏。

非要说有什么不满意的也就是主页那些旧组件了，始终没有好的灵感。

### 细节

Urara 有不少设计细节：像是分页器如果两个都没有配图会显示分隔线，其中一个配图会有圆角；或是 FAB 图标在页面滚动超过 97% 后也会变成主色。

不过这倒也确实不值得费太多字，所以本文就到这里了。

## 开始使用

...[阅读文档](https://urara-docs.netlify.app/zh/index.html)。

## 后记

诚招 Contributor，可以先看看下面有没有感兴趣的：

- 文档：正體中文，English，日本語
- PWA（换成 vite-plugin-pwa）
- 图片预处理
- 界面设计

或者任何建议，只要我觉得有用就会采纳。
