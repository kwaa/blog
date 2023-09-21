// sveltekit config type
import type { Config } from '@sveltejs/kit'
// svelte adapter
import adapterNode from '@sveltejs/adapter-node'
import adapterStatic from '@sveltejs/adapter-static'
import adapterVercel from '@sveltejs/adapter-vercel'
// svelte preprocessor
import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import preprocess from 'svelte-preprocess'

export default {
  extensions: ['.svelte', ...(mdsvexConfig.extensions as string[])],
  preprocess: [mdsvex(mdsvexConfig), preprocess({ preserve: ['partytown'] })],
  kit: {
    adapter: Object.keys(process.env).some(key => ['VERCEL', 'CF_PAGES', 'NETLIFY'].includes(key))
      ? adapterVercel()
      // ? adapterVercel({ edge: true })
      : process.env.ADAPTER === 'node'
        ? adapterNode({ out: 'build' })
        : adapterStatic({
          pages: 'build',
          assets: 'build',
          fallback: undefined
        }),
    prerender: {
      handleMissingId: 'warn'
    },
    csp: { mode: 'auto' }
  }
} satisfies Config
