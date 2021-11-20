<script lang="ts">
  import { onMount } from 'svelte'
  import { comment } from '$lib/config/comment'
  export let post: Urara.Post
  onMount(() => {
    window['disqus_config'] = function () {
      this.page.url = post?.path
      this.page.identifier = post?.path
      this.page.title = post?.title
    }
    const s = document.createElement('script')
    s.src = `https://${comment?.['disqus']?.['shortname']}.disqus.com/embed.js` as string
    s.setAttribute('data-timestamp', +new Date() as unknown as string)
    document.getElementById('disqus_thread').appendChild(s)
  })
</script>

<div id="disqus_thread" class="mt-4" />
