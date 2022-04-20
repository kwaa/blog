import type { Handle } from '@sveltejs/kit'
import { prerendering } from '$app/env'
import { minify } from 'html-minifier'
import { site } from '$lib/config/site'

const minificationOptions = {
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  conservativeCollapse: true,
  decodeEntities: true,
  html5: true,
  ignoreCustomComments: [/^#/],
  minifyCSS: true,
  minifyJS: true,
  removeAttributeQuotes: true,
  removeComments: true,
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  sortAttributes: true,
  sortClassName: true
}

export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event, {
    transformPage: ({ html }) =>
      prerendering
        ? minify(html.replace('<html lang="en">', `<html lang="${site.lang ?? 'en'}">`), minificationOptions)
        : html.replace('<html lang="en">', `<html lang="${site.lang ?? 'en'}">`)
  })
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=()')
  return response
}
