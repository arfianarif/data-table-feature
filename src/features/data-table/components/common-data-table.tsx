'use client'

import DataTable from '@/components/data-table/data-table'
import useDataTable from '@/hooks/use-data-table'
import useManualPagination from '@/hooks/use-manual-pagination'
import { paginate } from '@/lib/pagination'
import type { ColumnDef } from '@tanstack/react-table'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import type { Task } from '../data/schema'

interface Props<TValue> {
  columns: ColumnDef<Task, TValue>[]
  data: Task[]
}

const CommonDataTable = <TValue,>({ columns, data }: Props<TValue>) => {
  const searchParams = useSearchParams()
  const title = searchParams.get('title') || ''
  const status = searchParams.get('status') || ''
  const label = searchParams.get('label') || ''
  const priority = searchParams.get('priority') || ''
  const { pagination } = useManualPagination()

  const filteredData = data.filter((task) => {
    return (
      (!title ||
        task.title.toLowerCase().includes(title.trim().toLowerCase())) &&
      (!status ||
        task.status.toLowerCase().includes(status.trim().toLowerCase())) &&
      (!label ||
        task.label.toLowerCase().includes(label.trim().toLowerCase())) &&
      (!priority ||
        task.priority.toLowerCase().includes(priority.trim().toLowerCase()))
    )
  })

  const paginatedData = paginate(
    filteredData,
    pagination.pageIndex + 1,
    pagination.pageSize || 10
  )

  const { table } = useDataTable({
    data: paginatedData,
    columns,
    states: {
      pagination,
    },
    rowCount: filteredData.length,
  })

  return (
    <DataTable
      table={table}
      title='Task Lists'
      showDensity
      showColumnVisibility
      showFilterPageSize
      filters={[
        { key: 'title', placeholder: 'Filter title' },
        { key: 'status', placeholder: 'Filter status' },
        { key: 'label', placeholder: 'Filter label' },
        { key: 'priority', placeholder: 'Filter priority' },
      ]}
    />
  )
}

export default CommonDataTable
