import preprocess from 'svelte-preprocess'
import adapterStatic from '@sveltejs/adapter-static'
import adapterWorkers from '@sveltejs/adapter-cloudflare-workers'
import WindiCSS from 'vite-plugin-windicss'
import { mdsvex } from 'mdsvex'
import { mdsvexConfig } from './mdsvex.config.js'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [mdsvex(mdsvexConfig), preprocess()],
	kit: {
		adapter: process.env.MODE === 'workers'
			? adapterWorkers()
			: adapterStatic({
				pages: 'build',
				assets: 'build',
				fallback: null
			}),
		// adapter: adapterNode({
		// 	out: 'build',
		// 	precompress: false,
		// 	env: {
		// 		host: '0.0.0.0',
		// 		port: '3000'
		// 	}
		// }),
		// adapter: adapterStatic({
		// 	pages: 'build',
		// 	assets: 'build',
		// 	// fallback: null
		// }),
		// adapter: adapterNetlify(),
		// hydrate the <div id="svelte"> element in src/app.html
		target: 'body',
		vite: {
			mode: process.env.MODE || 'development',
			plugins: [
				WindiCSS({
					config: 'windi.config.js',
					transformCSS: 'pre',
					scan: {
						fileExtensions: ['svelte', 'svx', 'md', 'js', 'ts']
					}
				})
			]
		}
	}
}

export default config
