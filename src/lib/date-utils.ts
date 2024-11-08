import moment from 'moment'
import type { DateRange } from 'react-day-picker'

export const availableKeyDateRanges = ['date']
export const availableKeyDate = [
  'date_paid',
  'date_expired',
  'created_at',
  'deleted_at',
]

export const dateToQueryString = (date: Date): string => {
  if (!date || isNaN(date.getTime())) {
    console.warn('Invalid date provided:', date)
    return ''
  }
  return moment(date).format('YYYY-MM-DD')
}

export const dateRangeToQueryString = (dateRange: DateRange): string => {
  const from = dateRange.from ? dateRange.from.toISOString().split('T')[0] : ''
  const to = dateRange.to ? dateRange.to.toISOString().split('T')[0] : ''
  return `${from},${to}`
}

export const parseQueryStringToDate = (
  dateParam?: string
): Date | undefined => {
  if (!dateParam) return undefined

  const trimmedDateString = dateParam.trim()
  const parsedDate = new Date(trimmedDateString)

  if (!isNaN(parsedDate.getTime())) {
    return parsedDate
  } else {
    console.warn('Invalid date in query string:', dateParam)
    return undefined
  }
}

export const parseQueryStringToDateRange = (
  dateParam?: string
): DateRange | undefined => {
  if (!dateParam) return undefined

  const [fromString, toString] = dateParam.split(',')
  const fromDate = new Date(fromString.trim())
  const toDate = new Date(toString.trim())

  if (!isNaN(fromDate.getTime()) && !isNaN(toDate.getTime())) {
    return { from: fromDate, to: toDate }
  } else {
    console.warn('Invalid date range in query string:', dateParam)
    return undefined
  }
}

export const parseQueryStringToDateForMySQL = (
  dateParam?: string
): { date: string; nextDay: string } | null => {
  if (!dateParam) return null

  const date = moment(dateParam.trim())

  if (date.isValid()) {
    const nextDay = date.clone().add(1, 'day')
    return {
      date: date.format('YYYY-MM-DD'),
      nextDay: nextDay.format('YYYY-MM-DD'),
    }
  } else {
    console.warn('Invalid date in query string:', dateParam)
    return null
  }
}

export const parseQueryStringToDateRangeForMySQL = (
  dateParam?: string
): { from: string; to: string } | null => {
  if (!dateParam) return null

  const [fromString, toString] = dateParam.split(',')
  const fromDate = moment(fromString.trim())
  const toDate = moment(toString.trim())

  if (fromDate.isValid() && toDate.isValid()) {
    return {
      from: fromDate.format('YYYY-MM-DD'),
      to: toDate.format('YYYY-MM-DD'),
    }
  } else {
    console.warn('Invalid date range in query string:', dateParam)
    return null
  }
}

export const getDateRangeForMySQL = (): {
  from: string
  to: string
} => {
  const now = moment()

  const from = now
    .clone()
    .subtract(2, 'days')
    .startOf('day')
    .format('YYYY-MM-DD')
  const to = now.clone().endOf('day').format('YYYY-MM-DD')

  return {
    from,
    to,
  }
}
