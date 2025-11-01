import type { Schema } from '../collection'
import type { Processor, ProcessorOptionsBasic } from './index'

/**
 * Automatically set the langs codes for the entry.
 */
export const processorLangs: Processor<ProcessorLangsOptions> = function (options = {}) {
  const {
    override = false,
  } = options

  return async function (entry, config, entriesById) {
    const {
      frontmatterKeys: fKeys,
    } = config.post

    const entrysWithSameId = entriesById.get(entry.data[fKeys.id]!)!

    const langs = entrysWithSameId.reduce((acc, cur) => {
      acc[cur.data[fKeys.lang]] = {
        value: cur.id,
        collection: cur.collection,
      }
      return acc
    }, { } as Schema['langs'])

    entry.data[fKeys.langs] = {
      ...langs,
      ...entry.data[fKeys.langs],
      ...(override ? langs : {}),
    }
  }
}

export interface ProcessorLangsOptions extends ProcessorOptionsBasic {
  /**
   * Override existing langs code value in frontmatter.
   *
   * @default false
   */
  override?: boolean
}
