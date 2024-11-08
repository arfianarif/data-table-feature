import { useSearchParams } from 'next/navigation'
import useManualPagination from './use-manual-pagination'

const useDummyDataQuery = () => {
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId') || undefined
  const title = searchParams.get('title') || undefined
  const { pagination } = useManualPagination()

  return {
    userId,
    title,
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    pagination,
  }
}

export default useDummyDataQuery
