interface Friend extends Record<string, string> {
	title?: string
	descr?: string
	avatar?: string
	html?: string
}

const friends: Friend[] = [
	{
		name: '神楽坂ニャン',
		title: `Lensual's Space`,
		descr: '神楽坂ニャン – 優しい人になりたいです',
		avatar: 'https://secure.gravatar.com/avatar/4563b4a0921638620dac23fdd2fa7579?s=160&d=mm&r=g'
	},
	{
		name: 'test2'
	},
	{
		name: 'test3'
	},
	{
		name: 'test4'
	},
	{
		name: 'test5'
	}
]

export { friends as default }
