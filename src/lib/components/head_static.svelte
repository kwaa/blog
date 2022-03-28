<script lang="ts">
  import { head } from '$lib/config/head'
  import { mode } from '$lib/config/misc'
  import Icon from '$lib/components/head_icon.svelte'
  import RelMeAuth from '$lib/components/head_relmeauth.svelte'
</script>

<svelte:head>
  {#each [...head.custom.common, ...(mode === 'prod' ? head.custom.prod : head.custom.dev)] as tag}
    {@html tag}
  {/each}
</svelte:head>

<Icon />
<RelMeAuth />
