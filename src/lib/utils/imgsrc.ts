import site from '$lib/config/site'
import { prefix } from '$lib/config/img'

/**
 * Replace Image Source
 * @param source - image source.
 * @param options - options.
 * @param options.absolute - set mandatory use of absolute links.
 * @param options.alternative - whether the input contains image alt.
 * @returns - options.alternative ? { src, alt } : src
 */
const srcReplace = <B extends boolean>(
  source: string,
  options?: { absolute?: boolean; alternative?: B }
): B extends true ? { src: string; alt: string } : string => {
  let src: string, alt: string
  Array.isArray(source) ? ([alt, src] = [source[0], source[1]]) : ([alt, src] = [source, source])
  if (src.startsWith('/')) src = src.slice(1)
  if (!src.startsWith('http')) src = options?.absolute ? `${prefix || site.url + '/'}${src}` : `${prefix}${src}`
  return (options?.alternative ? { src: src, alt: alt } : src) as B extends true ? { src: string; alt: string } : string
}

export { srcReplace as default }
