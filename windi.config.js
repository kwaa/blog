import { defineConfig } from 'vite-plugin-windicss'
import { transform } from 'windicss/helpers'
// import colors from 'windicss/colors'
// import animations from '@windicss/plugin-animations'
import filters from 'windicss/plugin/filters'
import typography from 'windicss/plugin/typography'
import daisyColors from 'daisyui/colors/index.js'

export default defineConfig({
	// darkMode: 'class',
	safelist: 'animate-pulse',
	// attributify: true,
	// extract: {
	// 	include: ['src/**/*.{vue,html,jsx,tsx}'],
	// 	exclude: ['node_modules', '.git'],
	// },
	// preflight: {
	// 	enableAll: true
	// },
	theme: {
		extend: {
			// typography: theme => ({
			// 	DEFAULT: {
			// 		css: {
			// 			// h2: {
			// 			// 	fontSize: em(24, 16),
			// 			// }
			// 		}
			// 	}
			// }),
			// typography: theme => ({
			// 	urara: {
			// 		css: [
			// 			{
			// 				a: {
			// 					color: theme('colors.nord10', colors.nord10),
			// 					// textDecoration: 'underline',
			// 					fontWeight: '500'
			// 				}
			// 			}
			// 		]
			// 	}
			// }),
			colors: {
				...daisyColors,
				nord0: '#2E3440',
				nord1: '#3B4252',
				nord2: '#434C5E',
				nord3: '#4C566A',
				nord4: '#D8DEE9',
				nord5: '#E5E9F0',
				nord6: '#ECEFF4',
				nord7: '#8FBCBB',
				nord8: '#88C0D0',
				nord9: '#81A1C1',
				nord10: '#5E81AC',
				nord11: '#BF616A',
				nord12: '#D08770',
				nord13: '#EBCB8B',
				nord14: '#A3BE8C',
				nord15: '#B48EAD',
				// 'nord00': '#242933',
				// 'nord66': '#F6F8FA',
				nord61: '#F2F4F8',
				nord81: '#79B8CA',
				nord91: '#7B88A1',
				nord92: '#ABB9CF'
			}
		}
	},
	variants: {},
	plugins: [
		// animations,
		filters,
		typography,
		transform('daisyui')
	],
	daisyui: {
		themes: [
			'light',
			'dark',
			'cupcake',
			'emerald',
			'valentine',
			'synthwave',
			'halloween',
			'aqua',
			'dracula'
		]
	}
})
