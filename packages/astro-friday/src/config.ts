import type { AstroConfig, InjectedRoute } from 'astro'
import type nprogress from 'astro-nprogress'
import type { Props as SEO } from 'astro-seo'
import type { glob } from 'astro/loaders'
import type { SetRequiredDeep } from 'type-fest'
import type { Schema } from './collection'
import type { ArtConfig, NavItem, ProjectItem } from './types'
import path from 'node:path'
import { defu } from 'defu'

type GlobOptions = Parameters<typeof glob>[0]

export function getDefaultConfig(config: Config & {
  baseFull?: string
} = {}): Config {
  const base = config.base ?? '/'
  const baseFull = config.baseFull ?? base

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
    },
    collections: {},
    navigations: {
      'post': { label: 'Post', link: path.join(baseFull, 'post'), icon: 'i-lucide:scroll-text', order: 100 },
      'tag': { label: 'Tag', link: path.join(baseFull, 'tag'), icon: 'i-lucide:tag', order: 200 },
      'series': { label: 'Series', link: path.join(baseFull, 'series'), icon: 'i-lucide:square-library', order: 300 },
      'project': { label: 'Project', link: path.join(baseFull, 'project'), icon: 'i-lucide:lightbulb', order: 400, hidden: !config.projects?.length },
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
    imports: {
      '@vercel/og': '@vercel/og',
    },
    components: {
      NavbarBrand: 'astro-friday/components/Opt/NavbarBrand.astro',
    },
    viewTransition: {
      enable: true,
    },
    integrations: {
      nprogress: {
        showSpinner: false,
      },
    },
    projects: [],
  }
}

export function resolveConfig(userConfig: Config, astroConfig: AstroConfig, isDev: boolean): ResolvedConfig {
  const base = userConfig.base ?? '/'
  const baseFull = path.join('/', astroConfig.base, base)

  const defaultConfig = getDefaultConfig({
    ...userConfig,
    base,
    baseFull,
  })

  // use default config for development to avoid issues with Vercel OG package
  isDev && delete userConfig.imports?.['@vercel/og']

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
     * @default { enable: true, range: [2, 4] }
     */
    toc?: Partial<Schema['toc']>
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
   * You can override the built-in navs: `post`, `tag`, `series`, `theme-toggle`
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
  navigations?: Partial<Record<'post' | 'tag' | 'series' | 'theme-toggle', Partial<NavItem>>> | {
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
  }
  /**
   * Project showcase items, used in the `/projects` page.
   *
   * A page route for `/projects` will be automatically created if there are more than 0 projects defined.
   *
   * @default []
   */
  projects?: ProjectItem[]
}

export type ResolvedConfig = SetRequiredDeep<
  Config,
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
  | 'imports'
  | 'imports.@vercel/og'
  | 'components'
  | 'components.NavbarBrand'
  | 'viewTransition'
  | 'viewTransition.enable'
  | 'integrations'
  | 'integrations.nprogress'
  | 'projects'
> & {
  /**
   * The full base path, including Astro's base.
   */
  baseFull: string
}
