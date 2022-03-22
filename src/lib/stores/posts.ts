// import { readable } from 'svelte/store'
// import { genLists, genTags } from '$lib/utils/posts'

// export const posts = readable(genLists())
// export const tags = readable(genTags(Object.entries(genLists()).flatMap(([key, value]) => (parseInt(key) > 0 ? value : []))))

import { site } from '$lib/config/site'
import { mode } from '$lib/config/misc'
import { readable } from 'svelte/store'
import { genPosts, genTags } from '$lib/utils/posts'
export const posts = readable({}, set => {
  mode === 'dev'
    ? set(genPosts({ postHtml: false }))
    : fetch(`${site.url}/posts.json`)
        .then(res => res.json())
        .then(data =>
          set(
            genTags(
              Object.entries(data as { [priority: number]: Urara.Post[] }).flatMap(([key, value]) =>
                parseInt(key) > 0 ? value : []
              )
            )
          )
        )
})

// export const posts = readable({}, set => set(genPosts()))

// export const tags = readable({}, set =>
//   set(genTags(Object.entries(genPosts()).flatMap(([key, value]) => (parseInt(key) > 0 ? value : []))))
// )

export const tags = readable({}, set => {
  mode === 'dev'
    ? set(genTags(Object.entries(genPosts({ postHtml: false })).flatMap(([key, value]) => (parseInt(key) > 0 ? value : []))))
    : fetch(`${site.url}/posts.json`)
        .then(res => res.json())
        .then(data =>
          set(
            genTags(
              Object.entries(data as { [priority: number]: Urara.Post[] }).flatMap(([key, value]) =>
                parseInt(key) > 0 ? value : []
              )
            )
          )
        )
})
