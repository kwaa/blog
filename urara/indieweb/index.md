---
title: IndieWeb, Webmentions
date: 2022-03-19
---

本文参考了：

- [Clientside Webmentions](https://www.swyx.io/clientside-webmentions/)
- [kiko.io | Hexo and the IndieWeb](https://kiko.io/post/Hexo-and-the-IndieWeb/)
- [新增对 Webmention 的支持 - Re:Linked](https://blog.outv.im/2021/webmention/)

我的目标是在能够保持 SvelteKit/MDsveX 这套底子的范围内，尽可能取得最高等级。

先从比较简单的 [IndieWebify.Me](https://indiewebify.me/) 开始吧：

## 成为 IndieWeb 的公民 - Level 1

### 获取自己的域名

跳过。不会还有人没有域名吧？

### 设置 Web Sign In

有两种方式设置域名登录，分别是 head 的 `<link rel="me">` 和 h-card（个人资料）里的 `<a rel="me">`。

这里我选择加在 head，因为塞进 h-card 想好看就要设置图标，非常费事。大概像这样：

```html
<link rel="me" href="https://github.com/kwaa" />
```

添加以后就可以用这个域名登录到 [indieweb.org](https://indieweb.org/) 创建用户页面了。

## 在 IndieWeb 上发布 - Level 2

### 使用微格式（microformats2）标记内容

Urara 现已支持 h-entry 和 h-card。

[验证 h-card](https://indiewebify.me/validate-h-card/?url=https%3A%2F%2Fkwaa.dev%2F) - [验证 h-entry](https://indiewebify.me/validate-h-entry/?url=https%3A%2F%2Fkwaa.dev%2Findieweb)

### 向其他站点发送 Webmentions

我找到的服务有 [telegraph.p3k.io](https://telegraph.p3k.io) 和 [webmention.app](https://webmention.app/)。

此外 [Webmention-developer](https://indieweb.org/Webmention-developer#Sending) 还介绍了一些开源实现，有兴趣可以自行搭建。

我决定使用 Telegraph 手动发送 Webmention。还可以整合 Superfeedr，在 [Telegraph Superfeedr Documentation](https://telegraph.p3k.io/superfeedr) 详细描写了该怎么做。

## 联合 IndieWeb 对话 - Level 3

### 将回复上下文添加到网站

TODO...

### 在网站上接收 Webmention

重头戏来了。我使用 [webmention.io](https://webmention.io/) 托管收集 Webmention 和 Pingback，用上面设置的 Web Sign In 登录。

```html
<link rel="webmention" href="https://webmention.io/kwaa.dev/webmention" />
<link rel="pingback" href="https://webmention.io/kwaa.dev/xmlrpc" />
```

Webmention.io 不像 Giscus, Utterances, Disqus 一样使用 iframe，而是提供 json API。

如果需要，可以在 [这里](https://github.com/kwaa/blog/blob/main/src/lib/components/comments/webmention.svelte) 找到我的 Webmention 实现。

#### 设计

（摸了快两个月的次要原因）
经过几次重写，最后定为类似现在挖孔屏手机的样式：它在不同设备上都能自适应，既有辨识度也好看。

它把内容 `mention.content.html` 以默认的 Typography 样式呈现。

比较值得一提的是彩色边框设计，最常见的 `mention-of` 是加深背景色，`in-reply-to like-of repost-of bookmark-of` 则分别以主色，次色，强调色和中性色呈现。
至于 `rsvp`... 我属实搞不懂这是个什么，就给警告色了。

#### 逻辑

TODO...

## IndieMark

如果说 IndieWebify 是新手教程，那 IndieMark 就是正式开始游戏。

又是一个坑，以后填吧...

## 额外

### Bridgy

Bridgy 可以将个人网站连接到常见的社交媒体。
我目前没有这个需求（毕竟不是英文文章），跳过。

### Bridgy Fed

我做这些事的源动力。
让一个静态网站能加入 Fediverse，简直酷到不行！

我刚开始写 Urara 的时候就有兼容 ActivityPub 的想法，不过研究了一下作为静态网站实在不太可能就放弃了，没想到能以这种方式实现。

#### 重定向 /.well-known/

|     支持     | Netlify | Vercel | CF Pages |
| :----------: | :-----: | :----: | :------: |
| \_redirects  |    √    |   ×    |    √     |
| vercel.json  |    ×    |   √    |    ×     |
| netlify.toml |    √    |   ×    |    ×     |

TODO...

#### 设置 WebSub (PubSubHubbub)

简单来说，在 Atom Feed 里加一行 `<link href="https://HUB URL" rel="hub"/>`，并在每次更新时提醒 Hub 更新。

免费 Hub 有不少，所以我弄了个配置文件以供定制。

然后是提醒，GitHub Pages 和 Netlify 可以直接使用 Webhook。什么？Vercel 没法用？那就附在构建指令里吧：

```bash
pnpm build && curl -s https://pubsubhubbub.appspot.com/ -d 'hub.mode=publish&hub.url=https://kwaa.dev/atom.xml' -X POST
```

#### 设置 Webmention

每篇帖子都需要向 Bridgy Fed 发送一个 Webmention。

```html
<a class="hidden" href="https://fed.brid.gy"></a>
```

### Indiekit

[Indiekit](https://github.com/getindiekit/indiekit) 是一个小巧但内容强大的服务器，可以作为 Micropub 端点。

等 Bridgy Fed 和 PostTypes 完成了我会专门写个 preset-urara 试一下。

<!-- ## IndieMark - 分数

> 使用 [Indiemark Score calculator](https://aaronjorbin.github.io/indiemark-score/) 计算

截至最后一次更新，本博客的 IndieMark 分数为：**待更新** -->
