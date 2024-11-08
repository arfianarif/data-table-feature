export type Post = {
  userId: number
  id: number
  title: string
  body: string
}

export type PostResponse = {
  data: Post[]
  rowCount: number
  totalCount: number
}

export type PostSearchParams = {
  userId?: string
  title?: string
  page?: string
  pageSize?: string
}
