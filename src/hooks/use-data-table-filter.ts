import type { TInputFilterValue } from '@/components/data-table/data-table-filter-input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { useMemo, useState } from 'react'
import useDebounce from './use-debounce'
import {
  availableKeyDate,
  availableKeyDateRanges,
  dateRangeToQueryString,
  dateToQueryString,
  parseQueryStringToDate,
  parseQueryStringToDateRange,
} from '@/lib/date-utils'

export type DataTableFilterItem = {
  key: string
  placeholder?: string
  label?: string
  component?: React.ReactElement | null
}

const useDataTableFilter = (
  filters: DataTableFilterItem[],
  initialValues: { [key: string]: TInputFilterValue } = {},
  delay: number = 300
) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const initialFilterValues = useMemo(() => {
    const entries = filters.map((filter) => {
      const searchValue =
        searchParams.get(filter.key) ?? initialValues[filter.key]

      if (availableKeyDateRanges.includes(filter.key)) {
        return [filter.key, parseQueryStringToDateRange(searchValue as string)]
      }

      if (availableKeyDate.includes(filter.key)) {
        return [filter.key, parseQueryStringToDate(searchValue as string)]
      }

      return [filter.key, searchValue ?? undefined]
    })

    return Object.fromEntries(entries)
  }, [filters, initialValues, searchParams])

  const [filterValues, setFilterValues] = useState<{
    [key: string]: TInputFilterValue
  }>(initialFilterValues)
  const debouncedValues = useDebounce(filterValues, delay)

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(debouncedValues).forEach(([key, value]) => {
      if (filters.some((filter) => filter.key === key)) {
        if (value !== undefined) {
          if (
            typeof value === 'object' &&
            value !== null &&
            'from' in value &&
            'to' in value
          ) {
            if (value.from && value.to) {
              params.set(key, dateRangeToQueryString(value))
            } else {
              console.log(`DateRange for key "${key}" is incomplete.`, value)
            }
          } else if (value instanceof Date) {
            console.log({ key, value, dtqs: dateToQueryString(value) })
            params.set(key, dateToQueryString(value))
          } else {
            params.set(key, value.toString())
          }
        } else {
          params.delete(key)
        }
      }
    })

    params.delete('page')
    params.delete('per_page')
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleInputChange = (key: string, value: TInputFilterValue) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }))
  }

  const handleReset = () => {
    setFilterValues(
      Object.fromEntries(filters.map((filter) => [filter.key, undefined]))
    )

    const params = new URLSearchParams(searchParams.toString())
    filters.forEach((filter) => params.delete(filter.key))
    router.push(`${pathname}?${params.toString()}`)
  }

  const isAllEmpty = Object.values(filterValues).every(
    (value) => value === undefined
  )
  const hasSearchParams = Array.from(searchParams.entries()).length > 0
  const canReset = hasSearchParams || !isAllEmpty

  const isAnyValuePresent = Object.values(filterValues).some(
    (value) => value !== undefined
  )

  const handleKeyDown = (
    key: string,
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === 'Enter') {
      applyFilters()
    }
  }

  return {
    filterValues,
    setFilterValues,
    applyFilters,
    handleInputChange,
    handleReset,
    handleKeyDown,
    isAllEmpty,
    canReset,
    isAnyValuePresent,
  }
}

export default useDataTableFilter
