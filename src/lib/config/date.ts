export const dateConfig = (type: string): { locales: string; options: Intl.DateTimeFormatOptions } => {
  const locales = 'ja-JP'
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }
  if (type === 'layout') options.year = 'numeric'
  return { locales, options }
}
