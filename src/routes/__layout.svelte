<script lang="ts" context="module">
  export const prerender = true
  // export const load = async ({ url, fetch }) => {
  //   const res = await fetch('/posts.json')
  //   return res.ok
  //     ? { props: { path: url.pathname, res: await await fetch('/posts.json').json() } }
  //     : { props: { path: url.pathname } }
  // }
  // export const load = async ({ url }) => ({ props: { path: url.pathname } })
  export const load = async ({ url, fetch }) => ({
    props: {
      path: url.pathname,
      res: import.meta.env.DEV ? await fetch('/posts.json').json() : ''
    }
  })
</script>

<script lang="ts">
  import { browser } from '$app/env'
  import { onMount } from 'svelte'
  import { fly } from 'svelte/transition'
  import { genTags } from '$lib/utils/posts'
  import { posts, tags } from '$lib/stores/posts'
  import Header from '$lib/components/header.svelte'
  import '../app.css'
  import { site } from '$lib/config/site'
  export let res: { [priority: number]: Urara.Post[] } = undefined
  export let path: string
  // posts.set(res)
  // tags.set(genTags(Object.entries(res).flatMap(([key, value]) => (parseInt(key) > 0 ? value : []))))
  onMount(async () => {
    if (browser)
      res = await fetch(`${site.url}/posts.json`).then(res => res.json() as unknown as { [priority: number]: Urara.Post[] })
  })
  $: if (res) {
    posts.set(res)
    tags.set(genTags(Object.entries(res).flatMap(([key, value]) => (parseInt(key) > 0 ? value : []))))
  }
</script>

<Header />

{#key path}
  <div class="min-h-screen pt-24 lg:mb-16" in:fly={{ y: 100, duration: 200, delay: 200 }} out:fly={{ y: -100, duration: 200 }}>
    <slot />
  </div>
{/key}
