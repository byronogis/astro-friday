import type { MdxOptions } from '@astrojs/mdx'
import type { SitemapOptions } from '@astrojs/sitemap'
import type { AstroConfig, InjectedRoute } from 'astro'
import type nprogress from 'astro-nprogress'
import type { Props as SEO } from 'astro-seo'
import type { glob } from 'astro/loaders'
import type { Options as rehypeParseOptions } from 'rehype-parse'
import type { Options as rehypeRemarkOptions } from 'rehype-remark'
import type { Options as remarkGfmOptions } from 'remark-gfm'
import type { Options as remarkStringifyOptions } from 'remark-stringify'
import type { OmitDeep, SetRequiredDeep } from 'type-fest'
import type { FrontmatterKeysInternal, Schema } from './collection'
import type { RobotsTxtOptions } from './integrations/robotsTxt'
import type { ArtConfig, NavItem, ProjectItem } from './types'
import type { CollectionEntry } from './types/content'
import type { Appearance } from './utils/appearance'
import type { Processors } from './utils/processor'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defu } from 'defu'

const _dirname = path.dirname(fileURLToPath(import.meta.url))

type GlobOptions = Parameters<typeof glob>[0]

export function getDefaultConfig(userConfig: Config, astroConfig: AstroConfig): Config {
  const base = userConfig.base ?? '/'
  const baseFull = path.join('/', astroConfig.base, base)

  return {
    title: 'Friday',
    description: 'A content-focused Astro integration with tag and series support.',
    base,
    author: {
      name: 'Anonymous',
    },
    copyright: {
      copyrightYears: `${new Date().getFullYear()}`,
      license: {
        type: 'CC BY-NC-SA 4.0',
        url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
      },
    },
    post: {
      pathStyle: 'collection/id',
      toc: {
        enable: true,
        range: [2, 4],
      },
      og: (entry: CollectionEntry, config) => {
        const fKeys = config.post.frontmatterKeys
        const html = {
          type: 'div',
          props: {
            children: [
              {
                type: 'span',
                props: {
                  children: entry.data[fKeys.title],
                  tw: 'text-6xl font-bold',
                },
              },
              {
                span: 'span',
                props: {
                  children: entry.data[fKeys.author],
                  tw: 'mt-4 text-3xl opacity-60',
                },
              },
            ],
            tw: 'w-full h-full flex flex-col gap-2 items-start justify-center p-20 bg-#f7f8e8',
          },
        }

        return [html, {
          width: 1200,
          height: 630,
        }]
      },
      frontmatterKeys: {
        title: 'title',
        subtitle: 'subtitle',
        description: 'description',
        created: 'created',
        modified: 'modified',
        author: 'author',
        series: 'series',
        tags: 'tags',
        keywords: 'keywords',
        draft: 'draft',
        lang: 'lang',
        toc: 'toc',
      } satisfies ResolvedConfig['post']['frontmatterKeys'],
      export: {
        md: {
          rehypeParse: {
            fragment: true,
          },
        },
      },
      entryProcessors: [],
    },
    collections: {},
    navigations: {
      'post': { label: 'Post', link: path.join(baseFull, 'post'), icon: 'i-lucide:scroll-text', order: 100 },
      'tag': { label: 'Tag', link: path.join(baseFull, 'tag'), icon: 'i-lucide:tag', order: 200 },
      'series': { label: 'Series', link: path.join(baseFull, 'series'), icon: 'i-lucide:square-library', order: 300 },
      'project': { label: 'Project', link: path.join(baseFull, 'project'), icon: 'i-lucide:lightbulb', order: 400, hidden: !userConfig.projects?.length },
      'theme-toggle': { label: 'Theme', link: 'javascript:;', order: 1000 },
    },
    pages: {
      404: {
        pattern: path.join(base, `404`),
        entrypoint: 'astro-friday/routes/404.astro',
      },
      home: {
        pattern: path.join(base, ``),
        entrypoint: `astro-friday/routes/collection/index.astro`,
      },
    },
    art: {
      dots: { weight: 1 },
      plum: { weight: 1 },
    },
    appearance: 'dynamic',
    imports: {
      '@vercel/og': '@vercel/og',
    },
    components: {
      NavbarBrand: 'astro-friday/components/Opt/NavbarBrand.astro',
    },
    viewTransition: {
      enable: true,
    },
    postcss: {
      postcssGlobalData: {
        files: [
          {
            file: path.resolve(_dirname, './styles/global-data.css'),
            remove: false,
            position: 'prepend',
          },
        ],
      },
      postcssPresetEnv: {
        stage: 2,
        minimumVendorImplementations: 2,
      },
    },
    integrations: {
      nprogress: {
        showSpinner: false,
      },
      sitemap: {},
      robotsTxt: [
        {
          type: 'local' as const,
          content: `User-agent: *\nAllow: /`,
        },

        {
          type: 'remote' as const,
          content: 'https://raw.githubusercontent.com/ai-robots-txt/ai.robots.txt/main/robots.txt',
        },

        // add sitemap entry if site is defined and sitemap integration is not disabled
        astroConfig.site && userConfig.integrations?.sitemap !== false
          ? [{
              type: 'local' as const,
              content: `Sitemap: ${path.join(
                astroConfig.site,
                astroConfig.base,
                `${userConfig.integrations?.sitemap?.filenameBase ?? 'sitemap'}-index.xml`,
              )}`,
            }]
          : [],
      ].flat(),
    },
    projects: [],
    advanced: {
      functionCodeReplace: [],
    },
  }
}

