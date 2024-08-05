import type { DictTreeNode, R_P } from '~/types'

export function queryDictTree(): R_P<DictTreeNode[]> {
  return $fetch('/api/dict/tree', {
    method: 'GET',
    headers: {
      Authorization: storeToken.value,
    },
  })
}
