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
  },
  {
    id: 'debula',
    rel: 'friend',
    title: '秘密花园',
    name: '本宝宝',
    link: 'https://blog.debula.ml',
    descr: '月亮一直跟着我走，它迷路了吗？',
    avatar: 'https://blog.debula.ml/usr/uploads/violet.jpg'
  },
  {
    id: 'dylanwu',
    rel: 'friend',
    title: '瓠樽',
    name: 'DylanWu',
    link: 'https://blog.dylanwu.space',
    descr: '以瓠為樽而浮乎江湖',
    avatar: 'https://rss3.mypinata.cloud/ipfs/QmcvPuCTeNzcwuyNUKsapibsfALsQc7mqyA3BxfnozPydF'
  },
  {
    id: 'sevichecc',
    rel: 'friend',
    title: 'sevic.me',
    name: 'Sevi.C',
    link: 'https://sevic.me',
    descr: 'Full-stack wizard.',
    avatar: 'https://avatars.githubusercontent.com/u/91365763'
  },
  {
    id: '0eac',
    rel: 'friend',
    title: '不分西东',
    name: '0EAC',
    link: 'https://www.0eac.com',
    descr: '梦里不分西东',
    avatar: 'https://www.0eac.com/favicon.png'
  }
  // {
  //   id: 'kwaa',
  //   rel: 'friend',
  //   link: 'https://kwaa.dev',
  //   html: `<div class="card w-screen max-w-[24rem] bg-base-100 bg-gradient-to-tr from-primary to-accent text-primary-content shadow-lg transition-shadow duration-500 hover:shadow-2xl">
  //     <div class="absolute top-4 rotate-6 text-4xl font-bold leading-tight opacity-10">藍+85CD<br />./kwaa.dev</div>
  //     <div class="card-body p-4">
  //       <div class="flex items-center gap-4">
  //         <div class="avatar mb-auto w-20 shrink-0">
  //           <img class="rounded-xl" style="image-rendering:pixelated" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAVFBMVEUAAADW29T///+5wcc4ODjz8OZVVVX/7MkVFRXtrpqTJiVHKxPZOjr/+/QICz3/07d1TCNErbkaSXtgERn59vb//OPSzMzuuwKZne20srL0mIyWGwWygNgKAAAAAXRSTlMAQObYZgAAAOtJREFUKM9djwuSwyAMQ2vsBDBJyK/tfu5/z5W6aYZUMB7QQwZuhwIkwnq7KIgqTFQJV3/USQX+OoE0fqfLIh0kCtKC31VGEEGqBezdydixfAARnNeRKZDmClE4mFE/gAKpTjFOcgEde01fa4wrDjRAlGNf7vdF5QKEzSJUCRpftmFwrbW6vEGYXwEzHzi2BvCF1ve9/7hvDSgqBJYQeHxrA4oqAskA9ocpwUkIkrvbnppvlNnMUkn+9B4r+CdAAACVM5yJnBnA9U+8wCzncPgRynP6V+WGIQZyzMWspwzrTEASSi4F/kHCy/4DaDYJuEU/v5oAAAAASUVORK5CYII=" alt="藍#+85CD" />
  //         </div>
  //         <div class="card-title flex-1 flex-col items-end gap-0">
  //           <span class="p-name text-right">藍+85CD</span>
  //           <span class="text-right opacity-50">./kwaa.dev</span>
  //         </div>
  //       </div>
  //       <div class="p-note prose opacity-70">ゴミ溜めで埋もれたまま、星空を眺めてるよ</div>
  //     </div>
  //   </div>`
  // },
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
