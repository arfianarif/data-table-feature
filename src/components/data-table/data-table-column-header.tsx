import { formatStringWithSpaces } from '@/lib/string-utils'
import { cn } from '@/lib/utils'
import { Column } from '@tanstack/react-table'
import IconWrapper from '../icon-wrapper'
import { SortAscending, SortDescending } from '@phosphor-icons/react'

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: Readonly<DataTableColumnHeaderProps<TData, TValue>>) {
  const displayTitle = formatStringWithSpaces(title)

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <div
      className={cn(
        'flex items-center space-x-2 cursor-pointer hover:text-blue-500',
        className
      )}
      onClick={column.getToggleSortingHandler()}
    >
      <span className='capitalize'>{displayTitle}</span>
      {column.getCanSort() && (
        <IconWrapper
          size={4}
          icon={column.getIsSorted() === 'asc' ? SortAscending : SortDescending}
        />
      )}
    </div>
  )
}
