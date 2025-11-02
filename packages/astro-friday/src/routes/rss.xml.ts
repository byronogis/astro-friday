import type { RSSOptions } from '@astrojs/rss'
import type { APIRoute } from 'astro'
import rss from '@astrojs/rss'
import config from 'virtual:astro-friday-config'
import { getPostList } from '../utils/content'

export const GET: APIRoute = async function GET(context) {
  const fKeys = config.post.frontmatterKeys

  const entries = await getPostList({
    langCollapse: false,
  })
  return rss(Object.assign({
    title: config.title,
    description: config.description,
    site: new URL(config.baseFull, context.site),
    items: entries.map(entry => ({
      link: entry.data[fKeys.permalink],
      content: entry.rendered?.html,
      title: entry.data[fKeys.title],
      pubDate: new Date(entry.data[fKeys.created]),
      description: entry.data[fKeys.description],
      author: entry.data[fKeys.author],
    })),
  } satisfies RSSOptions, config.integrations.rss))
}
