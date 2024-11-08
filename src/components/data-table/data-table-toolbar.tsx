'use client'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Table } from '@tanstack/react-table'
import { X } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { priorities, statuses } from './data'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { DataTableViewOptions } from './data-table-view-options'
import { useState } from 'react'
import IconWrapper from '../icon-wrapper'
import { FunnelSimple } from '@phosphor-icons/react'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const localFilter = true
  const isFiltered = table.getState().columnFilters.length > 0
  const [isOpen, setIsOpen] = useState(false)
  const showFilter = table.getPreFilteredRowModel().rows.length > 0
  return (
    <>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className='flex-1 py-1 flex flex-col gap-4 p-4'
      >
        <div className='flex flex-wrap flex-row gap-3 items-center justify-between '>
          <div className='self-start inline-flex items-center justify-start gap-2'>
            {showFilter && (
              <>
                <CollapsibleTrigger asChild>
                  <Button variant='outline' size='sm'>
                    <IconWrapper size={14} icon={FunnelSimple} />
                    Filter
                  </Button>
                </CollapsibleTrigger>
                {!localFilter ? (
                  <CollapsibleContent className='inline-flex gap-2'>
                    <Button
                      size={'sm'}
                      variant={'outline'}
                      // onClick={applyFilters}
                      // disabled={!isAnyValuePresent}
                    >
                      Terapkan
                    </Button>
                    <Button
                      size={'sm'}
                      variant={'outline'}
                      // onClick={handleReset}
                      // disabled={!canReset}
                    >
                      Reset
                    </Button>
                  </CollapsibleContent>
                ) : null}
              </>
            )}
          </div>

          <div className='self-start inline-flex gap-3 justify-end'>
            {/* {renderColumnVisibility ? renderColumnVisibility() : null}
            {renderToolbar ? renderToolbar() : null} */}
          </div>
        </div>
        <CollapsibleContent>
          <div className='flex flex-row gap-3'>
            <div className='flex-1'>
              <div className='grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {/* {renderFilter ? (
                  renderFilter()
                ) : (
                  <DataTableFilterInput
                    filters={filters}
                    filterValues={filterValues}
                    handleInputChange={handleInputChange}
                    handleKeyDown={handleKeyDown}
                  />
                )} */}
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <div className='flex items-center justify-between px-4'>
        <div className='flex flex-1 items-center space-x-2'>
          <Input
            placeholder='Filter tasks...'
            value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('title')?.setFilterValue(event.target.value)
            }
            className='h-8 w-[150px] lg:w-[250px]'
          />
          {table.getColumn('status') && (
            <DataTableFacetedFilter
              column={table.getColumn('status')}
              title='Status'
              options={statuses}
            />
          )}
          {table.getColumn('priority') && (
            <DataTableFacetedFilter
              column={table.getColumn('priority')}
              title='Priority'
              options={priorities}
            />
          )}
          {isFiltered && (
            <Button
              variant='ghost'
              onClick={() => table.resetColumnFilters()}
              className='h-8 px-2 lg:px-3'
            >
              Reset
              <X />
            </Button>
          )}
        </div>
        <DataTableViewOptions table={table} />
      </div>
    </>
  )
}
