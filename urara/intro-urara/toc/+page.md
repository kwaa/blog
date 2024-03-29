---
title: 'Urara 的 ToC（文章目录）实现'
date: 2021-12-05
updated: 2021-12-05
tags:
  - Urara
  - SvelteKit
  - MDsveX
summary: 我觉得这部分内容完全可以专门开一篇文章，所以它在这里。
---

我觉得这部分内容完全可以专门开一篇文章，所以它在这里。

由于以前水平不太行，Hexo Theme-M 是个单栏主题；

Urara 的界面本来也是单栏，但实在有点单调就在后续更新里改成了 PC 端三栏（由于我的喜好，两边没有加卡片底色）。

本着没必要就不要往里面放的原则（Profile / 标签列表只在首页有，最新文章和首页功能重复没必要加），想了想右边就只加一个 ToC 吧。

## 清单

要做就尽可能做好！我列了这么几个需求，当它完成时会被标注：

- [ ] 没发现 Bug
- [ ] 美观
- [ ] 支持多 h1
- [x] 支持重复标题
- [ ] collapse
- [ ] 深度超过预设值（默认 H3，可修改）时自动折叠
- [ ] 读取页面滚动状态，自动展开当前标题的父标题

> github-slugger 自动帮我把第四项给做了，可以点击右边 ToC 的几个 "Slugger 测试" 标题试试。

## Remark Plugin UraraToc

我参考 [Getting headings from Markdown files #268](https://github.com/pngwn/MDsveX/discussions/268) 的几个方案写了一个 transformer 插件。

... 说是插件它倒也没上传到 npm，只是几行函数而已。

```js
import { visit } from 'unist-util-visit'
import { toString } from 'mdast-util-to-string'
import Slugger from 'github-slugger'

const uraraToc = () => (tree, file) => {
  if (!file.data.fm) file.data.fm = {}
  if (file.data.fm?.toc === false) return
  const slugs = new Slugger()
  let toc = []
  visit(tree, 'heading', node => {
    toc.push({
      depth: node.depth,
      title: toString(node),
      slug: slugs.slug(toString(node)),
    })
  })
  file.data.fm.toc = toc
}

export const mdsvexConfig = {
  ...,
  remarkPlugins: [uraraToc, ...],
  ...
}
```

它会在 Front Matter - toc 设置为 false 时跳过文章，并为正常文章生成标题列表。

```json
[
  {
    "depth": 2,
    "title": "Slugger 测试",
    "slug": "slugger-测试"
  },
  {
    "depth": 2,
    "title": "Slugger 测试",
    "slug": "slugger-测试-1"
  },
  {
    "depth": 3,
    "title": "Slugger 测试",
    "slug": "slugger-测试-2"
  },
  {
    "depth": 4,
    "title": "Slugger 测试",
    "slug": "slugger-测试-3"
  }
]
```

## 根据深度生成 JSON 树

面向 StackOverflow 参考之后，我还是手写了个 reduce()。

```ts
toc.reduce(
  (acc, heading) => {
    let parent = acc
    while (parent.depth + 1 < heading.depth) parent = parent.children[parent.children.length - 1]
    if (!parent.children?.some(h => h.slug === heading.slug)) parent.children = [...(parent.children ?? []), heading]
    return acc
  },
  { depth: toc[0].depth - 1, children: [] }
)
```

为什么有个 if?
因为我发现退出再点进来会多次生成子标题，关键是我也搞不清楚是什么原因（？？？）就只好加个 if 勉强修掉这个 bug 了。

> 更新：将 children 设为空对象 `parent.children = [...(parent.children ?? []), { ...heading, children: [] }]` 解决了这个 bug。

## ToC 列表

这个比起上面要简单不少，直接递归。
count 记录递归次数，大于 1 时给列表加上 padding-left。

```svelte
<script lang="ts">
  export let toc: Urara.PostToc
  export let count: number
  const { title, slug, children } = toc
  count += 1
</script>

{#if title}
  <a
    on:click={() => document.getElementById(slug).scrollIntoView({ behavior: 'smooth' })}
    class="transition-all hover:text-accent"
    href={'javascript:void(0)'}>
    {title}
  </a>
{/if}
{#if children}
  <ul class:pl-4={count > 1}>
    {#each children as child}
      <li>
        <svelte:self {count} toc={child} />
      </li>
    {/each}
  </ul>
{/if}
```

## 标题高亮

new IntersectionObserver，目标是：

- 多标题同框时全部高亮
- 离开文章区域时全部取消高亮
- 视口没有标题时高亮最后一个激活的标题

尝试了一下传值控制类名，但没用；所以直接操作 DOM。

articleObserver 检测是否在浏览文章并返回布尔值，headingObserver 检测。

```ts
import { onMount, onDestroy } from 'svelte'
import { browser } from '$app/environment'

let intersecting: string[] = []
let intersectingArticle: boolean = true
let bordered: string[] = []

onMount(() => {
  if (browser) {
    if (window.screen.availWidth >= 1280) {
      const headingsObserver = new IntersectionObserver(
        headings =>
          headings.forEach(heading =>
            heading.isIntersecting
              ? intersecting.push(heading.target.id)
              : (intersecting = intersecting.filter(h => h !== heading.target.id))
          ),
        { rootMargin: '-64px 0px 0px 0px' }
      )
      const articleObserver = new IntersectionObserver(article => (intersectingArticle = article[0].isIntersecting))
      Array.from(document.querySelectorAll('main h2, main h3, main h4, main h5, main h6')).forEach(element =>
        headingsObserver.observe(element)
      )
      articleObserver.observe(document.getElementsByTagName('main')[0])
    }
  }
})

onDestroy(() => {
  if (browser) {
    // @ts-ignore: Cannot find name 'headingsObserver'
    if (typeof headingsObserver !== 'undefined') headingsObserver.disconnect()
    // @ts-ignore: Cannot find name 'articleObserver'
    if (typeof headingsObserver !== 'undefined') articleObserver.disconnect()
  }
})

$: if (intersecting.length > 0) bordered = intersecting
$: if (intersectingArticle === false) bordered = []
$: if (browser && bordered)
  toc.forEach(heading => {
    if (bordered.includes(heading.slug)) {
      document.getElementById(`toc-link-${heading.slug}`)?.classList.add('!border-accent')
      document.getElementById(`toc-item-${heading.slug}`)?.classList.add('bordered')
    } else {
      document.getElementById(`toc-link-${heading.slug}`)?.classList.remove('!border-accent')
      document.getElementById(`toc-item-${heading.slug}`)?.classList.remove('bordered')
    }
  })
```

## Slugger 测试

## Slugger 测试

### Slugger 测试

#### Slugger 测试
