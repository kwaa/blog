import { defineConfig } from '@moeru/eslint-config'

export default defineConfig({
  astro: true,
  ignores: ['public/**', 'dist/**', 'src/content/**'],
  typescript: true,
})
