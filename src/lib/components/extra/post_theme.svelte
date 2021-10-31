<script lang="ts">
    export let theme = undefined
</script>

{@html 

`
<style>
</style>
${theme ?? ''}
`

}
