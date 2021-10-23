import type { EndpointOutput } from '@sveltejs/kit'
import manifest from '$lib/config/manifest'

const toLine = (manifest: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(manifest).map(([k, v]) => [k.replace(/([A-Z])/g, '_$1').toLowerCase(), v]))

export const get = async (): Promise<EndpointOutput> => {
  return {
    headers: {
      'Content-Type': 'application/manifest+json; charset=utf-8'
    },
    body: JSON.stringify(toLine(manifest), null, 4)
  }
}
