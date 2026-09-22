import type { APIRoute } from 'astro'

import { buildFeed } from '../utils/feed'

export const GET: APIRoute = async () => {
  const feed = await buildFeed()
  return new Response(feed.atom1(), {
    headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' },
  })
}
