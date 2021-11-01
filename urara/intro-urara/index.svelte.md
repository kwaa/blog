---
title: 'Introducing Urara'
date: 2021-09-12 16:14:00
categories:
  - 折腾
tags:
  - Urara
  - SvelteKit
  - MDSveX
  - WindiCSS
---

<script>
  import GitHub from '$lib/components/extra/github.svelte'
</script>

如果你看到这篇文章，就说明我的博客现在已经由 Urara 生成。

## 命名

~~Urara => Urara the name does not inspired from meirochou（Urara 这个名字的灵感不来自迷路帖）~~

实际上是以我喜欢的一个 ADV 游戏角色命名的，但我不说是哪个角色。

> 也可以写作 SvelteKit/Urara。
> 一层层套下来的话实际上是 SvelteKit/MDSveX/Urara，但这样写不好看

## The Zen of Urara / Urara 之道

写到这种程度虽然说不上复杂，但也不怎么简洁了；所以我选的关键词是 **Sweet & Powerful**:

- Sweet: 在结构上符合我的需求。
- Powerful: 基于模式的配置文件，All-In-One 文件夹和好底子带来的自由度

不算开发/构建时生成的 static / build，真正存放数据的文件夹只有两个—— `src` 和 `urara`。

其中 `src` 放配置文件，前端组件，纯函数，主页/错误页等不需要单独文件夹的源码，`urara` 则把页面和文件整理到了一起，在开发/构建时分别复制到 `src/routes` 和 `static`。

我在年初设计的时候觉得要有这些特点：

### 路由简洁

最初设计的还是比较像 Hexo：

```text
/page/title # 页面
/post/title # 文章
/archive # 归档
/categorie/xxx # 分类
/tag/xxx # 标签

# 后来我醒悟了，要这么多功能干什么？

/post/title # 文章和页面
/tag/xxx # 标签

# 然后这是最终版本：

/title # 文章和页面
/?tags=xxx,yyy # 标签筛选
```

没错，非常简洁；标签筛选都直接做进主页了。

### 没有分页器

我很烦这些分页器。分那么多页干什么？有必要吗？
之前分别尝试了 `svelte-infinite-scroll` 和 `@sveltejs/svelte-virtual-list`，但前者用不了 后者不搭 Headroom...
所以目前是在首页直接 each 所有文章。后续版本我可能考虑手写个 Infinite Scroll

### 简短时间

```yaml
date: 2021-09-30 19:29:39
updated: 2021-09-30 20:30:40
```

这种格式看着就头大，我只想保留日期。所以我这么做了。

更新：最后的方案是排序时不裁剪日期，在配置文件增加日期设置。

```ts
export const date: { locales: string; options: Intl.DateTimeFormatOptions } = {
  locales: 'ja-JP',
  options: {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }
}
```

### 把文章放在一起

Hexo 的 source 文件夹结构我不太喜欢。

```text
_data/ # 数据
_drafts/ # 草稿
_posts/ # 文章
  xxx/ # xxx 文章相关的图片
  xxx.md # xxx 文章
xxx/ # 文件夹
  index.md # 页面
  yyy.webp # 子目录文件
favicon.ico # 根目录文件

# 所以我实现出来是这样的：

urara/ # 根文件夹
  xxx/ # xxx 文件夹
    index.md # xxx 文章
  yyy/ # yyy 文件夹
    index.svelte.md # yyy 文章 (包含 Svelte 组件)
  zzz/ # zzz 文件夹
    .index.md # zzz 草稿
  favicon.png # 根目录文件
```

### 实时更改

接上文，所有的资源都是放在 `/urara/` 这个文件夹的。

那么如何让它能用在 SvelteKit 呢？我写了一个脚本 `urara.js` 来做这件事。

```json
 "scripts": {
  "clean": "node urara.js clean",
  "watch": "node urara.js watch",
  "kitdev": "svelte-kit dev --host 0.0.0.0",
  "dev": "npm-run-all -p -r watch kitdev",
  "prebuild": "node urara.js build",
  "build": "export MODE=production && svelte-kit build",
  "postbuild": "node urara.js clean",
 }
```

在 `npm run dev` 的时候实际上同时启动了两个程序（通过 npm-run-all），`svelte-kit dev` 和 `urara.js watch`。

watch 模式下会通过 `chokidar` 监听文件夹的所有更改并反馈到 `/src/routes/ & /static/` 两个文件夹；而在关闭服务时自动删除复制的文件。

build 则分段执行了 `prebuild, build, postbuild` 三个操作，分别是复制 - 构建 - 删除。

所以一般情况下是不会产生多余垃圾的，如果有那就运行一次 clean。

### 界面

一开始是纯自己写的样式，真的丑到一言难尽。

