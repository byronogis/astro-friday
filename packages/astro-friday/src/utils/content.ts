import type { SetRequired } from 'type-fest'
import type { CollectionEntry } from '../types/content'
import { getCollection } from 'astro:content'
import dayjs from 'dayjs'
import pLimit from 'p-limit'
import config from 'virtual:astro-friday-config'

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
    groupBy,
    filters = {},
    sort = 'created-desc',
  } = options

  const tags = [filters.tags || []].flat()
  const series = [filters.series || []].flat()

  const fKeys = config.post.frontmatterKeys

  const tasks = Object.keys(config.collections).map(name => getCollection(name, (entry) => {
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

  return Promise.all(tasks)
    .then(lists => lists.flat())
    // Process each entry with the entryProcessor if defined
    .then(async (list) => {
      const entryProcessors = config.post.entryProcessors
      const entryProcessorsArraying = entryProcessors.map(i => Array.isArray(i) ? i : [i])

      const limit = pLimit(10)

      await Promise.all(list.map(entry => limit(async () => {
        for await (const [processor, ...parameters] of entryProcessorsArraying) {
          await processor(...parameters)(entry, config)
        }
      })))

      return list
    })
    .then(list => list.sort((a, b) => {
      if (sort === 'created-asc') {
        return dayjs(a.data[fKeys.created]).isAfter(dayjs(b.data[fKeys.created])) ? 1 : -1
      }
      else if (sort === 'created-desc') {
        return dayjs(a.data[fKeys.created]).isBefore(dayjs(b.data[fKeys.created])) ? 1 : -1
      }
      return 0
    }))
    .then((list) => {
      if (!groupBy)
        return list

      return list.reduce((acc, cur) => {
        const key = {
          year: () => String(dayjs(cur.data[fKeys.created]).year()),
          tag: () => cur.data[fKeys.tags],
          series: () => cur.data[fKeys.series],
          collection: () => cur.collection,
        }[groupBy]()

        ;[key].flat().forEach((k) => {
          if (!acc.has(k)) {
            acc.set(k, [])
          }
          acc.get(k)!.push(cur)
        })

        return acc
      }, new Map<string, CollectionEntry[]>())
    })
}

interface GetPostListOptions {
  groupBy?: 'year' | 'tag' | 'series' | 'collection'
  filters?: {
    tags?: string | string[]
    series?: string | string[]
  }
  /**
   * Sort order for the posts.
   *
   * By default, posts are sorted by created date in descending order (newest first).
   *
   * - 'created-desc': Sort by created date in descending order (newest first).
   * - 'created-asc': Sort by created date in ascending order (oldest first).
   *
   * @default 'created-desc'
   */
  sort?: 'created-desc' | 'created-asc'
}
