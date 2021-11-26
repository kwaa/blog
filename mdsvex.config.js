import shiki from 'shiki'
import remarkAbbr from 'remark-abbr'
import remarkSpoiler from 'remark-spoiler'
import mdsvexRelativeImages from "mdsvex-relative-images"
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'

import { visit } from 'unist-util-visit'
import { toString } from 'mdast-util-to-string'
import Slugger from 'github-slugger'

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

const get_headings = async () => {
  let visit;
  let tree_to_string;
  return async function transformer(tree, vFile) {
    if (!visit) {
      tree_to_string = (await import('mdast-util-to-string')).toString;
      visit = (await import('unist-util-visit')).visit;
    }
    vFile.data.headings = [];
    visit(tree, 'heading', (node) => {
      vFile.data.headings.push({
        level: node.depth,
        title: toString(node),
      });
    });

    if (!vFile.data.fm) vFile.data.fm = {};
    vFile.data.fm.headings = vFile.data.headings;
  };
}

const uraraToc = () => (tree, file) => {
  const slugs = new Slugger()
  let toc = []
  visit(tree, 'heading', node => {
    toc.push({
      level: node.depth,
      title: toString(node),
      slug: `#${slugs.slug(toString(node))}`,
    })
  })
  if (!file.data.fm) file.data.fm = {}
  file.data.fm.toc = toc
}

const uraraSpoiler = () => tree => {
  visit(tree, 'paragraph', node => {
    const { children } = node
    const text = children[0].value
    const re = /\|\|(.{1,}?)\|\|/g
    if (re.test(children[0].value)) {
      children[0].type = 'html'
      children[0].value = text.replace(re, (_match, p1) => `<span class="spoiler">${p1}</span>`)
    }
    return node
  })
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
  highlight: {
    highlighter
  },
  // remarkSpoiler,
  remarkPlugins: [ mdsvexRelativeImages, remarkAbbr, uraraToc, uraraSpoiler],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    [
      rehypeExternalLinks,
      {
        rel: ['nofollow', 'noopener', 'noreferrer', 'external'],
        target: '_blank'
      }
    ]
  ]
}
