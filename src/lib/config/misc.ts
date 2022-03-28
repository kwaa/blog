interface Feed {
  limit: number
  hub?: string[]
}

export const feed: Feed = {
  limit: 0,
  hub: ['https://pubsubhubbub.appspot.com', 'https://bridgy-fed.superfeedr.com']
}

export const mode: 'prod' | 'dev' = import.meta.env.PROD ? 'prod' : 'dev'
