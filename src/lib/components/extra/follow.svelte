<script lang="ts">
  let status: string = ''
  let statusText: string = ''
  let input: string = ''
  const follow = async (event: Event, account = new FormData(event.target as HTMLFormElement).get('account') as string) =>
    await fetch(
      account.startsWith('@')
        ? `https://${account.split('@')[2]}/.well-known/webfinger?resource=acct:${account.slice(1)}`
        : `https://${account.split('@')[1]}/.well-known/webfinger?resource=acct:${account}`,
      {
        headers: { Accept: 'application/jrd+json' }
      }
    )
      .then(res => {
        if (res.ok) {
          status = 'success'
          return res.json()
        } else {
          status = 'error'
          statusText = res.status + res.statusText
          throw Error(res.status + res.statusText)
        }
      })
      .then(
        ({ links }) => links.find((link: { rel: string }) => link.rel === 'http://ostatus.org/schema/1.0/subscribe').template
      )
      .then(template => (window.location.href = template.replace('{uri}', `dotdev@kwaa.moe`)))
      .catch(error => console.error(error))
  $: if (input)
    input.length < 5 ? (status = '') : input.includes('@') && input.includes('.') ? (status = 'success') : (status = 'warning')
</script>

<input type="checkbox" id="remote-follow" class="modal-toggle" />
<label for="remote-follow" class="modal modal-bottom sm:modal-middle cursor-pointer">
  <div class="modal-box relative" for="">
    <form on:submit|preventDefault={follow} class="form-control gap-2">
      <div class="label py-0">
        <span class="label-text">Your fediverse account ID:</span>
      </div>
      <label class="input-group">
        <input
          bind:value={input}
          type="text"
          id="account"
          name="account"
          placeholder="username@instance.tld"
          class:input-success={status === 'success'}
          class:input-warning={status === 'warning'}
          class:input-error={status === 'error'}
          class="input input-bordered transition-all flex-1" />
        <button type="submit" class="btn btn-square">
          <span class="i-heroicons-outline-paper-airplane rotate-90" />
        </button>
      </label>
      {#if statusText}
        <div class="label py-0">
          <span class="label-text-alt text-error">
            {statusText}{#if statusText === '404'}: Couldn't find user{/if}
          </span>
        </div>
      {/if}
    </form>
  </div>
</label>
