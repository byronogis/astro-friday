/**
 * Generate API reference documentation using TypeDoc
 *
 * Inspired by: [Tsdown](https://github.com/rolldown/tsdown/blob/ca0d210cfedb9c2681c800bee272e634bc6f307b/docs/.vitepress/scripts/generate-reference.ts)
 */

import type { TypeDocOptions } from 'typedoc'
import { Application } from 'typedoc'
import { MarkdownPageEvent } from 'typedoc-plugin-markdown'

const tsconfig = './tsconfig.json'

console.log('📚 Generating reference...')

// Generate API documentation
await runTypedoc(tsconfig)
console.log('✅ Reference generated successfully!')

/**
 * Run TypeDoc with the specified tsconfig
 */
async function runTypedoc(tsconfig: string): Promise<void> {
  const options: TypeDocOptions
    & import('typedoc-plugin-markdown').PluginOptions
    & Partial<import('typedoc-plugin-frontmatter').PluginOptions> = {
      tsconfig,
      plugin: [
        'typedoc-plugin-markdown',
        'typedoc-plugin-frontmatter',
        // @ts-expect-error safe to ignore
        function (app: Application) {
          // @ts-expect-error safe to ignore
          app.renderer.on(MarkdownPageEvent.BEGIN, (page: MarkdownPageEvent) => {
            page.frontmatter = {
              slug: `api${page.filename.split('reference/api').pop()}`,
            }
          })
        },
      ],
      out: './src/contents/reference/api',
      readme: 'none',
      cleanOutputDir: true,
      entryPoints: ['../packages/astro-friday/src/index.ts'],
      entryFileName: 'index',
      excludeInternal: true,

      hidePageHeader: true,
      hideBreadcrumbs: true,
      hidePageTitle: true,
      useCodeBlocks: true,
      flattenOutputFiles: true,
    }
  const app = await Application.bootstrapWithPlugins(options)

  // May be undefined if errors are encountered.
  const project = await app.convert()

  if (project) {
    // Generate configured outputs
    await app.generateOutputs(project)
  }
  else {
    throw new Error('Failed to generate TypeDoc output')
  }
}
