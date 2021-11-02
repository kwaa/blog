/// <reference lib="webworker" />

import { build, files, timestamp } from '$service-worker'
import { registerRoute } from 'workbox-routing'
import { precacheAndRoute, precache } from 'workbox-precaching'
import { StaleWhileRevalidate } from 'workbox-strategies'
// import { NetworkFirst, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies'
// import { CacheableResponsePlugin } from 'workbox-cacheable-response'
// import { ExpirationPlugin } from 'workbox-expiration'

declare const self: ServiceWorkerGlobalScope
const skRoutes = [
  ...(build
    .filter(url => url.includes('/_app/pages/') && url.includes('/index'))
    .map(
      url =>
        (url = url
          .replace('_app/pages', '')
          .replace(/\/index(.*?).js/g, '')
          .replace('//', '/'))
    ) as unknown as string[])
]

self.addEventListener('message', event => {
  if (event?.data.type === 'SKIP_WAITING') self.skipWaiting()
})

precache(skRoutes.map(url => ({ url, revision: `${timestamp}` })))

precacheAndRoute([...build.map(url => ({ url, revision: null })), ...files.map(url => ({ url, revision: `${timestamp}` }))])

registerRoute(({ url }) => skRoutes.some(path => url.pathname === path), new StaleWhileRevalidate({}))

// registerRoute(
//   ({ request }) => request.destination === 'script',
//   new NetworkFirst({
//     cacheName: 'scripts',
//     plugins: [
//       new ExpirationPlugin({
//         maxEntries: 10,
//         maxAgeSeconds: 60 * 60 * 24 * 30,
//         purgeOnQuotaError: true
//       })
//     ]
//   })
// )

// registerRoute(
//   ({ request }) => request.destination === 'style',
//   new StaleWhileRevalidate({
//     cacheName: 'styles',
//     plugins: [
//       new ExpirationPlugin({
//         maxEntries: 10,
//         maxAgeSeconds: 60 * 60 * 24 * 30,
//         purgeOnQuotaError: true
//       })
//     ]
//   })
// )

// registerRoute(
//   ({ request }) => request.destination === 'image',
//   new CacheFirst({
//     cacheName: 'images',
//     plugins: [
//       new CacheableResponsePlugin({
//         statuses: [0, 200]
//       }),
//       new ExpirationPlugin({
//         maxAgeSeconds: 30 * 24 * 60 * 60
//       })
//     ]
//   })
// )

// const staticAssets = new Set(to_cache)

// const fetchAndCache = async (request: Request) => {
//   const cache = await caches.open(`offline${timestamp}`)
//   try {
//     const response = await fetch(request)
//     cache.put(request, response.clone())
//     return response
//   } catch (err) {
//     const response = await cache.match(request)
//     if (response) return response
//     throw err
//   }
// }

// self.addEventListener('install', event => {
//   event.waitUntil(
//     caches
//       .open(ASSETS)
//       .then(cache => cache.addAll(to_cache))
//       .then(() => {
//         self.skipWaiting()
//       })
//   )
// })

// self.addEventListener('activate', event => {
//   event.waitUntil(
//     caches.keys().then(keys => {
//       keys.forEach(async key => {
//         if (key !== ASSETS) await caches.delete(key)
//       })
//       self.clients.claim()
//     })
//   )
// })

// self.addEventListener('fetch', event => {
//   if (event.request.method !== 'GET' || event.request.headers.has('range')) return
//   const url = new URL(event.request.url)
//   const isHttp = url.protocol.startsWith('http')
//   const isDevServerRequest = url.hostname === self.location.hostname && url.port !== self.location.port
//   const isStaticAsset = url.host === self.location.host && staticAssets.has(url.pathname)
//   const skipBecauseUncached = event.request.cache === 'only-if-cached' && !isStaticAsset
//   if (isHttp && !isDevServerRequest && !skipBecauseUncached)
//     event.respondWith((async () => (isStaticAsset && (await caches.match(event.request))) || fetchAndCache(event.request))())
// })
