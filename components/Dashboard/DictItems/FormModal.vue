<script lang="ts" setup>
import { ENUM_FORM_STATUS_TYPE } from '~/composables/enum'
import type { DictItemsRecord } from '~/types'

const emits = defineEmits(['ok'])

const ModalVisible = ref(false)

const formStatus = ref<ENUM_FORM_STATUS_TYPE>(ENUM_FORM_STATUS_TYPE.空白)
const formData = ref(initDictItemsRecord())
function handleOk() {
  emits('ok')
}
async function onBeforeOk(done: (closed: boolean) => void) {
  let requestFunc
  if (formStatus.value === ENUM_FORM_STATUS_TYPE.新增)
    requestFunc = postDictItems
  else if (formStatus.value === ENUM_FORM_STATUS_TYPE.编辑)
    requestFunc = putDictItems
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
function open(record: DictItemsRecord) {
  ModalVisible.value = true
  if (record.id) {
    formData.value = { ...record }
    formStatus.value = ENUM_FORM_STATUS_TYPE.编辑
  }
  else {
    formData.value = initDictItemsRecord()
    formData.value.dictId = record.dictId
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
      {{ formStatus }} 字典
    </template>
    <AForm :model="formData" layout="vertical">
      <AFormItem field="label" label="字典名称">
        <AInput v-model="formData.label" placeholder="请输入字典名称" />
      </AFormItem>
      <AFormItem field="value" label="字典值">
        <AInput v-model="formData.value" placeholder="请输入字典值" />
      </AFormItem>
    </AForm>
  </AModal>
</template>
