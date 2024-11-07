'use client'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import useDataTable from '@/hooks/use-data-table'
import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import type { Post } from '../types/post'
import DataTable from '@/components/data-table/data-table'

interface Props {
  data: Post[]
}

const ExampleDataTable = ({ data }: Props) => {
  const columns = useMemo<ColumnDef<Post>[]>(
    () => [
      {
        accessorKey: 'id',
        meta: {
          displayColumnName: 'id',
        },
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='id' />
        ),
        cell: ({ row }) => (
          <span className='w-fit max-w-[40px] truncate font-medium'>
            {(row.index + 1).toString()}
          </span>
        ),
      },
      {
        accessorKey: 'userId',
        meta: {
          displayColumnName: 'userId',
        },
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='userId' />
        ),
        cell: ({ row }) => (
          <span className='min-w-[100px] max-w-[200px] line-clamp-1'>
            {row.getValue('userId')}
          </span>
        ),
      },
      {
        accessorKey: 'title',
        meta: {
          displayColumnName: 'title',
        },
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='title' />
        ),
        cell: ({ row }) => (
          <span className='min-w-[100px] max-w-[200px] line-clamp-1'>
            {row.getValue('title')}
          </span>
        ),
      },
      {
        accessorKey: 'body',
        meta: {
          displayColumnName: 'body',
        },
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='body' />
        ),
        cell: (info) => (info.getValue() as string) || '-',
      },
    ],
    []
  )

  const { table } = useDataTable({ data, columns })
  return <DataTable title='Post Lists' table={table} />
}

export default ExampleDataTable
