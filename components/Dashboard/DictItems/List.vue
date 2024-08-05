<script lang="ts" setup>
import type { DictRecord } from '~/types'

const props = defineProps({
  dictId: {
    type: String,
    required: true,
  },
})
const DashboardDictItemsFormModalRef = shallowRef()

function handleAdd() {
  DashboardDictItemsFormModalRef.value.open({ dictId: props.dictId })
}
function handleEdit(record: DictRecord) {
  DashboardDictItemsFormModalRef.value.open(record)
}
const { data, status, refresh } = await useAsyncData(async () => {
  const res = await queryDictItemsList({
    dictId: props.dictId,
  })
  if (res.code) {
    throw new Error(res.msg)
  }
  return res.data
}, {
  watch: [() => props.dictId],
})
const loading = computed(() => {
  if (status.value === 'pending') {
    return true
  }
  else {
    return false
  }
})
const renderData = computed(() => {
  return data.value
})
</script>

<template>
  <div>
    <AButton type="primary" @click="handleAdd()">
      <template #icon>
        <IconPlus />
      </template>
      添加子字典
    </AButton>
    <ASpin v-if="loading" loading />
    <div class="h-2 w-full" />
    <div v-for="item in renderData" :key="item.id" class="flex items-center justify-between border-b-1px border-gray-1 p-2 px-4 hover:bg-gray-1">
      <div class="flex flex-col gap-2">
        <div>{{ item.label }}</div>
        <div class="text-gray-5">
          {{ item.value }}
        </div>
      </div>
      <div class="flex gap-2">
        <AButton type="outline" size="small" @click="handleEdit(item)">
          编辑
        </AButton>
        <PopconfirmDelete row-key="id" :item="item" :delete-function="deleteDictItemsById" @fetch-data="refresh">
          <AButton type="outline" status="danger" size="small">
            删除
          </AButton>
        </PopconfirmDelete>
      </div>
    </div>
    <DashboardDictItemsFormModal ref="DashboardDictItemsFormModalRef" @ok="refresh" />
  </div>
</template>
