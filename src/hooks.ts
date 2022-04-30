import type { Handle } from '@sveltejs/kit'
import { prerendering } from '$app/env'
import { site } from '$lib/config/site'

export const handle: Handle = async ({ event, resolve }) =>
  await resolve(event, {
    transformPage: ({ html }) =>
      html
        .replace('<html lang="en">', `<html lang="${site.lang ?? 'en'}">`)
        .replace(
          /<link rel="modulepreload" href="(\/_app\/chunks\/vendor-[^.]+\.js)">/,
          (_, url) => `<script defer async src="${url}">`
        )
  })
