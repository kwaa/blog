const posts: Record<number, Urara.Post[]> = { 500: [] }

Object.entries(import.meta.globEager<Urara.PostModule>('/src/routes/**/index.{md,svelte.md,svx}'))
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

export default posts
