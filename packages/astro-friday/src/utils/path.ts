import path from 'node:path'
import config from 'virtual:astro-friday-config'

type PathType = 'home' | 'collection' | 'post' | 'tag' | 'series' | 'og'

export function getPath<T extends PathType>(
  type: T,
  params: string[] = [],
  options: {
    /**
     * If true, return the full URL including the host. Otherwise, return the path relative to the host.
     *
     * If a string is provided, it will be used as the host instead of the `window.location.origin`.
     */
    host?: boolean | string
  } = {},
) {
  const {
    host,
  } = options

  const _host = host === true ? config.astro.site : host

  const subpath = ({
    home: '',
    collection: 'collection',
    post: 'post',
    tag: 'tag',
    series: 'series',
    og: 'og',
  } satisfies Record<PathType, string>)[type]

  const _path = path.join('/', config.baseFull, subpath, ...params)
  return _host ? new URL(_path, _host).href : _path
}
