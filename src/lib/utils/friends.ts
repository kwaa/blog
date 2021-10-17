import friends from '$lib/config/friends'

export type Friend = {
	avatar?: string
	name?: string
	url?: string
	title?: string
	descr?: string
	class?: string[]
}

const rnd = Math.random()

const fy = (a: Friend[], r = 0, c = a.length) => {
	while (c) (r = (rnd * c--) | 0), ([a[c], a[r]] = [a[r], a[c]])
	return a
}

export const allFriends = fy(friends)
