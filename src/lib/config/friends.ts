export interface FriendOld {
  // hCard+XFN
  id: string // HTML id
  rel?: string // XFN, contact / acquaintance / friend
  link?: string // URL
  html?: string // HTML
  title?: string // 标题
  descr?: string // 描述
  avatar?: string // 头像
  name?: string // backwards compatibility
}

export type Friend = {
  id: string // HTML id
  rel?: string // XHTML Friends Network
  link?: string // URL
  html?: string // Custom HTML

  title?: string // 标题
  name?: string // 人名
  avatar?: string // 头像
  descr?: string // 描述
  class?: {
    avatar?: string // 头像类名
    img?: string // 图片类名
  }
}

export const friends: Friend[] = [
  {
    id: 'lensual',
    rel: 'friend',
    title: "Lensual's Space",
    name: '神楽坂ニャン',
    link: 'https://lensual.space',
    descr: '優しい人になりたいです',
    avatar: 'https://secure.gravatar.com/avatar/4563b4a0921638620dac23fdd2fa7579?s=160&d=mm&r=g'
  }
  // {
  //   id: 'test',
  //   title: 'testtest',
  //   link: 'https://kwaa.dev',
  //   descr: 'testtqsatsatsartsa',
  //   avatar: 'https://kwaa.dev/assets/any@512.webp'
  // },
  // {
  //   id: 'test2',
  //   title: 'testtest',
  //   link: 'https://kwaa.dev',
  //   descr: 'testtqsatsatsartsa',
  //   avatar: 'https://kwaa.dev/assets/any@512.webp'
  // },
  // {
  //   id: 'test3',
  //   title: 'testtest',
  //   link: 'https://kwaa.dev',
  //   descr: 'testtqsatsatsartsa',
  //   avatar: 'https://kwaa.dev/assets/any@512.webp'
  // },
  // {
  //   id: 'test4',
  //   name: ':hatsunemiku: 藍 :hatsunemiku:',
  //   title: '~/kwaa.moe',
  //   link: 'https://kwaa.moe/@kwa',
  //   descr: 'ゴミ溜めで埋もれたまま、星空を眺めてるよ',
  //   avatar: 'https://kwaa.moe/media/975fc04911e242147be77b60b93839b6dd1a317112717562944e3c7aef1f0203.png'
  // },
  // {
  //   id: 'test5',
  //   name: '藍',
  //   title: '藍藍藍藍藍',
  //   link: 'https://kwaa.dev',
  //   descr: 'without avatar'
  // },
  // {
  //   id: 'test6',
  //   title: 'Test6',
  //   name: 'test6'
  // }
]
