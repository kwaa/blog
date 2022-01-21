<script lang="ts">
  import Picture from '$lib/components/extra/picture.svelte'
  export let cover: Urara.Post['cover']
  export let figureClass: string
  export let imgClass: string
  // let className = undefined
  // export { className as class }
  let src: string, alt: string
  Array.isArray(cover) ? ([src, alt] = [cover[1], cover[0]]) : ([src, alt] = [cover, cover])
</script>

<figure class={figureClass}>
  <Picture class="u-photo {imgClass}" {src} {alt} />
</figure>
