export function paginate<T>(data: T[], page: number, pageSize: number): T[] {
  const offset = (page - 1) * pageSize
  return data.slice(offset, offset + pageSize)
}
