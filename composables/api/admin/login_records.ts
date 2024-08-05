import type { LoginRecordsPaginationQuery, LoginRecordsQuery, LoginRecordsRecord, R_P, R_Pagination } from '~/types'

export function initLoginRecordsQuery(): LoginRecordsQuery {
  return {
    username: '',
    name: '',
  }
}

export function queryLoginRecordsPage(query: LoginRecordsPaginationQuery): R_Pagination<LoginRecordsRecord> {
  return $fetch('/api/admin/login_records/page', {
    method: 'GET',
    headers: {
      Authorization: storeToken.value,
    },
    query,
  })
}

export function deleteLoginRecords(body: string[]): R_P<LoginRecordsRecord[]> {
  return $fetch('/api/admin/login_records', {
    method: 'DELETE',
    headers: {
      Authorization: storeToken.value,
    },
    body,
  })
}

export function deleteLoginRecordsById(data: string): R_P<LoginRecordsRecord[]> {
  return deleteLoginRecords([data])
}
