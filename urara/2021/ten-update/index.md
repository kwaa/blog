---
title: '2021 · 十月 · 博客重构 & 浅谈部署'
date: 2021-10-10
lastmod: 2021-10-17
descr: 我决定在双十这一天发布新博客（虽然又往后推了一周）。
---

我决定在双十这一天发布新博客（虽然又往后推了一周）。
看看都改变了些什么：

## Based on Urara

最直观的一点就是底层从 Hexo 切换到了我自己设计的 Urara。

基于 SvelteKit 和 WindiCSS 能带来相当大的自由度，同时拥有更多动画效果。

> 由于代码需要优化及 globEager 问题，Urara 将于晚些时候开源。

### 前端路由

要说我在用 Hexo 的时候最馋的是什么，那一定是前端路由。

### 去除 /p/

虽然 /p/title 已经够简洁了，但还可以再简洁一点。

通过 kwaa.dev/p/title 访问会被自动跳转到 kwaa.dev/title。

### 下一代图片压缩格式：WebP + AVIF

之前博客里的图片资源是 .png .jpg .webp 混用，非常乱；我想全部转换成 **有损压缩，高压缩比率** 的格式。

于是整成了 WebP + AVIF。

### Cloudflare Workers

现在我的主站是 Cloudflare 全家桶了。

考虑过 Netlify 和 Vercel，但我不怎么喜欢 100G/Month 的流量限制；所以 Workers。

它有每天十万次访问的额度，我认为这限制很难超过——如果超额了我就换成 Pages...

### 部署

考虑到以后还会并行部署到其他地方，我需要一个可以区分模式的部署方法。

由于 SvelteKit 暂不支持 --mode xxx 传递模式，这里我参考了 [jthegedus 的方案](https://github.com/sveltejs/kit/issues/1258#issuecomment-874482104)

所以构建命令是 `export MODE=workers && npm run build`

简单整个三元运算符，当 process.env.MODE === 'workers' 时使用 adapterWorkers, 其他则使用 adapterStatic:

```js
kit: {
  adapter: process.env.MODE === 'workers'
  ? adapterWorkers()
  : adapterStatic({
      pages: 'build',
      assets: 'build',
      fallback: null
    }),
  ...
}
```

创建一个 `.env.workers`，它有以下信息：

> 目前 URL 配置还很乱，之后我会进行调整：site.url 只包含域名，img.prefix 包含 https:// 和 /

```ini
NODE_ENV=production # 生产模式
VITE_DOMAIN_URL='https://kwaa.dev' # 域名
VITE_IMG_PREFIX='https://kwaa.dev/' # 图片前缀
```

再对我的 site.ts 稍作修改：

```ts
const site: Sites = {
  ...,
  url: import.meta.env.VITE_DOMAIN_URL ?? 'https://kwaa.dev',
  ...
}
```

#### 部署到 Cloudflare Workers Sites

安装 wrangler 并生成一个 wrangler.toml。

wrangler 这玩意确实是很奇妙，逼着我用 nvm... 但我并不想用，所以我用 root 安装并切换到 root 账号进行操作。

```bash
sudo npm i -g @cloudflare/wrangler
sudo su
wrangler init --site urara
su - user
sudo rm -rf workers-siteusqTvo
sudo chown user wrangler.toml
```

生成的 wrangler.toml:

```toml
name = "urara"
type = "webpack"
route = ''
zone_id = ''
usage_model = ''
compatibility_flags = []
workers_dev = true
site = {bucket = "",entry-point = "workers-site"}
compatibility_date = "2021-10-17"
```

为什么自动生成的 type 是 webpack? 不管了，能部署就行。

> **把 site 值改为 `{bucket = "./build", entry-point = "./workers-site"}`，然后输入 account_id 进行测试。**

```bash
wrangler config # 设置 Cloudflare API-Key
wrangler publish # 部署
```

#### 设置域名和 GitHub Actions

当然不可能就这样结束——我需要绑定域名，并且用 GitHub Actions 来做这件事。
重新修改 wrangler.toml，这是最终版本：

```toml
name = "urara"
type = "webpack"
usage_model = ''
compatibility_flags = []
site = {bucket = "./build",entry-point = "./workers-site"}
compatibility_date = "2021-10-17"
workers_dev = false
route = "kwaa.dev/*"
```

然后是一套 build.yml。

```yaml
name: Deploy Blog

on:
  push:
    branch:
      - main
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Use Node.js 16.x
        uses: actions/setup-node@v2
        with:
          node-version: '16'
          check-latest: true
      - name: Build
        run: npm i && export MODE=workers && npm run build
      - name: Publish
        uses: cloudflare/wrangler-action@1.3.0
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
        env:
          CF_ACCOUNT_ID: ${{ secrets.CF_ACCOUNT_ID }}
          CF_ZONE_ID: ${{ secrets.CF_ZONE_ID }}
```
