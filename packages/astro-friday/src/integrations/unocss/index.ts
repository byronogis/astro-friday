import type { AstroConfig } from 'astro'
import type { ResolvedConfig } from '../../config'
import { defineConfig, mergeConfigs } from 'unocss'
import UnoCSS from 'unocss/astro'
import unoCinfig from './uno.config'
// import config from 'virtual:astro-friday-config' // TODO import error

export function unocss(_resolvedConfig: ResolvedConfig, astroConfig: AstroConfig) {
  const isExist = astroConfig.integrations?.some(i => i.name === UnoCSS().name)
  if (isExist) {
    return []
  }

  return [UnoCSS(unoCinfig)]
}

export function withAstroFriday(...rest: Parameters<typeof defineConfig>) {
  // Merge multiple configs into one, later ones have higher priority
  return mergeConfigs([
    unoCinfig,
    defineConfig(...rest),
  ])
}
