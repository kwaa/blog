import type { EndpointOutput } from '@sveltejs/kit'
import site from '$lib/config/site'
import { modules, Post, PostModule, allPosts as posts } from '$lib/utils/posts'

const render = async (posts: Post[]): Promise<string> => `<?xml version='1.0' encoding='utf-8'?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <id>${site.url}</id>
  <title><![CDATA[${site.title}]]></title>
  <subtitle><![CDATA[${site.title}]]></subtitle>
  <updated>${new Date().toUTCString()}</updated>
  <generator>SvelteKit/Urara</generator>
  ${posts
		.map(
			post => `<entry>
    <title><![CDATA[${post.title}]]></title>
    <link href="${post.slug}" />
    <id>${site.url}/${post.path}</id>
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
</feed>
`

export const get = async (): Promise<EndpointOutput> => {
	return {
		headers: {
			'Content-Type': 'application/atom+xml; charset=utf-8'
		},
		body: await render(posts)
	}
}
