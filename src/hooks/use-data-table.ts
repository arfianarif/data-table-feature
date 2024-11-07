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
  type TableFeature,
} from '@tanstack/react-table'
import { useState } from 'react'

type useDataTableProps<TData> = {
  data: TData[]
  columns: ColumnDef<TData, any>[]
  features?: TableFeature<TData>[]
  states?: Record<string, any>
}

const useDataTable = <TData>({
  data,
  columns,
  features = [],
  states = {},
}: useDataTableProps<TData>) => {
  const [density, setDensity] = useState<DensityState>('md')
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  // Gabungkan state internal dengan states yang diterima sebagai props
  const table = useReactTable({
    data,
    columns,
    _features: [DensityFeature, ...features],
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      ...states, // Gabungkan dengan states yang diterima
    },
    debugTable: false,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
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
  }
}

export default useDataTable
