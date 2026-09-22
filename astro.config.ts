import sitemap from '@astrojs/sitemap'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeSlug from 'rehype-slug'

import { unified } from '@astrojs/markdown-remark'
import { defineConfig } from 'astro/config'

import { remarkSpoiler } from './src/plugins/remark-spoiler'

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap()],
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
      theme: 'material-theme',
      wrap: false,
    },
  },
  site: 'https://kwaa.dev',
  trailingSlash: 'never',
})
