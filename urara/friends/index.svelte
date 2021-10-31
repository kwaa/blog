<script lang="ts">
  import { Friend, friends } from '$lib/config/friends'
  import Head from '$lib/components/head.svelte'
  import Footer from '$lib/components/footer.svelte'
  import FriendComponent from '$lib/components/extra/friend.svelte'

  const rnd = Math.random()
  const fy = (a: Friend[], r = 0, c = a.length) => {
    while (c) (r = (rnd * c--) | 0), ([a[c], a[r]] = [a[r], a[c]])
    return a
  }
  const allFriends = fy(friends)
</script>

<Head />

<div
  class="grid grid-cols-1 max-w-90 gap-8 md:(grid-cols-2 max-w-174 gap-6) xl:(grid-cols-4 max-w-304) max-w-screen-sm mx-auto px-4 mb-4 lg:mb-8"
>
  {#if allFriends.length > 0}
    {#each allFriends as friend, index}
      {#if friend.href}
        <a href={friend.href} rel="noopener external" target="_blank" class="w-full max-w-82 h-36">
          {#if friend.html}
            {@html friend.html}
          {:else}
            <FriendComponent {friend} />
          {/if}
        </a>
      {:else}
        {friend.html}
      {/if}
    {/each}
  {/if}
  <Footer class="col-start-1 col-end-[-1]" />
</div>
