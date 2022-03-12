export interface Friend {
  href?: string // URL
  html?: string // HTML
  title?: string // 标题
  descr?: string // 描述
  avatar?: string // 头像
  name?: string // backwards compatibility
  rel?: string // XFN, contact / acquaintance / friend
}

export const friends: Friend[] = [
  {
    title: "神楽坂ニャン - Lensual's Space",
    href: 'https://lensual.space',
    descr: '優しい人になりたいです',
    avatar: 'https://secure.gravatar.com/avatar/4563b4a0921638620dac23fdd2fa7579?s=160&d=mm&r=g'
  },
  {
    title: 'testtest',
    href: 'https://kwaa.dev',
    descr: 'testtqsatsatsartsa',
    avatar: 'https://kwaa.dev/files/icon@512.webp'
  },
  {
    title: 'testtest2',
    href: 'https://kwaa.dev',
    avatar: 'https://kwaa.dev/files/icon@512.webp'
  },
  {
    name: 'test3'
  },
  {
    name: 'test4'
  },
  {
    name: 'test5'
  }
]
