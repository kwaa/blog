// vite define config
import { defineConfig } from 'vite'
// vite plugin
import UnoCSS from 'unocss/vite'
import { presetTagify, presetIcons, extractorSvelte } from 'unocss'
import { sveltekit } from '@sveltejs/kit/vite'
import { SvelteKitPWA } from '@vite-pwa/sveltekit'
import type { ManifestEntry } from 'workbox-build'
// import { visualizer } from 'rollup-plugin-visualizer'
// postcss & tailwindcss
import TailwindCSS from 'tailwindcss'
import tailwindConfig from './tailwind.config'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

/** @see {@link https://github.com/vite-pwa/sveltekit/issues/16#issuecomment-1339657079} */
const manifestTransformStatic = async (manifestEntries: ManifestEntry[]) => ({
  manifest: manifestEntries
    .filter(({ url }) => url !== 'client/vite-manifest.json' && url !== 'prerendered/fallback.html')
    .map(e => {
      let url = e.url
      if (url.startsWith('/')) url = url.slice(1)
      if (url.startsWith('client/')) url = url.slice(7)
      if (url.startsWith('prerendered/pages/')) url = url.slice(18)
      if (url && url.endsWith('.html')) url = url === 'index.html' ? '' : `${url.substring(0, url.lastIndexOf('.'))}`
      e.url = '/' + url
      return e
    })
})

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
      manifestTransforms: [manifestTransformStatic]
    })
    // visualizer({
    //   emitFile: true,
    //   file: 'stats.html'
    // })
  ]
})
