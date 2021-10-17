# Urara

>Urara ~~(Urara the name does not inspired from meirochou)~~ blog template

built with:

- [SvelteKit](https://github.com/sveltejs/kit)
- [MDSveX](https://github.com/pngwn/mdsvex)
- [WindiCSS](https://github.com/windicss/windicss)
- [DaisyUI](https://github.com/saadeghi/daisyui)

special thanks:

- [@michaeloliverx](https://github.com/pngwn/MDsveX/issues/294#issuecomment-907029639)

## Quick Start

```bash
npx degit importantimport/urara blog && cd blog
rm -f COPYING
npm i && npm run dev
```

## Arguments

some example:

```bash
npm run dev -- --host 0.0.0.0 # http://0.0.0.0:3000
npm run dev -- --host 0.0.0.0 --port 8964 # http://0.0.0.0:8964
```

```bash
npm run build production # build for 'production' mode
npm run build workers # build for 'workers' mode
```

## Adapters

This project uses `@sveltejs/adapter-static@next` by default, but u can use any adapter supported by SvelteKit. View more on [SvelteKit Docs](https://kit.svelte.dev/docs#adapters)

## Config

All configuration files are stored in the `/src/lib/config/` folder, u can use `.env` files to configure each operating mode individually:

```ts
const site: Sites = {
  ...,
  url: import.meta.env.VITE_SITE_URL
}
```

```bash
# ./env.workers
MODE_ENV=production
VITE_SITE_URL=https://urara.workers.dev
```

## License

This work is free, it comes without any warranty. You can redistribute it and/or modify it under the
terms of the Do What The Fuck You Want To Public License, Version 2,
as published by Sam Hocevar. See the COPYING file for more details.
