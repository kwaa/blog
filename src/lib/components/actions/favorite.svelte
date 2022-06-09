<script lang="ts">
  import { site } from '$lib/config/site'
  export let post: Urara.Post
</script>

<a
  href={`https://quill.p3k.io/?dontask=1&me=https%3A%2F%2Fcommentpara.de%2F&like-of=${encodeURI(
    site.protocol + site.domain + post.path
  )}`}
  class="btn btn-lg btn-circle btn-ghost bg-base-100 shadow-lg hover:shadow-xl">
  <span class="i-heroicons-outline-heart" />
</a>
