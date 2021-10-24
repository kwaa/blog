<script lang="ts" context="module">
  export async function load({ page }) {
    return {
      status: 301,
      redirect: `/${page.params.slug}`
    }
  }
</script>
