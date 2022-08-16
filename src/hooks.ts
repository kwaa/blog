import type { Handle } from '@sveltejs/kit'
import { site } from '$lib/config/site'
import { dev } from '$app/env'

export const handle: Handle = async ({ event, resolve }) =>
  // await resolve(event, {
  //   transformPage: ({ html }) => html.replace('<html lang="en">', `<html lang="${site.lang ?? 'en'}">`)
  // })
  {
    const accept = event.request.headers.get('Accept')
    const url = event.request.url
    console.log(accept.split(','), url)
    if (
      !dev &&
      ['application/activity+json', 'application/ld+json', 'application/json'].some(x => accept.includes(x)) &&
      !url.endsWith('.json')
    )
      return new Response('Redirect', {
        status: 303,
        headers: { Location: 'https://granary.io/url?input=html&output=as2&url=' + encodeURIComponent(url) }
      })
    else
      return await resolve(event, {
        transformPage: ({ html }) => html.replace('<html lang="en">', `<html lang="${site.lang ?? 'en'}">`)
      })
  }
