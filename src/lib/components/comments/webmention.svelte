<script lang="ts">
  import { onMount } from 'svelte'
  import { site } from '$lib/config/site'
  import type { WebmentionConfig } from '$lib/types/comment'
  import IconSortAscending from '~icons/heroicons-outline/sort-ascending'
  import IconSortDescending from '~icons/heroicons-outline/sort-descending'
  export let config: WebmentionConfig
  export let post: Urara.Post

  interface WebmentionFeed {
    type: 'feed'
    name: 'Webmentions'
    children: WebmentionEntry[]
  }

  interface WebmentionEntry {
    url: string
    author?: {
      name?: string
      photo?: string
      url?: string
    }
    content?: {
      html?: string
    }
    rsvp?: string
    published?: string
    'wm-source': string
    'wm-target': string
    'wm-id': number
    'wm-property': 'in-reply-to' | 'like-of' | 'repost-of' | 'bookmark-of' | 'mention-of' | 'rsvp'
    'wm-private': boolean
  }

  // const rsvp = {
  //   yes: '✅',
  //   no: '❌',
  //   interested: '💡',
  //   maybe: '💭'
  // }

  let [page, loaded, end, mentions, sortDirUp] = [0, false, false, [], config.sortDir === 'up' ? true : false]

  const load = async () =>
    await fetch(
      `https://webmention.io/api/mentions.jf2?page=${page}&per-page=${config.perPage ?? '20'}&sort-by=${
        config.sortBy ?? 'created'
      }&sort-dir=${sortDirUp ? 'up' : 'down'}${
        config.property ? config.property.forEach(wmProperty => `&wm-property=${wmProperty}`) : ''
      }&target[]=${site.url + post.path}}&target[]=${site.url + post.path}/`
      // }&target=https://indieweb.org`
    )
      .then(res => res.json())
      .then((feed: WebmentionFeed) => {
        if (feed.children.length > 0) {
          feed = {
            ...feed,
            children: feed.children.filter(
              (entry: WebmentionEntry) =>
                !(config.blockList?.length > 0 && config.blockList.includes(new URL(entry['wm-source']).origin))
            )
          }
          if (feed.children.length > 0) {
            mentions = [...mentions, ...feed.children]
          } else load()
        } else end = true
        page++
        loaded = true
      })

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
      {@const [wmProperty, borderColor, textColor] = {
        'in-reply-to': ['💬 replied', 'border-primary/50', 'text-primary'],
        'like-of': ['❤️ liked', 'border-secondary/50', 'text-secondary'],
        'repost-of': ['🔄 reposted', 'border-accent/50', 'text-accent'],
        'bookmark-of': ['⭐️ bookmarked', 'border-neutral/50', 'text-neutral'],
        'mention-of': ['💬 mentioned', 'border-base-300/50', 'text-base-content'],
        rsvp: ['📅 RSVPed', 'border-warning/50', 'text-warning']
      }[mention['wm-property']]}
      {#if mention.url !== null}
        <div class="{borderColor} border-2 rounded-2xl p-4">
          <div class="flex bg-base-200 rounded-lg">
            {#if mention?.author?.photo}
              <img
                class="w-12 h-12 flex-0 rounded-lg"
                src={mention.author.photo}
                alt={mention.author?.name ?? new URL(mention.url).host}
                loading="lazy"
                decoding="async" />
            {/if}
            <div class="flex-1 px-4 py-2 m-auto">
              <p>
                {#if mention?.author?.url}
                  <a class="font-semibold hover:underline" href={mention.author.url}>
                    {mention.author?.name ?? new URL(mention.url).host}
                  </a>
                {:else}
                  {mention?.author?.name ?? new URL(mention.url).host}
                {/if}
                <a class="{textColor} hover:underline" href={mention['wm-source']}>
                  {wmProperty}
                </a>
                this post on {mention.published ? mention.published.slice(0, 10) : mention['wm-received'].slice(0, 10)}
              </p>
            </div>
          </div>
          {#if mention.content}
            <div class="prose max-w-none break-words mt-4">
              <p>{@html mention.content?.html ?? mention.content?.text}</p>
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
