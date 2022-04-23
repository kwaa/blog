<script lang="ts">
  import { dev } from '$app/env'
  let className = undefined
  export { className as class }
  export let src = undefined
  export let alt = undefined
  export let loading: 'lazy' | 'eager' = 'lazy'
  export let decoding: 'async' | 'sync' | 'auto' = 'async'
  let [name, ext] = [src.split('.').slice(0, -1).join('.'), src.split('.').pop()]
</script>

<picture>
  {#if !dev}
    <source srcset="{name}_768.{ext} 1x" media="(max-width: 425px)" />
    <source srcset="{name}_768.{ext} 1x, {src} 2x" media="(min-width: 425px)" />
  {/if}
  <img itemprop="image" class={className} {src} {alt} {loading} {decoding} />
</picture>
