import { cn } from '@/lib/utils'
import React from 'react'

interface PageContainerProps {
  children: React.ReactNode
  className?: string
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className,
}) => {
  const classes = cn(
    'relative flex-1 flex flex-col gap-4 min-h-screen max-w-screen-lg mx-auto',
    className
  )
  return <div className={classes}>{children}</div>
}

export default PageContainer
