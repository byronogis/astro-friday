import type { Promisable } from 'type-fest'
import type { ResolvedConfig } from '../../config'
import type { CollectionEntry } from '../../types/content'

export { processorUpdateModifiedTime } from './processorUpdateModifiedTime'

export type Processor<Parameters extends any[] = any[]> = (...parameters: Parameters) =>
(entry: CollectionEntry, config: ResolvedConfig) => Promisable<void>

/**
 * Can pass processor with parameter using with an array.
 */
export type Processors = (Processor | [Processor, ...any[]])[]
