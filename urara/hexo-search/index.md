---
title: '本地和 CF Worker 的 Hexo 搜索引擎实践'
date: 2020-10-17 10:17:00
updated: 2020-10-26 15:55:55
categories:
  - 折腾
tags:
  - Hexo
  - Theme-M
---

Theme-M 最近进度不错，就打算把旧版的本地搜索移植过来再加个 Worker 搜索。<!-- more -->

## 用 hexo-generator-search 生成索引

剩下的内容都需要用到它。在 Hexo 目录下用 npm 安装：

```bash
npm i hexo-generator-search
```

然后在站点配置文件 `_config.yml` 写入如下配置：

```yaml
search:
  path: search.json # 生成 JSON 文件
  content: true # 包括文章内容
```

执行一下 `hexo g`，public 目录里出现 search.json 就代表正常工作。

## 本地搜索

还是那么些东西，但我真的很不想在自己的主题里放一个带一大串注释的 search.js，于是索性重新写了一份。
ES6+ 香到我直接不用 mdui.JQ 了。

```html
<form onkeydown="if (event.keyCode == 13) return false" class="mdui-textfield mdui-m-b-2">
	<i class="mdui-icon material-icons">search</i>
	<input
		id="local-input"
		type="search"
		name="q"
		class="mdui-textfield-input"
		placeholder="<%= __('common.search') %>"
		disabled />
</form>
<div id="local-result" style="min-height:100vh; transition: all .4s" class="mdui-list"></div>
<script>
	fetch(
		`<% if(theme.search.local.url) { %><%- theme.search.local.url %><% } else { %><%- url_for('search.json') %><% } %>`
	).then(res =>
		res.json().then(data => {
			document.getElementById('local-input').disabled = false
			document.getElementById('local-input').addEventListener('input', () => {
				let keyword = document.getElementById('local-input').value.trim().toLowerCase()
				document.getElementById('local-result').innerHTML = ''
				if (keyword.length <= 0) return
				data.forEach(({ title, content, url }) => {
					const append = excerpt =>
						document.getElementById('local-result').insertAdjacentHTML(
							'beforeend',
							`
                        <a href=${url} class="mdui-list-item mdui-ripple">
                            <div class="mdui-list-item-content">
                                <div class="mdui-list-item-title mdui-list-item-one-line">${title}</div>
                                <div class="mdui-list-item-text mdui-list-item-two-line">${excerpt}</div>
                            </div>
                        </a>`
						)
					if (content.toLowerCase().includes(keyword))
						append(
							content.substring(
								content.toLowerCase().indexOf(keyword) - 9,
								content.toLowerCase().indexOf(keyword) + 130
							)
						)
					else if (title.toLowerCase().includes(keyword)) append(content.substring(0, 139))
				})
			})
		})
	)
</script>
```

完成。逻辑基本和原来差别不大，但 JS 只有不到 20 行。

## Worker 搜索

