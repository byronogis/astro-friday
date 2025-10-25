import type { ShikiTransformer } from '@shikijs/types'

/**
 * A Shiki transformer that wraps code blocks in a div with additional elements.
 *
 * - Adds a copy button to copy the code to clipboard.
 * - Displays the language of the code block.
 *
 * Using this transformer requires corresponding CSS and JavaScript to handle the copy functionality and styling.
 *
 * [CSS and JavaScript Example](https://github.com/byronogis/astro-friday/blob/main/packages/astro-friday/src/components/CodeBlockWrapper.astro)
 */
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
