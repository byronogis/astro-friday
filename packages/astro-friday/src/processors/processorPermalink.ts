import type { Processor, ProcessorOptionsBasic } from './index'
import { getPath } from '../utils/path'

/**
 * Generate a permalink for the entry.
 */
export const processorPermalink: Processor<ProcessorPermalinkOptions> = function (options = {}) {
  const {
    override = false,
  } = options

  return async function (entry, config) {
    const {
      frontmatterKeys: fKeys,
    } = config.post

    const isPermalinkExist = Boolean(entry.data[fKeys.permalink])
    if (!override && isPermalinkExist) {
      return
    }

    const permalink = getPath(
      'post',
      config.post.pathStyle === 'collection/id'
        ? [entry.collection, entry.id]
        : [entry.id],
      { host: true },
    )

    entry.data[fKeys.permalink] = permalink
  }
}

export interface ProcessorPermalinkOptions extends ProcessorOptionsBasic {
  /**
   * Override existing permalink in frontmatter.
   *
   * @default false
   */
  override?: boolean
}
