<script lang="ts">
  const follow = async e => {
    const account = new FormData(e.target).get('account')
    if (account.startsWith('@')) account = account.slice(1)
    const subscribe = await fetch(`https://${account.split('@')[1]}/.well-known/webfinger?resource=acct:${account}`, {
      headers: { Accept: 'application/jrd+json' }
    })
      .then(res => res.json())
      .then(({ links }) => links.find(link => link.rel === 'http://ostatus.org/schema/1.0/subscribe').template)
      .then(template => template.replace('{uri}', `dotdev@kwaa.moe`))
    window.location.href = subscribe
  }
</script>

<input type="checkbox" id="remote-follow" class="modal-toggle" />
<label for="remote-follow" class="modal modal-bottom sm:modal-middle cursor-pointer">
  <div class="modal-box relative" for="">
    <form on:submit|preventDefault={follow} class="form-control gap-2">
      <label class="label py-0">
        <span class="label-text">Your account ID</span>
      </label>
      <label class="input-group">
        <input type="text" id="account" name="account" placeholder="dotdev@kwaa.moe" class="input input-bordered flex-1" />
        <button type="submit" class="btn">Go</button>
      </label>
    </form>
  </div>
</label>
