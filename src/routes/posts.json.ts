import type { EndpointOutput } from '@sveltejs/kit'
import { genPosts } from '$lib/utils/posts'

const posts = genPosts()

// const check = (value: any): value is Record<number, Urara.Post[]> => {
//   console.log(value[0])
//   return value
// }

// const replacer = (key: any, value: any) =>
//   // check(value)
//   value instanceof Object && !(value instanceof Array)
//     ? // ? Object.fromEntries(Object.entries(value).sort(([a], [b]) => parseInt(a) - parseInt(b)).slice(0,2))
//       Object.entries(value)
//         .sort(([a], [b]) => parseInt(a) - parseInt(b))
//         .slice(0, 4)
//         .reduce((acc, [k, v]) => {
//           acc[k] = v
//           return acc
//         }, {} as Record<number, Urara.Post[]>)
//     : value

// const stringify = (posts)
// value instanceof Object && !(value instanceof Array) ?
// 	Object.keys(value)
// 	.sort()
// 	.reduce((sorted, key) => {
// 		sorted[key] = value[key];
// 		return sorted
// 	}, {}) :
// 	value;

export const get = (): EndpointOutput => {
  return {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(posts, null, 2)
    // JSON.stringify(posts, replacer, 2)
  }
}
