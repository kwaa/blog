<script lang="ts">
	import icons from '$lib/config/icons'
</script>

<svelte:head>
	{#if icons.favicon}
		<link
			rel="icon"
			href={icons.favicon.src}
			sizes={icons.favicon.sizes ?? ''}
			type={icons.favicon.type}
		/>
	{/if}
	{#if icons.px192}
		<link
			rel="icon"
			href={icons.px192.src}
			sizes={icons.px192.sizes ?? ''}
			type={icons.px192.type ?? 'image/png'}
		/>
	{/if}
	{#if icons.appleTouchIcon}
		<link
			rel="apple-touch-icon"
			href={icons.appleTouchIcon.src}
			sizes={icons.appleTouchIcon.sizes ?? ''}
			type={icons.appleTouchIcon.type ?? 'image/png'}
		/>
	{/if}
</svelte:head>
