import type { Table } from '@tanstack/react-table'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

// interface Props<TData> {
//   table?: Table<TData>
// }

// const useDataTablePagination = <TData>({ table }: Props<TData>) => {
const useDataTablePagination = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const handlePageChange = (newPage: string) => {
    const newValue =
      typeof newPage === 'string' ? parseInt(newPage, 10) : newPage
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newValue.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  const handlePageSizeChange = (newPageSize: string) => {
    const newValue =
      typeof newPageSize === 'string' ? parseInt(newPageSize, 10) : newPageSize
    const params = new URLSearchParams(searchParams.toString())
    params.set('perPage', newValue.toString())
    params.set('page', '1')
    router.push(`${pathname}?${params.toString()}`)
  }

  return { handlePageChange, handlePageSizeChange }
}

export default useDataTablePagination
