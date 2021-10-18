import type { EndpointOutput } from '@sveltejs/kit'
import site from '$lib/config/site'
import { modules, PostModule, allPosts as posts } from '$lib/utils/posts'

const render = async (): Promise<string> => `<?xml version='1.0' encoding='utf-8'?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${site.title}</title>
  ${ site.subtitle ? `<subtitle>${site.subtitle}</subtitle>` : ''}
  <link href="${site.url}" />
  <link href="${site.url}/atom.xml" rel="self" />
  <updated>${new Date().toJSON()}</updated>
  <author>
    <name>${site.author.name}</name>
    ${ site.author.email ? `<email>${site.author.email}</email>` : ''}
  </author>
  <id>${site.url}</id>
  <generator>SvelteKit/Urara</generator>
  ${posts
		.map(
			post => `<entry>
    <title><![CDATA[${post.title}]]></title>
    <link href="${post.slug}" />
    <id>${site.url}/${post.path}</id>
    <published>${new Date(post.date).toJSON()}</published>
    ${ post.lastmod ? `<updated>${new Date(post.lastmod).toJSON()}</updated>` : ''}
    ${ post.descr ? `<summary>${post.descr}</summary>` : ''}
    <content type="html">
      <![CDATA[${
				(modules[post.slug] as PostModule).default.render().html
        // eslint-disable-next-line no-control-regex
        .replace(/[\u0000-\u001F]/g, '')
        .replace(/[\r\n]/g, '')
			  .match(/<main [^>]+>(.*?)<\/main>/g)
			}]]>
    </content>
  </entry>`).join('')}
</feed>`

export const get = async (): Promise<EndpointOutput> => {
	return {
		headers: {
			'Content-Type': 'application/atom+xml; charset=utf-8'
		},
		body: await render()
	}
}
