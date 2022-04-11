export interface Friend {
  id: string // HTML id
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
    id: 'lensual',
    title: "神楽坂ニャン - Lensual's Space",
    href: 'https://lensual.space',
    descr: '優しい人になりたいです',
    avatar: 'https://secure.gravatar.com/avatar/4563b4a0921638620dac23fdd2fa7579?s=160&d=mm&r=g'
  },
  {
    id: 'test',
    title: 'testtest',
    href: 'https://kwaa.dev',
    descr: 'testtqsatsatsartsa',
    avatar: 'https://kwaa.dev/assets/any@512.webp'
  },
  {
    id: 'test2',
    title: 'testtest',
    href: 'https://kwaa.dev',
    descr: 'testtqsatsatsartsa',
    avatar: 'https://kwaa.dev/assets/any@512.webp'
  },
  {
    id: 'test3',
    title: 'testtest',
    href: 'https://kwaa.dev',
    descr: 'testtqsatsatsartsa',
    avatar: 'https://kwaa.dev/assets/any@512.webp'
  },
  {
    id: 'test4',
    title: 'testtest',
    href: 'https://kwaa.dev',
    descr: 'testtqsatsatsartsa',
    avatar: 'https://kwaa.dev/assets/any@512.webp'
  },
  {
    id: 'test5',
    title: 'testtest',
    href: 'https://kwaa.dev',
    descr: 'testtqsatsatsartsa',
    avatar: 'https://kwaa.dev/assets/any@512.webp'
  }
  // {
  //   title: 'testtest2',
  //   href: 'https://kwaa.dev',
  //   avatar: 'https://kwaa.dev/assets/any@512.webp'
  // },
  // {
  //   name: 'test3'
  // },
  // {
  //   name: 'test4'
  // },
  // {
  //   name: 'test5'
  // }
]
