<script lang="ts">
  import type { PageData } from './$types'
  import Container from '$lib/components/post_container.svelte'
  export let data: PageData
  const { post } = data
</script>

<Container {post}>
  <svelte:component this={post.content} />
</Container>
