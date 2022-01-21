<script lang="ts">
  import Picture from '$lib/components/extra/picture.svelte'
  // let className = undefined
  // export { className as class }
  export let src: string
  export let alt: string
</script>

<!-- <img {src} {alt} class="{className ?? rounded-box}" loading="lazy" /> -->

<Picture {src} {alt} class="u-photo rounded-lg my-2" />
