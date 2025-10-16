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
  shortcuts: {
    'hoverable-text': 'opacity-60 hover:opacity-100 transition-(opacity 200 ease)',
    'live-area': 'max-w-65ch max-w-65rch mx-auto',
  },
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
