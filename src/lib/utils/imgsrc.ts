import site from '$lib/config/site'
import { prefix } from '$lib/config/img'

const srcReplace = <B extends boolean>(
	source: string,
	{ absolute, alternative }: { absolute?: boolean; alternative?: B }
): B extends true ? { src: string; alt: string } : string => {
	let src: string, alt: string
	Array.isArray(source) ? ([alt, src] = [source[0], source[1]]) : ([alt, src] = [source, source])
	if (src.startsWith('/')) src = src.slice(1)
	if (!src.startsWith('http')) src = absolute ? `${prefix || site.url + '/'}${src}` : `${prefix}${src}`
	return (alternative ? { src: src, alt: alt } : src) as B extends true ? { src: string; alt: string } : string 
}

export { srcReplace as default }
