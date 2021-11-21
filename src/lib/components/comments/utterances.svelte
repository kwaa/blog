<script lang="ts">
  // import { utterances } from '$lib/urara.config'
  import { onMount } from 'svelte'
  // export let theme = undefined
  onMount(() => {
    const s = document.createElement('script')
    // const tag = document.getElementById('utterances')
    s.setAttribute('repo', 'kwaa/comments')
    s.setAttribute('issue-term', 'pathname')
    // if (utterances.label) element.setAttribute('label', utterances.label)
    s.setAttribute('theme', 'preferred-color-scheme')
    s.setAttribute('crossorigin', 'anonymous')
    s.setAttribute('async', '')
    s.src = 'https://utteranc.es/client.js'
    document.getElementById('utterances').appendChild(s)

    // const s = document.createElement('script')
    // const tag = document.getElementById('utterances')
    // s.setAttribute('repo', 'kwaa/comments')
    // s.setAttribute('issue-term', 'pathname')
    // s.setAttribute('theme', 'preferred-color-scheme')
    // s.setAttribute('crossorigin', 'anonymous')
    // s.src = 'https://utteranc.es/client.js'
    // tag.parentNode.insertBefore(s, tag)

    const observer = new MutationObserver(() => {
      document.getElementById('utterances-loading').remove()
      observer.disconnect()
    })

    observer.observe(document.getElementById('utterances'), {
      childList: true
    })
  })
</script>

<div id="utterances-container">
  <button id="utterances-loading" class="btn btn-lg flex mx-auto my-4 btn-ghost btn-circle loading" />
  <div id="utterances" class="utterances" />
</div>
