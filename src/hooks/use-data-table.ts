import DensityFeature from '@/components/data-table/data-table-density'
import type { DensityState } from '@/types/tanstack-table'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type OnChangeFn,
  type PaginationState,
  type TableFeature,
} from '@tanstack/react-table'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

type useDataTableProps<TData> = {
  data: TData[]
  columns: ColumnDef<TData, any>[]
  manualPagination?: boolean
  features?: TableFeature<TData>[]
  states?: Record<string, any>
  setPagination?: (pagination: PaginationState) => void
  rowCount?: number
}

const useDataTable = <TData>({
  data,
  columns,
  manualPagination = false,
  features = [],
  states = {},
  setPagination,
  rowCount,
}: useDataTableProps<TData>) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [density, setDensity] = useState<DensityState>('md')
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const handlePaginationChange: OnChangeFn<PaginationState> = (
    updaterOrValue
  ) => {
    const newPagination =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(table.getState().pagination)
        : updaterOrValue
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', (newPagination.pageIndex + 1).toString())
    params.set('perPage', newPagination.pageSize.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  const table = useReactTable({
    _features: [DensityFeature, ...features],
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      density,
      ...states,
    },
    rowCount: rowCount,
    debugTable: true,
    manualPagination: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: handlePaginationChange,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onDensityChange: setDensity,
  })

  return {
    table,
    density,
    sorting,
    columnFilters,
    columnVisibility,
    rowSelection,
  }
}

export default useDataTable
