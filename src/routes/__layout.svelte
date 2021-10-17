<script context="module">
	export const load = async ({ page }) => ({
		props: {
			path: page.path
		}
	})
</script>

<script lang="ts">
	import { onMount } from 'svelte'
	import { browser } from '$app/env'
	import Header from '$lib/components/header.svelte'
	import Transition from '$lib/components/transition.svelte'
	import 'virtual:windi.css'
	import '../app.css'
	// @ts-ignore: Cannot find module 'virtual:windi-devtools' or its corresponding type declarations.
	if (browser) import('virtual:windi-devtools')
	// import Head from '$lib/components/head.svelte'
	onMount(async () => {
		if (browser) {
			// @ts-ignore: Can not find module 'virtual:windi-devtools' or its corresponding type declarations.
			// await import('virtual:windi-devtools')
			if (!localStorage.getItem('theme') && window.matchMedia) {
				document.documentElement.setAttribute(
					'data-theme',
					window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
				)
				window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
					if (!localStorage.getItem('theme'))
						document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light')
				})
			}
		}
	})
	export let path: string
</script>

<!-- <Head /> -->

<Header />

<Transition refresh={path}>
	<slot />
</Transition>
