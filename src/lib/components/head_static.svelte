<script lang="ts">
  import { head } from '$lib/config/general'
  import { dev } from '$lib/config/site'
  import Icon from '$lib/components/head_icon.svelte'
  import RelMeAuth from '$lib/components/head_relmeauth.svelte'
</script>

<svelte:head>
  {#if head.custom}
    {#if Array.isArray(head.custom)}
      {#each head.custom as tag}
        {@html tag}
      {/each}
    {:else}
      {#each [...(head.custom?.common ?? []), ...((dev ? head.custom?.dev : head.custom?.prod) ?? [])] as tag}
        {@html tag}
      {/each}
    {/if}
  {/if}
</svelte:head>

<Icon />
<RelMeAuth />
