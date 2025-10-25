import type { Processor } from './index'

/**
 * With this processor, you can automatically update the `modified` frontmatter
 * key of your markdown files to reflect their last modified time.
 *
 * NOTE:
 * Using this processor should with the below config of `advanced.functionCodeReplace`:
 * ```ts
 * advanced: {
 *   functionCodeReplace: [
 *     {
 *       api: 'replaceAll',
 *       arguments: ['__vite_ssr_dynamic_import__("node:', 'import("node:'],
 *     },
 *   ],
 * }
 * ```
 */
export const processorUpdateModifiedTime: Processor<[RemarkModifiedTimeOptions]> = function (options: RemarkModifiedTimeOptions = {}) {
  const {
    mode = 'git',
  } = options

  return async function (entry, config) {
    const { execSync } = await import('node:child_process')
    const { statSync } = await import('node:fs')

    const filepath = entry.filePath
    if (!filepath) {
      return
    }

    const fKeys = config.post.frontmatterKeys

    const result = {
      git: () => execSync(`git log -1 --pretty="format:%cI" "${filepath}"`).toString(),
      fs: () => statSync(filepath).mtime.toISOString(),
    }[mode]()

    entry.data[fKeys.modified] = result
  }
}

export interface RemarkModifiedTimeOptions {
  /**
   * Mode to determine the last modified time.
   *
   * - 'git': Use git history to get the last modified time.
   * - 'fs': Use the file system's last modified time.
   *
   * @default 'git'
   */
  mode?: 'git' | 'fs'
}
