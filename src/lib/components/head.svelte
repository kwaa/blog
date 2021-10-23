<script lang="ts">
  import site from '$lib/config/site'
  import HeadIcon from '$lib/components/head_icon.svelte'
  import HeadOpenGraph from './head_opengraph.svelte'
  import type { Post } from '$lib/utils/posts'
  export let post: Post = undefined
</script>

<svelte:head>
  <!-- <html lang={site.lang} /> -->
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="manifest" crossorigin="use-credentials" href="/manifest.webmanifest" />
  <link rel="alternate" type="application/atom+xml" href="/atom.xml" />
  <meta name="theme-color" content={site.themeColor} />
  {#if post}
    <title>{post.title ?? post.path} | {site.title}</title>
    <meta name="description" content={post.descr ?? site.descr} />
    {#if post.tags}<meta name="keywords" content={post.tags.toString()} />{/if}
    <link rel="canonical" href={`${site.url}/${post.path}`} />
  {:else}
    <title>{site.title}</title>
    <meta name="description" content={site.descr} />
    <link rel="canonical" href={site.url} />
  {/if}
</svelte:head>

<HeadIcon />
<HeadOpenGraph {post} />
