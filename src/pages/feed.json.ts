import type { APIRoute } from 'astro'

import { buildFeed } from '../utils/feed'

export const GET: APIRoute = async () => {
  const feed = await buildFeed()
  return new Response(feed.json1(), {
    headers: { 'Content-Type': 'application/feed+json; charset=utf-8' },
  })
}
