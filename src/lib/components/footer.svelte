<script lang="ts">
	import site from '$lib/config/site'
	import { config as footerConfig } from '$lib/config/footer'
	// import { site, footer as footerConf } from '$lib/urara.config'
</script>

<footer id="footer" class="p-10 footer bg-base-300 text-base-content footer-center rounded-box">
	<div class="prose">
		<p>
			{#each Object.entries(footerConfig.nav) as [name, href], i}
				<a {href} sveltekit:prefetch class="inline-block">{name}</a>
				{#if i < Object.keys(footerConfig.nav).length - 1}
					<span> · </span>
				{/if}
			{/each}
		</p>
		<p>
			Copyright © {site.since && site.since !== new Date().toJSON().substr(0, 4)
				? `${site.since} - ${new Date().toJSON().substr(0, 4)}`
				: new Date().toJSON().substr(0, 4)}
			{site.author.name}<br />
			Powered by
			<a rel="noopener external" target="_blank" href="https://github.com/sveltejs/kit">SvelteKit</a
			>
			/
			<a rel="noopener external" target="_blank" href="https://github.com/pngwn/mdsvex">MDSveX</a>
			/
			<a rel="noopener external" target="_blank" href="https://github.com/importantimport/urara"
				>Urara</a
			>
		</p>
		{#if footerConfig.html}
			{@html `${footerConfig.html}`}
		{/if}
	</div>
</footer>
