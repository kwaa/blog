<script lang="ts" context="module">
  export const load = ({ page }) => {
    return {
      status: 301,
      redirect: `/${page.params.slug}`
    }
  }
</script>
