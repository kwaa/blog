import type { Parent, Root } from 'mdast'

import { visit } from 'unist-util-visit'

const RE = /\|\|(.+?)\|\|/g

/** `||spoiler||` -> `<span class="spoiler">spoiler</span>` */
export const remarkSpoiler = () => (tree: Root) => {
  visit(tree, 'paragraph', (node) => {
    for (const child of (node as Parent).children) {
      if (child.type === 'text' && RE.test(child.value as string)) {
        Object.assign(child, {
          type: 'html',
          value: (child.value as string).replace(
            RE,
            (_m: string, p1: string) => `<span class="spoiler">${p1}</span>`,
          ),
        })
      }
    }
  })
}
