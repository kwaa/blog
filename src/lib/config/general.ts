import type { ThemeConfig, HeadConfig, HeaderConfig, FooterConfig, DateConfig, FeedConfig } from '$lib/types/general'

export const theme: ThemeConfig = [
  {
    name: 'light',
    text: '🌕 Shiro'
  },
  {
    name: 'dark',
    text: '🌑 Kuro'
  },
  {
    name: 'cupcake',
    text: '🧁 Cupcake'
  },
  {
    name: 'emerald',
    text: '✳️ Emerald'
  },
  {
    name: 'valentine',
    text: '🌸 Valentine'
  },
  {
    name: 'synthwave',
    text: '🌃 Synthwave'
  },
  {
    name: 'halloween',
    text: '🎃 Halloween'
  },
  {
    name: 'aqua',
    text: '💦 Aqua'
  },
  {
    name: 'dracula',
    text: '🧛 Dracula'
  },
  {
    name: 'winter',
    text: '❄️ Winter'
  }
]

export const head: HeadConfig = {
  custom: ({ dev }) =>
    dev
      ? []
      : [
          // IndieAuth
          '<link rel="authorization_endpoint" href="https://indieauth.com/auth">',
          '<link rel="token_endpoint" href="https://tokens.indieauth.com/token">',
          // Microsub
          '<link rel="microsub" href="https://aperture.p3k.io/microsub/741">',
          // Umami Analytics
          '<script defer data-do-not-track="true" data-website-id="ba1bafad-7768-4723-9395-5cad73a0bf87" src="https://umami.kwaa.dev/umami.js"></script>',
          // Block Baiduspider
          '<meta name="baiduspider" content="noindex, noarchive">'
        ],
  me: ['https://kwaa.moe/@kwa']
}

export const header: HeaderConfig = {
  search: {
    provider: 'duckduckgo'
  },
  nav: [
    {
      text: 'About',
      link: '/about'
    },
    {
      text: 'Projects',
      link: '/projects'
    },
    {
      text: 'Urara',
      children: [
        {
          text: 'Re: Introducing Urara',
          link: '/intro-urara/re'
        },
        {
          text: 'Introducing Urara',
          link: '/intro-urara'
        },
        {
          text: 'Urara 的 ToC (文章目录) 实现',
          link: '/intro-urara/toc'
        }
      ]
    },
    {
      text: 'Friends',
      link: '/friends'
    }
  ]
}

export const footer: FooterConfig = {
  nav: [
    {
      text: 'Feed',
      link: '/atom.xml'
    },
    {
      text: 'Sitemap',
      link: '/sitemap.xml'
    }
  ],
  html: '<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a><br><a href="https://xn--sr8hvo.ws/%F0%9F%8C%A4%E2%8C%9A%EF%B8%8F%F0%9F%92%A5/previous">⏮️</a><span>&nbsp;&nbsp;&nbsp;&nbsp;🕸💍&nbsp;&nbsp;&nbsp;&nbsp;</span><a href="https://xn--sr8hvo.ws/%F0%9F%8C%A4%E2%8C%9A%EF%B8%8F%F0%9F%92%A5/next">⏭️</a>'
}

export const date: DateConfig = {
  locales: 'en-US',
  options: {
    // weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Taipei'
  }
}

export const feed: FeedConfig = {
  hubs: ['https://pubsubhubbub.appspot.com', 'https://bridgy-fed.superfeedr.com']
}
