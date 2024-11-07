'use client'

import { formatCurrency } from '@/lib/currency'
import { cn } from '@/lib/utils'

type Props = {
  amount: number | string
  currency?: string
  locale?: string
  includeCurrency?: boolean
  className?: string
}

const CurrencyDisplay = ({
  amount,
  currency,
  locale,
  includeCurrency,
  className,
}: Props) => {
  const classes = cn('text-sm', className)
  const value = formatCurrency({
    amount,
    currency,
    locale,
    includeCurrency,
  })

  return <span className={classes}>{value}</span>
}

export default CurrencyDisplay
