import type { SetRequired } from 'type-fest'
import type { ResolvedConfig } from '../config'
import type { CollectionEntry } from '../types/content'
import { getCollection } from 'astro:content'
import dayjs from 'dayjs'
import pLimit from 'p-limit'
import config from 'virtual:astro-friday-config'
import * as processors from '../processors'

/**
 * Get a list or map of content entries from all collections which are defined in the config.
 *
 * By default, this function returns a flat list of entries, but if the `groupBy` option is provided,
 * it will return a map of entries grouped by the specified key.
 */
export function getPostList(
  options: SetRequired<GetPostListOptions, 'groupBy'>,
): Promise<Map<string, CollectionEntry[]>>
export function getPostList(
  options?: GetPostListOptions,
): Promise<CollectionEntry[]>
export function getPostList(
  options: GetPostListOptions = {},
): Promise<CollectionEntry[] | Map<string, CollectionEntry[]>> {
  const {
    langCollapse = config.post.lang.collapse,
    groupBy,
    filters = {},
    sort = config.post.sort,
  } = options

  const tags = [filters.tags || []].flat()
  const series = [filters.series || []].flat()

  const fKeys = config.post.frontmatterKeys

  const tasks = Object.keys(config.collections).map(name => getCollection(name))

  return Promise.all(tasks)
    .then(lists => lists.flat())
    // Process each entry with the processors if defined
    .then(async (list) => {
      const entriesById = groupPostList(list, 'id') as Map<string, CollectionEntry[]>

      const limit = pLimit(10)

      await Promise.all(list.map(entry => limit(async () => {
        const names = (Object.keys(processors) as (keyof typeof processors)[])
          .filter((name) => {
            const processorOptions = config.processors?.[name]
            return processorOptions?.enabled ?? true
          })
          .sort((a, b) => {
            const orderA = (config.processors?.[a]?.order ?? Infinity)
            const orderB = (config.processors?.[b]?.order ?? Infinity)
            return orderA - orderB
          })

        for (const name of names) {
          const processor = processors[name]
          const processorOptions = config.processors?.[name] || {}
          await processor(processorOptions)(entry, config, entriesById)
        }
      })))

      return langCollapse
        ? Array.from(entriesById.values()).map((entries) => {
            // Find the entry with the default lang if exists,
            const defaultLangEntry = entries.find(entry => entry.data[fKeys.lang] === config.post.lang.default)
            if (defaultLangEntry) {
              return defaultLangEntry
            }

            // Otherwise return by fallback from config
            const { collapseFallbackLangCodes = [] } = config.post.lang
            collapseFallbackLangCodes.push(entries[0].data[fKeys.lang])
            const fallbackLangCode = collapseFallbackLangCodes.find((langCode) => {
              return entries.some(entry => entry.data[fKeys.lang] === langCode)
            })!
            return entries.find(entry => entry.data[fKeys.lang] === fallbackLangCode)!
          })
        : list
    })
    // Filte the list
    .then(list => list.filter((entry) => {
      const {
        data,
      } = entry

      /**
       * Filter by tags
       */
      if (tags.length && tags.every(tag => !data[fKeys.tags].includes(tag))) {
        return false
      }

      /**
       * Filter by series
       */
      if (series.length && series.every(series_ => !data[fKeys.series].includes(series_))) {
        return false
      }

      return true
    }))
    // Sort the list
    .then(list => list.sort((a, b) => {
      const { key, api } = ({
        'created-asc': { key: 'created', api: 'isAfter' },
        'created-desc': { key: 'created', api: 'isBefore' },
        'modified-asc': { key: 'modified', api: 'isAfter' },
        'modified-desc': { key: 'modified', api: 'isBefore' },
      } as Record<ResolvedConfig['post']['sort'], {
        key: 'created' | 'modified'
        api: 'isAfter' | 'isBefore'
      }>)[sort]

      return dayjs(a.data[fKeys[key]])[api](dayjs(b.data[fKeys[key]])) ? 1 : -1
    }))
    // Group the list if needed
    .then((list) => {
      if (!groupBy)
        return list

      return groupPostList(list, groupBy)
    })
}

function groupPostList(list: CollectionEntry[], groupBy: GetPostListOptions['groupBy']) {
  if (!groupBy) {
    return list
  }

  const fKeys = config.post.frontmatterKeys

  return list.reduce((acc, cur) => {
    const key = {
      year: () => String(dayjs(cur.data[fKeys.created]).year()),
      tag: () => cur.data[fKeys.tags],
      series: () => cur.data[fKeys.series],
      collection: () => cur.collection,
      id: () => cur.data[fKeys.id] || cur.id,
    }[groupBy]()

    ;[key].flat().forEach((k) => {
      if (!acc.has(k)) {
        acc.set(k, [])
      }
      acc.get(k)!.push(cur)
    })

    return acc
  }, new Map<string, CollectionEntry[]>())
}

interface GetPostListOptions {
  /**
   * Override the lang collapse setting from config.
   *
   * @default config.post.lang.collapse
   */
  langCollapse?: ResolvedConfig['post']['lang']['collapse']
  groupBy?: 'year' | 'tag' | 'series' | 'collection' | 'id'
  filters?: {
    tags?: string | string[]
    series?: string | string[]
  }
  /**
   * Sort order for the posts.
   *
   * @default config.post.sort
   */
  sort?: ResolvedConfig['post']['sort']
}
