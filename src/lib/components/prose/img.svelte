<script lang="ts">
  import { dev } from '$app/environment'
  let className = undefined
  export { className as class }
  export let src: string
  export let alt: string = src
  export let loading: 'lazy' | 'eager' = 'lazy'
  export let decoding: 'async' | 'sync' | 'auto' = 'async'
  let [name, ext] = [src.split('.').slice(0, -1).join('.'), src.split('.').pop()]
</script>

<picture>
  {#if !dev}
    <source srcset="{name}_768.{ext === 'webp' ? 'avif' : ext} 1x" media="(max-width: 425px)" type="image/avif" />
    <source
      srcset="{name}_768.{ext === 'webp' ? 'avif' : ext} 1x, {name}.{ext === 'webp' ? 'avif' : ext} 2x"
      media="(min-width: 425px)"
      type="image/avif" />
  {/if}
  <img itemprop="image" class={className ?? 'rounded-lg my-2'} {src} {alt} {loading} {decoding} />
</picture>
