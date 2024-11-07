interface FormatCurrencyOptions {
  amount: number | string
  currency?: string // The currency code (e.g., 'USD', 'EUR', 'IDR')
  locale?: string // The locale string to format the currency (default is 'id-ID')
  includeCurrency?: boolean // Whether to include the currency symbol in the formatted string (default is true)
}

/**
 * Formats a number as currency.
 * @param options - The options object containing parameters for formatting.
 * @returns A formatted currency string.
 */
export function formatCurrency({
  amount,
  currency = 'IDR',
  locale = 'id-ID',
  includeCurrency = true,
}: FormatCurrencyOptions): string {
  const options: Intl.NumberFormatOptions = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }

  if (includeCurrency) {
    options.style = 'currency'
    options.currency = currency
  }

  if (typeof amount === 'string') {
    amount = parseInt(amount, 10)
  }

  return new Intl.NumberFormat(locale, options).format(amount)
}
