<script lang="ts" setup>
import type { CascaderOption } from '@arco-design/web-vue/es/cascader'

const { data: options } = useAsyncData<CascaderOption[]>(async () => {
  const { data } = await queryAdoc()
  return data
})
</script>

<template>
  <ACascader v-if="options" :options="options" placeholder="请选择县级（区县）" />
</template>
