<script lang="ts">
  import type { LayoutData } from './$types'
  import { onMount } from 'svelte'
  // import { browser, dev } from '$app/environment'
  import { fly } from 'svelte/transition'
  import { genTags } from '$lib/utils/posts'
  import { posts, tags } from '$lib/stores/posts'
  import { partytownSnippet } from '@builder.io/partytown/integration'
  // import { registerSW } from 'virtual:pwa-register'
  import Head from '$lib/components/head_static.svelte'
  import Header from '$lib/components/header.svelte'
  import 'uno.css'
  import '../app.css'

  export let data: LayoutData
  
  posts.set(data.res)
  tags.set(genTags(data.res))

  // partytown
  let scriptEl
  onMount(
    () => scriptEl &&
      (scriptEl.textContent = partytownSnippet())
  //     !dev &&
  //     browser &&
  //     registerSW({
  //       onRegistered: r => r && setInterval(async () => await r.update(), 198964),
  //       onRegisterError: error => console.error(error)
  //     })
  )
</script>

<svelte:head>
  <script>
    partytown = {
      forward: ['plausible'],
    }
  </script>
  <!-- resolveUrl: (url) => new URL('https://kwaa.dev/partytown/plausible') -->
  <script bind:this={scriptEl}></script>
</svelte:head>

<Head />

<Header path={data.path} />

{#key data.path}
  <div
    class="bg-base-100 md:bg-base-200 min-h-screen pt-16 md:pb-8 lg:pb-16"
    in:fly={{ y: 100, duration: 300, delay: 300 }}
    out:fly={{ y: -100, duration: 300 }}>
    <slot />
  </div>
{/key}
