<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { comment } from '$lib/config/comment'
  export let post: Urara.Post
  onMount(() => {
    const [c,s] = [document.createElement('script'), document.createElement('script')]
    c.id = 'disqus_config'
    c.type = 'application/javascript'
    c.innerHTML = `
      const disqus_config = function () {
        this.page.url = '${post.path}'
        this.page.identifier = '${post.path}'
        this.page.title = '${post.title ?? post.path}'
      }`
    s.id = 'disqus_script'
    s.src = `https://${comment?.['disqus']?.['shortname']}.disqus.com/embed.js`
    s.setAttribute('data-timestamp', Date.now().toString())
    document.head.appendChild(c)
    document.head.appendChild(s)
  })

  onDestroy(() => document.querySelectorAll('#disqus_config, #disqus_script').forEach(node => node.remove()))
</script>

<div id="disqus_thread" class="mt-4" />
