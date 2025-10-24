import type { ShikiTransformer } from '@shikijs/types'

export function transformerWrapper(): ShikiTransformer {
  return {
    name: 'astro-friday-transformer-wrapper',
    enforce: 'pre',
    root(hast: import('hast').Root) {
      const pre = hast.children[0] as import('hast').Element
      if (pre.tagName !== 'pre') {
        return hast
      }

      hast.children = [
        {
          type: 'element',
          tagName: 'div',
          properties: {
            class: 'code-block-wrapper',
          },
          children: [
            {
              type: 'element',
              tagName: 'button',
              properties: {
                class: 'copy',
                title: 'Copy code to clipboard',
              },
              children: [
                {
                  type: 'text',
                  value: 'Copy',
                },
              ],
            },
            {
              type: 'element',
              tagName: 'span',
              properties: {
                class: 'lang',
              },
              children: [
                {
                  type: 'text',
                  value: pre.properties?.dataLanguage?.toString() || '',
                },
              ],
            },
            pre,
          ],
        },
      ]

      return hast
    },
  }
}
