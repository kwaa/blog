// vite define config
import { defineConfig } from 'vite'
// vite plugin
import UnoCSS from 'unocss/vite'
import { presetTagify, presetIcons } from 'unocss'
import extractorSvelte from '@unocss/extractor-svelte'
import { sveltekit } from '@sveltejs/kit/vite'
import { SvelteKitPWA } from '@vite-pwa/sveltekit'
// import { visualizer } from 'rollup-plugin-visualizer'
// postcss & tailwindcss
import TailwindCSS from 'tailwindcss'
import tailwindConfig from './tailwind.config'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

export default defineConfig({
  envPrefix: 'URARA_',
  css: {
    postcss: {
      plugins: [
        TailwindCSS(tailwindConfig as any) as any,
        autoprefixer(),
        ...(process.env.NODE_ENV === 'production'
          ? [
            cssnano({
              preset: ['default', { discardComments: { removeAll: true } }]
            })
          ]
          : [])
      ]
    }
  },
  plugins: [
    UnoCSS({
      include: [/\.svelte$/, /\.md?$/, /\.ts$/],
      extractors: [extractorSvelte],
      presets: [
        presetTagify({
          extraProperties: (matched: string) => (matched.startsWith('i-') ? { display: 'inline-block' } : {})
        }),
        presetIcons({ scale: 1.5 })
      ]
    }),
    // VitePWA({
    //   srcDir: './build',
    //   outDir: './.svelte-kit/output/client',
    //   registerType: 'autoUpdate',
    //   base: '/',
    //   scope: '/',
    //   workbox: {
    //     dontCacheBustURLsMatching: /-[a-f0-9]{8}\./,
    //     globDirectory: './build/',
    //     globPatterns: ['robots.txt', '**/*.{js,css,html,ico,png,svg,webmanifest}'],
    //     globIgnores: ['**/sw*', '**/workbox-*']
    //   }
    // }),
    sveltekit(),
    SvelteKitPWA({
      outDir: '.svelte-kit/output/client',
      registerType: 'autoUpdate',
      manifest: false,
      scope: '/',
      workbox: {
        globPatterns: ['robots.txt', 'posts.json', '**/*.{js,css,html,svg,ico,png,webp,avif}'],
        globIgnores: ['**/sw*', '**/workbox-*', '*.xml', 'feed.json', 'tags.json']
      },
      kit: {
        trailingSlash: 'always'
      },
    })
    // visualizer({
    //   emitFile: true,
    //   file: 'stats.html'
    // })
  ]
})
