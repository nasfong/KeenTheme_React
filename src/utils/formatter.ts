export const dateFormat = (date: Date) => {
  // const formatter = new Intl.DateTimeFormat('es') // 13/9/2023
  // const formatter = new Intl.DateTimeFormat(undefined, { dateStyle: 'full' }) // Wednesday, September 6, 2023
  const formatter = new Intl.DateTimeFormat(undefined, { dateStyle: 'short' }) // 3/13/2023
  return formatter.format(date)
}

export const timeFormat = () => {
  // const formatter = new Intl.RelativeTimeFormat(undefined)
  // return formatter.format(60, 'minute') // in 60 minutes
  // return formatter.format(-24, 'hour') // 24 hour ago

  const formatter = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' })
  return formatter.format(1, 'day') // tomorrow
}

export const numberFormat = () => {
  // const formatter = new Intl.NumberFormat(undefined, { currency: 'USD', style: 'currency' })
  // return formatter.format(345678) // $345,678.00

  // const formatter = new Intl.NumberFormat(undefined, { currency: 'EUR', style: 'currency' })
  // return formatter.format(345678) // E345,678.00

  // const formatter = new Intl.NumberFormat(undefined, { notation: 'compact' })
  // return formatter.format(345678) // 345K
  // return formatter.format(3456789) // 3.4M
  // return formatter.format(345678910) // 3.4B

  // const formatter = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 })
  // return formatter.format(4.345678) // 4.34

  const formatter = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
  })
  return formatter.format(4.3) // 4.30
  // return formatter.format(4.345678) // 4.346
}

export const ruleFormat = () => {
  // const formatter = new Intl.PluralRules(undefined)
  //? apple | apples
  // formatter.select(1) // one
  // formatter.select(2) // other
}
