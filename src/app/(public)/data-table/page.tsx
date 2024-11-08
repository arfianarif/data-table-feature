import React from 'react'
import { promises as fs } from 'fs'
import path from 'path'
import { z } from 'zod'
import { taskSchema } from '@/features/data-table/data/schema'
import CommonDataTable from '@/features/data-table/components/common-data-table'
import { columns } from '@/features/data-table/components/task-columns'

async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), 'src/features/data-table/data/tasks.json')
  )
  const tasks = JSON.parse(data.toString())
  return z.array(taskSchema).parse(tasks)
}

const DataTablePage = async () => {
  const tasks = await getTasks()
  return <CommonDataTable data={tasks} columns={columns} />
}

export default DataTablePage
