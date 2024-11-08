'use client'

import DataTable from '@/components/data-table/data-table'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import useDataTable from '@/hooks/use-data-table'
import useManualPagination from '@/hooks/use-manual-pagination'
import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import type { Post, PostResponse } from '../types/post'

const TableWithServerActions = ({ data, rowCount }: PostResponse) => {
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

  const { pagination } = useManualPagination()

  const { table } = useDataTable({
    data: data || [],
    columns,
    states: {
      pagination,
    },
    rowCount: rowCount,
  })

  return (
    <DataTable
      table={table}
      title='Post Lists'
      showDensity
      showColumnVisibility
      showFilterPageSize
      filters={[
        { key: 'userId', placeholder: 'Filter userId' },
        { key: 'title', placeholder: 'Filter title' },
      ]}
    />
  )
}

export default TableWithServerActions
