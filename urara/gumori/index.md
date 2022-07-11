---
title: 'Introducing Gumori'
created: 2022-07-11
tags:
  - Astro
summary: 大道至简的博客启动模板。
---

<p class="p-bridgy-mastodon-content hidden">「Introducing Gumori」在发布一个多月后，终于写完了这篇介绍文章！但好像介绍了又好像什么都没介绍——本文通过 Bridgy 发布到 Fediverse。 @blog@ovo.st </p>

> TTS 测试，限时三天

<audio controls>
  <source src="/gumori/gumori.mp3" type="audio/mpeg">
</audio>

在 Gumori 发布一个多月后，终于写完了这篇介绍文章！

但好像介绍了又好像什么都没介绍。

[GitHub - importantimport/gumori](https://github.com/importantimport/gumori)

[Gumori Demo](https://gumori.netlify.app)

## 命名

Gumori 这个命名来自非想天则中帕琪的天气「<ruby>花曇<rp>(</rp><rt>Hanagumori</rt><rp>)</rp></ruby>」，因为不希望太长所以没有<ruby>花<rp>(</rp><rt>Hana</rt><rp>)</rp></ruby>。

## 技术栈

好的，来看看我都做了哪些取舍。

### Astro

在 Astro 发布没多久，我发现以后就一直在吹它的 [Partial Hydration](https://docs.astro.build/zh-tw/core-concepts/partial-hydration/)。

实际使用之后觉得这个特点的确足够强大，但其他缺点也十分明显：

- 自身功能不及 Svelte / SvelteKit
- Astro API 仅 `.astro` 文件下可用
- 缺少路由过渡动画

...所以 SvelteKit 到底什么时候能有这个功能？

还有一点是可以使用几乎任何喜欢的框架进行组件开发，比如 `React/Preact/Svelte/Vue/Solid/Alpine/Lit`；但 Gumori 本身只使用自带的 Astro/JSX 格式。

### ~~UnoCSS~~

~~对于这样一个简洁的模板，需要的是什么？肯定不是直到现在仍然不支持 ESM 配置的 TailwindCSS。~~

~~考虑到各种方面选择了最喜欢的 UnoCSS，遗憾的是目前 Astro 使用 UnoCSS Vite 插件在 production 模式下会不生成样式，我只好用 `@unocss/cli` 暂时凑合一下。~~

Gumori 现在不包含 UnoCSS，仅保留用于兼容 Rehype Pretty Code 的关键样式。

### Rehype Pretty Code

在基于 MDsveX/SvelteKit 架构的 Urara 上用了 Shiki Twoslash，而 Astro 显然不存在 Rehype 代码高亮插件的兼容性问题。

那么 [rehype-pretty-code](https://github.com/atomiks/rehype-pretty-code) 就是我能找到最好的！为什么？因为它支持行内代码高亮。

### PWA + RSS + Sitemap

标配。

由于 Gumori 不再负责生成 webmanifest（写起来真的很麻烦），就全部交给了 VitePWA。

至于 Feed... Astro 目前只有最老的 RSS 集成，我想给它写 JSON Feed 也因为无法获取正文而无能为力。

## 无趣的第一部分

这个项目只是我看功能极为简陋的 WriteFreely 不爽，于是就开始尝试做一个**静态、单用户**竞品。

实际也确实很无聊，所以写完基本功能后我就投入了 Gumori You 的开发。

## 和有趣的第二部分

某天我又认识了一次之前不知道被扔到哪个记忆角落的[无类 CSS 框架](https://github.com/dbohdan/classless-css)。

那么是否可以再简洁一点呢？把仅剩的基础类名也丢掉，只保留语义化 HTML... 答案是可以！

现在看到的 Gumori 就是这一方案的成果了，它和 [new.css](https://github.com/xz/new.css) 搭配的很好。

## 变种 & 新项目预告

翻到 README.md 下面，会发现有一节叫做 **🍴 Variations** 的段落，这里列出了目前 Gumori 的所有变种。

> Gumori You: 等它脱离 WIP 之后我会另外写一篇文章介绍，敬请期待。

由于 Gumori 几乎是 HTML，因此可以基于它制作变种 / 主题并发布，继承良好的 IndieWeb/Microformats 兼容性和 Astro 的所有优点！

新项目？👇

<div class="alert shadow-inner">
  <div>
    <span class="text-lg">❄️</span>
    <div>
      <h3 class="font-bold my-0">importantimport/shiraha</h3>
      <div class="text-xs">A beautiful classless CSS theme/framework with Sugar.</div>
    </div>
  </div>
</div>
