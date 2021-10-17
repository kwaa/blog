import { allPosts } from '$lib/utils/posts'

const tags: Record<string, number> = {}

allPosts.forEach(post =>
	post.tags
		? post.tags.forEach(tag => {
				if (!tags[tag]) tags[tag] = 0
				tags[tag] += 1
		  })
		: ''
)

export const allTags = Object.fromEntries(Object.entries(tags).sort(([, a], [, b]) => a - b))
