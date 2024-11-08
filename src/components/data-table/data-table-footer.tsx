import {
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from '@/components/ui/table'
import type useDataTable from '@/hooks/use-data-table'
import { cn } from '@/lib/utils'
import { flexRender, type Table } from '@tanstack/react-table'
import { useMemo } from 'react'

interface Props<TData> {
  className?: string
  table: ReturnType<typeof useDataTable<TData>>['table']
}

const DataTableFooter = <TData,>({ className, table }: Props<TData>) => {
  const hasFooter = useMemo(
    () => table.getAllColumns().some((col) => col.columnDef.footer),
    [table]
  )
  const density = table.getState().density
  const rootClasses = cn(className)
  const rowClasses = cn(
    density === 'sm' ? 'px-2' : density === 'md' ? 'px-4' : 'px-8'
  )
  if (!table.getRowModel().rows.length || !hasFooter) {
    return null
  }
  return (
    <TableFooter className={rootClasses}>
      {table.getFooterGroups().map((footerGroup) => (
        <TableRow key={footerGroup.id} className={rowClasses}>
          {footerGroup.headers.map((header) => (
            <TableCell key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.footer,
                    header.getContext()
                  )}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableFooter>
  )
}

export default DataTableFooter
