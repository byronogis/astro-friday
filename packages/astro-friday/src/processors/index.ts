import type { Promisable } from 'type-fest'
import type { ResolvedConfig } from '../config'
import type { CollectionEntry } from '../types/content'

export * from './processorPermalink'
export * from './processorUpdateModifiedTime'

export type Processor<Options> = (options: Options) =>
(entry: CollectionEntry, config: ResolvedConfig) => Promisable<void>
