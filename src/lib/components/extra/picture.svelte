<script lang="ts">
  import { prefix, source as pictureSource } from '$lib/config/img'
  let className = undefined
  export { className as class }
  export let src = undefined
  export let alt = undefined

  if (src.startsWith('/')) src = src.slice(1)
  if (!src.startsWith('http')) src = `${prefix}${src}`
</script>

<picture>
  {#if pictureSource.length > 0}
    {#each pictureSource as { ext, type }}
      <source srcset={src.replace(/\.[^/.]+$/, `.${ext}`)} {type} />
    {/each}
  {/if}
  <img class={className} {src} {alt} loading="lazy" />
</picture>
