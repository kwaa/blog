// @ts-ignore Could not find a declaration file for module '@tailwindcss/typography'.
import typography from '@tailwindcss/typography'
// @ts-ignore Could not find a declaration file for module 'daisyui'.
import daisyui from 'daisyui'

export default /** @type {import('tailwindcss/tailwind-config').TailwindConfig} */ {
  content: ['./src/**/*.{html,md,js,svelte,ts}'],
  theme: {
    extend: {}
  },
  plugins: [typography, daisyui],
  daisyui: {
    themes: [
      {
        // Nord Remix Light
        light: {
          primary: '#88C0D0', // nord8
          'primary-content': '#ECEFF4', // nord6
          secondary: '#5E81AC', // nord10
          'secondary-content': '#ECEFF4', // nord6
          accent: '#81A1C1', // nord9
          'accent-content': '#ECEFF4', // nord6
          neutral: '#3B4252', // nord1
          'neutral-content': '#D8DEE9', // nord4
          'base-100': '#FFFFFF', // white
          'base-200': '#ECEFF4', // nord6
          'base-300': '#E5E9F0', // nord5
          'base-content': '#2E3440', // nord0
          info: '#B48EAD', // nord15
          success: '#A3BE8C', // nord14
          warning: '#EBCB8B', // nord13
          error: '#BF616A' // nord11
        }
      },
      {
        // Nord Remix Dark
        dark: {
          primary: '#88C0D0', // nord8
          'primary-content': '#ECEFF4', // nord6
          secondary: '#5E81AC', // nord10
          'secondary-content': '#ECEFF4', // nord6
          accent: '#81A1C1', // nord9
          'accent-content': '#ECEFF4', // nord6
          neutral: '#3B4252', // nord1
          'neutral-content': '#D8DEE9', // nord4
          'base-100': '#2E3440', // nord0
          'base-200': '#292E39', // nordtheme.com
          'base-300': '#242933', // nordtheme.com
          'base-content': '#D8DEE9', // nord4
          info: '#B48EAD', // nord15
          success: '#A3BE8C', // nord14
          warning: '#EBCB8B', // nord13
          error: '#BF616A' // nord11
        }
      },
      // 'light',
      // 'dark',
      'cupcake',
      'emerald',
      'valentine',
      'synthwave',
      'halloween',
      'aqua',
      'dracula',
      'winter'
    ]
  }
}
