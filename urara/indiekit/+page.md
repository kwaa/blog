---
title: '为 Urara 设置 Indiekit/Micropub'
created: 2022-09-06
tags:
  - IndieWeb
  - Indiekit
  - Micropub
summary: importantimport/urara#31 的完整版。
---

[importantimport/urara#31](https://github.com/importantimport/urara/discussions/31) 的完整版。

## 什么是 Indiekit?

Indiekit 是一个 Micropub 服务器，可以对接 GitHub / GitLab / Gitea 并同时发布到 Twitter / Mastodon 等平台。

## 什么是 Micropub?

Micropub 是一个 W3C 推荐的 API 标准，用于在网站上创建，编辑和删除帖子。

也就是说，使用 Indiekit 后可以通过 Micropub 客户端为网站发布帖文。

那么开始吧——

- `example.com` - 博客域名
- `indiekit.example.com` - Indiekit 服务域名
- `github.com/example/urara-blog` - GitHub Repo 地址

## 设置 Urara

### Head

在 `src/lib/config/head.ts` 中设置授权 & 令牌端点和 Micropub 服务地址。

授权端点直接使用 [IndieAuth.com](https://indieauth.com)，但也可以替换成别的

同时需要设置 `me` (RelMeAuth)，以通过域名登录（GitHub 个人资料中的网址也需要设置成 `example.com` 对应域名）

```ts title="src/lib/config/head.ts"
export const head: HeadConfig = {
  custom: () => [
    '<link rel="micropub" href="https://indiekit.example.com/micropub">'
    '<link rel="authorization_endpoint" href="https://indieauth.com/auth">',
    '<link rel="token_endpoint" href="https://indiekit.example.com/token">',
  ],
  me: ['https://github.com/example']
}
```

### Remark FFF

安装 Remark FFF 插件，此插件在之后的 Urara 中可能会预装。

```bash
pnpm add -D remark-fff
```

在 `mdsvex.config.ts` 中配置：

```ts title="mdsvex.config.ts"
remarkPlugins: [
  ...,
  remarkFFF
],
```

由于它默认使用 Hugo 预设和 MDsveX 目标，所以在本文的环境下不需要配置。

## 搭建 Indiekit

使用一个空闲的 VPS 来做这件事。

环境是我喜欢的 Debian sid + nodejs/npm + docker；Indiekit 现在没有 Docker 镜像可用。

### 初始化

在本文我使用了 `@indiekit/preset-hugo` 和 `@indiekit/store-github` 两个插件。

```bash
mkdir /home/indiekit
cd /home/indiekit
npm init
npm i @indiekit/indiekit @indiekit/preset-hugo @indiekit/store-github
```

### 配置

Indiekit 支持很多方式配置，但唯独不支持 ESM 和 TypeScript。

所以我直接写进 `package.json` 里，以下省略无关部分。

```json title="/home/indiekit/package.json"
"indiekit": {
  "plugins": [
    "@indiekit/preset-hugo",
    "@indiekit/store-github"
  ],
  "application": {
    "url": "https://indiekit.example.com",
    "mongodbUrl": "mongodb+srv://<USER>:<PASS>@<HOST>/<DATABASE>"
  },
  "publication": {
    "categories": "https://example.com/tags.json",
    "me": "https://example.com",
    "postTypes": [
      {
        "type": "article",
        "name": "Article",
        "post": {
          "path": "urara/{slug}/index.md",
          "url": "{slug}"
        },
        "media": {
          "path": "urara/{slug}/{filename}",
          "url": "{slug}/{filename}"
        }
      },
      {
        "type": "note",
        "name": "Note",
        "post": {
          "path": "urara/{slug}/index.md",
          "url": "{slug}"
        }
      },
      {
        "type": "photo",
        "name": "Photo",
        "post": {
          "path": "urara/{slug}/index.md",
          "url": "{slug}"
        },
        "media": {
          "path": "urara/{slug}/{filename}",
          "url": "{slug}/{filename}"
        }
      },
      {
        "type": "reply",
        "name": "Reply",
        "post": {
          "path": "urara/{slug}/index.md",
          "url": "{slug}/{filename}"
        }
      }
    ]
  },
  "@indiekit/preset-hugo": {
    "frontMatterFormat": "yaml"
  },
  "@indiekit/store-github": {
    "user": "example",
    "repo": "urara-blog",
    "branch": "main",
    "token": "GITHUB_TOKEN"
  }
}
```

值得注意的部分：

- `indiekit.application.mongodbUrl` - MongoDB 数据库地址，我直接用了免费的 [MongoDB Atlas](https://www.mongodb.com/atlas) 所以就不单独写搭建教程了。
- `indiekit.publication.postTypes` - 帖子类型和对应目录，Urara 需要为每种类型单独设置，这里只填写了目前兼容的类型，可以根据自己的需求来修改。
- `indiekit['@indiekit/store-github'].token` - GitHub TOKEN，需要创建一个填写到这里。

### 启动

使用 pm2 来启动。

```bash
npm i pm2 -g
pm2 start "TOKEN_SECRET=https://tokens.indieauth.com/token npm run serve" --name "indiekit"
pm2 ps
```

默认情况下，Indiekit 会在 `localhost:3000` 下运行。

### 反向代理

现在来设置一个反向代理，使用我的 `kwaabot/caddy` 或其他 Caddy 镜像：

```bash
mkdir /etc/caddy
nano /etc/caddy/Caddyfile
```

```ini title="/etc/caddy/Caddyfile"
indiekit.example.com {
  tls example@example.com
  route {
    reverse_proxy localhost:3000
  }
}
```

```bash
docker run -d \\
--name caddy \\
--network=host \\
-v /etc/caddy/:/etc/caddy/ \\
-v /root/.local/share/caddy:/root/.local/share/caddy \\
--restart unless-stopped \\
kwaabot/caddy
```

搞定！可以使用 [Quill](https://quill.p3k.io) 之类的 Micropub 客户端来试试看了。