Dribbble 和 Behance 也没少逛，但我就是很难写好看；于是想起来了还有 DaisyUI 这么个库，就拿出来用了。

结果基本上是参考了我的上一个项目 `hexo-theme-m`，改成了真单栏（没有汉堡包菜单） & 有 DaisyUI 的底子要好看一些。

### 扩展性

本来这玩意就是给 Power User 们准备的，本身只是一个博客底子可以尽情折腾。

不过写着写着就不只是个底子了（用了 DaisyUI），但扩展性还是很好（毕竟不是只能用模板语言的静态生成器）。

### 技术栈

我在写的时候就希望尽可能用一些新玩意：

- SvelteKit + Vite + TypeScript
  - 为什么是 SvelteKit? 年初构思的时候我是打算用 Sapper 的，然后没多久 SvelteKit 就出来了。至于 TypeScript：既然能用就没理由不用。
- MDSveX
  - Markdown 预处理器，既然用 Svelte 那也就没什么别的选择。
- WindiCSS + DaisyUI
  - WindiCSS 有更多功能，但配上 SvelteKit 会有些小 bug。（一部分也不算小了... 之前有一次根本无法运行）
- Shiki
  - 没有人能拒绝和 VSCode 一样效果的代码高亮，**没有人**。

### Front-Matter

目前的完整 Front-Matter：

```yaml
title: 一个标题
date: 2021-12-31 # 2021 年 12 月 31 日
lastmod: 2022-01-01 # 最后修改于 2022 年 1 月 1 日
priority:
- 一个标注
- 1
tags:
- 标签1
- 标签2
- 标签3
- 标签64
descr: |
一个简介
```

如果一天能有好几篇文章则以 `date: 2021-12-31 01` 以此类推... 或者不嫌麻烦大可以写完整时间。

紧凑版：

```yaml
title: 一个标题
date: 2021-12-31
lastmod: 2022-01-01
priority: ['一个紧凑的标注', 1]
tags: ['标签1', '标签2', '标签3', '标签5', '标签7', '标签0']
```

## TODO / 待办事项

### urara-extra

目前我博客用的组件并不会全部放到本体（本体自然是越精简越好，毕竟要符合“底子”这个定位），所以筛出来的会整合到 urara-extra 这么一个新仓库。

> 命名参考的是 gnome-extra

### 优化 Shiki 颜色

目前默认是 material-darker，但注释颜色在一部分主题上不太能看清。
我想改成 neutral-content 配 0.5 透明度，不过还是以后再改吧（毕竟麻烦）

### TOC

待定。

### 更高级的代码块

DaisyUI 的 mockup-code 组件可以搞前缀和高亮行，但怎么把它和 Markdown 结合起来是个问题。

高亮行可以参考 slidev 的语法：

````markdown
```ts {2-3|5} ($) # 高亮行 2-3 和 5，前缀 $
- yay -S neofetch
- neofetch
- echo hello world
- echo btw, i use arch
- echo urara
```
````

但我不会写... remark? rehype? 所以有生之年吧。

### i18n

设计的时候我就留了余地：默认文章是 index.md，其他语言可以用 zh.md / ja.md / en.md 诸如此类；
但 SvelteKit 的 i18n 还在设计，于是决定等上游决定完再做。

### 自定义主题 & 跨站点主题

DaisyUI 的主题功能很好，所以我有想法在这上面再扩展一些东西。

提供一个按钮让访问者可以自定义（或复制预设主题）并保存在本地，访问同类博客时自动启用。

不过 Local Storage 和 IndexedDB 都限制域名，所以后者应该是做不了了。

- 虽然可以用 postMessage，但我不喜欢。

### 评论系统

Utterance 无法自定义样式，我更想自己弄一个评论系统。
天坑，而且真写出来的话会另起一个名字。
目前考虑了这么几种方案：

- 索引 GitHub Discussion 相关主题下的评论并展示，用跳转按钮让用户自己评论（我觉得比较实际的）
- 类似 WordPress / Typecho 的填写用户名评论，但 Anti-Spam 很麻烦
- 类似 Disqus 用社交帐号登录，但实现起来很麻烦

## 开源

<GitHub user="kwaa" repo="m" />

没错：这里有一个 GitHub 组件，仿照官方缩略图做的。

### ImportantImport

由于近期可能更换 ID，所以就整了个组织；
为什么叫 ImportantImport? 我也不知道为什么，属于突发奇想。

### 许可证

和去年一样，Urara 以 WTFPL 协议开源。

```text
This work is free. You can redistribute it and/or modify it under the
terms of the Do What The Fuck You Want To Public License, Version 2,
as published by Sam Hocevar. See the COPYING file for more details.
```

### 文档？

也和去年一样，我懒得写文档。
