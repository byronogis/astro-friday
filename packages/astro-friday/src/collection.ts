import type { ResolvedConfig } from './config'
import { z } from 'astro/zod'
import dayjs from 'dayjs'

export type FrontmatterKeysInternal = | 'title'
  | 'subtitle'
  | 'description'
  | 'created'
  | 'modified'
  | 'author'
  | 'series'
  | 'tags'
  | 'keywords'
  | 'draft'
  | 'lang'
  | 'permalink'
  | 'toc'

export function getSchema(resolvedConfig: ResolvedConfig) {
  const fKeys = resolvedConfig.post.frontmatterKeys

  return z.object({
    [fKeys.title]: z.string(),
    [fKeys.subtitle]: z.string().optional(),
    [fKeys.description]: z.string().optional(),
    [fKeys.created]: z.date().default(new Date('1970-01-01')).transform(val => dayjs(val).format('YYYY-MM-DDTHH:mm:ssZ')),
    [fKeys.modified]: z.date().optional().transform(val => val ? dayjs(val).format('YYYY-MM-DDTHH:mm:ssZ') : undefined),
    [fKeys.author]: z.string().default(resolvedConfig.author.name), // .transform(val => `${val}${resolvedConfig.author.email ? ` <${resolvedConfig.author.email}>` : ''}`),
    [fKeys.series]: z.union([z.string(), z.array(z.string())]).optional().default([]).transform(val => Array.isArray(val) ? val : [val]),
    [fKeys.tags]: z.union([z.string(), z.array(z.string())]).optional().default([]).transform(val => Array.isArray(val) ? val : [val]),
    [fKeys.keywords]: z.union([z.string(), z.array(z.string())]).optional().default([]).transform(val => Array.isArray(val) ? val : [val]),
    [fKeys.draft]: z.boolean().default(false),
    [fKeys.lang]: z.string().optional().default('en'),
    [fKeys.permalink]: z.string().optional(),
    /**
     * Table of contents (TOC) generation for posts
     */
    [fKeys.toc]: z.object({
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
