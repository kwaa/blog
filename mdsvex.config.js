// import shiki from 'shiki'

// import { getHighlighter } from "shiki"
// const shiki = getHighlighter({ theme: 'nord' })

import shiki from 'shiki'

import remarkAbbr from 'remark-abbr'
import remarkSpoiler from 'remark-spoiler'
import rehypeSlug from 'rehype-slug'
import rehypeExternalLinks from 'rehype-external-links'

// const processor = (frontmatter, _) => ({ ...frontmatter })

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// const highlighter = async (code, lang) => `{@html \`${await shiki
// 	.codeToHtml(code, lang)
// 	.replace(/[{}`]/g, c => ({ '{': '&#123;', '}': '&#125;', '`': '&#96;' }[c]))
// 	.replace(/\\([trn])/g, '&#92;$1')
// 	}\` }`

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const highlighter = async (code, lang) => {
  if (lang === 'plain') lang = 'text'
  return `{@html \`${await shiki.getHighlighter({ theme: 'material-darker' }).then(highlighter =>
    highlighter
      .codeToHtml(code, lang)
      // .codeToHtml(code, lang, { classes: ['mockup-code', 'font-mono']})
      .replace(/[{}`]/g, c => ({ '{': '&#123;', '}': '&#125;', '`': '&#96;' }[c]))
      .replace(/\\([trn])/g, '&#92;$1')
  )}\` }`
}

/** @type {Parameters<typeof import("mdsvex").mdsvex>[0]} */
export const mdsvexConfig = {
  extensions: ['.svelte.md', '.md', '.svx'],
  smartypants: {
    dashes: 'oldschool'
  },
  layout: {
    _: './src/lib/components/layout_post.svelte'
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  highlight: {
    highlighter
  },
  // async (code, lang) => `{@html \`${await shiki
  // 	.codeToHtml(code, lang)
  // 	.replace(/[{}`]/g, c => ({ '{': '&#123;', '}': '&#125;', '`': '&#96;' }[c]))
  // 	.replace(/\\([trn])/g, '&#92;$1')}\` }`

  // await shiki.codeToHtml(code == 'plain' ? '' : code, lang)
  // frontmatter: {
  //     postprocess: processor
  // },
  remarkPlugins: [
    remarkAbbr,
    remarkSpoiler
    // [remarkGitHub, {
    // 	// Use your own repository
    // 	repository: 'https://github.com/importantimport/urara'
    // }]
  ],
  rehypePlugins: [
    rehypeSlug,
    [
      rehypeExternalLinks,
      {
        rel: ['nofollow', 'noopener', 'noreferrer', 'external'],
        target: '_blank'
      }
    ]
    // [import("rehype-autolink-headings"), {
    // 	behavior: "wrap",
    // }],
  ]
}
