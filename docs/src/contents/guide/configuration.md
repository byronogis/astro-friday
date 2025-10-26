---
title: Configuration
tags:
  - astro
  - markdown
  - guide
  - astro-friday
series:
  - guide
created: 2025-10-04
description: A guide to setting up your Astro Friday integration.

---

Astro Friday is a content-focused Astro integration with tag and series support. This guide will help you complete the configuration.

## Basic Configuration

Add the Astro Friday integration to your `astro.config.*` file:

```ts
import Friday from 'astro-friday'
import { defineConfig } from 'astro/config'

export default defineConfig({
  integrations: [
    Friday({
      title: 'My Blog',
      description: 'A content-focused blog',
      author: {
        name: 'Your Name',
        email: 'your.email@example.com',
      },
    }),
  ],
})
```

## Configuration Options

### Basic Information

- **`title`** (string): Website title, defaults to 'Friday'
- **`description`** (string): Website description, defaults to 'A content-focused Astro integration with tag and series support.'
- **`prefix`** (string): prefix path, defaults to '/', respects the `base` of Astro further, it's just a sub-path prefix for all built-in routes, e.g. if set to `/friday-base`, and set `astro-base` to Astro.base, then the actual post list page will be `/astro-base/friday-base/post`

### Author Information

```
author: {
  name?: string       // Author name, defaults to 'Anonymous'
  email?: string      // Author email
  url?: string        // Author website
  avatar?: string     // Author avatar URL
}
```

### Copyright Information

```
copyright: {
  copyrightYears?: string  // Copyright years, defaults to current year
  license?: {
    type: string           // License type, defaults to 'CC BY-NC-SA 4.0'
    url: string           // License URL, defaults to 'https://creativecommons.org/licenses/by-nc-sa/4.0/'
  }
}
```

### Post Configuration

Configure post-related settings:

```
post: {
  pathStyle?: 'collection/id' | 'id'  // Path style for post routes, defaults to 'collection/id'
}
```

Path styles:
- `collection/id`: `/post/collection/id`, e.g. `/post/blog/my-first-post`
- `id`: `/post/id`, e.g. `/post/my-first-post`

### Collections Configuration

Define content collections and their data sources:

```
collections: {
  [collectionName: string]: {
    label?: string        // Display label for the collection
    glob: {
      pattern: string     // Glob pattern
      base: string        // Base directory
    }
  }
}
```

Example:
```
collections: {
  blog: {
    label: 'Blog Posts',
    glob: {
      pattern: '**/*.md',
      base: './src/content/blog',
    },
  },
  guide: {
    label: 'Guides',
    glob: {
      pattern: '**/*.md',
      base: './src/content/guide',
    },
  },
}
```

### Navigation Configuration

Customize navigation items:

```
navigations: {
  [key: string]: {
    label: string       // Display text
    link: string        // Link URL
    icon?: string       // Icon class name (e.g., 'i-lucide:home')
    type?: 'icon'       // Navigation type, 'icon' means always show as a icon
    external?: boolean  // Whether it's an external link
    order?: number      // Sort weight, higher numbers appear keep left
    hidden?: boolean    // Whether to hide
  }
}
```

Built-in navigation items:
- `post`: Post list page
- `tag`: Tag page
- `series`: Series page
- `theme-toggle`: Theme toggle

Example:
```
navigations: {
  post: { label: 'Posts' },
  tag: { label: 'Tags' },
  series: { label: 'Series' },
  github: {
    label: 'GitHub',
    icon: 'i-lucide:github',
    external: true,
    link: 'https://github.com/username',
    type: 'icon',
    order: 900
  },
  'theme-toggle': { label: 'Theme', order: 1000 },
}
```

### Page Configuration

Configure routes for special pages:

```
pages: {
  home?: InjectedRoute | false    // Home page route
  404?: InjectedRoute | false     // 404 page route
}
```

Set to `false` to disable default pages.

