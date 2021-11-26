export const indexConfig: { locales: string; options: Intl.DateTimeFormatOptions } = {
  locales: 'ja-JP',
  options: {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }
}

export const layoutConfig: { locales: string; options: Intl.DateTimeFormatOptions } = {
  locales: 'ja-JP',
  options: {
    year: 'numeric',
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }
}

export const dateConfig = (type: string): { locales: string; options: Intl.DateTimeFormatOptions } => {
  const locales = 'ja-JP';
  const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    }
  if (type === 'layout') options.year = 'numeric'
  return { locales, options }
}