export function resolveConfig(userConfig: Config, astroConfig: AstroConfig): ResolvedConfig {
  const base = userConfig.base ?? '/'
  const baseFull = path.join('/', astroConfig.base, base)

  const defaultConfig = getDefaultConfig(userConfig, astroConfig)

  // use default config for development to avoid issues with Vercel OG package
  import.meta.env.DEV && delete userConfig.imports?.['@vercel/og']

  const mergedConfig = defu(
    {
      base,
      baseFull,
    },
    userConfig,
    defaultConfig,
  ) as ResolvedConfig

  return mergedConfig
}

/**
 * NOTE: When passing functions as configuration values, they must be context-independent.
 * This means all variables used within the function scope must be either:
 * - Parameters of the function
 * - Variables declared inside the function
 * - Built-in globals (e.g., console, Date, etc.)
 *
 * Functions cannot access variables from the outer scope where they are defined,
 * as they will be serialized and executed in a different context.
 *
 * ✅ Good example:
 * ```ts
 * og: (entry) => {
 *   const title = entry.data.title || 'Default Title'
 *   return [title, { width: 1200, height: 630 }]
 * }
 * ```
 *
 * ❌ Bad example:
 * ```ts
 * const defaultTitle = 'My Site'
 * og: (entry) => {
 *   const title = entry.data.title || defaultTitle // ❌ defaultTitle is not available
 *   return [title, { width: 1200, height: 630 }]
 * }
 * ```
 */
