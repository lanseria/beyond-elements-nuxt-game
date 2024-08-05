<script lang="ts" setup>
import { ENUM_FORM_STATUS_TYPE } from '~/composables/enum'

const emits = defineEmits(['ok'])

const ModalVisible = ref(false)

const formStatus = ref<ENUM_FORM_STATUS_TYPE>(ENUM_FORM_STATUS_TYPE.空白)
const formData = ref(initInviteCodesBatchGenerateRecord())
function handleOk() {
  emits('ok')
}
async function onBeforeOk(done: (closed: boolean) => void) {
  let requestFunc
  if (formStatus.value === ENUM_FORM_STATUS_TYPE.新增)
    requestFunc = postInviteCodesBatchGenerate
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
function open() {
  ModalVisible.value = true
  formData.value = initInviteCodesBatchGenerateRecord()
  formStatus.value = ENUM_FORM_STATUS_TYPE.新增
}
defineExpose({
  open,
})
</script>

<template>
  <AModal v-model:visible="ModalVisible" ok-text="保存" :on-before-ok="onBeforeOk" @ok="handleOk" @cancel="handleCancel">
    <template #title>
      {{ formStatus }} 批量生成邀请码
    </template>
    <AForm :model="formData" layout="vertical">
      <AFormItem field="quantity" label="数量">
        <AInputNumber v-model="formData.quantity" placeholder="请输入数量" />
      </AFormItem>
    </AForm>
  </AModal>
</template>
