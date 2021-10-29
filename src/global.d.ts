/// <reference types="@sveltejs/kit" />

interface ImportMetaEnv extends Record<string, string> {
  URARA_SITE_PROTOCOL?: string;
  URARA_SITE_DOMAIN?: string
  URARA_IMG_PREFIX?: string
}

interface ImportMeta {
  env: ImportMetaEnv // eslint-disable-next-line @typescript-eslint/no-explicit-any
  globEager<Module = { [key: string]: any }>(pattern: string): Record<string, Module>
}

declare namespace Urara {
  interface PostMetadata extends Record<string, unknown> {
    title?: string
    date?: string
    lastmod?: string
    tags?: string[]
    priority?: [string, number]
    descr?: string
    cover?: string
  }
  interface PostModule {
    default: { render: () => { html: string; head: string; css: { code: string } } }
    metadata: PostMetadata
  }
  interface Post extends PostMetadata {
    slug?: string
    path?: string
    html?: string
  }
}
