<script lang="ts" setup>
const UserInfoFormModalRef = shallowRef()
</script>

<template>
  <ADropdown>
    <div class="w-100px flex cursor-pointer items-center gap-2 px-3 hover:bg-gray-1 dark:hover:bg-gray-8">
      <img class="h-32px w-32px" :src="storeUserInfo.avatar">
      <div>{{ storeUserInfo.name }}</div>
    </div>
    <UserInfoFormModal ref="UserInfoFormModalRef" />
    <template #content>
      <ADoption @click.stop="globalIndexHandler($router)">
        首页
      </ADoption>
      <ADoption @click="UserInfoFormModalRef.open()">
        个人信息
      </ADoption>
      <ADoption @click.stop="globalLogoutHandler($router)">
        退出
      </ADoption>
    </template>
  </ADropdown>
</template>
