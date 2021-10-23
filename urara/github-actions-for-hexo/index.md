---
title: 'Hexo 流水线 & 相关'
date: 2020-08-17 05:35:00
categories:
  - 笔记
tags:
  - PWA
  - Progressive Web Apps
  - Instant View
  - Github Actions
  - Hexo
  - CI/CD
---

去年只有一个 yaml 的文章居然追加了这么多内容？不管怎么样，能多写点东西我是很高兴了。

<!-- more -->

## 301 跳转

这个博客之前的域名是 [https://blog.917.moe](https://blog.917.moe)，现在换成了 [https://kwaa.dev](https://kwaa.dev)。
怎么让旧链接跳转呢？我写了一个 Worker 来做这件事。
这里要吹一波 Cloudflare，CDN 和 Worker 都可以免费使用。
虽然原域名过两个月就到期了，能用一会是一会吧。

```js
addEventListener('fetch', event => {
  let url = new URL(event.request.url)
  const redirectTo = 'kwaa.dev'
  url.hostname = redirectTo
  event.respondWith(Response.redirect(url, 301))
})
```

## PWA

去年还是 manifest.json，今年就变成了 manifest.webmanifest。
新的 maskable_icon 我肯定要用，其他貌似没太大变化？
和上次一样，[manifest](https://github.com/kwaa/kwaa.github.io/blob/master/source/manifest.webmanifest) 和 [sw.js](https://github.com/kwaa/kwaa.github.io/blob/master/source/sw.js) 都是我自己写的，没用那些乱七八糟的插件。不过图片缓存不知道为什么无效？以后再改改看吧。

## Instant View

我经常用 Telegram，当然也想让自己的博客能兼容 Instant View。
不过实际上应该说是 Instant View 兼容我的博客？
总之 Theme M 需要写的部分不是很多，下面是本站的模板文件。

```plain
~version: "2.1"
body:    //article
cover: $body//div[has-class("mdui-card-media")]//img
channel: "@kwaachannel"
@remove: $body//a[has-class("mdui-btn")]
@remove: $body//a[has-class("mdui-card-primary-title")]
@remove: $body//div[has-class("mdui-card-primary-subtitle")]
```

在 [My Templates - Instant View](https://instantview.telegram.org/my) 创建新模板，标记十个或更多 URL 后即可提交。

## Gulp & Github Actions 自动部署

kwaa.dev 的配置加入了 gulp ，并且全面更新了依赖版本。
因为 [Theme M](https://github.com/kwaa/m) 设计之初就**没有放在本地的 css,js 文件**，所以也不需要 gulp-clean-css 和 gulp-uglify。

安装：

```bash
npm i gulp -g
npm i gulp gulp-htmlclean gulp-htmlmin gulp-minify-inline
gulp -v
```

在博客根目录创建 gulpfile.js:

```js
let gulp = require('gulp')
let htmlmin = require('gulp-htmlmin')
let htmlclean = require('gulp-htmlclean')
let minifyInline = require('gulp-minify-inline')

// html
gulp.task('minify-html', function () {
  return gulp
    .src('./public/**/*.html')
    .pipe(htmlclean())
    .pipe(
      htmlmin({
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      })
    )
    .pipe(gulp.dest('./public'))
})
// inline
gulp.task('minify-inline', function () {
  return gulp.src('./public/**/*.html').pipe(minifyInline()).pipe(gulp.dest('./public'))
})
// task
gulp.task('default', gulp.series('minify-html', 'minify-inline'))
```

创建 ./.github/workflows 文件夹，并新建 main.yml:

```yaml
name: Build & Deploy ./kwaa.dev
on:
  push:
    branches:
      - master
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Use Node.js 14.x
        uses: actions/setup-node@v2-beta
        with:
          node-version: '14'
          check-latest: true
      - name: Build
        run: npm i -g hexo gulp && npm install && hexo generate && gulp
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GH_TOKEN }}
          publish_branch: gh-pages
          publish_dir: /public
```
