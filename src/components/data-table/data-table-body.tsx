import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import type useDataTable from '@/hooks/use-data-table'
import { cn } from '@/lib/utils'
import { flexRender } from '@tanstack/react-table'

interface Props<TData> {
  className?: string
  table: ReturnType<typeof useDataTable<TData>>['table']
  onRowClick?: (row: TData) => void
}

const DataTableBody = <TData,>({
  className,
  table,
  onRowClick,
}: Props<TData>) => {
  const density = table.getState().density
  const classes = cn(
    'group',
    onRowClick && 'cursor-pointer',
    density === 'sm' ? 'px-2' : density === 'md' ? 'px-4' : 'px-8',
    className
  )
  return (
    <TableBody>
      {table.getRowModel().rows.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            onClick={() => onRowClick?.(row.original)}
            className={classes}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell
            colSpan={table.getAllColumns().length}
            className='h-24 text-center group'
          >
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  )
}

export default DataTableBody
