import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
  icon: React.ElementType<IconProps>
  className?: string
  size?: number
}

const IconWrapper: React.FC<Props> = ({ icon: Icon, className, size }) => {
  const classes = cn(
    `inline-flex justify-center items-center `,
    className,
    size
      ? `size-${size} [&_svg]:w-${size} [&_svg]:h-${size}`
      : `size-6 [&_svg]:w-6 [&_svg]:h-6`
  )
  return (
    <div className={classes}>
      <Icon />
    </div>
  )
}

export default IconWrapper
