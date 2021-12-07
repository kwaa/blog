---
title: 评论系统迁移 => Giscus & Disqus
date: 2021-12-01
---

时隔两年，我把评论系统从 Utterances 迁移到了 Giscus 和 Disqus。

> 这么点事也能写一篇文章？

因为 Bonus 内容比正文多。

## Utterances => Giscus

一般我也懒得折腾，不过正好赶上换底层，我就连着评论系统一起换了。

- 无损迁移
- 多语言
- 可以添加反应
- 活跃开发

## Disqus

主要是本站基本没什么人留言，所以尝试引入了支持多种方式登录且可以匿名评论的 Disqus。

我禁用了 Tracking 和 Affiliate links。目前 disqus_config 的实现方式未经测试，可能会有 BUG

### 不用 DisqusJS 的原因

1. 比较麻烦
2. 我不认为有必要对大局域网单独优化

## Bonus: 浅谈我的评论实现

目前 post_comment.svelte 导入 $lib/components/comments 下的所有组件，onMount() 后自动加载 localStorage 中 'comment' 的值或配置文件的第一个。

如上所述，通过 TAB 选择评论系统时会写入到 localStorage，下次打开文章时就会默认使用访客偏好的评论系统；当评论只有一个时则不显示 TAB，体验非常好。

## Bonus: 动态颜色方案 (尝试中)

由于本站配色是动态的，所以我也希望 Giscus 也能跟随主题色变化。（嗯，Disqus 就不用想了）

先试试直接在自定义主题里使用变量：行不通。

然后我尝试直接操作 giscus iframe 的 DOM，查到了 [浏览器的同源策略 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)（万恶之源）。

既然父域名相同可以跨域，那就先从自托管 Giscus 开始吧：

### 创建新的 GitHub App

经典操作，我还在用 Gitalk 的时候就整过了。

按这样设置：

> 应用名 / 描述 / 主页随意，回调地址 https://域名/api/oauth/authorized

![GitHub App](/giscus-disqus/github_app.webp)

取消勾选 Webhook，设置 Discussions 权限为读写，然后直接拖到最下面创建。

创建后第一页就是 `App ID` 和 `Client ID`，往下滑生成 `Client secret` 和 `Private key`；私钥会以文件形式下载。

![Client secret](/giscus-disqus/client_secret.webp)

![Private key](/giscus-disqus/private_key.webp)

点开右边的 Install App，为自己需要启用评论的存储库安装，本节完成。

### 部署 Giscus

由于 Netlify/Vercel 的普及，现在要自建这种服务会方便很多。

既然上游用的 Vercel，那我也用 Vercel 好了。

fork 一份并在 Vercel 上导入，Vercel 会自动识别这是一个 Next.js 项目，所以只需要配置环境变量：

> ENVCRYPTION_PASSWORD? 那当然用 [UUID v4](https://www.uuidgenerator.net/version4)

![env](/giscus-disqus/env.webp)

设置域名 CNAME 到 cname.vercel-dns.com，搞定。

### ~~document.domain 篇~~

> 由于浏览器的同源策略更新，我白忙活了。

> MDN [英文](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) 说明了 document.domain 跨域已经无效，但 [中文](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy) 没有。nmd, wsm!

> 所以我决定以后优先查英文版 MDN。

在 /pages/\_document.tsx 加几行：

> 但是得先在 eslintrc 禁用 react/no-unescaped-entities，我算是被这个恶心坏了。

```ts
class CustomDocument extends Document {
  render() {
    ...,
    return (
      <Html>
        <Head>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@laymonage" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://api.github.com" />
          <link rel="preconnect" href="https://avatars3.githubusercontent.com" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="stylesheet" href={themeUrl} crossOrigin="anonymous" id="giscus-theme" />
          <script>document.domain = 'kwaa.dev'</script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

### postMessage 篇

document.domain 不起作用，关注点回到 postMessage 上。

Giscus 的 [ADVANCED_USAGE.md](https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md) 写了通过 postMessage 刷新 Giscus 配置的方式，我觉得可以通过这一方式传递 CSS 变量。

~~但现在的我也不太会改 React/Next.js 源码，于是创建了个讨论 [Idea: custom stylesheets without URL](https://github.com/giscus/giscus/discussions/247) 等作者看到吧。~~

等了半个月，并没有理我。我决定继续自己瞎折腾。

#### useRef

搜了一下，我知道了有 useRef 这么个东西。

就不放折腾过程了（只能说我第二次觉得 Prettier 这么阴间）

/pages/widget.tsx:

> 记得改 /lib/types/giscus.ts 里面的 ISetConfigMessage

```ts
import { ContextType, useContext, useEffect, useState, useRef } from 'react';
...
  const ref = useRef(
    ':root {--p: 259 94.4% 51.2%; --pf: 259 94.3% 41%; --pc: 0 0% 100%; --s: 314 100% 47.1%; --sf: 314 100% 37.1%; --sc: 0 0% 100%; --a: 174 60% 51%; --af: 174 59.8% 41%; --ac: 0 0% 100%; --n: 219 14.1% 27.8%; --nf: 222 13.4% 19%; --nc: 0 0% 100%; --b1: 0 0% 100%; --b2: 210 20% 98%; --b3: 216 12.2% 83.9%; --bc: 215 27.9% 16.9%; --in: 207 89.8% 53.9%; --su: 174 100% 29%; --wa: 36 100% 50%; --er: 14 100% 57.1%}',
  ); // 默认 DaisyUI Light 主题， 加在 useEffect/handleMessage 的前面
  useEffect(() => {
    ...,
    if ('theme' in newConfig) {
      setTheme(newConfig.theme);
      delete newConfig.theme;
    }

    if ('css' in newConfig) { // 如果 setConfig 包含 css
      ref.current = newConfig.css; // 写到 ref.current
      delete newConfig.css;
    }
  ...,
  return (
    <>
      <Head>
        <style type="text/css">{ref.current}</style>
        ...
      </Head>

      <main className="w-full mx-auto" data-theme={resolvedTheme}>
        ...
      </main>

      <Script
        src="/js/iframeResizer.contentWindow.min.js"
        integrity="sha256-rbC2imHDJIBYUIXvf+XiYY+2cXmiSlctlHgI+rrezQo="
        crossOrigin="anonymous"
      />
    </>
  )
```

现在可以在加载后套用主题了，至于怎么在初次加载时设置... 我过段时间再琢磨。
