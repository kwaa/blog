<script lang="ts">
	import Footer from '$lib/components/footer.svelte'
</script>

<div class="pt-8 pb-4 px-4 lg:(pt-16 pb-8 px-0) mx-auto w-screen md:w-screen-md">
	<div class="card shadow-xl mb-8">
		<div class="card-body">
			<slot />
		</div>
	</div>
	<Footer />
</div>
