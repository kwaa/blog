interface Comment {
  use: string[]
  [key: string]: { [key: string]: string } | string | string[]
}

export const comment: Comment = {
  use: ['Utterances', 'Giscus', 'Disqus'],
  style: 'boxed',
  giscus: {
    repo: 'kwaa/comments',
    lang: 'zh-CN'
  },
  utterances: {
    repo: 'kwaa/comments'
  }
}
