import type { SiteConfig } from '$lib/types/site'

const bio = [
  'じゃあ名前考えようか<br>「ゆめ」とかどう？可愛いでしょ？<br><sub>——「ゆめゆめ」</sub>',
  '冬は良いけど夏は嫌<br><sub>——「夏に去りし君を想フ」</sub>',
  'ゴミ溜めで埋もれたまま、星空を眺めてるよ<br><sub>——「ぼくらはみんな意味不明」</sub>',
  '薄氷を履み回れ踊れ、醒！<br><sub>——「ムーンウォークフィーバー」</sub>',
  'ちょっとは上手になれたかな？<br><sub>——「私の時間」</sub>',
  'どこまで漸近しても<br>ゼロじゃない<br><sub>——「Unfragment」</sub>',
  'だからバイバイ<br>"むかしむかしのきょうのぼく"<br><sub>——「むかしむかしのきょうのぼく」</sub>',
  'いま歌うから<br>照らしてよね<br>スピカ<br><sub>——「SPiCa」</sub>',
  '甘いのもいいと思うけれど苦いのも嫌いじゃない<br><sub>——「え？あぁ、そう。」</sub>',
  '今日も西武線でぽつりと<br>イヤフォンに自分閉じ込めて<br><sub>——「八日目、雨が止む前に。」</sub>',
  'もうどうかしたいと思うくせに<br>僕はどうもしないままで<br><sub>——「メリュー」</sub>',
  '透明な君は<br>僕を指差してた―。<br><sub>——「少女レイ」</sub>',
  '明日も僕は夢うつつ<br>このまま僕は消えていいのに<br><sub>——「自傷無色」</sub>',
  'それはさあ... それはさあ、それがさあ！<br>逃げ切ったつもりなの？<br><sub>——「脳内革命ガール」</sub>',
  "声が無くたって、届かなくたって、今もずっと叫んでいる。<br>聞こえますか？私は生きている。<br><sub>——「M'AIDER遭難ガール」</sub>"
]

export const site: SiteConfig = {
  protocol: 'https://',
  domain: 'kwaa.dev',
  title: './kwaa.dev',
  lang: 'zh',
  description: '[DATA EXPUNGED]',
  author: {
    name: '藍+85CD',
    avatar: 'https://kwaa.dev/assets/maskable@192.webp',
    status: '🌌',
    bio: bio[~~(Math.random() * bio.length)],
    metadata: [
      {
        // text: 'kwaa',
        icon: 'i-simple-icons-github',
        link: 'https://github.com/kwaa'
      },
      {
        // text: '@kwaabot',
        icon: 'i-simple-icons-telegram',
        link: 'https://t.me/kwaabot'
      },
      {
        // text: '@kwaa:matrix.org',
        icon: 'i-simple-icons-element',
        link: 'https://matrix.to/#/@kwaa:matrix.org'
      },
      {
        // text: '0x4444777733334444',
        icon: 'i-simple-icons-gnuprivacyguard',
        link: 'https://kwaa.dev/pgp/4734.pgp',
        rel: 'pgpkey'
      }
    ]
  },
  themeColor: '#3D4451'
}
