import type { EndpointOutput } from '@sveltejs/kit'
import site from '$lib/config/site'
import type { Post, PostModule } from '$lib/utils/posts'

const posts: Record<number, Post[]> = { 500: [] }

Object.entries(import.meta.globEager<PostModule>('/src/routes/**/index.{md,svelte.md,svx}'))
  .map(([postpath, module]) => ({
    slug: postpath,
    path: postpath.replace(/\/src\/routes\/|\/index.md|\/index.svelte.md|\/index.svx/g, ''),
    html: module.default
      .render()
      .html // eslint-disable-next-line no-control-regex
      .replace(/[\u0000-\u001F]/g, '')
      .replace(/[\r\n]/g, '')
      .match(/<main [^>]+>(.*?)<\/main>/gi)[0]
      .replace(/( class=")(.*?)(")/gi, '')
      .replace(/( style=")(.*?)(")/gi, '')
      .replace(/(<span>)(.*?)(<\/span>)/gi, '$2')
      .replace(/(<main>)(.*?)(<\/main>)/gi, '$2'),
    ...(module?.metadata ?? undefined)
  }))
  .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
  .forEach(post =>
    post.priority === undefined
      ? posts[500].push(post)
      : posts[post.priority[1]]
        ? posts[post.priority[1]].push(post)
        : (() => {
            posts[post.priority[1]] = []
            posts[post.priority[1]].push(post)
          })()
  )

const testPosts = Object.entries(posts).flatMap(([, value]) => value)

const render = async (): Promise<string> => `<?xml version='1.0' encoding='utf-8'?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${site.title}</title>
  ${site.subtitle ? `<subtitle>${site.subtitle}</subtitle>` : ''}
  <link href="${site.url}" />
  <link href="${site.url}/atom.xml" rel="self" />
  <updated>${new Date().toJSON()}</updated>
  <author>
    <name>${site.author.name}</name>${site.author.email ? `<email>${site.author.email}</email>` : ''}
  </author>
  <id>${site.url}/</id>
  <generator>SvelteKit/Urara</generator>
  ${testPosts
    .map(
      post => `<entry>
    <title type="html"><![CDATA[${post.title}]]></title>
    <link href="${site.url}/${post.path}" />
    <id>${site.url}/${post.path}</id>
    <published>${new Date(post.date).toJSON()}</published>
    <updated>${new Date(post.lastmod ?? post.date).toJSON()}</updated>${
        post.descr ? `\n    <summary type="html"><![CDATA[${post.descr.toString()}]]></summary>` : ''
      }
    <content type="html">
      <![CDATA[${post.html}]]>
    </content>
  </entry>`
    )
    .join('\n  ')}
</feed>`

export const get = async (): Promise<EndpointOutput> => {
  return {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8'
    },
    body: await render()
  }
}
