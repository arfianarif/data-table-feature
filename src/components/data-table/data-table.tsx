'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from '@/components/ui/table'
import type useDataTable from '@/hooks/use-data-table'
import React, { useMemo } from 'react'
import DataTableHeader from './data-table-header'
import { flexRender } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { DataTablePagination } from './data-table-paginaton'

type Props<TData> = {
  title: string | JSX.Element
  table: ReturnType<typeof useDataTable<TData>>['table']
  onRowClick?: (row: TData) => void
}

// TODO: how to make reusable if i want to render on client on server data parsed

const DataTable = <TData,>({ title, table, onRowClick }: Props<TData>) => {
  const hasFooter = useMemo(
    () => table.getAllColumns().some((col) => col.columnDef.footer),
    [table]
  )
  return (
    <div className='w-full relative flex flex-col gap-4'>
      <div className='flex flex-col gap-4 rounded-md border overflow-x-auto py-4'>
        <div className='flex flex-wrap flex-row gap-3 items-center justify-between p-4'>
          <h3 className='self-start text-left text-pretty font-semi-bold line-clamp-1'>
            {title}
          </h3>
        </div>
        <Table>
          <DataTableHeader table={table} />
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => onRowClick?.(row.original)}
                  className={cn('group', onRowClick && 'cursor-pointer')}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
          {table.getRowModel().rows.length && hasFooter ? (
            <TableFooter>
              {table.getFooterGroups().map((footerGroup) => (
                <TableRow key={footerGroup.id}>
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
          ) : null}
        </Table>
        {table.getRowModel().rows.length ? (
          <DataTablePagination table={table} />
        ) : null}
      </div>
    </div>
  )
}

export default DataTable
