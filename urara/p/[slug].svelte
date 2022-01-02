<script lang="ts" context="module">
  export const load = ({ params }) => {
    return {
      status: 301,
      redirect: `/${params.slug}`
    }
  }
</script>
