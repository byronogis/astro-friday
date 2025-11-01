// import {
//   createLocalFontProcessor,
// } from '@unocss/preset-web-fonts/local'
import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetWebFonts,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetScrollbar } from 'unocss-preset-scrollbar'

export default defineConfig({
  outputToCssLayers: {
    cssLayerName(layer) {
      return layer === 'default'
        ? 'uno-default'
        : `uno`
    },
  },
  shortcuts: [
    {
      'hoverable-text': 'opacity-60 hover:opacity-100 transition-(opacity 200 ease-out)',
      'live-area': 'max-w-65ch max-w-65rch mx-auto',

      'bg-base': 'bg-white dark:bg-black',
      'color-base': 'text-black dark:text-white',
      'border-base': 'border-[#8884]',
    },
    [/^stroke-text-(.+)$/, ([_, size]) => `color-transparent font-bold text-stroke-${size} text-stroke-hex-aaa`],
    [/^tag-(\w+)$/, ([_, color]) => `text-xs text-${color} my-auto px-1 py-0.5 align-middle rounded bg-${color}/15`],
    [/^btn-(\w+)$/, ([_, color]) => `op50 px2.5 py1 transition-all duration-200 ease-out no-underline! hover:(op100 text-${color} bg-${color}/10) border border-base! rounded`],
  ],
  presets: [
    presetWind4(),
    presetIcons({
      autoInstall: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
        'width': '1.2em',
        'height': '1.2em',
      },
    }),
    presetWebFonts({
      fonts: {
        sans: 'Inter',
        mono: 'DM Mono',
        condensed: 'Roboto Condensed',
        wisper: 'Bad Script',
      },
      // TODO fix `fontServeBaseUrl` pathing issue with local fonts while astro has base set
      // processors: createLocalFontProcessor(),
    }),
    presetTypography({
      selectorName: 'prose',
      cssExtend: {
        ':not(pre)>code': {
          'white-space': 'break-spaces',
          'word-break': 'break-all',
        },
      },
    }),
    presetScrollbar({
      noCompatible: false,
    }),
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
})
