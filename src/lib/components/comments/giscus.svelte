<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { site } from '$lib/config/site'
  import { comment as commentConfig } from '$lib/config/comment'

  const giscusConfig = commentConfig.giscus ?? commentConfig.utterances
  const sendTheme = (
    el = getComputedStyle(document.documentElement),
    // iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame'),
    vars = ['p', 'pf', 'pc', 's', 'sf', 'sc', 'a', 'af', 'ac', 'n', 'nf', 'nc', 'b1', 'b2', 'b3', 'bc', 'in', 'su', 'wa', 'er']
  ) =>
    console.log(
      `:root ${JSON.stringify(Object.fromEntries(vars.map(v => [`--${v}`, el.getPropertyValue(`--${v}`).slice(1)] ?? [])))
        .replaceAll('"', '')
        .replaceAll(',', '; ')
        .replaceAll(':', ': ')}`
    )
  // iframe?.contentWindow.postMessage(
  //   {
  //     giscus: {
  //       setConfig: {
  //         css: `:root ${JSON.stringify(
  //           Object.fromEntries(vars.map(v => [`--${v}`, el.getPropertyValue(`--${v}`).slice(1)] ?? []))
  //         )
  //           .replaceAll('"', '')
  //           .replaceAll(',', '; ')
  //           .replaceAll(':', ': ')}`
  //       }
  //     }
  //   },
  //   'https://giscus.app'
  // )
  const observer = new MutationObserver(mutationList => mutationList.forEach(mutation => {
    if (mutation.type === 'childList') document.getElementById('giscus-loading').remove()
    sendTheme()
  }))

  onMount(() => {
    const s = document.createElement('script')
    s.setAttribute('data-repo', 'kwaa/comments')
    s.setAttribute('data-mapping', 'pathname')
    s.setAttribute('data-reactions-enabled', '1')
    // s.setAttribute('data-theme', 'preferred_color_scheme')
    //   s.setAttribute('data-theme', 'https://giscus.app/themes/custom_example.css')
    s.setAttribute(
      'data-theme',
      'https://gistcdn.githack.com/kwaa/0b081ca4978b3f31b30ec88ccd9aa585/raw/4aaaa703d30dc711770e1b45d2609c16bdfb9649/style.css'
    )

    s.setAttribute('data-lang', giscusConfig['lang'] ?? site.lang)
    s.setAttribute('crossorigin', 'anonymous')
    s.setAttribute('async', '')
    s.src = giscusConfig['src'] ?? 'https://giscus.app/client.js'
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
</script>

<div id="giscus-container">
  <button id="giscus-loading" class="btn btn-lg flex mx-auto my-4 btn-ghost btn-circle loading" />
  <div id="giscus" class="giscus" />
</div>
