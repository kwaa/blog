<script lang="ts">
	import site from '$lib/config/site'
	import { config as headerConfig } from '$lib/config/header'
	import { browser } from '$app/env'
	import Theme from '$lib/components/theme.svelte'

	let pin: boolean
	let percent: number
	let [scrollY, lastY] = [0, 0]

	const checkY = (scrollY: number) => {
		const y = lastY - scrollY
		lastY = scrollY
		if (browser) {
			percent =
				Math.round(
					(scrollY /
						(document.documentElement.scrollHeight - document.documentElement.clientHeight)) *
						10000
				) / 100
		}
		return y < 0 ? false : true
	}

	$: pin = checkY(scrollY)
</script>

<svelte:window bind:scrollY />

<header
	id="header"
	class="navbar fixed w-screen z-50 mb-2 shadow-lg bg-neutral bg-opacity-50 backdrop-filter backdrop-blur rounded-none text-neutral-content transform transition-transform ease-in-out duration-250"
	class:-translate-y-32={!pin || scrollY === 0}
>
	<div class="flex-1">
		<a href="/" class="btn btn-ghost rounded-full normal-case text-lg font-bold">
			{site.title}
		</a>
	</div>
	<div class="flex-none">
		{#if headerConfig.nav}
			{#each Object.entries(headerConfig.nav) as [name, href]}
				<a {href} sveltekit:prefetch class="btn btn-ghost normal-case">{name}</a>
			{/each}
		{/if}
		<Theme {pin} />
	</div>
</header>

<button
	id="totop"
	on:click={() => window.scrollTo(0,0)}
	aria-label="scroll to top"
	class="btn btn-circle btn-lg fixed z-50 backdrop-filter backdrop-blur border-none shadow-lg bg-opacity-50 hover:bg-opacity-60 bottom-6 right-6 transform transition-transform ease-in-out duration-250"
	class:translate-y-24={!pin || scrollY === 0}
>
	<svg class="h-16 w-16 fixed stroke-accent stroke-width-3">
		<circle
			class="transform origin-center -rotate-90 stroke-accent stroke-width-4 stroke-cap-round fill-transparent"
			r="30"
			cx="32"
			cy="32"
			stroke-dasharray={30 * 2 * Math.PI}
			stroke-dashoffset={30 * 2 * Math.PI - (percent / 100) * (30 * 2 * Math.PI)}
		/>
	</svg>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="inlinw-block h-6 w-6 stroke-current"
		fill="none"
		viewBox="0 0 24 24"
	>
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
	</svg>
</button>
