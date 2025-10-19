import type { ResolvedConfig } from './config'
import { z } from 'astro/zod'
import dayjs from 'dayjs'

export function getSchema(resolvedConfig: ResolvedConfig) {
  return z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    created: z.date().default(new Date('1970-01-01')).transform(val => dayjs(val).format('YYYY-MM-DDTHH:mm:ssZ')),
    modified: z.date().optional().transform(val => val ? dayjs(val).format('YYYY-MM-DDTHH:mm:ssZ') : undefined),
    author: z.string().default(resolvedConfig.author.name), // .transform(val => `${val}${resolvedConfig.author.email ? ` <${resolvedConfig.author.email}>` : ''}`),
    series: z.union([z.string(), z.array(z.string())]).optional().default([]).transform(val => Array.isArray(val) ? val : [val]),
    tags: z.union([z.string(), z.array(z.string())]).optional().default([]).transform(val => Array.isArray(val) ? val : [val]),
    keywords: z.union([z.string(), z.array(z.string())]).optional().default([]).transform(val => Array.isArray(val) ? val : [val]),
    draft: z.boolean().default(false),
    lang: z.string().optional().default('en'),
    /**
     * Table of contents (TOC) generation for posts
     */
    toc: z.object({
      /**
       * Enable or disable the table of contents (TOC) generation for posts.
       */
      enable: z.boolean().optional(),
      /**
       * The heading levels to include in the TOC.
       *
       * @example [2, 4] will include headings from h2 to h4.
       */
      range: z.tuple([z.number().min(1).max(6), z.number().min(1).max(6)]).optional(),
    }).optional(),
  })
}

export type Schema = z.infer<ReturnType<typeof getSchema>>
