/// <reference path="./types/shim.d.ts" />
/// <reference path="./types/virtual.d.ts" />

import type { AstroIntegration, InjectedRoute } from 'astro'
import type { Config } from './config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import postcssGlobalData from '@byronogis/postcss-global-data'
import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerRenderIndentGuides,
} from '@shikijs/transformers'
import postcssPresetEnv from 'postcss-preset-env'
import Inspect from 'vite-plugin-inspect'
import { resolveConfig } from './config'
import { mdx } from './integrations/mdx'
import { nprogress } from './integrations/nprogress'
import { robotsTxt } from './integrations/robotsTxt'
import { sitemap } from './integrations/sitemap'
import { unocss } from './integrations/unocss'
import { vitePluginAstroFridayCollection } from './plugins/collection'
import { vitePluginAstroFridayComponents } from './plugins/components'
import { vitePluginAstroFridayConfig } from './plugins/config'
import { vitePluginAstroFridayUnoCSSExtract } from './plugins/css'
import { vitePluginAstroFridayImports } from './plugins/imports'
import { transformerWrapper } from './plugins/shiki'

const _dirname = path.dirname(fileURLToPath(import.meta.url))

export function integration(userConfig: Config = {}): AstroIntegration {
  return {
    name: 'astro-friday',
    hooks: {
      'astro:config:setup': ({
        command,
        config: astroConfig,
        updateConfig,
        injectRoute,
        addWatchFile,
      }) => {
        const resolvedConfig = resolveConfig(userConfig, astroConfig)

        if (command === 'dev') {
          addWatchFile(path.resolve(_dirname, './collection.ts'))
          addWatchFile(path.resolve(_dirname, './config.ts'))
          addWatchFile(path.resolve(_dirname, './integration.ts'))
          addWatchFile(path.resolve(_dirname, './integrations/unocss/uno.config.ts'))
          addWatchFile(path.resolve(_dirname, './plugins/config.ts'))
        }

        updateConfig({
          integrations: [
            unocss(resolvedConfig, astroConfig),
            nprogress(resolvedConfig, astroConfig),
            sitemap(resolvedConfig, astroConfig),
            robotsTxt(resolvedConfig, astroConfig),
            mdx(resolvedConfig, astroConfig),
          ].flat(),
          vite: {
            plugins: [
              vitePluginAstroFridayConfig(resolvedConfig),
              vitePluginAstroFridayCollection(resolvedConfig),
              vitePluginAstroFridayUnoCSSExtract(resolvedConfig),
              vitePluginAstroFridayImports(resolvedConfig),
              vitePluginAstroFridayComponents(resolvedConfig),
              Inspect(),
            ],
            css: {
              postcss: {
                plugins: [
                  postcssGlobalData(resolvedConfig.postcss.postcssGlobalData),
                  postcssPresetEnv(resolvedConfig.postcss.postcssPresetEnv),
                ],
              },
            },
          },
          markdown: {
            shikiConfig: {
              defaultColor: false,
              themes: {
                light: 'vitesse-light',
                dark: 'vitesse-dark',
                // User custom themes has higher priority
                ...astroConfig.markdown?.shikiConfig?.themes,
              },
              transformers: [
                /**
                 * There are the transformers that friday internal using.
                 *
                 * We only add them when the user has not configured themself.
                 */
                (() => {
                  const existTransformerNames = astroConfig.markdown.shikiConfig.transformers.map(i => i.name)
                  const internalTransformers = [
                    transformerNotationDiff(),
                    transformerNotationHighlight(),
                    transformerNotationWordHighlight(),
                    transformerNotationFocus(),
                    transformerNotationErrorLevel(),
                    transformerRenderIndentGuides(),
                    transformerMetaHighlight(),
                    transformerMetaWordHighlight(),
                    transformerWrapper(),
                  ]

                  return internalTransformers.filter(i => !existTransformerNames.includes(i.name))
                })(),
              ].flat(),
            },
          },
        })

        const postPath = {
          'collection/id': '[collection]/[...slug]',
          'id': '[...slug]',
        }[resolvedConfig.post.pathStyle]

        const routes: InjectedRoute[] = [
          {
            pattern: path.join(resolvedConfig.prefix, `post`),
            entrypoint: `astro-friday/routes/collection/index.astro`,
          },
          {
            pattern: path.join(resolvedConfig.prefix, `post`, postPath),
            entrypoint: `astro-friday/routes/post/[...slug].astro`,
          },
          {
            pattern: path.join(resolvedConfig.prefix, `tag`),
            entrypoint: `astro-friday/routes/tag/index.astro`,
          },
          {
            pattern: path.join(resolvedConfig.prefix, `tag/[...slug]`),
            entrypoint: `astro-friday/routes/tag/[...slug].astro`,
          },
          {
            pattern: path.join(resolvedConfig.prefix, `series`),
            entrypoint: `astro-friday/routes/series/index.astro`,
          },
          {
            pattern: path.join(resolvedConfig.prefix, `series/[...slug]`),
            entrypoint: `astro-friday/routes/series/[...slug].astro`,
          },
          {
            pattern: path.join(resolvedConfig.prefix, `og`, postPath),
            entrypoint: `astro-friday/routes/og/[...slug].ts`,
          },
          {
            pattern: path.join(resolvedConfig.prefix, `collection`),
            entrypoint: `astro-friday/routes/collection/index.astro`,
          },
          {
            pattern: path.join(resolvedConfig.prefix, `collection/[...slug]`),
            entrypoint: `astro-friday/routes/collection/[...slug].astro`,
          },
        ]

        resolvedConfig.projects?.length && routes.push({
          pattern: path.join(resolvedConfig.prefix, `project`),
          entrypoint: `astro-friday/routes/project/index.astro`,
        })

        resolvedConfig.pages[404] && routes.push(resolvedConfig.pages[404])
        resolvedConfig.pages.home && routes.push(resolvedConfig.pages.home)

        routes.forEach((route) => {
          injectRoute({
            pattern: route.pattern,
            entrypoint: route.entrypoint,
          })
        })
      },
    },
  }
}
