---
title: 'Projects / 项目'
created: 2022-06-15
flags:
  - unlisted
---

本页列出了我觉得能拿出手的原创项目，附简短描述。

由于暂未发布的项目也会被计入，所以可能会有一些特别的东西？

有时效性的会加上时间，需要注意的是起始时间是从**创建文件夹**而不是 Initial commit 计算的。

## Static / 静态网页

没有后端的会被我归类到这里。

### Hsno 2022.10 ~ now

`Qwik City` `Vite` `TypeScript`

- [importantimport/hsno](https://github.com/importantimport/hsno)

Wow! 这是我为未来准备的博客模板。

它目前还不太可用，但以后会成为此博客的新底层...

### Urara 2021.3 ~ now

`SvelteKit` `Vite` `TypeScript` `TailwindCSS` `UnoCSS` `daisyUI`

- [importantimport/urara - GitHub](https://github.com/importantimport/urara)
- [importantimport/urara-docs - GitHub](https://github.com/importantimport/urara-docs)
- [Introducing Urara](/intro-urara)
- [RE:Introducing Urara](/intro-urara/re)

作为本站的基础，也是最用心写的项目。

尝试了当时的最新框架 SvelteKit，并把我想要的功能和设计全部混在一起，就有了现在你看到的这个——不太纯粹，但足够强大。

### Gumori 2022.5 ~ now

`Astro` `Vite` `TypeScript`

- [importantimport/gumori - GitHub](https://github.com/importantimport/gumori)

基于 Astro 的极简博客启动器。可以看作 Urara 把能砍掉的功能全部砍掉，并补上一些我出于各种原因没法加上去的功能的之后的样子。

#### Gumori You 2022.6 ~ 2022.8

`Astro` `Vite` `TypeScript` `UnoCSS` `Material 3`

- [importantimport/gumori-you - GitHub](https://github.com/importantimport/gumori-you)

> Astro 模板语法阴间，加上 Material 3 组件有点难写故停更

Gumori 的变种，带来了「基于内容的色彩方案」和 Material Design 3 风格

是一个致敬 MDL Blog Template 和 Typecho/Hexo Theme Material 的作品。

### Hexo Theme-M 2020.6 ~ ~~2021.1~~2022.10

- [kwaa/hexo-theme-m - GitHub](https://github.com/kwaa/hexo-theme-m)

`Hexo` `EJS` `MDUI` `PJAX`

值得纪念的我的第一个自制博客主题。和现在的 Urara 比起来设计不太好看，功能也稍显稚嫩；但谁让当时的我就这水平呢？

稍好的是很多地方都提供了自定义选项，并且尽可能减少了依赖。

更新：我进行了两周年翻新，现在支持 Hexo 6 并增加了一些小功能。（同时改为 monorepo，非常先进）

<!-- ## Dynamic / 动态网页

有后端的会被我归类到这里。

### Mokou

`Elixir` `Phoenix` `Prometheus` `Node Explorer`

基于 Elixir / Phoenix / LiveView 的服务器探针，客户端直接复用了 node_explorer。

由于 prometheus 格式太过阴间而进展缓慢 -->

## Library / 库

### FFF Flavored Frontmatter 2022.7 ~ now

- [fff.js.org](https://fff.js.org)
- [fff-flavored-frontmatter - npm](https://www.npmjs.com/package/fff-flavored-frontmatter)
- [fff - Deno](https://deno.land/x/fff)
- [importantimport/fff - GitHub](https://github.com/importantimport/fff)

`TypeScript` `Turborepo`

将 Urara 和 Gumori 的 Frontmatter 格式整理并总结而成的规范。

目前它的最大优点就是能在我的数个博客模板之间无修改迁移，也许之后有可能包括其他博客？

### Shiraha

- [importantimport/shiraha - GitHub](https://github.com/importantimport/shiraha)

`SugarSS` `PostCSS` `Classless` `CSS Framework`

使用 SugarSS 的无类 CSS 框架，以好玩和易于扩展为目标！缓慢发展中...

### Hexo Partytown

- [hexo-partytown - npm](https://www.npmjs.com/package/hexo-partytown)
- [kwaa/hexo-partytown - GitHub](https://github.com/kwaa/hexo-partytown)

`Hexo` `Partytown` `TypeScript`

Hexo 的 Partytown 集成，胶水代码。
值得一提的是这个包是用 TypeScript 写的，并同时兼容 ESM 和 CJS... 虽然并没有什么用。~~玩一圈回来，给 Hexo 写东西是真的没什么 DX 可言~~

### Hexo LightningCSS

- [hexo-lightningcss - npm](https://www.npmjs.com/package/hexo-lightningcss)
- [kwaa/hexo-lightningcss - GitHub](https://github.com/kwaa/hexo-lightningcss)

`Hexo` `LightningCSS` `TypeScript`

Hexo 插件第二作，这次是 LightningCSS。
貌似没什么可说的了... 就这样吧。

## Dockerize / 容器化

这边的 Dockerfile 和持续集成脚本是我写的，程序一般不是。

### Caddy - kwaabot/caddy

- [kwaabot/caddy - DockerHub](https://hub.docker.com/r/kwaabot/caddy)
- [kwaa/caddy - GitHub](https://github.com/kwaa/caddy)

`Docker` `Caddy` `GitHub Actions`

Caddy 用到 v2 之后需要自行编译的产物。

写了脚本来检测上游更新，加上了一些我喜欢的模块并提供 `amd64` 和 `arm64` 双版本。

### NaiveProxy - kwaabot/naive

- [kwaabot/naive - DockerHub](https://hub.docker.com/r/kwaabot/naive)
- [kwaa/naive - GitHub](https://github.com/kwaa/naive)

`Docker` `NaiveProxy` `GitHub Actions`

作为客户端的单独 NaiveProxy，闲着没事便写了这么一个脚本来每月更新。
尽管可以从 AUR 获取 `naiveproxy-bin`，但确实不如 Docker 来得方便...

### DKit - kwaabot/dkit

- [kwaabot/dkit - DockerHub](https://hub.docker.com/r/kwaabot/dkit)
- [kwaa/dkit - GitHub](https://github.com/kwaa/dkit)

`Docker` `pnpm` `SvelteKit` `GitHub Actions`

由于有人需要而设计的为 SvelteKit 项目优化的 pnpm Docker 镜像。

简单用用是没什么问题，不过目前 pnpm-store 文件夹设置会无效。

## Scripts / 脚本

### Workers Hexo Search 2020.12 ~ 2021.1

- [kwaa/workers-hexo-search - GitHub](https://github.com/kwaa/workers-hexo-search)

`Hexo` `Cloudflare Workers`

~~我在 Hexo 的最后一作，~~ 多站点搜索处理脚本：虽简陋，但能用。（现在能不能用那就不好说了）
