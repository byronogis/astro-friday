import type { Promisable } from 'type-fest'
import type { ResolvedConfig } from '../config'
import type { CollectionEntry } from '../types/content'

export * from './processorPermalink'
export * from './processorUpdateModifiedTime'

export type Processor<Options extends ProcessorOptionsBasic> = (options: Options) =>
(entry: CollectionEntry, config: ResolvedConfig) => Promisable<void>

export interface ProcessorOptionsBasic {
  /**
   * Whether to enable the processor.
   *
   * @default true
   */
  enabled?: boolean
  /**
   * The order of the processor execution. Lower numbers run first.
   *
   * @default Infinity
   */
  order?: number
}
