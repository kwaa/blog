interface Comment {
  use: string[]
  [key: string]: { [key: string]: string | boolean } | string | string[]
}

export const comment: Comment = {
  use: ['Giscus', 'Disqus'],
  style: 'boxed',
  webmention: {
    username: 'username',
    pingback: true
  },
  giscus: {
    src: 'https://giscus.kwaa.dev/client.js',
    repo: 'kwaa/comments',
    lang: 'zh-CN',
    theme: 'urara'
  },
  disqus: {
    shortname: 'kwaa'
  },
  utterances: {
    repo: 'kwaa/comments'
  }
}
