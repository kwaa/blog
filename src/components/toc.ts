import type { MarkdownHeading } from 'astro'

export interface TocItem extends MarkdownHeading {
  children: TocItem[]
}

export const buildToc = (headings: MarkdownHeading[], minDepth = 2): TocItem[] => {
  const root: TocItem[] = []
  const stack: TocItem[] = []
  for (const h of headings) {
    if (h.depth < minDepth)
      continue
    const item: TocItem = { ...h, children: [] }
    let top = stack.at(-1)
    while (top !== undefined && top.depth >= h.depth) {
      stack.pop()
      top = stack.at(-1)
    }
    if (top === undefined)
      root.push(item)
    else top.children.push(item)
    stack.push(item)
  }
  return root
}
