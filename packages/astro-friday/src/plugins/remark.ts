import type { RemarkPlugins } from 'astro'
import { join } from 'node:path'
import { visit } from 'unist-util-visit'

/**
 * A remark plugin to convert relative links in content files to absolute links
 * based on content directory structure.
 */
export const remarkAstroCollectionLink: RemarkPlugins[number] = function (options: {
  /**
   * An array of tuples where each tuple contains:
   * - The base URL path for the collection (e.g., `/blog`, `/docs`, '/').
   * - The local filesystem path to the content directory (e.g., `./src/content/blog`).
   *
   * @example
   * ```ts
   * [
   *   ['/base/sub/blog', './src/content/blog'],
   *   ['/base/sub/docs', './src/content/docs'],
   *   ['/base/sub', './src/content'],
   * ]
   * ```
   */
  collections: [string, string][]
}) {
  const {
    collections,
  } = options

  return function (tree, file) {
    const {
      cwd,
      dirname,
    } = file
    if (!dirname) {
      return
    }

    const collectionsPath: [string, string][] = collections.map(([base, path]) => [base, join(cwd, path)])
    const currentCollection = collectionsPath.find(([_, path]) => dirname.startsWith(path))
    if (!currentCollection) {
      return
    }

    visit(tree, 'link', (node, _index, _parent) => {
      const isRelativeUrl = node.url.startsWith('.')
      if (!isRelativeUrl) {
        return
      }

      const [base, path] = currentCollection
      const target = join(dirname, node.url).replace(path, '')
      node.url = join(base, target)
    })
  }
}
