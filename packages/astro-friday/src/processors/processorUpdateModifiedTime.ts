import type { Processor, ProcessorOptionsBasic } from './index'

/**
 * With this processor, you can automatically update the `modified` frontmatter
 * key of your markdown files to reflect their last modified time.
 */
export const processorUpdateModifiedTime: Processor<ProcessorUpdateModifiedTimeOptions> = function (options = {}) {
  const {
    mode = 'git',
    override = false,
  } = options

  return async function (entry, config) {
    const fKeys = config.post.frontmatterKeys

    const isModifiedExist = Boolean(entry.data[fKeys.modified])
    if (!override && isModifiedExist) {
      return
    }

    const { execSync } = await import('node:child_process')
    const { statSync } = await import('node:fs')

    const filepath = entry.filePath
    if (!filepath) {
      return
    }

    const result = {
      git: () => execSync(`git log -1 --pretty="format:%cI" "${filepath}"`).toString(),
      fs: () => statSync(filepath).mtime.toISOString(),
    }[mode]()

    entry.data[fKeys.modified] = result
  }
}

export interface ProcessorUpdateModifiedTimeOptions extends ProcessorOptionsBasic {
  /**
   * Mode to determine the last modified time.
   *
   * - 'git': Use git history to get the last modified time.
   * - 'fs': Use the file system's last modified time.
   *
   * @default 'git'
   */
  mode?: 'git' | 'fs'
  /**
   * Override existing modified time in frontmatter.
   *
   * @default false
   */
  override?: boolean
}
