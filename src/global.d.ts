/// <reference types="@sveltejs/kit" />

interface ImportMeta {
  env: ImportMetaEnv
  // globEager<T = { [key: string]: unknown }>(pattern: string): Record<string, T>
  // globEager<T = unknown>(globPath: string): Record<string, T>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  globEager<Module = { [key: string]: any }>(pattern: string): Record<string, Module>
}

interface ImportMetaEnv extends Record<string, string> {
  VITE_DOMAIN_URL?: string
  VITE_IMG_PREFIX?: string
}
