---
title: '非常简单的Oracle对象存储代理'
date: 2019-11-05 10:10:00
updated: 2019-11-05 10:30:00
comment: true
categories:
  - 笔记
tags:
  - 对象存储
  - Oracle Cloud
descr: 目前可以自定域名和省略 path，后续打算加入防盗链和自定 HTTP 头功能。
---

目前可以自定域名和省略 path，后续打算加入防盗链和自定 HTTP 头功能。

<!-- more -->

食用方式：复制下面全部代码丢到 Workers 里，并修改参数

```js
addEventListener('fetch', event => {
  const host = 'objectstorage.ap-seoul-1.oraclecloud.com' /* 对象存储的hostname */
  const path = '/n/xxxxxxxxxxxx/b/standard/o/' /* 对象存储的pathname */
  let url = new URL(event.request.url)
  url.hostname = host
  if (!url.pathname.startsWith(path)) {
    if (url.pathname == '/') {
      return new Response({ status: 403 })
    } else {
      url.pathname = path + url.pathname
    }
  }
  let request = new Request(url, event.request)
  event.respondWith(
    fetch(request, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
  )
})
```
