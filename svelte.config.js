import preprocess from 'svelte-preprocess'
// import adapterAuto from '@sveltejs/adapter-auto'
import adapterNode from '@sveltejs/adapter-node'
import adapterStatic from '@sveltejs/adapter-static'
import adapterVercel from '@sveltejs/adapter-vercel'
import { VitePWA } from 'vite-plugin-pwa'
import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import postcss from './postcss.config.js'
import UnoCSS from 'unocss/vite'
import { extractorSvelte } from '@unocss/core'
import { presetIcons } from 'unocss'

export default /** @type {import('@sveltejs/kit').Config} */ {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [mdsvex(mdsvexConfig), preprocess()],
  kit: {
    adapter: Object.keys(process.env).some(key => ['VERCEL', 'CF_PAGES', 'NETLIFY'].includes(key))
      ? // ? adapterAuto()
        adapterVercel({ edge: true })
      : process.env.ADAPTER === 'node'
      ? adapterNode({ out: 'build' })
      : adapterStatic({
          pages: 'build',
          assets: 'build',
          fallback: null
        }),
    prerender: { default: true },
    vite: {
      mode: process.env.MODE || 'production',
      envPrefix: 'URARA_',
      css: { postcss },
      plugins: [
        UnoCSS({
          extractors: [extractorSvelte],
          presets: [
            presetIcons({
              customizations: {
                iconCustomizer: (_collection, _icon, props) => {
                  props.height = '1.5rem'
                  props.width = '1.5rem'
                  return props
                }
              }
            })
            // presetWebFonts({
            //   provider: 'google',
            //   fonts: {
            //     sans: 'Poppins',
            //     mono: 'Fira Code'
            //   }
            // })
          ]
        }),
        VitePWA({
          srcDir: './build',
          outDir: './.svelte-kit/output/client',
          registerType: 'autoUpdate',
          scope: '/',
          base: '/',
          workbox: {
            globPatterns: ['**/*.{js,css,html,png,webp,avif,svg,webmanifest}', 'index.html'],
            globIgnores: ['**/sw*', '**/workbox-*']
          }
        })
        // VitePWA({
        //   srcDir: './build',
        //   outDir: './.svelte-kit/output/client',
        //   registerType: 'autoUpdate',
        //   scope: '/',
        //   base: '/',
        //   manifest: false,
        //   workbox: {
        //     navigateFallback: '/',
        //     dontCacheBustURLsMatching: /-[a-f0-9]{8}\./,
        //     globDirectory: './build/',
        //     globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
        //     globIgnores: ['**/sw*', '**/workbox-*'],
        //     runtimeCaching: [
        //       {
        //         urlPattern: /(.*?)\.html/,
        //         handler: 'NetworkOnly',
        //         options: {
        //           cacheName: 'html-cache'
        //         }
        //       },
        //       {
        //         urlPattern: /(.*?)\.(js|json)/,
        //         handler: 'StaleWhileRevalidate',
        //         options: {
        //           cacheName: 'js-cache'
        //         }
        //       },
        //       {
        //         urlPattern: /(.*?)\.(png|jpe?g|svg|gif|webp|avif)/,
        //         handler: 'CacheFirst',
        //         options: {
        //           cacheName: 'image-cache'
        //         }
        //       }
        //     ]
        //   }
        // })
      ]
    }
  }
}
