/**
 * Detects if a given keyword is present in a path.
 *
 * @param {string} path The path to check.
 * @param {string} keyword The keyword to search for.
 * @returns {boolean} True if the keyword is present, false otherwise.
 */
export const hasKeyword = (path: string, keyword: string): boolean => {
  const keywordRegex = new RegExp(`${keyword}`, 'i')
  return keywordRegex.test(path)
}

/**
 * Formats a given string by replacing hyphens and underscores with spaces,
 * converting camelCase to separate words, and capitalizing the first letter
 * of each word.
 *
 * @param {string} input The input string to format.
 * @returns {string} The formatted string with spaces and capitalized words.
 */
export const formatStringWithSpaces = (input: string): string => {
  // Replace hyphens and underscores with spaces.
  const output = input.replace(/[-_]/g, ' ')
  // Replace camelCase with spaces.
  const outputWithSpaces = output.replace(/([a-z])([A-Z])/g, '$1 $2')
  // Uppercase the first letter of each word.
  const formattedString = outputWithSpaces.replace(/\b\w/g, (char) =>
    char.toUpperCase(),
  )

  return formattedString
}

/**
 * Checks if a string starts with specific prefixes.
 * @param str - The string to check.
 * @returns true if the string starts with "VCH", "REG", or "PER"; otherwise false.
 */
export const detectPrefix = (str: string): boolean => {
  const prefixes = ['VCH', 'REG', 'PER']
  return prefixes.some((prefix) => str.startsWith(prefix))
}
