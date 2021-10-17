interface Sites {
	title: string
	subtitle?: string
	lang?: string
	descr?: string
	author: {
		name: string
	} & {
		[key: string]: string
	}
	url: string
	themeColor?: string
	since?: string
}

const site: Sites = {
	title: './kwaa.dev',
	subtitle: 'Subtitle',
	lang: 'zh',
	descr: 'this is descr',
	author: {
		name: '藍',
		avatar: '',
		email: '',
		bio: ''
	},
	url: import.meta.env.VITE_DOMAIN_URL ?? 'https://urara-test.netlify.app',
	themeColor: '#3D4451',
	since: '2019'
}

export { site as default }
