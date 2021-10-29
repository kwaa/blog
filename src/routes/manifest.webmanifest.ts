import type { EndpointOutput } from '@sveltejs/kit'
import { toSnake } from '$lib/utils/case'
import manifest from '$lib/config/manifest'

export const get = async (): Promise<EndpointOutput> => {
  return {
    headers: {
      'Content-Type': 'application/manifest+json; charset=utf-8'
    },
    body: JSON.stringify(toSnake(manifest), null, 4)
  }
}
