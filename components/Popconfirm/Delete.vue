<script lang="ts" setup>
import type { R_P } from '~/types'

const props = withDefaults(defineProps<{
  item: any
  rowKey?: string
  deleteFunction: (item: any) => R_P<any>
  confirmContent?: string
}>(), {
  rowKey: 'id',
  confirmContent: '确认删除？',
})
const emit = defineEmits(['fetchData'])

const { loading, setLoading } = useLoading(false)
async function handleDelete() {
  try {
    setLoading(true)
    const res = await props.deleteFunction(props.item[props.rowKey])
    if (res.code)
      Message.warning(res.msg)
  }
  catch (err) {
    console.warn(err)
  }
  finally {
    setLoading(false)
    emit('fetchData')
  }
}
</script>

<template>
  <APopconfirm :content="confirmContent" :ok-loading="loading" type="warning" @ok="handleDelete()">
    <slot />
  </APopconfirm>
</template>