export interface Config {
  /**
   * The site title, used in the navbar and SEO metadata.
   */
  title?: string
  /**
   * The site description, used in SEO metadata.
   */
  description?: string
  /**
   * The prefix for all built-in routes, e.g. `/post`, `/tag`, `/series`.
   *
   * @default '/' mean no prefix, e.g. `/post`
   *
   * @example '/content' will make routes like `/content/post`
   */
  base?: string
  /**
   * The author information, used in the footer and SEO metadata.
   */
  author?: {
    /**
     * The author's name.
     */
    name?: string
    /**
     * The author's email address.
     *
     * NOTE currently not used
     */
    email?: string
    /**
     * The author's website URL.
     *
     * NOTE currently not used
     */
    url?: string
    /**
     * The author's avatar image URL.
     *
     * NOTE currently not used
     */
    avatar?: string
  }
  /**
   * The copyright information, used in the footer.
   */
  copyright?: {
    /**
     * The copyright years, e.g. `2022` or `2020-2024`.
     *
     * @default current year
     */
    copyrightYears?: string
    /**
     * The license information
     */
    license?: {
      /**
       * The license type
       *
       * @default 'CC BY-NC-SA 4.0'
       */
      type: string
      /**
       * The license URL.
       *
       * @default 'https://creativecommons.org/licenses/by-nc-sa/4.0/'
       */
      url: string
    }
  }
  /**
   * Post related configuration
   */
  post?: {
    /**
     * Path style for post routes
     *
     * - `collection/id`: `/post/collection/id`, e.g. `/post/blog/my-first-post`
     * - `id`: `/post/id`, e.g. `/post/my-first-post`
     *
     * Maybe you want a premalike like `/post/my-first-post` instead of `/post/blog/my-first-post`
     * @see https://byronogis.github.io/astro-friday/post/making-permalinks-to-posts
     *
     * @default 'collection/id'
     */
    pathStyle?: 'collection/id' | 'id'
    /**
     * Table of contents (TOC) generation for all content
     *
     * NOTE: this is just a default config for all content, can be overridden in
     * specific content frontmatter
     *
     * @default
     * { enable: true, range: [2, 4] }
     */
    toc?: Partial<Schema['toc']>
    /**
     * Open Graph (OG) metadata for social media sharing
     *
     * NOTE: You can access the frontmatter from `entry.data`, e.g. `entry.data.title`
     */
    og?: (entry: CollectionEntry, config: ResolvedConfig) => ConstructorParameters<typeof import('@vercel/og').ImageResponse>
    /**
     * frontmatter keys mapping to Schema fields
     *
     * Like if you want to use `date` instead of `created` in frontmatter,
     * you can set `{ created = 'date' }` here.
     *
     * @default
     * ```js
     * {
     *   title: 'title',
     *   subtitle: 'subtitle',
     *   description: 'description',
     *   created: 'created',
     *   modified: 'modified',
     *   author: 'author',
     *   series: 'series',
     *   tags: 'tags',
     *   keywords: 'keywords',
     *   draft: 'draft',
     *   lang: 'lang',
     *   toc: 'toc',
     * }
     * ```
     */
    frontmatterKeys?: Partial<Record<FrontmatterKeysInternal, string>>
    /**
     * Post export options
     */
    export?: {
      /**
       * Markdown export options, you can customize the markdown export behavior here.
       *
       * Set to `false` to disable markdown export.
       *
       * We using unified with rehype and remark plugins to convert HTML back to Markdown.
       * You can pass options to the underlying plugins here.
       */
      md?: {
        /**
         * @default
         * { fragment: true }
         *
         * @see https://github.com/rehypejs/rehype/blob/main/packages/rehype-parse/readme.md
         */
        rehypeParse?: rehypeParseOptions
        /**
         * @see https://github.com/rehypejs/rehype-remark
         */
        rehypeRemark?: rehypeRemarkOptions
        /**
         * @see https://github.com/remarkjs/remark-gfm
         */
        remarkGfm?: remarkGfmOptions
        /**
         * @see https://github.com/remarkjs/remark/tree/main/packages/remark-stringify
         */
        remarkStringify?: remarkStringifyOptions
      } | false
    }
    /**
     * An optional processor function to modify each collection entry after it's loaded by `getCollection`.
     *
     * Like updating the `modified` frontmatter field automatically based on the file's last modified time.
     *
     */
    entryProcessors?: Processors
  }
  /**
   * Define content collections
   *
   * currently just glob loader supported, `collections[key].glob`
   */
  collections?: Record<string, {
    /**
     * The label for the collection, used in the navigation of collection list
     */
    label?: string
    /**
     * @see https://docs.astro.build/en/reference/content-loader-reference/#glob-loader
     */
    glob: GlobOptions
  }>
  /**
   * Navigation items, used in the navbar.
   *
   * You can override the built-in navs: `post`, `tag`, `series`, `theme-toggle`, `project`,
   * also can define your own navigation items.
   *
   * @example
   * ```ts
   * navigations: {
   *   // override built-in post nav
   *   post: { label: 'Blog' },
   *   // define your own nav
   *   github: { label: 'Github', icon: 'i-lucide:github', external: true, link: 'https://github.com/your-repo' }
   * }
   * ```
   */
  navigations?: Partial<Record<'post' | 'tag' | 'series' | 'theme-toggle' | 'project', Partial<NavItem>>> | {
    [key: string]: NavItem
  }
  /**
   * Custom pages configuration, you can disable built-in pages by setting the value to `false`
   * or override the default route by providing your own `pattern` and `entrypoint`.
   *
   * Default home page is the post list page of all collections, you can also set it to a custom page.
   * @see https://byronogis.github.io/astro-friday/post/custom-homepage
   */
  pages?: Partial<Record<'home' | '404', InjectedRoute | false>>
  /**
   * Logo configuration, used in the browser tab and top left corner of the navbar.
   *
   * NOTE: if you set a custom display in navbar, you might also want to override the `NavbarBrand` component in `components` config
   */
  logo?: {
    /**
     * override the default logo image path
     *
     * @example '/favicon.svg'
     */
    url?: string
  }
  /**
   * Page background art configuration, there are two styles available: `dots` and `plum`.
   *
   * Forked from [antfu.me](https://antfu.me)
   */
  art?: Partial<Record<'dots' | 'plum', Partial<ArtConfig>>>
  /**
   * The appearance (theme) toggle behavior
   *
   * - `plain`: simply toggle between light and dark mode
   * - `dynamic`: toggle with a dynamic circular reveal effect
   * - custom function: provide your own implementation
   *
   * @default 'dynamic'
   */
  appearance?: 'plain' | 'dynamic' | Appearance
  /**
   * Custom the path of function imports
   *
   * @see https://byronogis.github.io/astro-friday/post/custom-og-middleware-handler
   */
  imports?: {
    /**
     * @default '@vercel/og'
     */
    '@vercel/og'?: string
  }
  /**
   * Default components mapping, can be overridden by user config
   *
   * @example
   * ```ts
   * components: {
   *   NavbarBrand: 'src/components/YourBrand.astro',
   * }
   * ```
   */
  components?: {
    /**
     * The component used for the brand/logo area in the navbar.
     */
    NavbarBrand?: string
  }
  /**
   * View transition functionality configuration
   *
   * @see https://docs.astro.build/en/guides/view-transitions/
   */
  viewTransition?: {
    /**
     * Enable or disable view transitions for page navigation.
     * @default true
     */
    enable?: boolean
  }
  /**
   * Built-in PostCSS plugins configuration options
   */
  postcss?: {
    postcssGlobalData?: import('@byronogis/postcss-global-data').pluginOptions
    postcssPresetEnv?: import('postcss-preset-env').pluginOptions
  }
  /**
   * Integrations configuration, you can configure or disable built-in integrations here.
   */
  integrations?: {
    /**
     * SEO configuration for `astro-seo` integration
     *
     * @see https://github.com/jonasmerlin/astro-seo?tab=readme-ov-file#supported-props
     *
     * Priority: default build-in < config < specific page build-in
     *
     * default build-in:
     * @see https://github.com/byronogis/astro-friday/blob/30e444d5b11dffb70bc5a2036eb83c80ef6bd200/packages/astro-friday/src/components/HeadContent.astro#L17-L29
     * specific page build-in:
     * @see https://github.com/byronogis/astro-friday/blob/30e444d5b11dffb70bc5a2036eb83c80ef6bd200/packages/astro-friday/src/routes/post/%5B...slug%5D.astro#L35-L65
     */
    seo?: SEO
    /**
     * Nprogress using in astro while the astro view transition is enabled.
     *
     * @see https://github.com/byronogis/astro-nprogress
     */
    nprogress?: Parameters<typeof nprogress>[0] | false
    /**
     * Sitemap generation using `@astrojs/sitemap` integration.
     *
     * @see https://docs.astro.build/en/guides/integrations-guide/sitemap/
     */
    sitemap?: SitemapOptions | false
    /**
     * Custom robots.txt entries, will be appended to the generated robots.txt file.
     *
     * @default
     * - User-agent: * Allow: /
     * - Remote: https://raw.githubusercontent.com/ai-robots-txt/ai.robots.txt/main/robots.txt
     * - Sitemap: <your-site-url>/sitemap-index.xml
     */
    robotsTxt?: RobotsTxtOptions | false
    /**
     * MDX integration using `@astrojs/mdx`.
     *
     * @see https://docs.astro.build/en/guides/integrations-guide/mdx/
     */
    mdx?: MdxOptions | false
  }
  /**
   * Project showcase items, used in the `/project` page.
   *
   * A page route for `/project` will be automatically created if there are more than 0 projects defined.
   *
   * @default []
   */
  projects?: ProjectItem[]
  /**
   * Advanced configuration options for power using.
   */
  advanced?: {
    /**
     * Function code replacement configuration for advanced using.
     *
     * When passing functions as configuration values, you might want to replace
     * certain code snippets.
     *
     * Like we can solve the `__vite_ssr_dynamic_import__ is not defined` issue
     * by replacing `__vite_ssr_dynamic_import__("node:fs")` with
     * `import("node:fs")` when building.
     *
     * @example
     * ```ts
     * advanced: {
     *   functionCodeReplace: [
     *     {
     *       api: 'replaceAll',
     *       parameters: ['__vite_ssr_dynamic_import__("node:', 'import("node:'],
     *     },
     *   ],
     * }
     * ```
     */
    functionCodeReplace?: {
      /**
       * The string method to replace function code snippets
       *
       * @default 'replaceAll'
       */
      api?: 'replace' | 'replaceAll'
      /**
       * Just allow string parameters due to serialization limitation, will
       * pass to the string method after spreading.
       */
      parameters: [string, string]
    }[]
  }
}

