import type { R_P, R_Pagination, UserRecord, UsersPaginationQuery, UsersQuery } from '~/types'

export function initUsersQuery(): UsersQuery {
  return {
    username: '',
    name: '',
  }
}
export function queryUsersPage(query: UsersPaginationQuery): R_Pagination<UserRecord> {
  return $fetch('/api/admin/users/page', {
    method: 'GET',
    headers: {
      Authorization: storeToken.value,
    },
    query,
  })
}

export function postUsers(body: UserRecord): R_P<UserRecord> {
  return $fetch('/api/admin/users', {
    method: 'POST',
    headers: {
      Authorization: storeToken.value,
    },
    body,
  })
}

export function putUsers(body: UserRecord): R_P<UserRecord> {
  return $fetch('/api/admin/users', {
    method: 'PUT',
    headers: {
      Authorization: storeToken.value,
    },
    body,
  })
}

export function deleteUsers(body: string[]): R_P<UserRecord[]> {
  return $fetch('/api/admin/users', {
    method: 'DELETE',
    headers: {
      Authorization: storeToken.value,
    },
    body,
  })
}

export function deleteUsersById(data: string): R_P<UserRecord[]> {
  return deleteUsers([data])
}
