/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="unplugin-icons/types/svelte" />

interface ImportMetaEnv {
  [key: string]: string | boolean
}

interface ImportMeta {
  // env: ImportMetaEnv
  globEager<Module = { [key: string]: unknown }>(pattern: string): Record<string, Module>
}

declare namespace Urara {
  namespace Post {
    interface Article {
      layout: 'article'
      /** post photo */
      photo?: string
      /** post photo alternative */
      alt?: string
      /** table of content - auto generated or set `false` to disable */
      toc?: false | Article.Toc[]
    }
    namespace Article {
      interface Toc {
        depth?: number
        title?: string
        slug?: string
        children?: Toc[]
      }
    }
    interface Note {
      layout: 'note'
    }
    // interface Audio {
    //   layout: 'audio'
    //   audio: string
    // }
    interface Photo {
      layout: 'photo'
      /** post photo */
      photo?: string
      /** post photo alternative */
      alt?: string
    }
    // interface Video {
    //   layout: 'video'
    //   video?: string
    // }
    interface Reply {
      layout: 'reply'
      /** u-in-reply-to */
      inReplyTo?: string | string[]
    }
    // interface Repost {
    //   layout: 'repost'
    //   'repost-of': string
    // }
    // interface Like {
    //   layout: 'like'
    //   'like-of': string
    // }
    // interface Bookmark {
    //   layout: 'bookmark'
    //   'bookmark-of': string
    // }
    interface Common {
      /** @deprecated - do not use */
      priority?: never
      /** @deprecated - transfer to `created` */
      date?: string
      /** @deprecated - transfer to `updated` */
      lastmod?: string
      /** @deprecated - transfer to `summary` */
      descr?: never
      /** @deprecated - transfer to `photo` */
      cover?: never
      /** post path - auto generated */
      path?: string
      /** post slug - auto generated */
      slug?: string
      /** created time - auto generated or set manually */
      created?: string
      /** updated time - auto generated or set manually */
      updated?: string
      /** published time */
      published?: string
      /** post title */
      title?: string
      /** post summary */
      summary?: string
      /** post tags */
      tags?: string[]
      /** enable some advanced features.
       * @property hidden - deprecated, hide this post from the homepage and Atom feed.
       * @property unlisted - hide this post from the homepage and feed.
       * @property draft - mark as draft
       * @property private - equivalent to draft
       * @property bridgy-fed - add a link to Bridgy Fed in the post. https://fed.brid.gy/
       * @property bridgy-{target} - add a link to Bridgy in the post. https://brid.gy/publish/{target}
       */
      flags?: string[]
    }
    type Metadata = Common & (Article | Note | Photo | Reply)
    interface Module {
      default: { render: () => { html: string; head: string; css: { code: string } } }
      metadata: Metadata
    }
  }
  type Post = Post.Metadata & { html?: string }
  type Page = { title?: string; path: string }
}
