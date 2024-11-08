import { paginate } from '@/lib/pagination'
import type { Post } from '../types/post'

export const getPosts = async (
  page: number = 1,
  pageSize: number = 10
): Promise<Post[]> => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data: Post[] = await response.json()

    return paginate(data, page, pageSize)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}
