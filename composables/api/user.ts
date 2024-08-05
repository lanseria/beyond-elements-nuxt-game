import type { LoginData, R_P, RegisterData, UserRecord } from '~/types'

export function initUserRecord(): UserRecord {
  return {
    id: '',
    name: '',
    avatar: '/assets/images/avatars/23.svg',
    username: '',
    password: '',
    gender: 'male',
    role: 'user',
  }
}

export function postLogin(body: LoginData): R_P<string> {
  return $fetch('/api/login', {
    method: 'POST',
    body,
  })
}

export function postRegister(body: RegisterData): R_P<UserRecord> {
  return $fetch('/api/register', {
    method: 'POST',
    body,
  })
}
export function queryUserInfo(): R_P<UserRecord> {
  return $fetch('/api/user/info', {
    method: 'GET',
    headers: {
      Authorization: storeToken.value,
    },
  })
}

export function putUserInfo(body: UserRecord): R_P<UserRecord> {
  return $fetch('/api/user/info', {
    method: 'PUT',
    headers: {
      Authorization: storeToken.value,
    },
    body,
  })
}
