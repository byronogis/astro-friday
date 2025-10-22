import type { ViteUserConfig } from 'astro'
import type { ResolvedConfig } from '../config'

export function vitePluginAstroFridayConfig(resolvedConfig: ResolvedConfig) {
  const virtualModuleId = 'virtual:astro-friday-config'
  const resolvedVirtualModuleId = `\0${virtualModuleId}`

  return {
    name: 'vite-plugin-astro-friday-config',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return /* js */`export default ${JSON.stringify(resolvedConfig)}
        `
      }
    },
  } satisfies NonNullable<ViteUserConfig['plugins']>[number]
}
