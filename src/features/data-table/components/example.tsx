'use client'

import DataTable from '@/components/data-table/data-table'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import useDataTable from '@/hooks/use-data-table'
import useExampleDataFilter from '@/hooks/use-example-data-filter'
import { useQuery } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import { useEffect, useMemo } from 'react'
import { getPosts } from '../server/dummy'
import type { Post } from '../types/post'

const ExampleDataTable = () => {
  const { userId, title, page, pageSize, pagination, setPagination } =
    useExampleDataFilter()

  const {
    data: postData,
    error,
    isLoading,
  } = useQuery<{
    data: Post[]
    totalCount: number
    rowCount: number
  }>({
    queryKey: ['posts', { userId, title, ...pagination }],
    queryFn: () => getPosts({ userId, title, ...pagination }),
  })

  const columns = useMemo<ColumnDef<Post>[]>(
    () => [
      {
        accessorKey: 'id',
        meta: { displayColumnName: 'id' },
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='ID' />
        ),
        cell: ({ row }) => (
          <span className='w-fit max-w-[40px] truncate font-medium'>
            {(row.index + 1).toString()}
          </span>
        ),
      },
      {
        accessorKey: 'userId',
        meta: { displayColumnName: 'User ID' },
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='User ID' />
        ),
        cell: ({ row }) => (
          <span className='min-w-[100px] max-w-[200px] line-clamp-1'>
            {row.getValue('userId')}
          </span>
        ),
      },
      {
        accessorKey: 'title',
        meta: { displayColumnName: 'Title' },
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Title' />
        ),
        cell: ({ row }) => (
          <span className='min-w-[100px] max-w-[200px] line-clamp-1'>
            {row.getValue('title')}
          </span>
        ),
      },
      {
        accessorKey: 'body',
        meta: { displayColumnName: 'Body' },
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Body' />
        ),
        cell: (info) => (info.getValue() as string) || '-',
      },
    ],
    []
  )

  const { table } = useDataTable({
    data: postData?.data || [],
    columns,
    states: {
      pageIndex: page - 1,
      pageSize: pageSize,
    },
    setPagination,
    rowCount: postData?.rowCount,
  })

  if (isLoading) return <p>Loading...</p>
  if (error instanceof Error) return <p>Error: {error.message}</p>

  return (
    <DataTable
      title='Post Lists'
      table={table}
      filters={[
        { key: 'userId', placeholder: 'Filter userId' },
        { key: 'title', placeholder: 'Filter title' },
      ]}
      showDensity
      showColumnVisibility
      showFilterPageSize
    />
  )
}

export default ExampleDataTable
