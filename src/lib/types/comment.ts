export type WebmentionConfig = {
  /** username you got when you signed up webmention.io. */
  username: string
  /** number of results per page. */
  perPage?: number
  /** sorting mechanism to return the list of mentions. */
  sortBy?: 'created' | 'updated' | 'published' | 'rsvp'
  /** control the ordering. */
  sortDir?: 'down' | 'up'
  /** type filler */
  filterType?: string[]
  /** find links of a specific type. */
  property?: ('in-reply-to' | 'like-of' | 'repost-of' | 'bookmark-of' | 'mention-of' | 'rsvp')[]
}

export type GiscusConfig = {
  /** self-hosted giscus url. */
  src?: string
  /** a public GitHub repository. this repo is where the discussions will be linked to. */
  repo: string
  repoID?: string
  /** choose the discussion category where new discussions will be created. */
  category?: string
  categoryID?: string
  /** choose the mapping between the embedding page and the embedded discussion. */
  mapping?: 'pathname' | 'url' | 'title' | 'og:title'
  /** the reactions for the discussion's main post will be shown before the comments. */
  reactionsEnabled?: boolean
  /** discussion metadata will be sent periodically to the parent window (the embedding page). */
  emitMetadata?: boolean
  /** choose a theme that matches your website. */
  theme?: string
  /** choose the language giscus will be displayed in. */
  lang?: string
}

export type UtterancesConfig = {
  /** self-hosted utterances url. */
  src?: string
  /** choose the repository utterances will connect to. */
  repo: string
  /** choose the label that will be assigned to issues created by utterances. */
  label?: string
  /** choose an utterances theme that matches your blog. */
  theme?: string
}

export type DisqusConfig = {
  shortname: string
  lang?: string
}

export type CommentConfig = {
  use: string[]
  /** tab style for multiple comments, preview at https://daisyui.com/components/tab */
  style?: 'none' | 'bordered' | 'lifted' | 'boxed'
  /** Webmention.io config, more at https://github.com/aaronpk/webmention.io#api */
  webmention?: WebmentionConfig
  /** Giscus config, more at https://giscus.app */
  giscus?: GiscusConfig
  /** Disqus config */
  disqus?: DisqusConfig
  /** Utterances config, more at https://utteranc.es */
  utterances?: UtterancesConfig
}
