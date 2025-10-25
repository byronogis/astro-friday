import type { Processor } from './index'

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
