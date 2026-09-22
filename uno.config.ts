import { defineConfig, presetWind4 } from 'unocss'

export default defineConfig({
  presets: [
    // keep UA defaults (bearblog-style element styling relies on them)
    presetWind4({ preflights: { reset: false } }),
  ],
})
