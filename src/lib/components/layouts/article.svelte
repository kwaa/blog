<script lang="ts" context="module">
  import Image from '$lib/components/prose/img.svelte'
  import table from '$lib/components/prose/table.svelte'
  export { Image as img, table }
</script>

<script lang="ts">
  import { browser } from '$app/env'
  import { posts as storedPosts } from '$lib/stores/posts'
  import Head from '$lib/components/head.svelte'
  import Flex from '$lib/components/layouts/_flex.svelte'
  import Cover from '$lib/components/post_cover.svelte'
  import Status from '$lib/components/post_status.svelte'
  import Toc from '$lib/components/post_toc.svelte'
  import Pagination from '$lib/components/post_pagination.svelte'
  import Comment from '$lib/components/post_comment.svelte'
  import Footer from '$lib/components/footer.svelte'

  export let title = undefined
  export let date = undefined
  export let lastmod = undefined
  export let tags = undefined
  export let cover = undefined
  export let toc = undefined
  export let path = undefined

  let posts = undefined
  let post = undefined
  let index = undefined
  let prev = undefined
  let next = undefined

  $: storedPosts.subscribe(storedPosts => {
    posts = storedPosts
    post = posts.find(post => post?.path === path)
    index = posts.findIndex(post => post?.path === path)
    prev = posts[index + 1]
    next = posts[index - 1]
  })
</script>

<Head {post} />

<Flex>
  <div slot="left" class="h-full hidden xl:block" />
  <div slot="right" class="h-full hidden xl:block">
    {#if browser && toc?.length >= 1}
      <Toc {toc} />
    {/if}
  </div>
  <div slot="center">
    <article
      itemscope
      itemtype="https://schema.org/BlogPosting"
      class="card bg-base-100 rounded-none md:rounded-box md:shadow-xl mb-8 h-entry">
      {#if cover}
        <Cover {cover} figureClass="mx-4 md:mx-0 w-auto" imgClass="rounded-box w-full shadow-xl" />
      {/if}
      <div class="card-body gap-0">
        <Status post={{ layout: 'article', date, lastmod, path }} />
        <h1 itemprop="name headline" class="card-title text-3xl p-name">{title ?? path}</h1>
        <div class="divider my-4" />
        <main itemprop="articleBody" class="urara-prose prose e-content">
          <slot />
        </main>
        {#if tags}
          <div class="divider mt-4 mb-0" />
          <div>
            {#each tags as tag}
              <a href="/?tags={tag}" class="btn btn-sm btn-ghost normal-case mt-2 mr-2 p-category">
                #{tag}
              </a>
            {/each}
          </div>
        {/if}
      </div>
    </article>
    {#if posts.length > 1 && post}
      <Pagination {next} {prev} />
    {/if}
    {#if browser && post?.comment !== false}
      <Comment {post} />
    {/if}
    <Footer />
  </div>
</Flex>
