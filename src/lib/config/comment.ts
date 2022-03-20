import type { CommentConfig } from '$lib/types/comment'

export const comment: CommentConfig = {
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
    src: 'https://giscus.kwaa.dev/client.js',
    repo: 'kwaa/comments',
    lang: 'zh-CN',
    theme: 'urara'
  },
  disqus: {
    shortname: 'kwaa'
  }
}

// export const comment: CommentConfig = {
//   use: ['Webmention']
// }
