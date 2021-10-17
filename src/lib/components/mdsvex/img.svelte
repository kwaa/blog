<script lang="ts">
	import Picture from '../extra/picture.svelte'
	export let src: string
	export let alt: string
</script>

<!-- <img {src} {alt} class="rounded-box" loading="lazy" /> -->

<Picture {src} {alt} class="rounded-lg my-2" />
