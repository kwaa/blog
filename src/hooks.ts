import type { Handle } from '@sveltejs/kit'
import { site } from '$lib/config/site'
import { prerendering, dev } from '$app/env'

export const handle: Handle = async ({ event, resolve }) =>
  // await resolve(event, {
  //   transformPage: ({ html }) => html.replace('<html lang="en">', `<html lang="${site.lang ?? 'en'}">`)
  // })
  {
    const accept = event.request.headers.get('Accept')
    const url = event.request.url
    if (!dev && !prerendering) console.log(accept, url)
    if (
      !dev &&
      !prerendering &&
      !url.endsWith('.json') &&
      ['application/activity+json', 'application/ld+json', 'application/json'].some(x => accept.includes(x))
    )
      return new Response('Redirect', {
        status: 303,
        headers: { Location: 'https://granary.io/url?input=html&output=as2&url=' + url }
        // headers: { Location: 'https://granary.io/url?input=html&output=as2&url=' + 'https://kwaa.dev/intro-urara/re' }
      })
    else
      return await resolve(event, {
        transformPage: ({ html }) => html.replace('<html lang="en">', `<html lang="${site.lang ?? 'en'}">`)
      })
  }
