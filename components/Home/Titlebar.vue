<script setup lang="ts">
import { appName } from '~/constants'
</script>

<template>
  <div class="h-40px w-full flex select-none items-center justify-between border-b-1px border-gray-1 bg-white px-1px dark:border-gray-8 dark:bg-black">
    <div class="flex items-center gap-4">
      <IconButton icon-name="i-carbon-menu" tooltip-name="菜单" @click="setStoreMenubar(!storeMenubar)" />
      <div class="font-bold">
        {{ appName }}
      </div>
    </div>
    <div>
      <HomeUserInfoDropDown />
    </div>
  </div>
</template>
