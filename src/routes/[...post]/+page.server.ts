import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'
import { genPosts } from '$lib/utils/posts'

export const load = async ({ params }): PageServerLoad => {
  const posts = genPosts()
  const post = posts.find(post => params.post === post.path.slice(1))
  if (!post) throw error(404, 'Not Found')
  else {
    const index = posts.findIndex(post => params.post === post.path.slice(1))
    const prev = posts
      .slice(0, index)
      .reverse()
      .find(post => !post.flags?.includes('unlisted'))
    const next = posts.slice(index + 1).find(post => !post.flags?.includes('unlisted'))
    return {
      post: {
        ...post,
        prev,
        next
      }
    }
  }
}
