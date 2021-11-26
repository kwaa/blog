<script lang="ts" context="module">
  import img from '$lib/components/prose/img.svelte'
  import code from '$lib/components/prose/code.svelte'
  import table from '$lib/components/prose/table.svelte'
  export { img, code, table }
</script>

<script lang="ts">
  import { browser } from '$app/env'
  import Head from '$lib/components/head.svelte'
  import Footer from '$lib/components/footer.svelte'
  import Date from '$lib/components/post_date.svelte'
  import Cover from '$lib/components/post_cover.svelte'
  import Pagination from '$lib/components/post_pagination.svelte'
  import Comment from '$lib/components/post_comment.svelte'

  export let title = undefined
  export let date = undefined
  export let lastmod = undefined
  export let priority = undefined
  export let tags = undefined
  export let cover = undefined
  export let descr = undefined

  let posts = undefined
  let post = undefined
  let index = undefined
  let prev = undefined
  let next = undefined

  if (browser) {
    posts = Object.entries(JSON.parse(localStorage.getItem('posts')))
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .flatMap(([, value]) => value)
    post = posts.find(post => post?.path === window.location.pathname)
    index = posts.findIndex(post => post?.path === window.location.pathname)
    prev = posts[index + 1]
    next = posts[index - 1]
  }
</script>

<Head post={{ title, date, lastmod, priority, tags, cover, descr }} />

<div class="px-4 lg:px-0 mx-auto w-full max-w-screen-md">
  <article itemscope itemtype="https://schema.org/BlogPosting" class="card bg-base-100 shadow-xl mb-8">
    <div class="card-body <sm:p-4">
      <h1 itemprop="name headline" class="card-title text-3xl">{title ?? post?.path}</h1>
      <Date post={{ date, lastmod, priority }} />
      {#if !cover}
        <div class="divider" />
      {/if}
      <main itemprop="articleBody" class="urara-prose prose">
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
  </article>
  {#if posts && post}
    {#if (posts.length > 1 && !post.priority) || post.priority[1] > 0}
      <Pagination {next} {prev} />
    {/if}
    {#if browser && (!post.comment || post.comment !== false)}
      <Comment {post} />
    {/if}
  {/if}
  <Footer />
</div>
