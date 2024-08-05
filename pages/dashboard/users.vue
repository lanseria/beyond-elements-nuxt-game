<script lang="ts" setup>
import { DICT_TYPE } from '~/composables/enum'

const DashboardUsersFormModalRef = shallowRef()
const formModel = ref(initUsersQuery())

const paginationProps = reactive(initPaginationProps())
const { labelValueMap: 性别Map } = useDict(DICT_TYPE.性别)
const { labelValueMap: 角色Map } = useDict(DICT_TYPE.角色)
const { data, status, refresh } = await useAsyncData(async () => {
  const res = await queryUsersPage({
    current: paginationProps.current,
    pageSize: paginationProps.pageSize,
    name: formModel.value.name,
    username: formModel.value.username,
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
  formModel.value = initUsersQuery()
  refresh()
}
function handleAdd() {
  DashboardUsersFormModalRef.value.open()
}
function handleEdit(record: any) {
  DashboardUsersFormModalRef.value.open(record)
  //
}
</script>

<template>
  <div>
    <div class="border-b-1px border-gray-1 px-4 py-2 text-20px">
      用户管理
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
        <AButton type="primary" @click="handleAdd()">
          <template #icon>
            <IconPlus />
          </template>
          添加
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
          <ATableColumn title="性别" data-index="gender" :width="150">
            <template #cell="{ record }">
              {{ 性别Map[record.gender] }}
            </template>
          </ATableColumn>
          <ATableColumn title="角色" data-index="role" :width="150">
            <template #cell="{ record }">
              {{ 角色Map[record.role] }}
            </template>
          </ATableColumn>
          <ATableColumn title="更新时间" data-index="updatedAt" :width="200">
            <template #cell="{ record }">
              {{ $dayjs.unix(record.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}
            </template>
          </ATableColumn>
          <ATableColumn title="创建时间" data-index="createdAt" :width="200">
            <template #cell="{ record }">
              {{ $dayjs.unix(record.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
            </template>
          </ATableColumn>
          <ATableColumn title="操作" fixed="right" :width="180">
            <template #cell="{ record }">
              <AButton type="text" @click="handleEdit(record)">
                修改
              </AButton>

              <PopconfirmDelete
                row-key="id"
                :item="record"
                :delete-function="deleteUsersById"
                @fetch-data="refresh"
              >
                <AButton type="text" status="danger" :disabled="record.id === storeUserInfo.id">
                  删除
                </AButton>
              </PopconfirmDelete>
            </template>
          </ATableColumn>
        </template>
      </ATable>
    </div>
    <DashboardUsersFormModal ref="DashboardUsersFormModalRef" @ok="refresh" />
  </div>
</template>
