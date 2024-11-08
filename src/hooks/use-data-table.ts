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
import { useEffect, useState } from 'react'

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

  useEffect(() => {
    console.log({ table, tableState: table.getState(), density })
  }, [table, density])

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
