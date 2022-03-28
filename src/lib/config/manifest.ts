import { site } from '$lib/config/site'
import { icon } from '$lib/config/icon'
import { config as headerConfig } from '$lib/config/header'

export const manifest = {
  name: site.title,
  shortName: site.title,
  lang: site.lang,
  description: site.descr,
  id: `${site.url}/`,
  startUrl: '/',
  scope: '/',
  display: 'standalone',
  orientation: 'portrait',
  backgroundColor: site.themeColor,
  themeColor: site.themeColor,
  icons: [...Object.values(icon).slice(2)],
  shortcuts: Object.entries(headerConfig.nav).map(([url, name]) => ({ name, url }))
}
