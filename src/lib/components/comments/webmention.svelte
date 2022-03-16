<script lang="ts">
  import { onMount } from 'svelte'
  import { site } from '$lib/config/site'
  import type { WebmentionConfig } from '$lib/types/comment'
  import IconSortAscending from '~icons/heroicons-outline/sort-ascending'
  import IconSortDescending from '~icons/heroicons-outline/sort-descending'
  export let config: WebmentionConfig
  export let post: Urara.Post

  let [page, loaded, end, mentions] = [0, false, false, []]

  let sortDirUp = config.sortDir === 'up' ? true : false

  const load = async () => {
    let data = await fetch(
      `https://webmention.io/api/mentions?page=${page}&per-page=${config.perPage ?? '20'}&sort-by=${
        config.sortBy ?? 'created'
      }&sort-dir=${sortDirUp ? 'up' : 'down'}${
        config.property ? config.property.forEach(wmProperty => `&wm-property=${wmProperty}`) : ''
      }&target[]=${site.url + post.path}}&target[]=${site.url + post.path}/`
      // }&target=https://indieweb.org`
    ).then(res => res.json())
    if (data.links.length > 0) {
      data = {
        ...data,
        links: data.links.filter(
          (link: { activity: { type: string } }) => !(config.filterType ?? ['like']).includes(link.activity.type)
        )
      }
      if (data.links.length > 0) {
        mentions = [...mentions, ...data.links]
      } else load()
    } else end = true
    console.log(data, mentions)
    loaded = true
  }

  const reset = async () => {
    page = 0
    loaded = false
    end = false
    mentions = []
    await load()
  }

  onMount(() => load())
</script>

<div class="flex flex-col gap-8">
  <div class="flex">
    <p class="flex-1 m-auto italic opacity-50">
      {`sort-by=${config.sortBy ?? 'created'}&sort-dir=${sortDirUp ? 'up' : 'down'}`}
    </p>
    <button
      class="btn btn-ghost btn-sm float-right"
      on:click={() => {
        sortDirUp = !sortDirUp
        reset()
      }}>
      {#if sortDirUp === true}
        <IconSortAscending />
      {:else}
        <IconSortDescending />
      {/if}
    </button>
  </div>
  {#key mentions}
    {#each mentions as mention}
      {@const activityType = {
        mention: 'mentioned this',
        link: 'linked to',
        reply: 'replied to',
        repost: 'retweeted',
        like: 'favourited',
        quotation: 'test'
      }[mention.activity.type]}
      {#if mention.data.url !== null}
        <div class="p-4 border-2 rounded-2xl border-base-300">
          <div class="flex bg-base-200 rounded-lg">
            {#if mention.data.author?.photo}
              <img
                class="w-12 h-12 flex-0 rounded-lg"
                src={mention.data.author.photo}
                alt={mention.data.author.name}
                loading="lazy"
                decoding="async" />
            {/if}
            <div class="flex-1 px-4 py-2 m-auto">
              <p>
                {#if mention.data.author?.url}
                  <a class="font-semibold" href={mention.data.author.url}>
                    {mention.data.author?.name ?? new URL(mention.data.url).host}
                  </a>
                {:else}
                  {mention.data.author?.name ?? new URL(mention.data.url).host}
                {/if}
                <a class="hover:underline" href={mention.data.url}>
                  {activityType}
                </a>
                this post on {mention.data.published ? mention.data.published.slice(0, 10) : mention.verified_date.slice(0, 10)}
              </p>
            </div>
          </div>
          {#if mention.data.content !== null}
            <div class="prose max-w-none break-words mt-4">
              <!-- {#if mention.data.name !== null}
            <h3 class="opacity-50">{mention.data.name}</h3>
          {/if} -->
              <p>{@html mention.data.content}</p>
            </div>
          {/if}
        </div>
      {/if}
    {/each}
  {/key}
  {#if end === true}
    <div class="divider mt-0 -mb-2">END</div>
  {:else if loaded === true}
    <button
      on:click={() => {
        loaded = false
        load()
      }}
      class="btn btn-primary btn-block">
      LOAD
    </button>
  {:else}
    <button id="webmention-loading" class="btn btn-lg btn-block flex btn-ghost loading" />
  {/if}
</div>
