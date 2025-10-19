import type { AstroConfig } from 'astro'
import type { ResolvedConfig } from '../../config'
import integration from 'astro-nprogress'

export function nprogress(resolvedConfig: ResolvedConfig, astroConfig: AstroConfig) {
  const config = resolvedConfig.integrations.nprogress
  if (config === false) {
    return []
  }

  const isExist = astroConfig.integrations?.some(i => i.name === integration().name)
  if (isExist) {
    return []
  }

  return [integration(config)]
}
