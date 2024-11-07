import { TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { flexRender, type Table } from '@tanstack/react-table'

interface Props {
  table: Table<any>
  headerStyles?: Record<string, string>
}

const DataTableHeader: React.FC<Props> = ({ table, headerStyles = {} }) => {
  return (
    <TableHeader className='bg-muted'>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header, i) => {
            const thClasses = cn(
              'box-border',
              i === 0 ? 'w-[50px]' : '',
              headerStyles[header.id] || ''
            )
            return (
              <TableHead
                key={header.id}
                colSpan={header.colSpan}
                className={thClasses}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            )
          })}
        </TableRow>
      ))}
    </TableHeader>
  )
}

export default DataTableHeader
