import type { AstroConfig, AstroIntegration } from 'astro'
import type { ResolvedConfig } from '../../config'
import fs from 'node:fs/promises'

/**
 * This is a built-in integration to generate robots.txt during the build process.
 * It supports fetching remote robots.txt content as well as appending local rules.
 */
export function robotsTxt(astroConfig: AstroConfig, resolvedConfig: ResolvedConfig) {
  const config = resolvedConfig.integrations.robotsTxt
  if (config === false) {
    return []
  }

  return [{
    name: 'astro-friday-robots-txt',
    hooks: {
      'astro:build:done': async function ({ logger, dir }) {
        const robotsTxtPath = new URL('robots.txt', dir)

        let robotsTxtContent = ''
        for (const item of config) {
          if (item.type === 'remote') {
            try {
              const response = await fetch(item.content)
              if (!response.ok) {
                logger.warn(`Failed to fetch remote robots.txt from ${item.content}, skipping.`)
                continue
              }
              const content = await response.text()
              robotsTxtContent += `\n${content.trim()}\n`
            }
            catch (error) {
              logger.warn(`Error fetching remote robots.txt from ${item.content}: ${error}, skipping.`)
            }
          }
          else if (item.type === 'local') {
            robotsTxtContent += `\n${item.content.trim()}\n`
          }
        }

        await fs.writeFile(robotsTxtPath, robotsTxtContent.trim())
        logger.info(`robots.txt generated at ${robotsTxtPath.pathname}`)
      },
    },
  } satisfies AstroIntegration]
}

export type RobotsTxtOptions = {
  type: 'remote' | 'local'
  /**
   * If type is 'remote', Remote URL to fetch robots.txt content from
   * If type is 'local', append to robots.txt straightforwardly
   */
  content: string
}[]
