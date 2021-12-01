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

const bio = [
  '冬は良いけど夏は嫌<br><sub>——「夏に去りし君を想フ」</sub>',
  'ゴミ溜めで埋もれたまま、星空を眺めてるよ<br><sub>——「ぼくらはみんな意味不明」</sub>',
]

export const site: Site = {
  title: './kwaa.dev',
  subtitle: 'Subtitle',
  lang: 'zh',
  descr: '[DATA EXPUNGED]',
  author: {
    name: '藍',
    avatar: 'https://kwaa.dev/assets/maskable@512.webp',
    email: '',
    bio: bio[~~(Math.random()*bio.length)]
  },
  url: import.meta.env.URARA_SITE_URL ?? 'https://kwaa.dev',
  themeColor: '#3D4451',
  since: '2019'
}
