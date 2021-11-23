interface Comment {
  use: string[]
  [key: string]: { [key: string]: string } | string | string[]
}

export const comment: Comment = {
  use: ['Utterances', 'Giscus', 'Disqus'],
  style: 'boxed',
  giscus: {
    src: 'https://giscus.kwaa.dev/client.js',
    repo: 'kwaa/comments',
    lang: 'zh-CN'
  },
  disqus: {
    shortname: 'kwaa'
  },
  utterances: {
    repo: 'kwaa/comments'
  }
}