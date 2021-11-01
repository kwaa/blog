/// <reference lib="webworker" />

import { build, files, timestamp } from '$service-worker'

declare let self: ServiceWorkerGlobalScope

const ASSETS = `cache${timestamp}`
const to_cache = build.concat(files)
const staticAssets = new Set(to_cache)

const fetchAndCache = async (request: Request) => {
  const cache = await caches.open(`offline${timestamp}`)
  try {
    const response = await fetch(request)
    cache.put(request, response.clone())
    return response
  } catch (err) {
    const response = await cache.match(request)
    if (response) return response
    throw err
  }
}

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(ASSETS)
      .then(cache => cache.addAll(to_cache))
      .then(() => {
        self.skipWaiting()
      })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      keys.forEach(async key => {
        if (key !== ASSETS) await caches.delete(key)
      })
      self.clients.claim()
    })
  )
})

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || event.request.headers.has('range')) return
  const url = new URL(event.request.url)
  const isHttp = url.protocol.startsWith('http')
  const isDevServerRequest = url.hostname === self.location.hostname && url.port !== self.location.port
  const isStaticAsset = url.host === self.location.host && staticAssets.has(url.pathname)
  const skipBecauseUncached = event.request.cache === 'only-if-cached' && !isStaticAsset
  if (isHttp && !isDevServerRequest && !skipBecauseUncached)
    event.respondWith((async () => (isStaticAsset && (await caches.match(event.request))) || fetchAndCache(event.request))())
})
