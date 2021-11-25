interface Comment {
  use: string[]
  [key: string]: { [key: string]: string } | string | string[]
}

export const comment: Comment = {
  use: ['Giscus', 'Disqus'],
  style: 'boxed',
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
