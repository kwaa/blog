<script lang="ts">
  import Picture from '$lib/components/extra/picture.svelte'
  export let cover: Urara.Post['cover']
  let src: string, alt: string
  Array.isArray(cover) ? ([src, alt] = [cover[1], cover[0]]) : ([src, alt] = cover)
</script>

<Picture {src} {alt} />
