<script lang="ts" setup>
import type { TaskRecord } from '~/types'

const eventSource = new EventSource('/api/sse')
const taskList = ref<TaskRecord[]>([])
eventSource.onmessage = (event) => {
  taskList.value = JSON.parse(event.data) as TaskRecord[]
}
</script>

<template>
  <ATrigger trigger="click" :unmount-on-close="false" show-arrow>
    <div class="h-full flex flex-col cursor-pointer justify-center gap-1 px-3 hover:bg-gray-1 dark:hover:bg-gray-8">
      <template v-if="taskList.length !== 0">
        <div class="i-carbon-task-tools mt-2 text-18px text-blue-5" />
        <AProgress :percent="taskList[0].percent" :show-text="false" />
      </template>
      <template v-else>
        <div class="i-carbon-document-tasks text-18px text-gray-5" />
      </template>
    </div>
    <template #content>
      <div class="w-200px rounded bg-white p-3 shadow">
        <AEmpty v-if="taskList.length === 0" description="暂无任务" />
        <div>
          <div v-for="(item, index) in taskList" :key="index">
            <div>{{ item.name }}</div>
            <AProgress :percent="item.percent" show-text />
            <div class="flex justify-between text-gray-5">
              <div>{{ item.status }}</div>
              <div>{{ item.activeCount }}/{{ item.pendingCount }}</div>
            </div>
            <div class="truncate text-blue-5">
              {{ item.successMessage }}
            </div>
            <div v-if="item.status === 'error'" class="truncate text-red-5">
              {{ item.errorMessage }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </ATrigger>
</template>
