<script lang="ts">
  import { dateConfig } from '$lib/config/date'
  import { site } from '$lib/config/site'
  const config = dateConfig('layout')
  export let post: Urara.Post = undefined
  export let index: boolean = false
  export let photo: boolean = false

  const stringDate = new Date(post.date).toLocaleString(config.locales, config.options)
  const stringLastmod = post.lastmod ? new Date(post.lastmod).toLocaleString(config.locales, config.options) : stringDate
  const jsonDate = new Date(post.date).toJSON()
  const jsonLastmod = post.lastmod ? new Date(post.lastmod).toJSON() : jsonDate
</script>

{#if index}
  <a
    href={post.path}
    class="{photo
      ? 'text-neutral-content !bg-neutral/50 hover:!bg-neutral/80'
      : 'text-base-content/50 px-0 hover:underline'} badge badge-lg badge-ghost text-left bg-transparent border-none font-bold tooltip tooltip-right"
    data-tip="Updated: {stringLastmod}">
    {stringDate}
    <time class="hidden" datetime={jsonDate} itemprop="datePublished">
      {stringDate}
    </time>
    <time class="hidden" datetime={jsonLastmod} itemprop="dateModified">
      {stringLastmod}
    </time>
  </a>
{:else}
  <div class="flex flex-wrap justify-between gap-2 mb-8">
    <div class="badge badge-lg badge-ghost shrink-0 text-base-content/75 font-bold gap-1 pl-0 h-card p-author">
      <img
        class="inline-block w-6 h-6 rounded-badge u-photo mr-1"
        src={site.author.avatar}
        alt={site.author.name}
        decoding="async"
        loading="lazy" />
      {#if post.layout === 'article' || 'note'}
        <span>{`${post.layout[0].toUpperCase() + post.layout.substring(1)} by`}</span>
      {/if}
      <a rel="author" class="hover:text-secondary p-name u-url" href={site.url}>{site.author.name}</a>
    </div>
    <div
      class="badge badge-lg badge-ghost shrink-0 ml-auto text-left bg-transparent border-none text-base-content/50 font-bold px-0 tooltip tooltip-bottom md:tooltip-left"
      data-tip="Updated: {stringLastmod}">
      {stringDate}
      <time class="hidden" datetime={jsonDate} itemprop="datePublished">
        {stringDate}
      </time>
      <time class="hidden" datetime={jsonLastmod} itemprop="dateModified">
        {stringLastmod}
      </time>
    </div>
  </div>
  <a class="hidden u-url u-uid" href={site.url + post.path}>{site.url + post.path}</a>
{/if}
