import { keyBy, mapValues } from 'lodash-es'

export function useDict(dictType: DICT_TYPE) {
  const labelValueList = computed(() => {
    const dictIdx = storeDictTree.value.findIndex(it => it.value === dictType)
    if (dictIdx === -1) {
      console.error('storeDictTree [dictType] is undefined', dictType)
      return []
    }

    return storeDictTree.value[dictIdx].children ?? []
  })
  const labelValueMap = computed(() => {
    return mapValues(keyBy(labelValueList.value, 'value'), 'label')
  })
  return {
    labelValueList,
    labelValueMap,
  }
}
