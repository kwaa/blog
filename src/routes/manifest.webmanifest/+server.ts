import type { RequestHandler } from './$types'
import { site } from '$lib/config/site'
import { header } from '$lib/config/general'
import { any, maskable } from '$lib/config/icon'

export const prerender = true
export const GET: RequestHandler = () =>
  new Response(
    JSON.stringify(
      {
        name: site.title,
        short_name: site.title,
        lang: site.lang,
        description: site.description,
        id: site.protocol + site.domain + '/',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: site.themeColor,
        theme_color: site.themeColor,
        icons: [
          ...Object.values(any)
            .filter(icon => icon.sizes !== '180x180')
            .map(icon => ({ ...icon, purpose: 'any' })),
          ...Object.values(maskable).map(icon => ({ ...icon, purpose: 'maskable' }))
        ],
        shortcuts: header.nav.flatMap(shortcut =>
          shortcut.link
            ? {
                name: shortcut.text,
                url: shortcut.link
              }
            : shortcut.children.map(shortcut => ({
                name: shortcut.text,
                url: shortcut.link
              }))
        )
      },
      null,
      2
    ),
    {
      headers: {
        'content-type': 'application/manifest+json; charset=utf-8'
      }
    }
  )
