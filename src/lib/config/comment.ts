import type { CommentConfig } from '$lib/types/comment'

export const comment: CommentConfig = {
  // use: ['Callback', 'Webmention', 'Giscus', 'Disqus'],
  use: ['Webmention', 'Giscus', 'Disqus'],
  style: 'boxed',
  webmention: {
    username: 'kwaa.dev',
    sortBy: 'updated',
    sortDir: 'down'
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
