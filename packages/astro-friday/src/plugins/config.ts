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
        // TODO
        // using globalThis to store the config is a bit of a hack to
        // accept function serialization limitations.
        //
        // We should look into a more robust solution in the future.

        // @ts-expect-error globalThis typing
        globalThis[virtualModuleId] = resolvedConfig
        return /* js */`export default globalThis['${virtualModuleId}']
        `
      }
    },
  } satisfies NonNullable<ViteUserConfig['plugins']>[number]
}
