<script lang="ts">
  export let id: string
  export let list: boolean = undefined
  export let playlist: string = undefined
  export let start: string = undefined
  export let autoplay: boolean = false
  export let disablekb: boolean = false
  export let controls: boolean = true
  export let fs = true
  export let loop = false
  const src = `https://www.youtube.com/embed/${id}?${new URLSearchParams({
    playlist,
    start,
    listType: list ? 'playlist' : '',
    list: list ? list : '',
    disablekb: disablekb ? '1' : '0',
    controls: controls ? '1' : '0',
    fs: fs ? '1' : '0',
    loop: loop ? '1' : '0'
  }).toString()}`
</script>

<div class="relative pb-[56.25%] mb-2">
  <iframe
    {src}
    class="absolute w-full h-full"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    loading="lazy"
    allowfullscreen />
</div>
