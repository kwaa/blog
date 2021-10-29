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

const site: Sites = {
  title: './kwaa.dev',
  subtitle: 'Subtitle',
  lang: 'zh',
  descr: '[DATA EXPUNGED]',
  author: {
    name: '藍',
    avatar: '',
    email: '',
    bio: ''
  },
  url: import.meta.env.URARA_SITE_DOMAIN ?? 'https://kwaa.dev',
  themeColor: '#3D4451',
  since: '2019'
}

export { site as default }
