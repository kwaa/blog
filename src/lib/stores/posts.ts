// import { readable } from 'svelte/store'
// import { genLists, genTags } from '$lib/utils/posts'

// export const posts = readable(genLists())
// export const tags = readable(genTags(Object.entries(genLists()).flatMap(([key, value]) => (parseInt(key) > 0 ? value : []))))

import { writable } from 'svelte/store'
export const posts = writable({})
export const tags = writable({})
