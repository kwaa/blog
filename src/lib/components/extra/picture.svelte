<script lang="ts">
  const pictureSource = [
    {
      ext: 'avif',
      type: 'image/avif'
    }
  ]
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
