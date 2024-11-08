'use client'
import { Table } from '@/components/ui/table'
import type useDataTable from '@/hooks/use-data-table'
import DataTableBody from './data-table-body'
import DataTableFooter from './data-table-footer'
import DataTableHeader from './data-table-header'
import { DataTablePagination } from './data-table-paginaton'
import { DataTableToolbar } from './data-table-toolbar'

type Props<TData> = {
  title: string | JSX.Element
  table: ReturnType<typeof useDataTable<TData>>['table']
  onRowClick?: (row: TData) => void
}

const DataTable = <TData,>({ title, table, onRowClick }: Props<TData>) => {
  return (
    <div className='w-full relative flex flex-col gap-4'>
      <div className='flex flex-col gap-4 rounded-md border overflow-x-auto py-4'>
        <div className='flex flex-wrap flex-row gap-3 items-center justify-between px-4'>
          <h3 className='self-start text-left text-pretty font-semi-bold line-clamp-1'>
            {title}
          </h3>
        </div>
        <button
          onClick={() => table.toggleDensity()}
          className='border rounded p-1 bg-blue-500 text-white mb-2 w-64'
        >
          Toggle Density
        </button>
        <DataTableToolbar table={table} />
        <Table>
          <DataTableHeader table={table} />
          <DataTableBody table={table} onRowClick={onRowClick} />
          <DataTableFooter table={table} />
        </Table>
        <DataTablePagination table={table} />
      </div>
    </div>
  )
}

export default DataTable
