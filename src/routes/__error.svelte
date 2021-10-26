<script lang="ts" context="module">
  export const load = ({ error, status }) => {
    return {
      props: {
        status: status,
        message: error.message
      }
    }
  }
</script>

<script lang="ts">
  import Head from '$lib/components/head.svelte'
  import Footer from '$lib/components/footer.svelte'
  export let status: string
  export let message: string
  console.log(status, message)
</script>

<Head />

<div class="pt-8 pb-4 px-4 lg:(pt-16 pb-8 px-0) mx-auto w-screen md:w-screen-md">
  <div class="card shadow-xl mb-8">
    <div class="card-body">
      <h1 class="card-title text-3xl">{status}</h1>
      <div class="prose">
        {message}
      </div>
    </div>
  </div>
  <Footer />
</div>
