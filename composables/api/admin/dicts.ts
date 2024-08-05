import type { DictRecord, R_List, R_P } from '~/types'

export function initDictRecord(): DictRecord {
  return {
    id: '',
    label: '',
    value: '',
    createdAt: 0,
    updatedAt: 0,
  }
}

export function queryDictsList(): R_List<DictRecord> {
  return $fetch('/api/admin/dicts/list', {
    method: 'GET',
    headers: {
      Authorization: storeToken.value,
    },
  })
}

export function postDicts(body: DictRecord): R_P<DictRecord> {
  return $fetch('/api/admin/dicts', {
    method: 'POST',
    headers: {
      Authorization: storeToken.value,
    },
    body,
  })
}

export function putDicts(body: DictRecord): R_P<DictRecord> {
  return $fetch('/api/admin/dicts', {
    method: 'PUT',
    headers: {
      Authorization: storeToken.value,
    },
    body,
  })
}

export function deleteDicts(body: string[]): R_P<DictRecord[]> {
  return $fetch('/api/admin/dicts', {
    method: 'DELETE',
    headers: {
      Authorization: storeToken.value,
    },
    body,
  })
}

export function deleteDictsById(data: string): R_P<DictRecord[]> {
  return deleteDicts([data])
}
