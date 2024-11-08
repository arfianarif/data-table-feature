import TableWithServerActions from '@/features/data-table/components/table-with-server-actions'
import { getPosts } from '@/features/data-table/server/dummy'
import type { PostSearchParams } from '@/features/data-table/types/post'

type Props = {
  searchParams: PostSearchParams
}

const DataTableServerPage = async ({ searchParams }: Props) => {
  const { userId, title, page, pageSize } = searchParams
  const numberPage = typeof page === 'string' ? parseInt(page, 10) : page || 1
  const numberPageSize =
    typeof pageSize === 'string' ? parseInt(pageSize, 10) : pageSize || 10
  const results = await getPosts({
    userId,
    title,
    pageIndex: numberPage - 1,
    pageSize: numberPageSize,
  })
  return <TableWithServerActions {...results} />
}

export default DataTableServerPage
