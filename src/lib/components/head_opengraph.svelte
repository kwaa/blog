<script>
  import site from '$lib/config/site'
  import icons from '$lib/config/icons'
  import srcReplace from '$lib/utils/imgsrc'
  export let post

  let contentCover, contentIcons

  // $: if (post) contentCover = post?.cover ? srcReplace(post.cover, { absolute: true, alternative: true }).src : undefined
  $: contentIcons = srcReplace(icons.maskable512.src ?? icons.px512.src, { absolute: true })
</script>

<svelte:head>
  <meta property="og:site_name" content={site.title} />
  <meta property="og:locale" content={site.lang} />
  {#if post}
    <meta property="og:title" content={post.title ?? post.path} />
    <meta property="og:type" content="article" />
    <meta property="og:url" content={`${site.url}/${post.path}`} />
    <meta property="og:description" content={post.descr ?? site.descr} />
    <meta property="article:author" content={site.author.name} />
    <meta property="article:published_time" content={post.date} />
    <meta property="article:modified_time" content={post.lastmod} />
    <meta property="article:tag" content={post.tags} />
    {#if post.cover}
      <meta property="og:image" content={post?.cover ? srcReplace(post.cover, { absolute: true, alternative: true }).src : undefined} />
      <meta name="twitter:card" content="summary_large_image" />
    {:else}
      <meta property="og:image" content={contentIcons} />
      <meta name="twitter:card" content="summary" />
    {/if}
  {:else}
    <meta property="og:title" content={site.title} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={site.url} />
    <meta property="og:image" content={contentIcons} />
    <meta property="og:description" content={site.descr} />
  {/if}
  {#if site.author.twitter}
    <meta name="twitter:site" content={site.author.twitter} />
    <meta name="twitter:creator" content={site.author.twitter} />
  {/if}
</svelte:head>
