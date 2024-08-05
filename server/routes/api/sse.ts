import type { TaskRecord } from '~/types'

export default defineEventHandler(async (event) => {
  const eventStream = createEventStream(event)

  const interval = setInterval(async () => {
    const hasTask = await useStorage('files').hasItem('tasks')
    if (!hasTask) {
      await useStorage('files').setItem('tasks', [])
    }
    const taskList = await useStorage('files').getItem('tasks') as TaskRecord[]
    await eventStream.push(JSON.stringify(taskList))
  }, 1000)

  eventStream.onClosed(async () => {
    clearInterval(interval)
    await eventStream.close()
  })

  return eventStream.send()
})
