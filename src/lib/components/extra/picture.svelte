<script lang="ts">
  import { source as pictureSource } from '$lib/config/img'
  import { validate } from '$lib/utils/src'
  let className = undefined
  export { className as class }
  export let src = undefined
  export let alt = undefined
  src = validate(src)
</script>

<picture>
  {#if pictureSource.length > 0}
    {#each pictureSource as { ext, type }}
      <source srcset={src.replace(/\.[^/.]+$/, `.${ext}`)} {type} />
    {/each}
  {/if}
  <img class={className} {src} {alt} loading="lazy" />
</picture>
