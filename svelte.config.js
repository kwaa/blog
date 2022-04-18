import preprocess from 'svelte-preprocess'
import adapterAuto from '@sveltejs/adapter-auto'
import adapterNode from '@sveltejs/adapter-node'
import adapterStatic from '@sveltejs/adapter-static'
import Icons from 'unplugin-icons/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import postcss from './postcss.config.js'

export default /** @type {import('@sveltejs/kit').Config} */ {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [mdsvex(mdsvexConfig), preprocess()],
  kit: {
    adapter: Object.keys(process.env).some(key => ['VERCEL', 'CF_PAGES', 'NETLIFY'].includes(key))
      ? adapterAuto()
      : process.env.ADAPTER === 'node'
      ? adapterNode({ out: 'build' })
      : adapterStatic({
          pages: 'build',
          assets: 'build',
          fallback: null
        }),
    csp: { mode: 'auto' },
    prerender: { default: true },
    vite: {
      build: {
        rollupOptions: {
          output: {
            manualChunks: undefined
          }
        }
      },
      mode: process.env.MODE || 'production',
      envPrefix: 'URARA_',
      css: { postcss },
      plugins: [
        Icons({
          autoInstall: true,
          compiler: 'svelte',
          defaultClass: 'inline-block w-6 h-6'
        }),
        VitePWA({
          srcDir: './build',
          outDir: './.svelte-kit/output/client',
          registerType: 'autoUpdate',
          manifest: false,
          workbox: {
            navigateFallback: '/',
            dontCacheBustURLsMatching: /-[a-f0-9]{8}\./,
            globDirectory: './build/',
            globPatterns: ['robots.txt', '**/*.{js,css,html,ico,png,svg,webmanifest}'],
            globIgnores: ['**/sw*', '**/workbox-*']
          }
        })
      ]
    }
  }
}
