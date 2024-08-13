<script lang="ts" setup>
import type { OnClickOutsideHandler } from '@vueuse/core'
import { vOnClickOutside } from '@vueuse/components'

const router = useRouter()
const UserInfoFormModalRef = shallowRef()
const dropdown = ref(false)
const dropdownHandler: OnClickOutsideHandler = () => {
  dropdown.value = false
}
</script>

<template>
  <div class="dropdown">
    <div class="cursor-pointer rounded bg-white p-8px hover:bg-gray-1" @click="dropdown = !dropdown">
      <img :src="storeUserInfo.avatar" class="h-24px w-24px">
    </div>
    <ul v-if="dropdown" v-on-click-outside="dropdownHandler" class="dropdown-menu">
      <li v-if="storeUserInfo.role === 'admin'" @click="globalDashboardHandler(router)">
        管理端
      </li>
      <li @click="UserInfoFormModalRef.open()">
        个人信息
      </li>
      <li @click="globalLogoutHandler(router)">
        退出
      </li>
    </ul>
    <UserInfoFormModal ref="UserInfoFormModalRef" />
  </div>
</template>

<style lang="css" scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  z-index: 1;
  position: absolute;
  top: 110%;
  right: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  @apply bg-white dark:bg-black border-gray-1 dark:border-gray-8 border-1px border-solid rounded;
}

.dropdown-menu li {
  @apply text-12px block whitespace-nowrap px-3 py-2 cursor-pointer;
}

.dropdown-menu li:hover {
  @apply dark:bg-gray-8 bg-gray-1;
}
</style>
