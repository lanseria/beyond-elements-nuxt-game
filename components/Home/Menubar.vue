<script lang="ts" setup>
</script>

<template>
  <div class="h-full w-300px flex">
    <div class="w-40px flex flex-col items-center border-r-1px border-gray-1 bg-white py-1px dark:border-gray-8 dark:bg-black">
      <div class="h-full w-full flex flex-none flex-col justify-between">
        <div class="flex flex-col items-center">
          <IconButton
            v-for="item in MAP_MENU_TAB_LIST" :key="item.value"
            :icon-name="item.icon"
            :tooltip-name="item.name"
            :active="storeActiveTabMenuValue === item.value"
            @click="setStoreActiveTabMenuValue(item.value)"
          />
        </div>
        <div class="flex flex-col items-center">
          <IconButton icon-name="i-carbon-rotate-360" tooltip-name="刷新" />
          <IconButton icon-name="i-carbon-settings" tooltip-name="设置" />
          <!-- <IconButton icon-name="i-carbon-sun dark:i-carbon-moon" tooltip-name="主题" @click="() => toggleDark()" /> -->
          <IconButton icon-name="i-carbon-help" tooltip-name="关于" />
        </div>
      </div>
    </div>
    <div class="h-full flex-1">
      开发中
    </div>
  </div>
</template>