export type ResolvedConfig = SetRequiredDeep<
  OmitDeep<Config, 'post.frontmatterKeys'>,
  | 'title'
  | 'base'
  | 'author'
  | 'author.name'
  | 'copyright'
  | 'copyright.copyrightYears'
  | 'copyright.license'
  | 'post'
  | 'post.pathStyle'
  | 'post.toc'
  | 'post.toc.enable'
  | 'post.toc.range'
  | 'post.og'
  | 'post.export'
  | 'post.export.md'
  | 'post.entryProcessors'
  | 'collections'
  | 'navigations'
  | `navigations.${string}`
  | 'pages'
  | 'pages.404'
  | 'pages.home'
  | 'art'
  | 'art.dots'
  | 'art.plum'
  | 'art.dots.weight'
  | 'art.plum.weight'
  | 'appearance'
  | 'imports'
  | 'imports.@vercel/og'
  | 'components'
  | 'components.NavbarBrand'
  | 'viewTransition'
  | 'viewTransition.enable'
  | 'postcss'
  | 'postcss.postcssGlobalData'
  | 'postcss.postcssPresetEnv'
  | 'integrations'
  | 'integrations.nprogress'
  | 'integrations.sitemap'
  | 'integrations.robotsTxt'
  | 'integrations.mdx'
  | 'projects'
  | 'advanced'
  | 'advanced.functionCodeReplace'
> & {
  /**
   * The full base path, including Astro's base.
   */
  baseFull: string
  post: {
    frontmatterKeys: {
      [K in FrontmatterKeysInternal]: K
    }
  }
}
