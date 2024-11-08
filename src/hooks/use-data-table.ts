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
import { useEffect, useState } from 'react'

type useDataTableProps<TData> = {
  data: TData[]
  columns: ColumnDef<TData, any>[]
  features?: TableFeature<TData>[]
  states?: Record<string, any>
  rowCount?: number
}

/**
 * Custom hook for managing a data table using `@tanstack/react-table`.
 *
 * @template TData - The type of data used in the table.
 *
 * @param {TData[]} data - The data to display in the table.
 * @param {ColumnDef<TData, any>[]} columns - The column definitions for the table.
 * @param {TableFeature<TData>[]} [features=[]] - Additional table features to include.
 * @param {Record<string, any>} [states={}] - Initial states for the table.
 * @param {number} [rowCount] - The total number of rows, used for pagination.
 *
 * @returns {object} An object containing the table instance and various states like density, sorting, column filters, column visibility, and row selection.
 */
const useDataTable = <TData>({
  data,
  columns,
  features = [],
  states = {},
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
    const previousPagination = table.getState().pagination
    const newPagination =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(table.getState().pagination)
        : updaterOrValue
    const params = new URLSearchParams(searchParams.toString())
    const isPageSizeChanged =
      newPagination.pageSize !== previousPagination.pageSize
    params.set('page', (newPagination.pageIndex + 1).toString())
    if (isPageSizeChanged) {
      params.set('page', '1')
    }
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
    debugTable: false,
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

  useEffect(() => {
    console.log({ tableOptions: table.options })
  }, [table])

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
