<script lang="ts" context="module">
  export const prerender = true
  export const load = async ({ page, fetch }) => {
    const res = await fetch('/_posts.json')
    if (res.ok)
      return {
        props: {
          path: page.path,
          posts: await res.json()
        }
      }
    return {
      props: {
        path: page.path
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
  export let posts = undefined
  if (browser) {
    // @ts-ignore: Cannot find module 'virtual:windi-devtools' or its corresponding type declarations.
    import('virtual:windi-devtools')
    localStorage.setItem('posts', JSON.stringify(posts))
    localStorage.setItem('updated', new Date().toLocaleString())
  }
  onMount(() => {
    if (browser) {
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
