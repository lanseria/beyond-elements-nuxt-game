import type { CascaderOption } from '@arco-design/web-vue/es/cascader'
import type { R_P } from '~/types'

export function queryAdoc(): R_P<CascaderOption[]> {
  return $fetch('/api/adoc', {
    method: 'GET',
    headers: {
      Authorization: storeToken.value,
    },
  })
}