Example:
```
pages: {
  home: false,  // Disable default home page, you can create your own home page at `src/pages/index.astro`
}
```

See [Custom Homepage](./custom-homepage) for more details on creating a custom homepage.

### SEO Configuration

SEO optimization using `astro-seo`, you can refer to its [documentation](https://github.com/jonasmerlin/astro-seo?tab=readme-ov-file#supported-props) for more options.

### Logo Configuration

```
logo: {
  url?: string  // Logo image URL
}
```

### Art Background Configuration

Configure decorative background elements for pages:

```
art: {
  dots?: {
    weight?: number   // Selection weight, higher values increase probability, defaults to 1
  }
  plum?: {
    weight?: number   // Selection weight, defaults to 1
  }
}
```

### Imports Configuration

Configure module imports for your needs:

```
imports: {
  '@vercel/og'?: string  // OG image generation module, defaults to '@vercel/og'
}
```

This is useful when deploying to non-Node.js environments. For example, when deploying to Cloudflare Workers:

```
imports: {
  '@vercel/og': '@cloudflare/pages-plugin-vercel-og/api',
}
```

See [Custom OG Middleware Handler](../recipes/Custom%20OG%20Middleware%20Handler.md) for more details.

## Complete Configuration Example

```ts
import Friday from 'astro-friday'
import { defineConfig } from 'astro/config'

export default defineConfig({
  // ...
  integrations: [
    Friday({
      title: 'My Tech Blog',
      description: 'A blog about web development and technology',
      author: {
        name: 'John Doe',
        email: 'john@example.com',
        url: 'https://johndoe.dev',
        avatar: '/avatar.jpg',
      },
      copyright: {
        copyrightYears: '2024',
        license: {
          type: 'MIT',
          url: 'https://opensource.org/licenses/MIT',
        },
      },
      post: {
        pathStyle: 'collection/id',
      },
      collections: {
        blog: {
          label: 'Blog Posts',
          glob: {
            pattern: '**/*.md',
            base: './src/content/blog',
          },
        },
        tutorial: {
          label: 'Tutorials',
          glob: {
            pattern: '**/*.md',
            base: './src/content/tutorial',
          },
        },
      },
      navigations: {
        post: { label: 'Posts' },
        tag: { label: 'Tags' },
        series: { label: 'Series' },
        about: { label: 'About', link: '/about' },
        github: {
          label: 'GitHub',
          icon: 'i-lucide:github',
          external: true,
          link: 'https://github.com/username',
          type: 'icon',
          order: 900,
        },
      },
      seo: {
        title: 'My Tech Blog',
        description: 'A blog about web development',
        openGraph: {
          basic: {
            title: 'My Tech Blog',
            type: 'website',
            image: '/og-image.jpg',
          },
        },
      },
      logo: {
        url: '/logo.svg',
      },
      art: {
        dots: { weight: 2 },
        plum: { weight: 1 },
      },
      imports: {
        '@vercel/og': '@vercel/og',
      },
    }),
  ],
})
```

## Content Structure

Ensure your content files contain appropriate frontmatter:

```markdown
---
title: Article Title
description: Article description
tags:
  - web-development
  - astro
series:
  - astro-tutorial
created: 2024-10-04
modified: 2024-10-04
---

Your Markdown content...
```

Supported frontmatter fields:
- `title`: Article title (required)
- `subtitle`: Article subtitle (optional)
- `description`: Article description (optional)
- `created`: Creation date (optional), defaults to '1970-01-01'
- `modified`: Last modified date (optional)
- `author`: Author name (optional), defaults to author name in config
- `series`: Array or string of series (optional), defaults to empty array
- `tags`: Array or string of tags (optional), defaults to empty array
- `draft`: Whether it's a draft (boolean), defaults to false. When true, the article will be set `noindex, nofollow` for SEO
- `lang`: Language code (optional), defaults to 'en', e.g., 'en', 'zh-CN'
