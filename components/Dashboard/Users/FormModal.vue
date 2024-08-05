<script lang="ts" setup>
import { ENUM_FORM_STATUS_TYPE } from '~/composables/enum'
import type { UserRecord } from '~/types'

const emits = defineEmits(['ok'])

const ModalVisible = ref(false)

const formStatus = ref<ENUM_FORM_STATUS_TYPE>(ENUM_FORM_STATUS_TYPE.空白)
const formData = ref(initUserRecord())

function handleOk() {
  emits('ok')
}
async function onBeforeOk(done: (closed: boolean) => void) {
  let requestFunc
  if (formStatus.value === ENUM_FORM_STATUS_TYPE.新增)
    requestFunc = postUsers
  else if (formStatus.value === ENUM_FORM_STATUS_TYPE.编辑)
    requestFunc = putUsers
  else
    throw new Error('未知的表单状态')
  const { code, msg } = await requestFunc(formData.value)
  if (!code) {
    Message.success('操作成功')
    done(true)
  }
  else {
    Message.warning(msg)
    done(false)
  }
}
function handleCancel() {
  //
}
function open(record?: UserRecord) {
  ModalVisible.value = true
  if (record) {
    formData.value = { ...record }
    formStatus.value = ENUM_FORM_STATUS_TYPE.编辑
  }
  else {
    formData.value = initUserRecord()
    formStatus.value = ENUM_FORM_STATUS_TYPE.新增
  }
}
defineExpose({
  open,
})
</script>

<template>
  <AModal v-model:visible="ModalVisible" ok-text="保存" :on-before-ok="onBeforeOk" @ok="handleOk" @cancel="handleCancel">
    <template #title>
      {{ formStatus }} 用户
    </template>
    <AForm :model="formData" layout="vertical">
      <UserAvatarSampleSelect v-model="formData.avatar" />
      <AFormItem field="name" label="名字">
        <AInput v-model="formData.name" placeholder="请输入名字" />
      </AFormItem>
      <AFormItem field="username" label="用户名">
        <AInput v-model="formData.username" placeholder="请输入用户名" />
      </AFormItem>
    </AForm>
  </AModal>
</template>
