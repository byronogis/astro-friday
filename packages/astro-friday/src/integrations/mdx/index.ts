import type { AstroConfig } from 'astro'
import type { ResolvedConfig } from '../../config'
import integration from '@astrojs/mdx'

export function mdx(resolvedConfig: ResolvedConfig, astroConfig: AstroConfig) {
  const config = resolvedConfig.integrations.mdx
  if (config === false) {
    return []
  }

  const isExist = astroConfig.integrations?.some(i => i.name === integration().name)
  if (isExist) {
    return []
  }

  return [integration(config)]
}
