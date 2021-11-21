<script lang="ts">
  import { onMount } from 'svelte'
  import { comment as commentConfig } from '$lib/config/comment'
  import { toSnake } from '$lib/utils/case'
  const comments = import.meta.globEager('/src/lib/components/comments/*.svelte')
  let current: string = undefined
  onMount(() => (current = toSnake(commentConfig.use[0])))
  export let post: Urara.Post = undefined
</script>

<div id="post-comment" class="card bg-base-100 card-body <sm:p-4 urara-card-shadow mb-8">
  {#if commentConfig.use.length > 1}
    <div class="tabs w-full mb-4" class:tabs-boxed={commentConfig?.['style'] === 'boxed'}>
      {#each commentConfig.use as name}
        <!-- svelte-ignore a11y-missing-attribute -->
        <a
          on:click={() => (current = toSnake(name))}
          class="flex-1 tab transition-all"
          class:tab-bordered={commentConfig?.['style'] === 'bordered'}
          class:tab-lifted={commentConfig?.['style'] === 'lifted'}
          class:tab-active={current === toSnake(name)}>
          {name}
        </a>
      {/each}
    </div>
  {/if}
  {#if current}
    {#key current}
      <svelte:component this={comments[`/src/lib/components/comments/${current}.svelte`].default} {post} />
    {/key}
  {/if}
</div>
