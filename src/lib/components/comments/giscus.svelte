<!-- <script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { site } from '$lib/config/site'
  import type { GiscusConfig } from '$lib/types/post'
  export let config: GiscusConfig
  const sendTheme = (
    el = getComputedStyle(document.documentElement),
    iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame'),
    vars = ['p', 'pf', 'pc', 's', 'sf', 'sc', 'a', 'af', 'ac', 'n', 'nf', 'nc', 'b1', 'b2', 'b3', 'bc', 'in', 'su', 'wa', 'er']
  ) =>
    iframe.contentWindow.postMessage(
      {
        giscus: {
          setConfig: {
            css: `:root ${JSON.stringify(
              Object.fromEntries(vars.map(v => [`--${v}`, el.getPropertyValue(`--${v}`).slice(1)] ?? []))
            )
              .replaceAll('"', '')
              .replaceAll(',', '; ')
              .replaceAll(':', ': ')}`
          }
        }
      },
      config.src.replace('/client.js', '') ?? 'https://giscus.app'
    )

  const observer = new MutationObserver(mutationList =>
    mutationList.forEach(mutation => {
      if (mutation.type === 'childList') {
        document.getElementById('giscus-loading').remove()
        setTimeout(() => sendTheme(), 5000)
      } else {
        sendTheme()
      }
    })
  )

  onMount(() => {
    const s = document.createElement('script')
    s.setAttribute('data-repo', config.repo)
    s.setAttribute('data-mapping', 'pathname')
    s.setAttribute('data-reactions-enabled', config.reactionsEnabled !== false ? '1' : '0')
    s.setAttribute('data-emit-metadata', config.emitMetadata === true ? '1' : '0')
    s.setAttribute('data-input-position', config.inputPosition ?? 'bottom')
    s.setAttribute('data-lang', config.lang ?? site.lang)
    s.setAttribute('crossorigin', 'anonymous')
    s.setAttribute('async', '')
    if (config.repoID) s.setAttribute('data-repo-id', config.repoID)
    if (config.category) s.setAttribute('data-category', config.category)
    if (config.categoryID) s.setAttribute('data-category-id', config.categoryID)
    if (config.theme) {
      if (config.theme === 'urara') {
        s.setAttribute(
          'data-theme',
          // 'https://gist.githack.com/kwaa/0b081ca4978b3f31b30ec88ccd9aa585/raw/fb45140bdd6282b4d189477d245ba41bc2c6d3a8/style.css'
          'https://gistcdn.githack.com/kwaa/0b081ca4978b3f31b30ec88ccd9aa585/raw/4aaaa703d30dc711770e1b45d2609c16bdfb9649/style.css'
          // 'https://giscus.app/themes/custom_example.css'
        )
      } else {
        s.setAttribute('data-theme', config.theme)
      }
    } else {
      s.setAttribute('data-theme', 'preferred_color_scheme')
    }
    s.src = config.src ?? 'https://giscus.app/client.js'
    document.getElementById('giscus-container').appendChild(s)

    observer.observe(document.getElementById('giscus'), {
      childList: true
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    })
  })

  onDestroy(() => observer.disconnect())
</script> -->
<script lang="ts">
  import { onMount } from 'svelte'
  import { site } from '$lib/config/site'
  import type { GiscusConfig } from '$lib/types/post'
  export let config: GiscusConfig

  onMount(() => {
    const giscus = document.createElement('script')
    const observer = new MutationObserver(() => {
      document.getElementById('giscus-loading').remove()
      observer.disconnect()
    })

    Object.entries({
      src: config.src ?? 'https://giscus.app/client.js',
      'data-repo': config.repo,
      'data-repo-id': config.repoID,
      'data-category': config.category ?? '',
      'data-category-id': config.categoryID,
      'data-mapping': 'pathname',
      'data-reactions-enabled': config.reactionsEnabled === false ? '0' : '1',
      'data-input-position': config.inputPosition ?? 'bottom',
      'data-theme': config.theme ?? 'preferred_color_scheme',
      'data-lang': config.lang ?? site.lang ?? 'en',
      'data-loading': config.loading ?? '',
      crossorigin: 'anonymous',
      async: ''
    }).forEach(([key, value]) => giscus.setAttribute(key, value))

    document.getElementById('giscus-container').appendChild(giscus)
    observer.observe(document.getElementById('giscus'), {
      childList: true
    })
  })
</script>

<div id="giscus-container">
  <button id="giscus-loading" class="btn btn-lg flex mx-auto my-4 btn-ghost btn-circle loading" />
  <div id="giscus" class="giscus" />
</div>
