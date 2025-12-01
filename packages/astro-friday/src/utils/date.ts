import dayjs from 'dayjs'

export function formatDate(d: string | Date, format: string): string {
  const date = dayjs(d)
  return date.format(format)
}
