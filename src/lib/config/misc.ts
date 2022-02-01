interface Feed {
  limit: number
  hub?: string | boolean
}

export const feed: Feed = {
  limit: 0,
  hub: 'https://pubsubhubbub.appspot.com'
}

export const mode: 'prod' | 'dev' = import.meta.env.PROD ? 'prod' : 'dev'
