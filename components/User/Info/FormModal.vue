<script lang="ts" setup>
const ModalVisible = ref(false)
const formData = ref(initUserRecord())

async function onBeforeOk(done: (closed: boolean) => void) {
  const { data, code, msg } = await putUserInfo(formData.value)
  if (!code) {
    storeUserInfo.value = data
    Message.success('修改成功')
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
  formData.value = { ...storeUserInfo.value }
}
defineExpose({
  open,
})
</script>

<template>
  <AModal v-model:visible="ModalVisible" ok-text="保存" :width="400" :on-before-ok="onBeforeOk" @cancel="handleCancel">
    <template #title>
      个人信息
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
