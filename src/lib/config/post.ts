import type { PostConfig } from '$lib/types/post'

export const post: PostConfig = {
  bridgy: {
    post: ['mastodon']
  },
  comment: {
    use: ['Webmention', 'Giscus', 'Disqus'],
    style: 'boxed',
    webmention: {
      username: 'kwaa.dev',
      sortBy: 'created',
      sortDir: 'down',
      form: true,
      commentParade: true
    },
    giscus: {
      // src: 'https://giscus.kwaa.dev/client.js',
      repo: 'kwaa/comments',
      repoID: 'MDEwOlJlcG9zaXRvcnkyODI2MDcyMDI=',
      category: 'General',
      categoryID: 'DIC_kwDOENg-Ys4CAvDm',
      reactionsEnabled: true,
      lang: 'zh-CN',
      // theme: 'urara'
      theme: 'preferred_color_scheme'
    },
    disqus: {
      shortname: 'kwaa'
    }
  }
}
