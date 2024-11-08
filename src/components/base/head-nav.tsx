import { cn } from '@/lib/utils'
import React from 'react'
import { ModeToggle } from '../mode-toggle'
import Link from 'next/link'

type Props = {
  className?: string
}

const HeadNav = ({ className }: Props) => {
  const rootClasses = cn(
    'sticky top-0 z-50 border-b w-full h-16 flex bg-transparent backdrop-blur',
    className
  )
  return (
    <nav className={rootClasses}>
      <div className='w-full h-full border-b block border-white/10'>
        <nav className='flex flex-1 w-full items-center justify-between h-full px-4'>
          <div className='inline-flex items-center justify-start gap-4'>
            <Link href={'/dashboard'} className='text-sm hover:text-blue-500'>
              Dashboard
            </Link>
            <Link href={'/data-table'} className='text-sm hover:text-blue-500'>
              Table
            </Link>
            <Link
              href={'/data-table/server'}
              className='text-sm hover:text-blue-500'
            >
              Table Server Actions
            </Link>
            <Link
              href={'/data-table/use-query'}
              className='text-sm hover:text-blue-500'
            >
              Table Use Query
            </Link>
          </div>
          <div className='flex flex-row w-fit justify-center items-center'>
            <ModeToggle />
          </div>
        </nav>
      </div>
    </nav>
  )
}

export default HeadNav
