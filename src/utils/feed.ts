import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { render } from 'astro:content'
import { Feed } from 'feed'

import { feed as feedConfig, site } from '../config'
import { getPosts, postPath } from './posts'

export const buildFeed = async (): Promise<Feed> => {
  const posts = await getPosts()
  const feed = new Feed({
    author: { link: site.url, name: site.author.name },
    copyright: `CC BY-NC-SA 4.0 ${site.author.name}`,
    description: site.description,
    feedLinks: {
      atom: `${site.url}/atom.xml`,
      json: `${site.url}/feed.json`,
    },
    id: site.url,
    language: site.lang,
    link: site.url,
    title: site.title,
    ...(feedConfig.hubs[0] === undefined ? {} : { hub: feedConfig.hubs[0] }),
  })

  const container = await AstroContainer.create()

  for (const post of posts) {
    const link = `${site.url}${postPath(post)}`
    const { Content } = await render(post)
    const content = await container.renderToString(Content)
    feed.addItem({
      content,
      date: post.data.updated ?? post.data.created ?? new Date(0),
      description: post.data.summary ?? '',
      id: link,
      link,
      published: post.data.created ?? new Date(0),
      title: post.data.title ?? post.id,
      ...(post.data.image === undefined
        ? {}
        : {
            image: post.data.image.startsWith('http')
              ? post.data.image
              : `${site.url}${post.data.image}`,
          }),
      category: (post.data.tags ?? []).map(name => ({ name })),
    })
  }

  return feed
}
