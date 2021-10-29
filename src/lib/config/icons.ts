interface Icon extends Record<string, string> {
  src: string
  sizes?: string
  type?: string
  purpose?: string
}

const icons: { [name: string]: Icon } = {
  favicon: {
    src: '/files/icon@48.webp',
    sizes: '48x48',
    type: 'image/webp'
  },
  appleTouchIcon: {
    src: '/files/icon@180.webp',
    sizes: '180x180',
    type: 'image/webp'
  },
  px192: {
    src: '/files/icon@192.webp',
    sizes: '192x192',
    type: 'image/webp',
    purpose: 'any'
  },
  px512: {
    src: '/files/icon@512.png',
    sizes: '512x512',
    type: 'image/png',
    purpose: 'any'
  },
  maskable192: {
    src: '/files/icon-maskable@192.webp',
    sizes: '192x192',
    type: 'image/webp',
    purpose: 'maskable'
  },
  maskable512: {
    src: '/files/icon-maskable@512.png',
    sizes: '512x512',
    type: 'image/png',
    purpose: 'maskable'
  }
}

export { icons as default }
