<script lang="ts">
  import { onMount } from 'svelte'
  import { comment } from '$lib/config/comment'
  export let post: Urara.Post
  window['disqus_config'] = function () {
    this.page.url = post.path
    this.page.identifier = post.path
    this.page.title = post.title
  }
  const shortname: string = comment?.['disqus']?.['shortname']
  onMount(() => {
    const s = document.createElement('script')
    s.src = `https://${shortname}.disqus.com/embed.js` as string
    // s.setAttribute('data-timestamp', +new Date())
    document.getElementById('disqus_thread').appendChild(s)
  })
</script>

<div id="disqus_thread" class="mt-4" />