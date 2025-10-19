import type { AstroConfig } from 'astro'
import type { ResolvedConfig } from '../../config'
import integration from '@astrojs/sitemap'

export function sitemap(resolvedConfig: ResolvedConfig, astroConfig: AstroConfig) {
  const config = resolvedConfig.integrations.sitemap
  if (config === false) {
    return []
  }

  const isExist = astroConfig.integrations?.some(i => i.name === integration().name)
  if (isExist) {
    return []
  }

  return [integration(config)]
}
