import type { Processor, ProcessorOptionsBasic } from './index'

/**
 * A processor to set the title of an entry based on its file name if not already set.
 */
export const processorTitle: Processor<ProcessorTitleOptions> = function (_options = {}) {
  return async function (entry, config) {
    const {
      frontmatterKeys: fKeys,
    } = config.post

    if (!entry.data[fKeys.title]) {
      entry.data[fKeys.title] = entry.filePath!.split('/').pop()!
    }
  }
}

export interface ProcessorTitleOptions extends ProcessorOptionsBasic {
  // ...
}
