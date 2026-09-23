import type { RenderFunction } from 'astro-takumi'

import { createElement as h } from 'react'

import { site } from '../config'

const suffix = ` | ${site.title}`

export const renderOg: RenderFunction = ({ title }) => {
  const pageTitle = title.endsWith(suffix)
    ? title.slice(0, -suffix.length)
    : title

  return Promise.resolve(
    h(
      'div',
      {
        style: {
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Noto Sans SC',
          height: '100%',
          justifyContent: 'space-between',
          padding: '72px 80px',
          width: '100%',
        },
      },
      h(
        'div',
        { style: { alignItems: 'center', display: 'flex' } },
        h('div', {
          style: {
            backgroundColor: '#1f2328',
            borderRadius: '6px',
            height: '28px',
            marginRight: '16px',
            width: '28px',
          },
        }),
        h(
          'span',
          { style: { color: '#59636e', fontSize: '28px' } },
          'kwaa.dev',
        ),
      ),
      h(
        'div',
        {
          style: {
            color: '#1f2328',
            fontSize: '56px',
            fontWeight: 700,
            lineHeight: 1.3,
          },
        },
        pageTitle,
      ),
    ),
  )
}
