<script lang="ts">
  import { site } from '$lib/config/site'
  import Icon from '$lib/components/head_icon.svelte'
  import OpenGraph from '$lib/components/head_opengraph.svelte'
  export let post: Urara.Post = undefined
  export let path: string = undefined
</script>

<svelte:head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="manifest" crossorigin="use-credentials" href="/manifest.webmanifest" />
  <link rel="alternate" type="application/atom+xml" href="/atom.xml" />
  <meta name="theme-color" content={site.themeColor} />
  {#if post?.title}
    <title>{post.title} | {site.title}</title>
    <link rel="canonical" href={site.url + post.path} />
    <meta name="description" content={post.descr ?? site.descr} />
    {#if post.tags}<meta name="keywords" content={post.tags.toString()} />{/if}
  {:else if post?.path}
    <title>{post.path.slice(1)} - {site.title}</title>
    <meta name="description" content={site.descr} />
    <link rel="canonical" href={site.url + path} />
  {:else}
    <title>{site.subtitle ? site.title + ' - ' + site.subtitle : site.title}</title>
    <meta name="description" content={site.descr} />
    <link rel="canonical" href={site.url} />
  {/if}
  <slot />
  <script>
    if (!localStorage.getItem('theme') && window.matchMedia) {
      document.documentElement.setAttribute(
        'data-theme',
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      )
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light')
      })
    }
  </script>
  <script
    async
    defer
    data-website-id="96c6ed7e-f2ce-483a-86df-c44a4bc86827"
    data-do-not-track="true"
    src="https://umami.kwaa.dev/umami.js"></script>
</svelte:head>

<Icon />
<OpenGraph {post} />
