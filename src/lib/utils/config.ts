export const getConfig = (config: string, lang: string = 'index') => {
  const target = import.meta.globEager(`/src/lib/config/*.ts`)[`/src/lib/config/${config}.ts`]
  return target[lang]
}
