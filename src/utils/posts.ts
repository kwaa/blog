import type { CollectionEntry } from 'astro:content'

import { getCollection } from 'astro:content'

import { date as dateConfig } from '../config'

export type Post = CollectionEntry<'posts'>

export const postPath = (post: Post) => `/${post.id}`

/** `/` is kept unencoded so tags like `CI/CD` map onto the `/tags/...` rest route */
export const tagPath = (tag: string) =>
  `/tags/${encodeURIComponent(tag).replaceAll('%2F', '/')}`

export const formatDate = (d: Date): string =>
  d.toLocaleDateString(dateConfig.locales, dateConfig.options)

/** all posts sorted by created date desc; unlisted filtered unless `includeUnlisted` */
export const getPosts = async (includeUnlisted = false): Promise<Post[]> => {
  const posts = await getCollection('posts')
  return posts
    .filter(post => includeUnlisted || !post.data.flags?.includes('unlisted'))
    .sort(
      (a, b) =>
        (b.data.created?.getTime() ?? 0) - (a.data.created?.getTime() ?? 0),
    )
}

export const getTags = (posts: Post[]): string[] =>
  [
    ...new Set(posts.flatMap(post => post.data.tags ?? [])),
  ].sort((a, b) => a.localeCompare(b))
