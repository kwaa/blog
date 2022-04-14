import type { ThemeConfig, HeadConfig, HeaderConfig, FooterConfig, DateConfig, FeedConfig } from '$lib/types/general'

export const theme: ThemeConfig = [
  {
    name: 'light',
    text: '🌕 Light'
  },
  {
    name: 'dark',
    text: '🌑 Dark'
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
  custom: {
    prod: [
      // Webmention.io
      // '<link rel="webmention" href="https://webmention.io/kwaa.dev/webmention" />',
      // '<link rel="pingback" href="https://webmention.io/kwaa.dev/xmlrpc" />',
      // IndieAuth
      '<link rel="authorization_endpoint" href="https://indieauth.com/auth">',
      '<link rel="token_endpoint" href="https://tokens.indieauth.com/token">',
      // Umami Analytics
      '<script async defer data-do-not-track="true" data-website-id="ba1bafad-7768-4723-9395-5cad73a0bf87" src="https://umami.kwaa.dev/umami.js"></script>',
      // Block Baiduspider
      '<meta name="baiduspider" content="noindex">'
    ]
  },
  relMe: ['https://kwaa.moe/@kwa']
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
      text: 'Urara',
      children: [
        {
          text: 'Re: Introducting Urara',
          link: '/intro-urara/re'
        },
        {
          text: 'Introducting Urara',
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
  html: '<span>All original text is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a></span>'
}

export const date: DateConfig = {
  toPublishedString: {
    locales: 'ja-JP',
    options: {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    }
  },
  toUpdatedString: {
    locales: 'ja-JP',
    options: {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    }
  }
}

export const feed: FeedConfig = {
  hub: ['https://pubsubhubbub.appspot.com', 'https://bridgy-fed.superfeedr.com']
}
