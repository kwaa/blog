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

export const handle: Handle = async ({ event, resolve }) =>
  await resolve(event, {
    transformPage: ({ html }) =>
      html
        .replace('<html lang="en">', `<html lang="${site.lang ?? 'en'}">`)
        .replace(
          /<link rel="modulepreload" href="(\/_app\/chunks\/vendor-[^.]+\.js)">/,
          (_, url) => `<script defer async src="${url}">`
        )
    // (prerendering
    //   ? minify(html.replace('<html lang="en">', `<html lang="${site.lang ?? 'en'}">`), minificationOptions)
    //   : html.replace('<html lang="en">', `<html lang="${site.lang ?? 'en'}">`)
    // ).replace(
    //   /<link rel="modulepreload" href="(\/_app\/chunks\/vendor-[^.]+\.js)">/,
    //   (_, url) => `<script defer async src="${url}">`
    // )
  })
