<script lang="ts">
  import { source as pictureSource } from '$lib/config/img'
  let className = undefined
  export { className as class }
  export let src = undefined
  export let alt = undefined
</script>

<picture class="h-full">
  {#if pictureSource.length > 0}
    {#each pictureSource as { ext, type }}
      <source srcset={src.replace(/\.[^/.]+$/, `.${ext}`)} {type} />
    {/each}
  {/if}
  <img itemprop="image" class={className} {src} {alt} loading="lazy" decoding="async" />
</picture>
