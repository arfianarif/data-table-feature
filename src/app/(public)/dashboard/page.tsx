import ExampleDataTable from '@/features/data-table/components/example'
import { getPosts } from '@/features/data-table/server/dummy'
import React from 'react'

const DashboardPage = async () => {
  const posts = await getPosts()

  return (
    <>
      <ExampleDataTable data={posts} />
    </>
  )
}

export default DashboardPage
