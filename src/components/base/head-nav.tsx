import { cn } from '@/lib/utils'
import React from 'react'
import { ModeToggle } from '../mode-toggle'

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
          <div className='inline-flex items-center justify-start'>Example</div>
          <div className='flex flex-row w-fit justify-center items-center'>
            <ModeToggle />
          </div>
        </nav>
      </div>
    </nav>
  )
}

export default HeadNav
