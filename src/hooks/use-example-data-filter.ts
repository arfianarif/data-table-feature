import type { PaginationState } from '@tanstack/react-table'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const useExampleDataFilter = () => {
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId') || undefined
  const title = searchParams.get('title') || undefined
  const page = searchParams.get('page') || undefined
  const pageSize = searchParams.get('perPage') || undefined

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: page ? Number(page) - 1 : 0,
      pageSize: pageSize ? Number(pageSize) : 10,
    }))
  }, [page, pageSize])

  return {
    userId,
    title,
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    pagination,
    setPagination,
  }
}

export default useExampleDataFilter
