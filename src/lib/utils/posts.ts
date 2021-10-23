export interface PostMetadata extends Record<string, unknown> {
  title?: string
  date?: string
  lastmod?: string
  tags?: string[]
  priority?: [string, number]
  descr?: string
  cover?: string
}

export interface Post extends PostMetadata {
  slug?: string
  path?: string
  html?: string
}

export interface PostModule {
  default: { render: () => { html: string; head: string; css: { code: string } } }
  metadata?: PostMetadata
}

export const modules = import.meta.globEager<PostModule>('/src/routes/**/index.{md,svelte.md,svx}')

const posts: Record<number, Post[]> = { 500: [] }

Object.entries(modules)
  .map(([postpath, module]) => ({
    slug: postpath,
    path: postpath.replace(/\/src\/routes\/|\/index.md|\/index.svelte.md|\/index.svx/g, ''),
    ...(module?.metadata ?? undefined)
    // ...(module as PostModule).default.render().html
    // default: (module as PostModule).default
    // html: module.default.render().html
  }))
  .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
  .filter(post => {
    if (post.priority !== undefined) {
      if (!posts[post.priority[1]]) posts[post.priority[1]] = []
      posts[post.priority[1]].push(post)
      return false
    } else posts[500].push(post)
    return false
  })

export const listPosts = (priority = 1): Post[] =>
  Object.entries(posts).flatMap(([key, value]) => (parseInt(key) >= priority ? value : []))

export const allPosts = Object.entries(posts).flatMap(([key, value]) => (parseInt(key) >= 1 ? value : []))

export const newPosts = (): Record<number, Post[]> => {
  const posts: Record<number, Post[]> = { 500: [] }
  Object.entries(modules)
    .map(([postpath, module]) => ({
      slug: postpath,
      path: postpath.replace(/\/src\/routes\/|\/index.md|\/index.svelte.md|\/index.svx/g, ''),
      html: module.default
        .render()
        .html // eslint-disable-next-line no-control-regex
        .replace(/[\u0000-\u001F]/g, '')
        .replace(/[\r\n]/g, '')
        .match(/<main [^>]+>(.*?)<\/main>/gi)[0]
        .replace(/( class=")(.*?)(")/gi, '')
        .replace(/( style=")(.*?)(")/gi, '')
        .replace(/(<span>)(.*?)(<\/span>)/gi, '$2')
        .replace(/(<main>)(.*?)(<\/main>)/gi, '$2'),
      ...(module?.metadata ?? undefined)
    }))
    .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
    .forEach(post =>
      post.priority === undefined
        ? posts[500].push(post)
        : posts[post.priority[1]]
          ? posts[post.priority[1]].push(post)
          : (() => {
              posts[post.priority[1]] = []
              posts[post.priority[1]].push(post)
            })()
    )
  return posts
}
