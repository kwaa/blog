<script lang="ts">
  import { site } from '$lib/config/site'
  import { config as headerConfig } from '$lib/config/header'
  import IconSearch from '~icons/heroicons-outline/search'
</script>

<form
  action={headerConfig.search.enable === 'duckduckgo' ? '//duckduckgo.com/' : '//google.com/search'}
  method="get"
  accept-charset="UTF-8"
  class="flex-1">
  <input
    type="text"
    name="q"
    class="input input-ghost input-bordered xl:bg-base-100 xl:text-base-content transition-all w-full h-12" />
  <input type="hidden" name={headerConfig.search.enable === 'duckduckgo' ? 'sites' : 'sitesearch'} value={site.url} />
  <button type="submit" class="btn btn-square btn-ghost ml-2">
    <IconSearch />
  </button>
</form>
