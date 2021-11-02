interface Sites {
  title: string
  subtitle?: string
  lang?: string
  descr?: string
  author: {
    name: string
  } & {
    [key: string]: string
  }
  url: string
  themeColor?: string
  since?: string
}

export const site: Sites = {
  title: './kwaa.dev',
  subtitle: 'Subtitle',
  lang: 'zh',
  descr: '[DATA EXPUNGED]',
  author: {
    name: '藍',
    avatar: 'https://kwaa.dev/assets/any@512.webp',
    email: '',
    bio: ''
  },
  url: import.meta.env.URARA_SITE_URL ?? 'https://kwaa.dev',
  themeColor: '#3D4451',
  since: '2019'
}
