interface Site {
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

export const site: Site = {
  title: './kwaa.dev',
  subtitle: 'Subtitle',
  lang: 'zh',
  descr: '[DATA EXPUNGED]',
  author: {
    name: '藍',
    avatar: 'https://kwaa.dev/assets/maskable@512.webp',
    email: '',
    bio: '冬は良いけど夏は嫌'
  },
  url: import.meta.env.URARA_SITE_URL ?? 'https://kwaa.dev',
  themeColor: '#3D4451',
  since: '2019'
}
