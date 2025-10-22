import Friday from 'astro-friday'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://byronogis.github.io/',
  base: '/astro-friday',
  integrations: [
    Friday({
      title: 'Astro Friday',
      author: {
        name: 'Byron',
        email: 'byronogis@outlook.com',
      },
      post: {
        pathStyle: 'id',
      },
      collections: {
        guide: {
          label: 'Guide',
          glob: {
            pattern: '**/*.{md,mdx}',
            base: './src/contents/guide',
          },
        },
        recipes: {
          label: 'Recipes',
          glob: {
            pattern: '**/*.{md,mdx}',
            base: './src/contents/recipes',
          },
        },
      },
      navigations: {
        post: { label: 'Guide' },
        changelog: { label: 'Changelog', icon: 'i-lucide:history', link: '/astro-friday/changelog', order: 800 },
        github: { label: 'Github', icon: 'i-lucide:github', external: true, link: 'https://github.com/byronogis', type: 'icon', order: 900 },
      },
      pages: {
        home: false,
      },
      art: {
        dots: { weight: 2 },
        plum: { weight: 1 },
      },
      projects: [
        { label: 'Friday', link: 'https://github.com/byronogis/astro-friday/', desc: 'A content-focused Astro integration with tag and series support.', icon: 'i-lucide:lightbulb', category: 'Tools' },
        { label: 'Friday', link: 'https://github.com/byronogis/astro-friday/', desc: 'A content-focused Astro integration with tag and series support.', icon: 'i-lucide:lightbulb', category: 'Tools' },
        { label: 'Friday', link: 'https://github.com/byronogis/astro-friday/', desc: 'A content-focused Astro integration with tag and series support.', icon: 'i-lucide:lightbulb', category: 'Tools' },
        { label: 'Friday', link: 'https://github.com/byronogis/astro-friday/', desc: 'A content-focused Astro integration with tag and series support.', icon: 'i-lucide:lightbulb', category: 'Tools' },
        { label: 'Friday', link: 'https://github.com/byronogis/astro-friday/', desc: 'A content-focused Astro integration with tag and series support.', icon: 'i-lucide:lightbulb', category: 'Tools' },
        { label: 'Friday', link: 'https://github.com/byronogis/astro-friday/', desc: 'A content-focused Astro integration with tag and series support.', icon: 'i-lucide:lightbulb', category: 'UI' },
        { label: 'Friday', link: 'https://github.com/byronogis/astro-friday/', desc: 'A content-focused Astro integration with tag and series support.', icon: 'i-lucide:lightbulb', category: 'UI' },
        { label: 'Friday', link: 'https://github.com/byronogis/astro-friday/', desc: 'A content-focused Astro integration with tag and series support.', icon: 'i-lucide:lightbulb', category: 'UI' },
        { label: 'Friday', link: 'https://github.com/byronogis/astro-friday/', desc: 'A content-focused Astro integration with tag and series support.', icon: 'i-lucide:lightbulb', category: 'UI' },
        { label: 'Friday', link: 'https://github.com/byronogis/astro-friday/', desc: 'A content-focused Astro integration with tag and series support.', icon: 'i-lucide:lightbulb', category: 'UI' },
        { label: 'Friday', link: 'https://github.com/byronogis/astro-friday/', desc: 'A content-focused Astro integration with tag and series support.', icon: 'i-lucide:lightbulb', category: 'UI' },
        { label: 'Friday', link: 'https://github.com/byronogis/astro-friday/', desc: 'A content-focused Astro integration with tag and series support.', icon: 'i-lucide:lightbulb', category: 'Integration' },
        { label: 'Friday', link: 'https://github.com/byronogis/astro-friday/', desc: 'A content-focused Astro integration with tag and series support.', icon: 'i-lucide:lightbulb', category: 'Integration' },
        { label: 'Friday', link: 'https://github.com/byronogis/astro-friday/', desc: 'A content-focused Astro integration with tag and series support.', icon: 'i-lucide:lightbulb', category: 'Integration' },
        { label: 'Friday', link: 'https://github.com/byronogis/astro-friday/', desc: 'A content-focused Astro integration with tag and series support.', icon: 'i-lucide:lightbulb', category: 'Integration' },
        { label: 'Friday', link: 'https://github.com/byronogis/astro-friday/', desc: 'A content-focused Astro integration with tag and series support.', icon: 'i-lucide:lightbulb', category: 'Integration' },
        { label: 'Friday', link: 'https://github.com/byronogis/astro-friday/', desc: 'A content-focused Astro integration with tag and series support.', icon: 'i-lucide:lightbulb', category: 'Integration' },
      ],
    }),
  ],
  server: {
    host: true,
  },
  build: {
    format: 'file',
  },
})
