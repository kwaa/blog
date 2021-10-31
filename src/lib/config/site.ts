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
  protocol?: string
  domain?: string
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
    avatar: '',
    email: '',
    bio: ''
  },
  protocol: import.meta.env.URARA_SITE_PROTOCOL ?? 'https',
  domain: import.meta.env.URARA_SITE_DOMAIN ?? 'kwaa.dev',
  url: import.meta.env.URARA_SITE_DOMAIN ?? 'https://kwaa.dev',
  themeColor: '#3D4451',
  since: '2019'
}
