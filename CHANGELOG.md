# Changelog


## v1.0.0-beta.26

[compare changes](https://github.com/byronogis/astro-friday/compare/v1.0.0-beta.25...v1.0.0-beta.26)

### 🚀 Enhancements

- **config:** Post sort control by `post.sort` ([0672317](https://github.com/byronogis/astro-friday/commit/0672317))

### 🏡 Chore

- **docs:** Excute astro sync while prepare ([36d9935](https://github.com/byronogis/astro-friday/commit/36d9935))
- Type fix ([70ad597](https://github.com/byronogis/astro-friday/commit/70ad597))
- Update deps ([f30508c](https://github.com/byronogis/astro-friday/commit/f30508c))

### ❤️ Contributors

- Byronogis ([@byronogis](https://github.com/byronogis))

## v1.0.0-beta.25

[compare changes](https://github.com/byronogis/astro-friday/compare/v1.0.0-beta.24...v1.0.0-beta.25)

### 🚀 Enhancements

- **processors:** Frontmatter title optional now, add processorTitle to set frontmatter title from file name if no set ([566f4b4](https://github.com/byronogis/astro-friday/commit/566f4b4))
- **docs:** Configuration doc generate automatically ([7db8392](https://github.com/byronogis/astro-friday/commit/7db8392))

### 🩹 Fixes

- Avoid Type instantiation is excessively deep and possibly infinite" ([2a203d1](https://github.com/byronogis/astro-friday/commit/2a203d1))
- Avoid Type instantiation is excessively deep and possibly infinite ([0befba3](https://github.com/byronogis/astro-friday/commit/0befba3))

### 🏡 Chore

- **config:** ⚠️  Rename `pages['rss.xml']` to `pages.rss_xml` to avoid conflict when using SetRequiredDeep ([5319075](https://github.com/byronogis/astro-friday/commit/5319075))

### 🤖 CI

- Reusing workflow ([bab314d](https://github.com/byronogis/astro-friday/commit/bab314d))
- Add release workflow ([1abb398](https://github.com/byronogis/astro-friday/commit/1abb398))

#### ⚠️ Breaking Changes

- **config:** ⚠️  Rename `pages['rss.xml']` to `pages.rss_xml` to avoid conflict when using SetRequiredDeep ([5319075](https://github.com/byronogis/astro-friday/commit/5319075))

### ❤️ Contributors

- Byronogis ([@byronogis](https://github.com/byronogis))

## v1.0.0-beta.24

[compare changes](https://github.com/byronogis/astro-friday/compare/v1.0.0-beta.23...v1.0.0-beta.24)

### 🚀 Enhancements

- Add lang attribute to artical tag ([137693c](https://github.com/byronogis/astro-friday/commit/137693c))
- Rss support ([e3f50ac](https://github.com/byronogis/astro-friday/commit/e3f50ac))

### 🩹 Fixes

- Avoid Type instantiation is excessively deep and possibly infinite ([02cf6e5](https://github.com/byronogis/astro-friday/commit/02cf6e5))

### 🏡 Chore

- Add deepwiki badge ([f6d9884](https://github.com/byronogis/astro-friday/commit/f6d9884))

### ❤️ Contributors

- Byronogis ([@byronogis](https://github.com/byronogis))

## v1.0.0-beta.23

[compare changes](https://github.com/byronogis/astro-friday/compare/v1.0.0-beta.22...v1.0.0-beta.23)

### 🚀 Enhancements

- Auto generate permalink to frontmatter ([c990971](https://github.com/byronogis/astro-friday/commit/c990971))
- Processors order controlable ([4270e7f](https://github.com/byronogis/astro-friday/commit/4270e7f))
- Multi-language version of content support ([8914a5d](https://github.com/byronogis/astro-friday/commit/8914a5d))

### 💅 Refactors

- ⚠️  Processors ([16b4865](https://github.com/byronogis/astro-friday/commit/16b4865))

### 🏡 Chore

- Update deps ([e86101d](https://github.com/byronogis/astro-friday/commit/e86101d))
- Update page style ([0b11a93](https://github.com/byronogis/astro-friday/commit/0b11a93))

#### ⚠️ Breaking Changes

- ⚠️  Processors ([16b4865](https://github.com/byronogis/astro-friday/commit/16b4865))

### ❤️ Contributors

- Byronogis ([@byronogis](https://github.com/byronogis))

## v1.0.0-beta.22

[compare changes](https://github.com/byronogis/astro-friday/compare/v1.0.0-beta.21...v1.0.0-beta.22)

### 🚀 Enhancements

- Auto correct content link between each other ([1089bf2](https://github.com/byronogis/astro-friday/commit/1089bf2))

### 🏡 Chore

- ⚠️  Rename config `base` to `prefix` for reduce confuse with astro `base` ([973224d](https://github.com/byronogis/astro-friday/commit/973224d))

#### ⚠️ Breaking Changes

- ⚠️  Rename config `base` to `prefix` for reduce confuse with astro `base` ([973224d](https://github.com/byronogis/astro-friday/commit/973224d))

### ❤️ Contributors

- Byronogis ([@byronogis](https://github.com/byronogis))

## v1.0.0-beta.21

[compare changes](https://github.com/byronogis/astro-friday/compare/v1.0.0-beta.20...v1.0.0-beta.21)

### 🩹 Fixes

- Deps ([3e230fe](https://github.com/byronogis/astro-friday/commit/3e230fe))

### 🏡 Chore

- Update ([630d809](https://github.com/byronogis/astro-friday/commit/630d809))

### ❤️ Contributors

- Byronogis ([@byronogis](https://github.com/byronogis))

## v1.0.0-beta.20

[compare changes](https://github.com/byronogis/astro-friday/compare/v1.0.0-beta.19...v1.0.0-beta.20)

### 🚀 Enhancements

- `advanced.functionCodeReplace` to modified function code while using funciton type values of config ([9d2419c](https://github.com/byronogis/astro-friday/commit/9d2419c))
- **processor:** Add `override` option for processorUpdateModifiedTime to decide whether to override thee exist value ([e587b3b](https://github.com/byronogis/astro-friday/commit/e587b3b))

### 🏡 Chore

- ⚠️  Rename `post.entryProcessors` to `post.processors` ([aa1bd54](https://github.com/byronogis/astro-friday/commit/aa1bd54))

#### ⚠️ Breaking Changes

- ⚠️  Rename `post.entryProcessors` to `post.processors` ([aa1bd54](https://github.com/byronogis/astro-friday/commit/aa1bd54))

### ❤️ Contributors

- Byronogis ([@byronogis](https://github.com/byronogis))

## v1.0.0-beta.19

[compare changes](https://github.com/byronogis/astro-friday/compare/v1.0.0-beta.18...v1.0.0-beta.19)

### 🚀 Enhancements

- Collection entry processor ([689c488](https://github.com/byronogis/astro-friday/commit/689c488))

### 🏡 Chore

- Change code block copied icon for better feedback ([15160f2](https://github.com/byronogis/astro-friday/commit/15160f2))
- Move CodeBlockWrapper to head block ([a7d29c9](https://github.com/byronogis/astro-friday/commit/a7d29c9))
- Remove unneed 'as' identifiers ([b0b51b8](https://github.com/byronogis/astro-friday/commit/b0b51b8))

### ❤️ Contributors

- Byronogis ([@byronogis](https://github.com/byronogis))

## v1.0.0-beta.18

[compare changes](https://github.com/byronogis/astro-friday/compare/v1.0.0-beta.17...v1.0.0-beta.18)

### 🚀 Enhancements

- Use css cascade layer to control style conveniently ([484964c](https://github.com/byronogis/astro-friday/commit/484964c))
- Add line numbers for code block ([5e49a10](https://github.com/byronogis/astro-friday/commit/5e49a10))
- Code block highlight,diff,focus,indent by shiki transformers ([c440102](https://github.com/byronogis/astro-friday/commit/c440102))
- Code block copy button and language text display ([ac8bde0](https://github.com/byronogis/astro-friday/commit/ac8bde0))

### 🏡 Chore

- Move code ([943dfa9](https://github.com/byronogis/astro-friday/commit/943dfa9))
- Update lockfile ([9b2b811](https://github.com/byronogis/astro-friday/commit/9b2b811))

### ❤️ Contributors

- Byronogis ([@byronogis](https://github.com/byronogis))

## v1.0.0-beta.17

[compare changes](https://github.com/byronogis/astro-friday/compare/v1.0.0-beta.16...v1.0.0-beta.17)

### 🩹 Fixes

- Post export ([53a424c](https://github.com/byronogis/astro-friday/commit/53a424c))

### ❤️ Contributors

- Byronogis ([@byronogis](https://github.com/byronogis))

## v1.0.0-beta.16

[compare changes](https://github.com/byronogis/astro-friday/compare/v1.0.0-beta.15...v1.0.0-beta.16)

### 🚀 Enhancements

- Support mdx ([d93ef6a](https://github.com/byronogis/astro-friday/commit/d93ef6a))
- Post support markdown file export ([93b2e9a](https://github.com/byronogis/astro-friday/commit/93b2e9a))

### 🩹 Fixes

- Theme toggle void while after view transition ([adfd784](https://github.com/byronogis/astro-friday/commit/adfd784))

### 💅 Refactors

- Move and rename content/post util ([949c39b](https://github.com/byronogis/astro-friday/commit/949c39b))

### ❤️ Contributors

- Byronogis ([@byronogis](https://github.com/byronogis))

## v1.0.0-beta.15

[compare changes](https://github.com/byronogis/astro-friday/compare/v1.0.0-beta.14...v1.0.0-beta.15)

### 🚀 Enhancements

- Og support custom by config `post.og` ([b435b24](https://github.com/byronogis/astro-friday/commit/b435b24))
- Frontmatter keys mapping ([ea1c696](https://github.com/byronogis/astro-friday/commit/ea1c696))
- Support function while config value define ([4ec0471](https://github.com/byronogis/astro-friday/commit/4ec0471))

### 🩹 Fixes

- Debug command ([1d5c25c](https://github.com/byronogis/astro-friday/commit/1d5c25c))
- Function disappear in config virtual module ([d3db277](https://github.com/byronogis/astro-friday/commit/d3db277))
- Function disappear in config virtual module" ([a92cb76](https://github.com/byronogis/astro-friday/commit/a92cb76))

### 📖 Documentation

- Update rodemap ([5aa3cf0](https://github.com/byronogis/astro-friday/commit/5aa3cf0))
- Update roadmap ([badd910](https://github.com/byronogis/astro-friday/commit/badd910))

### 🏡 Chore

- Add vite-plugin-inspect for debugging ([73c2531](https://github.com/byronogis/astro-friday/commit/73c2531))
- Update deps ([d8c37c6](https://github.com/byronogis/astro-friday/commit/d8c37c6))

### ❤️ Contributors

- Byronogis ([@byronogis](https://github.com/byronogis))

## v1.0.0-beta.14

[compare changes](https://github.com/byronogis/astro-friday/compare/v1.0.0-beta.13...v1.0.0-beta.14)

### 🚀 Enhancements

- Appearance support custom ([c14341b](https://github.com/byronogis/astro-friday/commit/c14341b))

### 🔥 Performance

- Remove view transition directive if disabled ([b29e809](https://github.com/byronogis/astro-friday/commit/b29e809))

### 🏡 Chore

- Update deps ([752abec](https://github.com/byronogis/astro-friday/commit/752abec))

### ❤️ Contributors

- Byronogis ([@byronogis](https://github.com/byronogis))

## v1.0.0-beta.13

[compare changes](https://github.com/byronogis/astro-friday/compare/v1.0.0-beta.12...v1.0.0-beta.13)

### 🚀 Enhancements

- Auto generate sitemap and robots ([b1f7e69](https://github.com/byronogis/astro-friday/commit/b1f7e69))

### 💅 Refactors

- ⚠️  Move `seo` config field to `integrations.seo` ([bb53174](https://github.com/byronogis/astro-friday/commit/bb53174))

### 📖 Documentation

- Fix project page path ([2800f52](https://github.com/byronogis/astro-friday/commit/2800f52))

### 🏡 Chore

- Update deps ([a39bbc0](https://github.com/byronogis/astro-friday/commit/a39bbc0))
- Update lockfile ([79f39b8](https://github.com/byronogis/astro-friday/commit/79f39b8))

#### ⚠️ Breaking Changes

- ⚠️  Move `seo` config field to `integrations.seo` ([bb53174](https://github.com/byronogis/astro-friday/commit/bb53174))

### ❤️ Contributors

- Byronogis ([@byronogis](https://github.com/byronogis))

## v1.0.0-beta.12

[compare changes](https://github.com/byronogis/astro-friday/compare/v1.0.0-beta.11...v1.0.0-beta.12)

### 🚀 Enhancements

- Add toc to project page ([686b1ba](https://github.com/byronogis/astro-friday/commit/686b1ba))
- Optimize toc scroll behavior ([88ae100](https://github.com/byronogis/astro-friday/commit/88ae100))
- Toc config for specific content from frontmatter ([2e374ad](https://github.com/byronogis/astro-friday/commit/2e374ad))

### 🩹 Fixes

- Import ([83415a7](https://github.com/byronogis/astro-friday/commit/83415a7))
- Hide scrolltptop while an unscroll page ([41f113a](https://github.com/byronogis/astro-friday/commit/41f113a))

### 🏡 Chore

- Update deps ([15d11f7](https://github.com/byronogis/astro-friday/commit/15d11f7))
- Remove noneed code ([17d1320](https://github.com/byronogis/astro-friday/commit/17d1320))
- Hoist toc index ([5a5ce6b](https://github.com/byronogis/astro-friday/commit/5a5ce6b))

### ❤️ Contributors

- Byronogis ([@byronogis](https://github.com/byronogis))

## v1.0.0-beta.11

[compare changes](https://github.com/byronogis/astro-friday/compare/v1.0.0-beta.10...v1.0.0-beta.11)

### 📖 Documentation

- Add changelog page ([91e9ebd](https://github.com/byronogis/astro-friday/commit/91e9ebd))
- Fix changelog page link ([a4f8f6c](https://github.com/byronogis/astro-friday/commit/a4f8f6c))

### ❤️ Contributors

- Byronogis ([@byronogis](https://github.com/byronogis))

## v1.0.0-beta.10

[compare changes](https://github.com/byronogis/astro-friday/compare/v1.0.0-beta.9...v1.0.0-beta.10)

### 🚀 Enhancements

- Project route while pass projects config ([9b8e04e](https://github.com/byronogis/astro-friday/commit/9b8e04e))

### 💅 Refactors

- Using extracted pkg astro-view-transition-script ([b0c0524](https://github.com/byronogis/astro-friday/commit/b0c0524))

### 📖 Documentation

- Projects example ([53c7ee5](https://github.com/byronogis/astro-friday/commit/53c7ee5))

### ❤️ Contributors

- Byronogis ([@byronogis](https://github.com/byronogis))

## v1.0.0-beta.9

[compare changes](https://github.com/byronogis/astro-friday/compare/v1.0.0-beta.8...v1.0.0-beta.9)

### 🔥 Performance

- Just adding progress bar while view transition is enabled ([0fb30a9](https://github.com/byronogis/astro-friday/commit/0fb30a9))

### 💅 Refactors

- Extract astro-nprogress integration ([7fce77b](https://github.com/byronogis/astro-friday/commit/7fce77b))

### 🏡 Chore

- Avoid using important flag ([7daa059](https://github.com/byronogis/astro-friday/commit/7daa059))
- Optimize accessibility ([0944b1d](https://github.com/byronogis/astro-friday/commit/0944b1d))

### ❤️ Contributors

- Byronogis ([@byronogis](https://github.com/byronogis))

## v1.0.0-beta.8

[compare changes](https://github.com/byronogis/astro-friday/compare/v1.0.0-beta.7...v1.0.0-beta.8)

### 🚀 Enhancements

- Integrate nprogress bar ([50972d1](https://github.com/byronogis/astro-friday/commit/50972d1))

### 🏡 Chore

- Display generator version while there are be hovered ([a8f7798](https://github.com/byronogis/astro-friday/commit/a8f7798))

### ❤️ Contributors

- Byronogis ([@byronogis](https://github.com/byronogis))

## v1.0.0-beta.7

[compare changes](https://github.com/byronogis/astro-friday/compare/v1.0.0-beta.6...v1.0.0-beta.7)

### 🚀 Enhancements

- Making art state persist between pages when using view transition ([891dc46](https://github.com/byronogis/astro-friday/commit/891dc46))

### 📖 Documentation

- Update changelog ([7b93e96](https://github.com/byronogis/astro-friday/commit/7b93e96))
- Update highlights ([e5b5339](https://github.com/byronogis/astro-friday/commit/e5b5339))

### 📦 Build

- Use fork insteadof patch to modify deps to support customer ([4369305](https://github.com/byronogis/astro-friday/commit/4369305))

### 🏡 Chore

- Update deps ([3695177](https://github.com/byronogis/astro-friday/commit/3695177))

### ❤️ Contributors

- Byronogis ([@byronogis](https://github.com/byronogis))

## v1.0.0-beta.6

[compare changes](https://github.com/byronogis/astro-friday/compare/v1.0.0-beta.5...v1.0.0-beta.6)

### 🔥 Performance

- Noneed TOC while headings length is zero ([3ea9624](https://github.com/byronogis/astro-friday/commit/3ea9624))

### 🚀 Enhancements

- View transition for title, tag, series ([3d65350](https://github.com/byronogis/astro-friday/commit/3d65350))

### 🩹 Fixes

- Toc text color while dark theme ([b5d9341](https://github.com/byronogis/astro-friday/commit/b5d9341))

### 🏡 Chore

- Add force flag to astro dev command ([994968e](https://github.com/byronogis/astro-friday/commit/994968e))

### ❤️ Contributors

- Byronogis ([@byronogis](https://github.com/byronogis))

## v1.0.0-beta.5

[compare changes](https://github.com/byronogis/astro-friday/compare/v1.0.0-beta.4...v1.0.0-beta.5)

### 🚀 Enhancements

- Support TOC ([fb9c26d](https://github.com/byronogis/astro-friday/commit/fb9c26d))
- Make NavbarBrand fixed while in lg viewport ([8c300ed](https://github.com/byronogis/astro-friday/commit/8c300ed))
- Scroll to top, powered by scroll-driven animation ([130be34](https://github.com/byronogis/astro-friday/commit/130be34))
- Keywords meta info about post ([02dec7e](https://github.com/byronogis/astro-friday/commit/02dec7e))

### 📖 Documentation

- Add more type comments for config options ([d1f1106](https://github.com/byronogis/astro-friday/commit/d1f1106))
- Keywords frontmatter field and seo binding is donw ([eed6a72](https://github.com/byronogis/astro-friday/commit/eed6a72))

### 🏡 Chore

- Style optimize ([f111ddd](https://github.com/byronogis/astro-friday/commit/f111ddd))

### ❤️ Contributors

- Byronogis ([@byronogis](https://github.com/byronogis))

## v1.0.0-beta.4

[compare changes](https://github.com/byronogis/astro-friday/compare/v1.0.0-beta.3...v1.0.0-beta.4)

### 🩹 Fixes

- Logo path ([af63942](https://github.com/byronogis/astro-friday/commit/af63942))

### ❤️ Contributors

- Byronogis ([@byronogis](https://github.com/byronogis))

## v1.0.0-beta.3

[compare changes](https://github.com/byronogis/astro-friday/compare/v1.0.0-beta.2...v1.0.0-beta.3)

### 🚀 Enhancements

- NavbarBrand customizable ([5af7dc3](https://github.com/byronogis/astro-friday/commit/5af7dc3))

### 📖 Documentation

- Update ([8270032](https://github.com/byronogis/astro-friday/commit/8270032))
- Update ([d68df69](https://github.com/byronogis/astro-friday/commit/d68df69))

### ❤️ Contributors

- Byronogis ([@byronogis](https://github.com/byronogis))

## v1.0.0-beta.2

[compare changes](https://github.com/byronogis/astro-friday/compare/v1.0.0-beta.1...v1.0.0-beta.2)

## v1.0.0-beta.1

[compare changes](https://github.com/byronogis/astro-friday/compare/v1.0.0-beta.0...v1.0.0-beta.1)

