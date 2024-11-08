'use client'
import { Table } from '@/components/ui/table'
import type useDataTable from '@/hooks/use-data-table'
import type { DataTableFilterItem } from '@/types/data-table'
import DataTableBody from './data-table-body'
import DataTableFooter from './data-table-footer'
import DataTableHeader from './data-table-header'
import { DataTablePagination } from './data-table-paginaton'
import DataTableToolbar from './data-table-toolbar'

type Props<TData> = {
  title: string | JSX.Element
  table: ReturnType<typeof useDataTable<TData>>['table']
  showDensity?: boolean
  showColumnVisibility?: boolean
  showFilterPageSize?: boolean
  filters?: DataTableFilterItem[]
  onRowClick?: (row: TData) => void
}

const DataTable = <TData,>({
  title,
  table,
  showDensity,
  showColumnVisibility,
  showFilterPageSize,
  filters,
  onRowClick,
}: Props<TData>) => {
  return (
    <div className='w-full relative flex flex-col gap-4'>
      <div className='flex flex-col gap-4 rounded-md border overflow-x-auto py-4'>
        <div className='flex flex-wrap flex-row gap-3 items-center justify-between px-4'>
          <div className='self-start text-left'>
            {typeof title === 'string' ? (
              <h3 className='text-left text-pretty font-semi-bold line-clamp-1'>
                {title}
              </h3>
            ) : (
              title
            )}
          </div>
        </div>
        <DataTableToolbar
          table={table}
          filters={filters ?? []}
          showDensity={showDensity}
          showColumnVisibility={showColumnVisibility}
        />
        <Table>
          <DataTableHeader table={table} />
          <DataTableBody table={table} onRowClick={onRowClick} />
          <DataTableFooter table={table} />
        </Table>
        <DataTablePagination
          table={table}
          showFilterPageSize={showFilterPageSize}
        />
      </div>
    </div>
  )
}

export default DataTable
