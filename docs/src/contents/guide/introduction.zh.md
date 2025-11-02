---
title: 介绍
created: 2025-11-01
tags: ["astro"]
author: Byron
series:
  - guide
id: introduction
lang: zh

---

# Astro Friday

[![npm version](https://img.shields.io/npm/v/astro-friday)](https://npmjs.com/package/astro-friday)
[![npm downloads](https://img.shields.io/npm/dm/astro-friday)](https://npm.chart.dev/astro-friday)
[![bundle size](https://img.shields.io/bundlephobia/minzip/astro-friday)](https://bundlephobia.com/package/astro-friday)
[![codecov](https://img.shields.io/codecov/c/gh/byronogis/astro-friday)](https://codecov.io/gh/byronogis/astro-friday)
[![license](https://img.shields.io/github/license/byronogis/astro-friday)](https://github.com/byronogis/astro-friday/blob/main/LICENSE)
[![JSDocs][jsdocs-src]][jsdocs-href]
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/byronogis/astro-friday)

一个以内容为核心的 [Astro](https://astro.build) 集成，支持标签和系列功能。

你可以在 [这里](https://github.com/byronogis/astro-friday) 找到源代码。

## 特性

- 配置简洁，易于使用，只需安装并设置内容集合
- 多集合设计，支持过滤
- 通过 [astro-seo](https://github.com/jonasmerlin/astro-seo) 实现 SEO
- 通过 [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) 自动生成站点地图
- 内置 robots.txt 集成自动生成，轻松添加远程或本地规则
- 通过 [@vercel/og](https://vercel.com/docs/og-image-generation) 自动生成开放图谱图像
- 通过 [astro-color-scheme](https://github.com/surjithctly/astro-color-scheme) 支持明暗模式
- 响应式设计，移动端和桌面端友好
- 使用 [unocss](https://github.com/unocss/unocss) 处理 CSS，[图标](https://unocss.dev/presets/icons) 的使用也很方便
- 默认为文章标题、标签和系列链接导航启用 [视图过渡](https://docs.astro.build/en/guides/view-transitions/)

## 使用方法

- 安装 `astro-friday`

```bash
npm install astro-friday
# or
pnpm add astro-friday
# or
yarn add astro-friday
```

- 在你的 `astro.config.*` 中添加 `astro-friday` 集成

```ts
import friday from 'astro-friday'
import { defineConfig } from 'astro/config'

export default defineConfig({
  integrations: [
    friday({
      collections: {
        blog: {
          glob: {
            pattern: '**/*.md',
            base: './src/contents/blog',
          },
        },
      },
    }),
  ],
})
```

- 在 `src/content.config.ts` 文件中导入集合

```ts
import collection from 'virtual:astro-friday-collection'

export const collections = collection()
```

现在, 你可以启动服务了。

更多设置可以在 [这里](./configuration) 找到。

## 路线图

- [x] sitemap
- [x] robots.txt
- [ ] 搜索
- [x] 目录
- [x] 将 keywords frontmatter 用于 SEO
- [x] frontmatter 字段键值映射
- [x] 自动更新最后修改时间
- [ ] loader 和 schema 自定义
- [x] 代码块优化（行号、复制按钮等）
- [x] MDX 支持
- [x] 下载为 Markdown（获取处理过的 MDX 和 MD）
- [x] 多语言版本内容支持
- [x] OG 图像参数自定义
- [ ] 自动生成配置文档
- [ ] 资源管理
- [ ] 图片预览
- 等等

## 致谢

- 页面风格由 [antfu.me](https://antfu.me) 启发。

---

[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-1fa669
[jsdocs-href]: https://www.jsdocs.io/package/astro-friday
