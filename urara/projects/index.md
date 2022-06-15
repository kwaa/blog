---
title: 'Projects / 项目'
created: 2022-06-15
flags:
  - unlisted
---

本页列出了我觉得能拿出手的原创项目，附简短描述。

由于暂未发布的项目也会被计入，所以可能会有一些特别的东西？

## Static / 静态网页

没有后端的会被我归类到这里。

### Urara

`SvelteKit` `Vite` `TypeScript` `TailwindCSS` `UnoCSS` `daisyUI`

- [GitHub - importantimport/urara](https://github.com/importantimport/urara)
- [GitHub - importantimport/urara-docs](https://github.com/importantimport/urara-docs)
- [Introducing Urara](/intro-urara)
- [RE:Introducing Urara](/intro-urara/re)

作为本站的基础，也是最用心写的项目。

尝试了当时的最新框架 SvelteKit，并把我想要的功能和设计全部混在一起，就有了现在你看到的这个——不太纯粹，但足够强大。

### Gumori

`Astro` `Vite` `TypeScript` `UnoCSS`

- [GitHub - importantimport/gumori](https://github.com/importantimport/gumori)

基于 Astro 的极简博客启动器。可以看作 Urara 把能砍掉的功能全部砍掉，并补上一些我出于各种原因没法加上去的功能的之后的样子。

### Hexo Theme-M

- [GitHub - kwaa/m](https://github.com/kwaa/m)

`Hexo` `EJS` `MDUI` `PJAX`

值得纪念的我的第一个自制博客主题。和现在的 Urara 比起来设计不太好看，功能也稍显稚嫩；但谁让当时的我就这水平呢？

稍好的是很多地方都提供了自定义选项，并且尽可能减少了依赖。

<!-- ## Dynamic / 动态网页

有后端的会被我归类到这里。

### Mokou

`Elixir` `Phoenix` `Prometheus` `Node Explorer`

基于 Elixir / Phoenix / LiveView 的服务器探针，客户端直接复用了 node_explorer。

由于 prometheus 格式太过阴间而进展缓慢

## Library / 库

### M3UI

Coming s∞n...  -->

## Dockerize / 容器化

这边的 Dockerfile 和持续集成脚本是我写的，程序一般不是。

### Caddy - kwaabot/caddy

- [DockerHub - kwaabot/caddy](https://hub.docker.com/r/kwaabot/caddy)
- [GitHub - kwaa/caddy](https://github.com/kwaa/caddy)

`Docker` `Caddy` `GitHub Actions`

Caddy 用到 v2 之后需要自行编译的产物。

写了脚本来检测上游更新，加上了一些我喜欢的模块并提供 `amd64` 和 `arm64` 双版本。

### DKit - kwaabot/dkit

- [DockerHub - kwaabot/dkit](https://hub.docker.com/r/kwaabot/dkit)
- [GitHub - kwaa/dkit](https://github.com/kwaa/dkit)

`Docker` `pnpm` `SvelteKit` `GitHub Actions`

由于有人需要而设计的为 SvelteKit 项目优化的 pnpm Docker 镜像。

简单用用是没什么问题，不过目前 pnpm-store 文件夹设置会无效。

## Scripts / 脚本

### Workers Hexo Search

- [GitHub - kwaa/workers-hexo-search](https://github.com/kwaa/workers-hexo-search)

`Hexo` `Cloudflare Workers`

我在 Hexo 的最后一作，多站点搜索处理脚本：虽简陋，但能用。（现在能不能用那就不好说了）
