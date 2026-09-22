export const site = {
  author: {
    avatar: '/assets/maskable@192.webp',
    metadata: [
      { link: 'https://github.com/kwaa', text: 'kwaa' },
      { link: 'https://t.me/kwaabot', text: '@kwaabot' },
      { link: 'https://matrix.to/#/@kwaa:matrix.org', text: '@kwaa:matrix.org' },
      { link: 'https://kwaa.dev/pgp/4734.pgp', text: '0x4444777733334444' },
    ],
    name: '藍+85CD',
    status: '🌌',
  },
  description: '[DATA EXPUNGED]',
  head: {
    me: ['https://kwaa.moe/@kwa'],
  },
  lang: 'zh',
  themeColor: '#3D4451',
  title: './kwaa.dev',
  url: 'https://kwaa.dev',
}

export const header = {
  nav: [
    { link: '/about', text: 'About' },
    { link: '/projects', text: 'Projects' },
    {
      children: [
        { link: '/intro-urara/re', text: 'Re: Introducing Urara' },
        { link: '/intro-urara', text: 'Introducing Urara' },
        { link: '/intro-urara/toc', text: 'Urara 的 ToC (文章目录) 实现' },
      ],
      text: 'Urara',
    },
    { link: '/friends', text: 'Friends' },
    { link: '/tags', text: 'Tags' },
  ],
}

export const footer = {
  html: '<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a><br><a href="https://xn--sr8hvo.ws/%F0%9F%8C%A4%E2%8C%9A%EF%B8%8F%F0%9F%92%A5/previous">⏮\uFE0F</a><span>&nbsp;&nbsp;&nbsp;&nbsp;🕸💍&nbsp;&nbsp;&nbsp;&nbsp;</span><a href="https://xn--sr8hvo.ws/%F0%9F%8C%A4%E2%8C%9A%EF%B8%8F%F0%9F%92%A5/next">⏭\uFE0F</a>',
  nav: [
    { link: '/atom.xml', text: 'Feed' },
    { link: '/sitemap.xml', text: 'Sitemap' },
  ],
}

export const date = {
  locales: 'en-US',
  options: {
    day: 'numeric',
    month: 'long',
    timeZone: 'Asia/Taipei',
    year: 'numeric',
  } satisfies Intl.DateTimeFormatOptions,
}

export const feed = {
  hubs: ['https://pubsubhubbub.appspot.com', 'https://bridgy-fed.superfeedr.com'],
}

export const giscus = {
  category: 'General',
  categoryId: 'DIC_kwDOENg-Ys4CAvDm',
  lang: 'zh-CN',
  reactionsEnabled: true,
  repo: 'kwaa/comments',
  repoId: 'MDEwOlJlcG9zaXRvcnkyODI2MDcyMDI=',
  theme: 'preferred_color_scheme',
}

export interface Friend {
  avatar?: string
  descr?: string
  id: string
  link?: string
  name?: string
  rel?: string
  title?: string
}

export const friends: Friend[] = [
  {
    avatar:
      'https://secure.gravatar.com/avatar/4563b4a0921638620dac23fdd2fa7579?s=160&d=mm&r=g',
    descr: '優しい人になりたいです',
    id: 'lensual',
    link: 'https://lensual.space',
    name: '神楽坂ニャン',
    rel: 'friend',
    title: 'Lensual\'s Space',
  },
  {
    avatar: 'https://blog.debula.ml/usr/uploads/violet.jpg',
    descr: '月亮一直跟着我走，它迷路了吗？',
    id: 'debula',
    link: 'https://blog.debula.ml',
    name: '本宝宝',
    rel: 'friend',
    title: '秘密花园',
  },
  {
    avatar:
      'https://rss3.mypinata.cloud/ipfs/QmcvPuCTeNzcwuyNUKsapibsfALsQc7mqyA3BxfnozPydF',
    descr: '以瓠為樽而浮乎江湖',
    id: 'dylanwu',
    link: 'https://blog.dylanwu.space',
    name: 'DylanWu',
    rel: 'friend',
    title: '瓠樽',
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/91365763',
    descr: 'Full-stack wizard.',
    id: 'sevichecc',
    link: 'https://sevic.me',
    name: 'Sevi.C',
    rel: 'friend',
    title: 'sevic.me',
  },
]
