interface Icon extends Record<string, string> {
	src: string
	sizes?: string
	type?: string
	purpose?: string
}

const icons: { [name: string]: Icon } = {
	favicon: {
		src: 'assets/icon@48.webp',
		sizes: '48x48',
		type: 'image/webp'
	},
	appleTouchIcon: {
	    src: 'assets/icon@180.webp',
		sizes: '180x180',
		type: 'image/webp'
	},
	px192: {
	    src: '/assets/icon@192.webp',
	    sizes: '192x192',
	    type: 'image/webp',
	    purpose: 'any'
	},
	px512: {
	    src: '/assets/icon@512.png',
	    sizes: '512x512',
	    type: 'image/png',
	    purpose: 'any'
	},
    maskable192: {
        src: '/assets/icon-maskable@192.webp',
	    sizes: '192x192',
	    type: 'image/webp',
	    purpose: 'maskable'
    },
    maskable512: {
        src: '/assets/icon-maskable@512.png',
	    sizes: '512x512',
	    type: 'image/png',
	    purpose: 'maskable'
    }
}

export { icons as default }