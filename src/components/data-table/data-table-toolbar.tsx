'use client'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import useDataTableFilter from '@/hooks/use-data-table-filter'
import type { DataTableFilterItem } from '@/types/data-table'
import { FunnelSimple, Notches } from '@phosphor-icons/react'
import { Table } from '@tanstack/react-table'
import { useState } from 'react'
import IconWrapper from '../icon-wrapper'
import { Button } from '../ui/button'
import DataTableFilterInput from './data-table-filter-input'
import { DataTableViewOptions } from './data-table-view-options'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  showDensity?: boolean
  showColumnVisibility?: boolean
  filters: DataTableFilterItem[]
  renderToolbarActions?: () => React.ReactNode
}

const DataTableToolbar = <TData,>({
  table,
  showDensity = false,
  showColumnVisibility = false,
  filters = [],
  renderToolbarActions,
}: DataTableToolbarProps<TData>) => {
  const isManualPagination = table.options?.manualPagination
  const [isOpen, setIsOpen] = useState(false)
  const showFilter = !isManualPagination
    ? table.getPreFilteredRowModel().rows.length > 0
    : !!filters?.length

  const {
    filterValues,
    applyFilters,
    handleInputChange,
    handleReset,
    handleKeyDown,
    canReset,
    isAnyValuePresent,
  } = useDataTableFilter(filters)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className='flex-1 py-1 flex flex-col gap-4 p-4'
    >
      <div className='flex flex-wrap flex-row gap-3 items-center justify-between'>
        <div className='self-start inline-flex items-center justify-start gap-2'>
          {showFilter && (
            <>
              <CollapsibleTrigger asChild>
                <Button variant='outline' size='sm'>
                  <IconWrapper size={14} icon={FunnelSimple} />
                  Filter
                </Button>
              </CollapsibleTrigger>
              {isManualPagination ? (
                <CollapsibleContent className='inline-flex gap-2'>
                  <Button
                    size={'sm'}
                    variant={'outline'}
                    onClick={applyFilters}
                    disabled={!isAnyValuePresent}
                  >
                    Apply Filter
                  </Button>
                  <Button
                    size={'sm'}
                    variant={'outline'}
                    onClick={handleReset}
                    disabled={!canReset}
                  >
                    Reset
                  </Button>
                </CollapsibleContent>
              ) : (
                <Button
                  size={'sm'}
                  variant={'outline'}
                  onClick={() => table.resetColumnFilters()}
                >
                  Reset
                </Button>
              )}
            </>
          )}
        </div>

        <div className='self-start inline-flex gap-3 justify-end'>
          {showDensity ? (
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.toggleDensity()}
            >
              <IconWrapper size={14} icon={Notches} />
              Density
            </Button>
          ) : null}
          {showColumnVisibility ? <DataTableViewOptions table={table} /> : null}
          {renderToolbarActions ? renderToolbarActions() : null}
        </div>
      </div>
      <CollapsibleContent>
        <div className='flex flex-row gap-3'>
          <div className='flex-1'>
            <div className='grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
              <DataTableFilterInput
                table={table}
                filters={filters}
                filterValues={filterValues}
                handleInputChange={handleInputChange}
                handleKeyDown={handleKeyDown}
              />
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default DataTableToolbar
