'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import moment from 'moment'
import React, { HtmlHTMLAttributes } from 'react'

interface DatePickerProps
  extends Omit<HtmlHTMLAttributes<HTMLDivElement>, 'onChange'> {
  initialDate?: Date
  value?: Date
  placeholder?: string
  onChange?: (date: Date) => void
}

export function DatePicker({
  className,
  initialDate,
  value,
  placeholder = 'Pick a date',
  onChange,
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(initialDate || value)

  const formatDate = (date: Date) => {
    return moment(date).format('MMM DD, YYYY')
  }

  const handleDateSelect = (selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate)
      onChange?.(selectedDate)
    }
  }

  return (
    <div className={cn('', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              'w-full flex-1 justify-start text-left font-normal',
              !date && 'text-muted-foreground',
              className
            )}
          >
            <CalendarIcon />
            {date ? formatDate(date) : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            initialFocus
            mode='single'
            defaultMonth={date}
            selected={date}
            onSelect={handleDateSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
