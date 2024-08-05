<script lang="ts" setup>
const formModel = ref(initLoginRecordsQuery())

const paginationProps = reactive(initPaginationProps())
const { labelValueMap: 是否Map } = useDict(DICT_TYPE.是否)
const { data, status, refresh } = await useAsyncData(async () => {
  const res = await queryLoginRecordsPage({
    current: paginationProps.current,
    pageSize: paginationProps.pageSize,
    username: formModel.value.username,
    name: formModel.value.name,
  })
  if (res.code) {
    throw new Error(res.msg)
  }
  paginationProps.total = res.data.total
  return res.data.records
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
function onPageChange(val: any) {
  paginationProps.current = val
  refresh()
}
function onPageSizeChange(val: any) {
  paginationProps.pageSize = val
  refresh()
}
function reset() {
  formModel.value = initLoginRecordsQuery()
  refresh()
}
</script>

<template>
  <div>
    <div class="border-b-1px border-gray-1 px-4 py-2 text-20px">
      登录记录
    </div>
    <div class="flex justify-between border-b-1px border-gray-1 px-4 pt-4">
      <AForm :model="formModel" auto-label-width label-align="left">
        <ARow :gutter="16">
          <ACol :xs="{ span: 24 }" :lg="{ span: 12 }" :xl="{ span: 12 }" :xxl="{ span: 8 }">
            <AFormItem field="name" label="姓名">
              <AInput v-model="formModel.name" placeholder="请输入姓名" />
            </AFormItem>
          </ACol>
          <ACol :xs="{ span: 24 }" :lg="{ span: 12 }" :xl="{ span: 12 }" :xxl="{ span: 8 }">
            <AFormItem field="username" label="用户名">
              <AInput v-model="formModel.username" placeholder="请输入用户名" />
            </AFormItem>
          </ACol>
        </ARow>
      </AForm>

      <ADivider class="h-8" direction="vertical" />
      <div class="flex gap-10px">
        <AButton type="primary" @click="refresh()">
          <template #icon>
            <IconSearch />
          </template>
          查询
        </AButton>
        <AButton @click="reset()">
          <template #icon>
            <IconRefresh />
          </template>
          重置
        </AButton>
      </div>
    </div>
    <div class="flex px-4 py-4">
      <ASpace>
        <AButton type="primary" status="success">
          <template #icon>
            <IconDownload />
          </template>
          导出
        </AButton>
      </ASpace>
    </div>
    <div class="px-4">
      <ATable
        v-if="renderData"
        row-key="id"
        :loading="loading"
        :scroll="{
          x: '100%',
          y: '100%',
        }"
        :pagination="paginationProps"
        :data="renderData"
        bordered
        @page-change="onPageChange"
        @page-size-change="onPageSizeChange"
      >
        <template #columns>
          <ATableColumn title="姓名" data-index="name" :width="150" />
          <ATableColumn title="用户名" data-index="username" :width="150" />
          <ATableColumn title="IP" data-index="ip" :width="150" />
          <ATableColumn title="是否登录成功" data-index="isLogin" :width="150">
            <template #cell="{ record }">
              {{ 是否Map[record.isLogin] }}
            </template>
          </ATableColumn>
          <ATableColumn title="登录时间" data-index="createdAt" :width="200">
            <template #cell="{ record }">
              {{ $dayjs.unix(record.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
            </template>
          </ATableColumn>
          <ATableColumn title="操作" fixed="right" :width="180">
            <template #cell="{ record }">
              <PopconfirmDelete
                row-key="id"
                :item="record"
                :delete-function="deleteLoginRecordsById"
                @fetch-data="refresh"
              >
                <AButton type="text" status="danger">
                  删除
                </AButton>
              </PopconfirmDelete>
            </template>
          </ATableColumn>
        </template>
      </ATable>
    </div>
  </div>
</template>
