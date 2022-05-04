<script lang="ts" context="module">
  import Image from '$lib/components/prose/img.svelte'
  import table from '$lib/components/prose/table.svelte'
  export { Image as img, table }
</script>

<script lang="ts">
  import { browser } from '$app/env'
  import Head from '$lib/components/head.svelte'
  import Post from '$lib/components/layouts/_post.svelte'
  import Toc from '$lib/components/post_toc.svelte'

  export let path = undefined
  export let created = undefined
  export let updated = undefined
  export let published = undefined
  export let tags = undefined
  export let flags = undefined

  export let title = undefined
  export let summary = undefined
  export let photo = undefined
  export let toc = undefined

  //     /** post title */
  //     title?: string
  //     /** post summary */
  //     summary?: string
  //     /** post tags */
  //     tags?: string[]
  //     /** enable some advanced features.
  //      * @property hidden - deprecated, hide this post from the homepage and Atom feed.
  //      * @property unlisted - hide this post from the homepage and feed.
  //      * @property draft - mark as draft
  //      * @property private - equivalent to draft
  //      * @property bridgy-fed - add a link to Bridgy Fed in the post. https://fed.brid.gy/
  //      * @property bridgy-{target} - add a link to Bridgy in the post. https://brid.gy/publish/{target}
  //      */
  //     flags?: string[]
</script>

<Head post={{ layout: 'article', created, updated, published, title, tags, summary, photo, path }} />

<Post layout="article" {path} {flags} {tags} {created} {updated} {published}>
  <div slot="right" class="h-full hidden xl:block">
    {#if browser && toc?.length > 1}
      <Toc {toc} />
    {/if}
  </div>
  <div slot="top">
    {#if photo}
      <figure class="mx-4 md:mx-0 w-auto">
        <Image class="u-featured rounded-box w-full shadow-xl" src={photo} />
      </figure>
    {/if}
  </div>
  <div slot="middle-bottom">
    <h1 itemprop="name headline" class="card-title text-3xl p-name">{title ?? path.slice(1)}</h1>
    <div class="divider my-4" />
  </div>
  <main slot="content" itemprop="articleBody" class="urara-prose prose e-content">
    <slot />
  </main>
</Post>
