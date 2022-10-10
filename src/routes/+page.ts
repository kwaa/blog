import type { PageServerLoad } from './$types'
import { genPosts, genTags } from '$lib/utils/posts'

export const load: PageServerLoad = async ({ data }) => {
  const posts = genPosts({ filterUnlisted: true })
  const tags = genTags(genPosts())
  return {
    ...data,
    posts,
    tags
  }
}
