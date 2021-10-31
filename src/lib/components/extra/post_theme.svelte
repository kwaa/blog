<script lang="ts">
  export let theme = undefined
</script>

{@html `
${theme ?? ''}
`}
