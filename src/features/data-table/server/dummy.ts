import type { Post, PostResponse } from '../types/post'

export const getPosts = async ({
  userId,
  title,
  pageIndex = 0,
  pageSize = 10,
}: {
  userId?: string
  title?: string
  pageIndex?: number
  pageSize?: number
}): Promise<PostResponse> => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${pageIndex + 1}`
    )
    const data: Post[] = await response.json()

    const filteredData = data.filter((post) => {
      if (userId && title) {
        return (
          userId === post.userId.toString() &&
          post.title.toLowerCase().includes(title.toLowerCase())
        )
      }

      if (userId) {
        return userId === post.userId.toString()
      }

      if (title) {
        return post.title.toLowerCase().includes(title.toLowerCase())
      }

      return true
    })
    const rowCount = userId || title ? filteredData.length : 100
    const totalCount = Math.ceil(rowCount / pageSize)
    const results = {
      data: filteredData,
      totalCount,
      rowCount,
    }

    return results
  } catch (error) {
    console.error('Error fetching posts:', error)
    return {
      data: [],
      totalCount: 0,
      rowCount: 0,
    }
  }
}
