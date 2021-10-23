<script context="module">
  export const load = async ({ page, fetch }) => {
    const res = await fetch('index.json')
    return {
      props: {
        path: page.path,
        posts: await res.json()
      }
    }
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte'
  import { browser } from '$app/env'
  import { fly } from 'svelte/transition'
  import Header from '$lib/components/header.svelte'
  import 'virtual:windi.css'
  import '../app.css'
  // @ts-ignore: Cannot find module 'virtual:windi-devtools' or its corresponding type declarations.
  if (browser) import('virtual:windi-devtools')
  // import Head from '$lib/components/head.svelte'
  export let posts
  onMount(() => {
    if (browser) {
      // @ts-ignore: Can not find module 'virtual:windi-devtools' or its corresponding type declarations.
      // await import('virtual:windi-devtools')
      localStorage.setItem('posts', JSON.stringify(posts))
      localStorage.setItem('updated', new Date().toLocaleString())
      console.log(posts)

      if (!localStorage.getItem('theme') && window.matchMedia) {
        document.documentElement.setAttribute(
          'data-theme',
          window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        )
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
          if (!localStorage.getItem('theme')) document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light')
        })
      }
    }
  })
  export let path: string
</script>

<!-- <Head /> -->

<Header />

{#key path}
  <div
    class="min-h-screen pt-16 mb-8 lg:mb-16"
    in:fly={{ y: 100, duration: 250, delay: 300 }}
    out:fly={{ y: 100, duration: 250 }}
  >
    <slot />
  </div>
{/key}
