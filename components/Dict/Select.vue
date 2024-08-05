<script lang="ts" setup>
const props = defineProps({
  dictType: {
    type: String as PropType<DICT_TYPE>,
    required: true,
  },
  filterIds: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
})
const { labelValueList } = useDict(props.dictType)
const filterLabelValueList = computed(() => {
  return labelValueList.value.filter(it => !props.filterIds.includes(it.value))
})
</script>

<template>
  <ASelect :options="filterLabelValueList" />
</template>
