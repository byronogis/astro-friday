export { dynamic } from './dynamic'

export type Appearance = (event: MouseEvent, options: {
  isDark: boolean
  toggle?: () => (Promise<void> | void)
}) => void
