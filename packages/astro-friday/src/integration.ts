/// <reference path="./types/shim.d.ts" />
/// <reference path="./types/virtual.d.ts" />

import type { AstroIntegration, InjectedRoute } from 'astro'
import type { Config } from './config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Inspect from 'vite-plugin-inspect'
import { resolveConfig } from './config'
import { nprogress } from './integrations/nprogress'
import { robotsTxt } from './integrations/robotsTxt'
import { sitemap } from './integrations/sitemap'
import { unocss } from './integrations/unocss'
import { vitePluginAstroFridayCollection } from './plugins/collection'
import { vitePluginAstroFridayComponents } from './plugins/components'
import { vitePluginAstroFridayConfig } from './plugins/config'
import { vitePluginAstroFridayUnoCSSExtract } from './plugins/css'
import { vitePluginAstroFridayImports } from './plugins/imports'

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
        }

        updateConfig({
          integrations: [
            ...unocss(resolvedConfig, astroConfig),
            ...nprogress(resolvedConfig, astroConfig),
            ...sitemap(resolvedConfig, astroConfig),
            ...robotsTxt(resolvedConfig, astroConfig),
          ],
          vite: {
            plugins: [
              vitePluginAstroFridayConfig(resolvedConfig),
              vitePluginAstroFridayCollection(resolvedConfig),
              vitePluginAstroFridayUnoCSSExtract(resolvedConfig),
              vitePluginAstroFridayImports(resolvedConfig),
              vitePluginAstroFridayComponents(resolvedConfig),
              Inspect(),
            ],
          },
        })

        const postPath = {
          'collection/id': '[collection]/[...slug]',
          'id': '[...slug]',
        }[resolvedConfig.post.pathStyle]

        const routes: InjectedRoute[] = [
          {
            pattern: path.join(resolvedConfig.base, `post`),
            entrypoint: `astro-friday/routes/collection/index.astro`,
          },
          {
            pattern: path.join(resolvedConfig.base, `post`, postPath),
            entrypoint: `astro-friday/routes/post/[...slug].astro`,
          },
          {
            pattern: path.join(resolvedConfig.base, `tag`),
            entrypoint: `astro-friday/routes/tag/index.astro`,
          },
          {
            pattern: path.join(resolvedConfig.base, `tag/[...slug]`),
            entrypoint: `astro-friday/routes/tag/[...slug].astro`,
          },
          {
            pattern: path.join(resolvedConfig.base, `series`),
            entrypoint: `astro-friday/routes/series/index.astro`,
          },
          {
            pattern: path.join(resolvedConfig.base, `series/[...slug]`),
            entrypoint: `astro-friday/routes/series/[...slug].astro`,
          },
          {
            pattern: path.join(resolvedConfig.base, `og`, postPath),
            entrypoint: `astro-friday/routes/og/[...slug].ts`,
          },
          {
            pattern: path.join(resolvedConfig.base, `collection`),
            entrypoint: `astro-friday/routes/collection/index.astro`,
          },
          {
            pattern: path.join(resolvedConfig.base, `collection/[...slug]`),
            entrypoint: `astro-friday/routes/collection/[...slug].astro`,
          },
        ]

        resolvedConfig.projects?.length && routes.push({
          pattern: path.join(resolvedConfig.base, `project`),
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
