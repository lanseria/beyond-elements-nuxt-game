<script lang="ts" setup>
import type { DictRecord } from '~/types'

const props = defineProps({
  dictId: {
    type: String,
    required: true,
  },
})
const emits = defineEmits(['update:dict-id', 'deleteSelfRefresh'])
const selectDictId = useVModel(props, 'dictId', emits)
const DashboardDictsFormModalRef = shallowRef()

function handleAdd() {
  DashboardDictsFormModalRef.value.open()
}
function handleEdit(record: DictRecord) {
  DashboardDictsFormModalRef.value.open(record)
}
defineExpose({
  handleAdd,
})
const { data, status, refresh } = await useAsyncData(async () => {
  const res = await queryDictsList()
  if (res.code) {
    throw new Error(res.msg)
  }
  return res.data
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

async function handlerDeleteRefresh() {
  await refresh()
  if (data.value?.findIndex(item => item.id === selectDictId.value) === -1) {
    if (data.value.length > 0) {
      selectDictId.value = data.value?.[0]?.id
    }
    else {
      selectDictId.value = ''
    }
  }
}
</script>

<template>
  <div class="p-2">
    <ASpin v-if="loading" loading />
    <div v-for="item in renderData" :key="item.id" class="flex items-center justify-between border-b-1px border-gray-1 p-2 px-4 hover:bg-gray-1">
      <div class="flex flex-col gap-2">
        <div>{{ item.label }}</div>
        <div class="text-gray-5">
          {{ item.value }}
        </div>
      </div>
      <div class="flex gap-2">
        <AButton type="outline" size="small" @click="selectDictId = item.id">
          子字典
        </AButton>
        <AButton type="outline" size="small" @click="handleEdit(item)">
          编辑
        </AButton>
        <PopconfirmDelete row-key="id" :item="item" :delete-function="deleteDictsById" @fetch-data="handlerDeleteRefresh">
          <AButton type="outline" status="danger" size="small">
            删除
          </AButton>
        </PopconfirmDelete>
      </div>
    </div>
    <DashboardDictsFormModal ref="DashboardDictsFormModalRef" @ok="refresh" />
  </div>
</template>
