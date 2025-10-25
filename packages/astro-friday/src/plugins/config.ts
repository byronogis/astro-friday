import type { ViteUserConfig } from 'astro'
import type { ResolvedConfig } from '../config'

export function vitePluginAstroFridayConfig(resolvedConfig: ResolvedConfig) {
  const virtualModuleId = 'virtual:astro-friday-config'
  const resolvedVirtualModuleId = `\0${virtualModuleId}`

  const functionsModuleId = 'virtual:astro-friday-config/functions'
  const resolvedFunctionsModuleId = `\0${functionsModuleId}`

  const functionMap = new Map<string, string>()

  return {
    name: 'vite-plugin-astro-friday-config',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
      if (id === functionsModuleId) {
        return resolvedFunctionsModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        functionMap.clear()

        const configCode = JSON.stringify(resolvedConfig, (key, value) => {
          if (typeof value === 'function') {
            const funcName = `fn_${functionMap.size}`
            const funcCode = value.toString()
            functionMap.set(funcName, funcCode)
            return `__fn_ref_${funcName}__`
          }
          return value
        }, 2).replace(/"__fn_ref_(.+?)__"/g, '$1')

        const imports = Array.from(functionMap.keys())
          .map(funcName => `import { ${funcName} } from '${functionsModuleId}';`)
          .join('\n')

        return `${imports}\n\nexport default ${configCode};`
      }

      if (id === resolvedFunctionsModuleId) {
        const functionDeclarations = Array.from(functionMap.entries())
          .map(([funcName, funcCode]) => {
            const processedCode = resolvedConfig.advanced.functionCodeReplace.reduce((code, replaceRule) => {
              const {
                api = 'replaceAll',
                parameters,
              } = replaceRule
              return code[api](...parameters)
            }, funcCode)
            return `const ${funcName} = ${processedCode};`
          })
          .join('\n')

        const exportNames = Array.from(functionMap.keys()).join(', ')

        return `${functionDeclarations}\n\nexport { ${exportNames} };`
      }
    },
  } satisfies NonNullable<ViteUserConfig['plugins']>[number]
}
