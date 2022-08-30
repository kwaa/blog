---
title: Vite Plugin PWA 的用法和配置
created: 2022-08-30
summary: 这个插件文档确实很难懂，所以我水一篇文章用来记录。
tags:
  - Vite
  - VitePWA
---

这个插件文档确实很难懂，所以我水一篇文章用来记录。

## 前言

本文不使用 `prompt` 模式，仅限于 `autoUpdate`。

为什么？——因为没有必要。基本没什么交互的网站不需要预防丢失用户输入，也就没有提示更新的说法了。不使用 ReloadPrompt 可以显著降低复杂度。

## 安装

```bash
pnpm add -D vite-plugin-pwa workbox-window
```

## 启用插件

```ts title="vite.config.ts"
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [VitePWA()]
})
```

虽然 Vite Plugin PWA 标榜自己是零配置（Zero-config），但实际使用的时候往往不太可能真的不写配置：具体配置会在下面提到。

## 类型定义

在 `tsconfig.json` 或者 `.d.ts` 文件中添加类型定义：

```diff title="tsconfig.json"
{
  "compilerOptions": {
    "types": [
      "vite/client",
+     "vite-plugin-pwa/client"
    ]
  }
}
```

```ts title="vite-env.d.ts"
/// <reference types="vite-plugin-pwa/client" />
```

像 Vitepress 之类也可以不加，只要不报错就行。

## 注册 ServiceWorker

关键代码如下，通过对应框架的方式引入。

```ts
import { registerSW } from 'virtual:pwa-register'

registerSW({
  // 每小时检查一次
  onRegistered: r => r && setInterval(async () => await r.update(), 3600000),
  // 注册失败则报错到 console
  onRegisterError: error => console.error(error)
})
```

参照[文档](https://vite-plugin-pwa.netlify.app/guide/register-service-worker.html)，也可以使用 `injectRegister` 配置项来自动注册，我没用过所以在这里就不细说了。

### SvelteKit

把这段加在 layout 里。

```svelte
<script lang="ts">
  import { onMount } from 'svelte'
  import { browser, dev } from '$app/env'
  import { registerSW } from 'virtual:pwa-register'
  // 非开发环境的浏览器访问
  onMount(() => !dev && browser && registerSW(...options))
</script>
```

### Vitepress

在 `.vitepress/theme` 里新建一个包含上面关键代码的 TS 或 JS 文件，并在 index 里导入。

```ts title=".vitepress/theme/index.ts"
import { inBrowser } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

if (inBrowser) import('./pwa')

export default DefaultTheme
```

### Astro

> 此方式已失效，需要等待 `@astrojs/pwa` 集成或使用旧版本。

虽然没什么用还是记录一下吧...

关键代码写成一个 IIFE 放到一个合适的位置，然后在 head 里调用它。

```ts title="src/scripts/pwa.ts"
import { registerSW } from 'virtual:pwa-register'
;(() => registerSW(...options))()
```

```html
<script src="/src/scripts/pwa.ts"></script>
```

## 配置

### registerType: autoUpdate

由于我没有使用 `prompt` 方式，这个配置是必须要改的。

```ts
VitePWA({
  registerType: 'autoUpdate'
})
```

### srcDir & outDir

输入和输出文件夹，根据实际使用的框架调整。

```ts
VitePWA({
  // SvelteKit
  srcDir: './build',
  outDir: './.svelte-kit/output/client',
  // Vitepress
  outDir: '.vitepress/dist'
})
```

### manifest

Web App Manifest，配置了这项就会在生成 ServiceWorker 的同时生成一个 `manifest.webmanifest` 文件。

这是我在 [fff.js.org](https://fff.js.org) 中使用的 Manifest 配置，作为例子：

```ts
VitePWA({
  manifest: {
    id: '/',
    name: 'FFF Flavored Frontmatter',
    short_name: 'FFF',
    description: 'Yet Another Opinionated Frontmatter Variable Specs.',
    theme_color: '#fdd835',
    icons: [
      {
        src: 'glowing_star.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any'
      }
    ]
  }
})
```

相信会看这篇文章的都应该知道怎么写 Manifest 了。

### workbox

正如其名，Workbox 配置。

因为自由度很高所以我同样不会细讲，放一个[来自文档网站的缓存配置](https://github.com/antfu/vite-plugin-pwa/blob/main/docs/vite.config.ts)：

```ts
VitePWA({
  workbox: {
    globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,woff2}'],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      },
      {
        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'gstatic-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      },
      {
        urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'jsdelivr-images-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 7 // <== 7 days
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  }
})
```

## 针对 Vitepress 重新生成

如[文档](https://vite-plugin-pwa.netlify.app/frameworks/vitepress.html#build)所说，由于 Vitepress 在构建过程结束时生成页面，所以需要在这之后重新生成 ServiceWorker。

文档网站用了一个不太优雅的[脚本](https://github.com/antfu/vite-plugin-pwa/blob/main/docs/scripts/build.ts)，但我把它重写成了 Vite 插件：

```ts
import { type Plugin, defineConfig } from 'vite'
import { type VitePluginPWAAPI, VitePWA } from 'vite-plugin-pwa'
// vite-rebuild-pwa
const RebuildPWA = (): Plugin => ({
  name: 'rebuild-pwa',
  closeBundle: async () => {
    const config = await resolveConfig({}, 'build', 'production')
    const pwaPlugin: VitePluginPWAAPI = config.plugins.find(i => i.name === 'vite-plugin-pwa')!.api
    if (pwaPlugin && pwaPlugin.generateSW && !pwaPlugin.disabled) await pwaPlugin.generateSW()
  }
})

export default defineConfig({
  plugins: [VitePWA(...options), RebuildPWA()]
})
```
