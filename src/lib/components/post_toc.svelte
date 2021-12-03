<script lang="ts" context="module">
  export const prerender = true
</script>

<script lang="ts">
  export let toc = undefined
  if (Array.isArray(toc)) {
    let [offset, result] = [-toc[0].depth, []]
    let levels = [{ children: result }]
    toc.forEach(o => {
      levels[o.depth + offset].children = levels[o.depth + offset].children || []
      levels[o.depth + offset].children.push((levels[o.depth + offset + 1] = o))
    })
    toc = levels[0]
  }
  const { title, slug, children } = toc
</script>

{#if title}
  <a on:click={() => document.getElementById(slug).scrollIntoView({ behavior: 'smooth' })} class="transition-all hover:text-accent" href={'javascript:void(0)'}>{title}</a>
{/if}
{#if children}
  <ul>
    {#each children as child}
      <li class="pl-4">
        <svelte:self toc={child} />
      </li>
    {/each}
  </ul>
{/if}
