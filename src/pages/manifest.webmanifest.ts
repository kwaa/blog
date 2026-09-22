import type { APIRoute } from 'astro'

import { site } from '../config'

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      description: site.description,
      display: 'standalone',
      icons: [
        { sizes: '192x192', src: '/assets/any@192.webp', type: 'image/webp' },
        { sizes: '512x512', src: '/assets/any@512.webp', type: 'image/webp' },
        { purpose: 'maskable', sizes: '192x192', src: '/assets/maskable@192.webp', type: 'image/webp' },
        { purpose: 'maskable', sizes: '512x512', src: '/assets/maskable@512.webp', type: 'image/webp' },
      ],
      lang: site.lang,
      name: site.title,
      short_name: site.title,
      start_url: '/',
      theme_color: site.themeColor,
    }),
    { headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' } },
  )
