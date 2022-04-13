<script lang="ts">
  import IconPaperAirplane from '~icons/heroicons-outline/paper-airplane'
  let warning: boolean = false
  let error: string = ''
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
          error = ''
          return res.json()
        } else {
          error = res.status + res.statusText
          console.log(error)
          throw Error(res.status + res.statusText)
        }
      })
      .then(
        ({ links }) => links.find((link: { rel: string }) => link.rel === 'http://ostatus.org/schema/1.0/subscribe').template
      )
      .then(template => (window.location.href = template.replace('{uri}', `dotdev@kwaa.moe`)))
      .catch(error => console.error(error))
  $: if (input) warning = input.includes('@') && input.includes('.') ? false : true
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
          class:input-warning={warning}
          class:input-error={error.length > 0}
          class="input input-bordered flex-1" />
        <button type="submit" class="btn btn-square">
          <IconPaperAirplane class="h-6 w-6 rotate-90" />
        </button>
      </label>
      <div class="label py-0">
        {#if error.length > 0}
          <span class="label-text-alt text-error">
            {error}{#if error === '404'}: Couldn't find user{/if}
          </span>
        {/if}
      </div>
    </form>
  </div>
</label>
