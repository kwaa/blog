import type { PageLoad } from '@sveltejs/kit'
import { genPosts } from '$lib/utils/posts'

export const load = async ({ data, params }): PageLoad => {
  const posts = genPosts({ postContent: true })
  const { content } = posts.find(post => params.post === post.path.slice(1))
  return {
    post: {
      ...data.post,
      content
    }
  }
}
