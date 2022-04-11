<script lang="ts">
  import Masonry from 'svelte-bricks'
  import { Friend, friends as allFriends } from '$lib/config/friends'
  import Head from '$lib/components/head.svelte'
  import Footer from '$lib/components/footer.svelte'
  import FriendComponent from '$lib/components/extra/friend.svelte'

  const rnd = Math.random()
  const fy = (a: Friend[], r = 0, c = a.length) => {
    while (c) (r = (rnd * c--) | 0), ([a[c], a[r]] = [a[r], a[c]])
    return a
  }
  let friends = [...fy(allFriends), { id: 'footer' }]
  let width, height
  console.log(friends)
</script>

<Head />

<div class="mx-4 sm:mx-8 md:my-4 lg:mx-16 lg:my-8 xl:mx-32 xl:my-16">
  <Masonry items={friends} minColWidth={280} maxColWidth={384} gap={32} let:item bind:width bind:height>
    <FriendComponent friend={item} />
  </Masonry>
</div>
