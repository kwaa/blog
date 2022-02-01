<script lang="ts">
  export let toc: Urara.PostToc
  export let bordered: string[]
  const { title, slug, children } = toc
</script>

{#if title}
  <a
    on:click={() => document.getElementById(slug).scrollIntoView({ behavior: 'smooth' })}
    id={`toc-link-${slug}`}
    class="transition-all hover:!border-primary"
    class:!border-accent={bordered.includes(slug)}
    href={'javascript:void(0)'}>
    {title}
  </a>
{/if}
{#if children.length > 0}
  <ul id={`toc-list-${slug ?? 'root'}`} class="menu">
    {#each children as child}
      <li
        id={`toc-item-${child.slug}`}
        class="hover-bordered"
        class:bordered={bordered.includes(slug)}>
        <svelte:self {bordered} toc={child} />
      </li>
    {/each}
  </ul>
{/if}
