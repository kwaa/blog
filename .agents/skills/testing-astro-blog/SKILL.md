---
name: testing-astro-blog
description: How to run and end-to-end test the kwaa/blog Astro site locally — dev server setup, key routes, and content quirks to check.
---

# Testing the Astro blog (kwaa/blog)

## Setup

- Node via nvm (Node 24), pnpm 12.x via corepack: `export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh"`
- `pnpm install` once (`pnpm approve-builds esbuild` first if esbuild build is blocked).
- `pnpm dev` → Astro dev server on `http://localhost:4321` (no auth; fully static SSG).
- `dist/` may already contain a production build — compare `dist/<slug>/index.html` against dev output when a markdown-pipeline issue might be dev-vs-build specific.

## Routes worth hitting

- `/` home (profile aside, `#tag` nav → `/tags/<tag>` url-encoded except `/` stays unencoded, year-grouped post cards 2023→2018)
- Posts: `/intro-urara`, `/intro-urara/re`, `/theme-m`; nested: `/2023/07`, `/2021/ten-update`, `/archives/*`
- `/tags`, `/tags/CI/CD` (rest route — slash kept unencoded by `tagPath()`), `/friends`, `/404`
- Feeds/meta: `/atom.xml`, `/feed.json`, `/manifest.webmanifest`

## Content quirks (verify in rendered HTML, not just visually)

- `comment: true` posts (giscus `#post-comment` + `script[src="https://giscus.app/client.js"]`): theme-m, iem-idea, object-storage-workers, project-axe, s3rver. `/intro-urara/re` does NOT have it — good absence check.
- `||spoiler||` → `<span class="spoiler">`: only fires on paragraph text nodes (see `/intro-urara`, 3 spans); `||` inside fenced code blocks must stay literal (see `/about` TS block).
- Commented-out Svelte (`<!-- <script>... -->`, `<!-- <GitHub/> -->`, `<!-- <Profile/> -->`) must stay invisible: `/intro-urara`, `/about`, `/theme-m`.
- Shiki output: `pre.astro-code.material-theme` with inline `style="color:#..."` spans.
- rehype-autolink-headings may silently no-op if it runs before heading ids are assigned — check for `<h2 id="x"><a href="#x">`, not just `<h2 id="x">`.
- @astrojs/sitemap emits `sitemap-index.xml` + `sitemap-0.xml` at build only (404s in dev); footer nav link may point at non-existent `/sitemap.xml`.
- `flags: [unlisted]` posts (`/about`, `/archives`, `/projects`) are excluded from home/feed but still routable — they can appear in prev/next chains.
- Dev box lacks CJK fonts: Chinese text renders as tofu boxes in screenshots — verify via DOM text, not pixels.
