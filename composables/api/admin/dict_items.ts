import type { DictItemsQuery, DictItemsRecord, R_List, R_P } from '~/types'

export function initDictItemsRecord(): DictItemsRecord {
  return {
    id: '',
    dictId: '',
    label: '',
    value: '',
    sort: 0,
    description: '',
    createdAt: 0,
    updatedAt: 0,
  }
}
export function queryDictItemsList(query: DictItemsQuery): R_List<DictItemsRecord> {
  return $fetch(`/api/admin/dict_items/list`, {
    method: 'GET',
    headers: {
      Authorization: storeToken.value,
    },
    query,
  })
}

export function postDictItems(body: DictItemsRecord): R_P<DictItemsRecord> {
  return $fetch('/api/admin/dict_items', {
    method: 'POST',
    headers: {
      Authorization: storeToken.value,
    },
    body,
  })
}

export function putDictItems(body: DictItemsRecord): R_P<DictItemsRecord> {
  return $fetch('/api/admin/dict_items', {
    method: 'PUT',
    headers: {
      Authorization: storeToken.value,
    },
    body,
  })
}

export function deleteDictItems(body: string[]): R_P<DictItemsRecord[]> {
  return $fetch('/api/admin/dict_items', {
    method: 'DELETE',
    headers: {
      Authorization: storeToken.value,
    },
    body,
  })
}

export function deleteDictItemsById(data: string): R_P<DictItemsRecord[]> {
  return deleteDictItems([data])
}
