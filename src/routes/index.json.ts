import type { EndpointOutput } from '@sveltejs/kit'

import { newPosts } from '$lib/utils/posts'

// export const modules = import.meta.globEager<PostModule>('/src/routes/**/index.{md,svelte.md,svx}')

export const get = (): EndpointOutput => {
  return {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(newPosts(), null, 2)
  }
}

// Object.entries(posts).flatMap(([, value]) => value)
