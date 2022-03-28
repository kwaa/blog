export const config = {
  search: {
    enable: 'duckduckgo'
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
          text: 'Introducting Urara',
          link: '/intro-urara'
        },
        {
          text: 'Urara 的 ToC (文章目录) 实现',
          link: '/intro-urara/toc'
        }
        // {
        //   text: 'Re: Introducting Urara',
        //   link: '/intro-urara/re'
        // }
      ]
    },
    {
      text: 'Friends',
      link: '/friends'
    }
  ]
}