灵感来自 [cloudflare workers 实现静态网站全站搜索 - zcmimi's blog](https://blog.zcmimi.top/posts/cloudflare%20workers%E5%AE%9E%E7%8E%B0%E9%9D%99%E6%80%81%E7%BD%91%E7%AB%99%E5%85%A8%E7%AB%99%E6%90%9C%E7%B4%A2)，针对 Hexo 进行了重写。

后来想起来旧主题自己曾经写过一个 Google Custom Search JSON API (以下简称 google-json) 的模板，就有了一个想法：为什么我不能直接拿来用呢？

所以 Worker 后端的目标就是和 google-json 格式一致，并且能处理多个 Hexo 站点的搜索。

### 格式

请求地址：

```plain
https://*.workers.dev/?siteSearch=站点&q=关键字
```

返回 JSON：

```json
{
	"items": [
		{
			"title": "标题1",
			"link": "链接1",
			"snippet": "描述1"
		},
		{
			"title": "标题2",
			"link": "链接2",
			"snippet": "描述2"
		}
	]
}
```

只需要这点内容。

### index.js

那么首先定义一下 json 文件常量和存储，
如果 URL 参数填写了 siteSearch 则直接使用，没有就用对象里第一个值。

```javascript
const file = {
	'kwaa.dev': 'https://kwaa.dev/search.json',
	'https://kwaa.dev': 'https://kwaa.dev/search.json'
}
let data = {}

addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request))
})
```

定义 getdata 和 search 函数，搜索部分我直接把上面本地搜索部分移植了一下。

```javascript
async function getdata(searchSite) {
	await fetch(searchSite)
		.then(res => res.json())
		.then(json => (data[searchSite] = json))
}
async function search(searchTerm, searchSite) {
	searchTerm = JSON.parse('"' + searchTerm.trim().toLowerCase() + '"')
	if (!data[searchSite]) await getdata(searchSite)
	let res = { items: [] }
	data[searchSite].forEach(({ title, content, url }) => {
		const push = content =>
			res.items.push({
				title: title,
				link: url,
				snippet: content
			})
		if (content.toLowerCase().includes(searchTerm))
			push(
				content
					.replace(/<[^>]+>/g, '')
					.substring(
						content.toLowerCase().indexOf(searchTerm) - 9,
						content.toLowerCase().indexOf(searchTerm) + 130
					)
			)
		else if (title.toLowerCase().includes(searchTerm))
			push(content.replace(/<[^>]+>/g, '').substring(0, 139))
	})
	return JSON.stringify(res)
}
```

最后是 handleRequest：

```javascript
async function handleRequest(request) {
	const { searchParams } = new URL(request.url)
	let searchTerm = searchParams.get('q'),
		searchSite
	if (searchTerm == undefined) {
		return new Response('usage:\n\
        ?siteSearch=<site>&q=<keyword>\n\
        required: q', { status: 404 })
	}
	if (searchParams.get('siteSearch')) {
		searchSite = site[searchParams.get('siteSearch')]
	} else {
		searchSite = Object.values(site)[0]
	}
	return new Response(await search(searchTerm, searchSite), {
		status: 200,
		headers: new Headers({
			'access-control-allow-origin': '*',
			'access-control-allow-methods': 'GET,POST,PUT,PATCH,TRACE,DELETE,HEAD,OPTIONS',
			'access-control-max-age': '1728000'
		})
	})
}
```

在页面里显示结果：

```html
<form
	action="servlet"
	method="post"
	onsubmit="return searchAPI(this.searchTerm.value);"
	class="mdui-textfield mdui-m-b-2">
	<i class="mdui-icon material-icons">search</i>
	<input
		id="searchTerm"
		type="search"
		name="q"
		class="mdui-textfield-input"
		placeholder="<%= __('common.search') %>" />
</form>
<div id="api-result" style="min-height:100vh; transition: all .4s" class="mdui-list"></div>
<script>
	function searchAPI(searchTerm) {
		fetch(
			`https://search.kwaa.workers.dev/?q=${searchTerm}<% if(theme.search.api.site !== false) { %>&siteSearch=<% if(theme.search.api.site == '') { %><%= config.root %><% } else { %><%= theme.search.api.site %><% }} if (theme.search.api.key && theme.search.api.id) { %>&key=<%= theme.search.api.key %>&cx=<%= theme.search.api.id %><% } %>`
		).then(res =>
			res.json().then(json =>
				json.items.forEach(({ title, link, snippet }) =>
					document.getElementById('api-result').insertAdjacentHTML(
						'beforeend',
						`
            <a class="mdui-list-item mdui-ripple" href="${link}">
                <div class="mdui-list-item-content">
                    <div class="mdui-list-item-title mdui-list-item-one-line">${title}</div>
                    <div class="mdui-list-item-text mdui-list-item-two-line">${snippet}</div>
                </div>
            </a>`
					)
				)
			)
		)
		return false
	}
</script>
```

所以 Theme-M 可以直接使用 google-json 并修改 url 以支持 Worker 搜索引擎；其他适配 google-json 的 Hexo 主题也可以如此套用，真是太好了。~~但是真的有 Hexo 主题适配这种玩意吗？~~

那么本文在这里结束，欢迎体验 Hexo Theme-M。~~虽然还在更新，但 repo 已经很久不动了~~
