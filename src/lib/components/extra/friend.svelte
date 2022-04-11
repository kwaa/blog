<script lang="ts">
  import type { Friend } from '$lib/config/friends'
  import Footer from '$lib/components/footer.svelte'
  export let friend: Friend = undefined
  export let title: Friend['title'] = undefined

  if (!friend)
    friend = {
      title
    }
</script>

{#if friend.id === 'footer'}
  <Footer rounded={true} />
{:else}
  <div
    class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow flex flex-col {friend.descr
      ? ''
      : 'items-center justify-center'} p-2 h-full w-full">
    <div class="flex flex-row">
      {#if friend.avatar}
        <div class="flex-none avatar mr-4">
          <div class="rounded-full border-3 border-white shadow-xl transition-shadow w-16 h-16">
            <img src={friend.avatar} alt={friend.title} loading="lazy" />
          </div>
        </div>
      {/if}
      {#if friend.title}
        <div class="flex-1 flex text-xl items-center my-2">{friend.title}</div>
      {/if}
    </div>
    {#if friend.descr}
      <div class="flex-1 flex items-center justify-center">
        <span class="overflow-clip">
          {friend.descr}
        </span>
      </div>
    {/if}
  </div>
{/if}
