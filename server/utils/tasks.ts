// 1. 一次只能执行一个任务
// 2. 每次更新任务，仅传入任务名称，任务正在执行的数量，待执行的任务数量，总任务数量
// 3. 每次更新任务，更新任务状态
// 4. 包含初始化，进行中

import type { TaskRecord } from '~/types'

let currentTotal = 0
let currentStatus: TaskRecord['status'] = 'success'
let errorMessage = ''

export async function initTasks(total = 0) {
  currentTotal = total
  currentStatus = 'success'
  errorMessage = ''
  await useStorage('files').setItem('tasks', [] satisfies TaskRecord[])
}

export function setTaskStatus(status: TaskRecord['status'], msg: string) {
  currentStatus = status
  errorMessage = msg
}

export async function updateTasks(
  name: string,
  activeCount: number,
  pendingCount: number,
  msg: string,
) {
  const percent = +((currentTotal - pendingCount) / currentTotal).toFixed(5)
  await useStorage('files').setItem('tasks', [
    {
      name,
      percent,
      activeCount,
      pendingCount,
      status: currentStatus,
      successMessage: msg,
      errorMessage,
    },
  ] satisfies TaskRecord[])
}
