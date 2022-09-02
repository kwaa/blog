// vite define config
import { type Plugin, defineConfig, resolveConfig } from 'vite'
// vite plugin
import UnoCSS from 'unocss/vite'
import { presetTagify, presetIcons, extractorSvelte } from 'unocss'
import { VitePWA } from 'vite-plugin-pwa'
import { sveltekit } from '@sveltejs/kit/vite'
// postcss & tailwindcss
import TailwindCSS from 'tailwindcss'
import tailwindConfig from './tailwind.config'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
// rebuild pwa
import { copyFileSync } from 'fs'

const pwaConfiguration = {
  srcDir: './build',
  outDir: './.svelte-kit/output/client',
  registerType: 'autoUpdate',
  base: '/',
  scope: '/',
  workbox: {
    dontCacheBustURLsMatching: /-[a-f0-9]{8}\./,
    globDirectory: './build/',
    globPatterns: ['robots.txt', '**/*.{js,css,html,ico,png,svg,webmanifest}'],
    globIgnores: ['**/sw*', '**/workbox-*']
  }
} as const

const webmanifestDestinations = ['./.svelte-kit/output/client/', './build/']

const swDestinations = ['./build/']

const RebuildPWA = async (): Plugin => ({
  name: 'rebuild-pwa',
  writeBundle: async () => {
    const config = await resolveConfig(
      {
        plugins: [VitePWA(pwaConfiguration)]
      },
      'build',
      'production'
    )
    const pwaPlugin = config.plugins.find(i => i.name === 'vite-plugin-pwa')?.api
    if (pwaPlugin?.generateSW) {
      console.log('Generating PWA...')
      await pwaPlugin.generateSW()
      webmanifestDestinations.forEach(d => {
        copyFileSync('./.svelte-kit/output/client/_app/manifest.webmanifest', `${d}/manifest.webmanifest`)
      })
      // don't copy workbox, SvelteKit will copy it
      swDestinations.forEach(d => {
        copyFileSync('./.svelte-kit/output/client/sw.js', `${d}/sw.js`)
      })
      console.log('Generation of PWA complete')
    }
  }
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
    VitePWA(pwaConfiguration),
    RebuildPWA(),
    sveltekit()
  ]
})
