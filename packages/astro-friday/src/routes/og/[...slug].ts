import type { APIRoute } from 'astro'
import type { CollectionEntry } from '../../types/content'
import config from 'virtual:astro-friday-config'
import imports from 'virtual:astro-friday-imports'
import { getPostList } from '../../utils/content/post'

interface Props {
  entry: CollectionEntry
}

export async function getStaticPaths() {
  const entryList = await getPostList()

  return entryList.map(entry => ({
    params: {
      collection: entry.collection,
      slug: entry.id,
    },
    props: {
      entry,
    },
  }))
}

export const GET: APIRoute<Props> = async function GET({ props }) {
  const { entry } = props

  return new imports['@vercel/og'].ImageResponse(...config.post.og(entry))
}
