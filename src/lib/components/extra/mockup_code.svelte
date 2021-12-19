<script lang="ts" context="module">
  export const prerender = true
</script>

<script lang="ts">
  export let code: string
  export let lang = 'text'
  export let theme = 'material-default'
  export let highlightedLines = undefined
</script>

<p>TODO {code} {lang} {theme} {highlightedLines}</p>
