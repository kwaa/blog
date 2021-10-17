<script lang="ts">
	export let href: string
	export let rel: string
	export let target: string
</script>

<a
	{href}
	{rel}
	{target}
	class="!text-secondary transition-all ease-in-out underline underline-transparent hover:(!text-secondary-focus underline-secondary-focus)"
	><slot /></a
>
