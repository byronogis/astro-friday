import type { Processor, ProcessorOptionsBasic } from './index'

/**
 * Ensure the entry has an ID in the frontmatter.
 */
export const processorId: Processor<ProcessorIdOptions> = function (_options = {}) {
  return async function (entry, config) {
    const {
      frontmatterKeys: fKeys,
    } = config.post

    if (!entry.data[fKeys.id]) {
      entry.data[fKeys.id] = entry.id
    }
  }
}

export interface ProcessorIdOptions extends ProcessorOptionsBasic {
  // ...
}
