<script lang="ts">
  import { fly } from 'svelte/transition'
  export let refresh = ''

  // class="min-h-screen flex justify-center items-center"
</script>

{#key refresh}
  <div in:fly={{ y: 100, duration: 250, delay: 300 }} out:fly={{ y: 100, duration: 250 }}>
    <slot />
  </div>
{/key}
