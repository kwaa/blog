<script lang="ts" context="module">
  import img from '$lib/components/mdsvex/img.svelte'
  import code from '$lib/components/mdsvex/code.svelte'
  import table from '$lib/components/mdsvex/table.svelte'
  export { img, code, table }
</script>

<script lang="ts">
  import { onMount } from 'svelte'
  import { browser } from '$app/env'
  import { site } from '$lib/config/site'
  import Head from '$lib/components/head.svelte'
  import Footer from '$lib/components/footer.svelte'
  import Date from '$lib/components/post_date.svelte'
  import Cover from '$lib/components/post_cover.svelte'
  import Pagination from '$lib/components/post_pagination.svelte'
  import Utterances from '$lib/components/extra/utterances.svelte'

  export let title = undefined
  export let date = undefined
  export let lastmod = undefined
  export let priority = undefined
  export let tags = undefined
  export let descr = undefined
  export let cover = undefined

  let posts = undefined
  let post = undefined
  let index = undefined
  let prev = undefined
  let next = undefined

  onMount(() => {
    if (browser) {
      // const allPosts: Urara.Post[] = Object.entries(JSON.parse(localStorage.getItem('posts')) as Record<number, Urara.Post[]>).flatMap(([, value]) => value)
      posts = Object.entries(JSON.parse(localStorage.getItem('posts')))
        .sort(([a], [b]) => parseInt(a) - parseInt(b))
        .flatMap(([, value]) => value)
      post = posts.find(post => post?.path === window.location.pathname)
      index = posts.findIndex(post => post?.path === window.location.pathname)
      prev = posts[index + 1]
      next = posts[index - 1]
      console.log(posts, post, index, prev, next)
    }
  })
</script>

<svelte:head>
  <title>{title ?? post?.path} | {site.title}</title>
  <meta name="description" content={descr ?? site.descr} />
  {#if tags}<meta name="keywords" content={tags.toString()} />{/if}
</svelte:head>

<Head {post} />

<div class="px-4 lg:px-0 mx-auto w-full max-w-screen-md">
  <div class="card shadow-xl mb-8">
    <div class="card-body">
      <h1 class="card-title text-3xl">{title ?? post?.path}</h1>
      <Date {date} {lastmod} {priority} />
      {#if !cover}
        <div class="divider mt-0" />
      {/if}
      <main class="prose">
        {#if cover}<figure class="-mx-4 md:-mx-8 !w-auto my-4">
            <Cover {cover} class="w-full" />
          </figure>
        {/if}<slot />
      </main>
      {#if tags}
        <div class="divider my-0" />
        <div>
          {#each tags as tag}
            <a href="/?tags={tag}" class="btn btn-sm btn-ghost mt-2 mr-2">
              #{tag}
            </a>
          {/each}
        </div>
      {/if}
    </div>
  </div>
  {#if posts && post}
    {#if (posts.length > 1 && !post.priority) || post.priority[1] > 0}
      <Pagination {next} {prev} />
    {/if}
    {#if !post.comment || post.comment !== false}
      <Utterances />
    {/if}
  {/if}
  <Footer />
</div>
