import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.md' }),
  schema: z
    .object({
      categories: z.array(z.string()).optional(),
      comment: z.boolean().optional(),
      cover: z.string().optional(),
      created: z.coerce.date().optional(),
      // FFF-flavored aliases, normalized below
      date: z.coerce.date().optional(),
      descr: z.string().optional(),
      flags: z.array(z.string()).optional(),
      image: z.string().optional(),
      lastmod: z.coerce.date().optional(),
      photo: z.string().optional(),
      published: z.coerce.date().optional(),
      summary: z.string().optional(),
      // canonical fields
      tags: z.array(z.string()).optional(),
      thumbnail: z.string().optional(),
      title: z.string().optional(),
      toc: z.boolean().optional(),
      updated: z.coerce.date().optional(),
    })
    .loose()
    .transform(fm => ({
      ...fm,
      created: fm.created ?? fm.date ?? fm.published,
      image: fm.image ?? fm.cover ?? fm.photo ?? fm.thumbnail,
      summary: fm.summary ?? fm.descr,
      updated: fm.updated ?? fm.lastmod,
    })),
})

export const collections = { posts }
