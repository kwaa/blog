import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import sitemap from '@astrojs/sitemap'
import astroTakumi from 'astro-takumi'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeSlug from 'rehype-slug'
import UnoCSS from 'unocss/astro'

import { unified } from '@astrojs/markdown-remark'
import { defineConfig } from 'astro/config'

import { renderOg } from './src/og/render'
import { remarkSpoiler } from './src/plugins/remark-spoiler'

// https://astro.build/config
export default defineConfig({
  integrations: [
    UnoCSS(),
    sitemap(),
    astroTakumi({
      options: {
        fontFamilies: ['Noto Sans SC'],
        images: [
          {
            data: readFileSync(
              fileURLToPath(
                new URL('./public/assets/any@1024.png', import.meta.url),
              ),
            ),
            src: '/assets/any@1024.png',
          },
        ],
        // fontsource's noto-sans-sc woff files carry family name
        // "Noto Sans SC Thin" — override name/weight so fontFamilies matches
        fonts: [
          {
            data: readFileSync(
              fileURLToPath(
                import.meta.resolve(
                  '@fontsource/noto-sans-sc/files/noto-sans-sc-chinese-simplified-400-normal.woff',
                ),
              ),
            ),
            name: 'Noto Sans SC',
            weight: 400,
          },
          {
            data: readFileSync(
              fileURLToPath(
                import.meta.resolve(
                  '@fontsource/noto-sans-sc/files/noto-sans-sc-chinese-simplified-700-normal.woff',
                ),
              ),
            ),
            name: 'Noto Sans SC',
            weight: 700,
          },
        ],
        verbose: true,
      },
      render: renderOg,
    }),
  ],
  markdown: {
    processor: unified({
      rehypePlugins: [
        // ids must exist before autolink — the processor's built-in
        // rehypeHeadingIds runs after user plugins and skips existing ids
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        [
          rehypeExternalLinks,
          {
            rel: ['nofollow', 'noopener', 'noreferrer', 'external'],
            target: '_blank',
          },
        ],
      ],
      remarkPlugins: [remarkSpoiler],
      smartypants: { dashes: 'oldschool' },
    }),
    shikiConfig: {
      defaultColor: false,
      // dual themes emit --shiki-light/--shiki-dark CSS vars; global.css switches on them
      themes: {
        dark: 'github-dark',
        light: 'github-light',
      },
      wrap: false,
    },
  },
  site: 'https://kwaa.dev',
  trailingSlash: 'never',
})
