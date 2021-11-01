<script lang="ts">
  import { fly } from 'svelte/transition'
  import Date from '$lib/components/post_date.svelte'
  import Picture from '$lib/components/extra/picture.svelte'
  import Cover from '$lib/components/post_cover.svelte'

  export let post: Urara.Post
  export let index: number
</script>

<div
  in:fly={{ x: index % 2 ? 100 : -100, duration: 250, delay: 300 }}
  out:fly={{ x: index % 2 ? -100 : 100, duration: 250 }}
  class="card md:card-side shadow-xl hover:shadow-2xl transition-shadow ease-in-out duration-250 group mb-8"
>
  {#if post.cover}
    <figure class="overflow-hidden order-first md:order-last rounded-box shadow-lg">
      <!-- <img class="object-cover object-center h-full w-full transform-gpu transition-transform ease-in-out duration-500 group-hover:scale-120" src={post.cover} alt={post.cover} loading="lazy" /> -->
      <!-- <Picture
        class="object-cover object-center h-full w-full transform-gpu transition-transform ease-in-out duration-500 group-hover:scale-120"
        src={post.cover}
        alt={post.cover}
      /> -->
      <Cover class="object-cover object-center h-full w-full transform-gpu transition-transform ease-in-out duration-500 group-hover:scale-120" cover={post.cover} />
    </figure>
  {/if}
  <div class="card-body">
    <h1
      class="card-title text-3xl transition-all ease-in-out underline underline-4 underline-transparent hover:underline-primary"
    >
      <a href={post.path}>{post.title ?? post.path.slice(1)}</a>
    </h1>
    <Date type="index" {post} />
    {#if post.descr}
      <p class="mb-auto">{post.descr}</p>
    {/if}
    {#if post.path}
      <div class="card-actions mt-auto md:-mb-4 -ml-4">
        <a href={post.path} class="btn btn-link normal-case <sm:rounded-l-none m-0 pl-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="inline-block h-6 w-6 mr-2 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          {post.path.slice(1)}
        </a>
      </div>
    {/if}
  </div>
</div>
