<script lang="ts">
  import { dev } from '$app/environment'
  import { site } from '$lib/config/site'
  import { header as headerConfig } from '$lib/config/general'
  import { hslToHex } from '$lib/utils/color'

  const b1 = hslToHex(
    ...(getComputedStyle(document.documentElement)
      .getPropertyValue('--b1')
      .slice(dev ? 1 : 0)
      .replaceAll('%', '')
      .split(' ')
      .map(Number) as [number, number, number])
  )
  const bc = hslToHex(
    ...(getComputedStyle(document.documentElement)
      .getPropertyValue('--bc')
      .slice(dev ? 1 : 0)
      .replaceAll('%', '')
      .split(' ')
      .map(Number) as [number, number, number])
  )
  const p = hslToHex(
    ...(getComputedStyle(document.documentElement)
      .getPropertyValue('--p')
      .slice(dev ? 1 : 0)
      .replaceAll('%', '')
      .split(' ')
      .map(Number) as [number, number, number])
  )
</script>

<form
  action={headerConfig?.search?.provider === 'duckduckgo' ? '//duckduckgo.com/' : '//google.com/search'}
  method="get"
  accept-charset="UTF-8"
  class="flex-1">
  <input
    type="text"
    name="q"
    class="input input-ghost input-bordered xl:bg-base-100 xl:text-base-content transition-all w-full h-12" />
  <input
    type="hidden"
    name={headerConfig?.search?.provider === 'duckduckgo' ? 'sites' : 'sitesearch'}
    value={site.protocol + site.domain} />
  {#if headerConfig.search.provider === 'duckduckgo'}
    <!-- header -->
    <input type="hidden" name="kj" value={b1} />
    <!-- background -->
    <input type="hidden" name="k7" value={b1} />
    <!-- text -->
    <input type="hidden" name="k8" value={bc} />
    <!-- link -->
    <input type="hidden" name="k9" value={p} />
  {/if}
  <button type="submit" class="btn btn-square btn-ghost ml-2">
    <span class="i-heroicons-outline-search" />
  </button>
</form>
