import type { R_P } from '~/types'

export function readGameRecord(): R_P<any> {
  return $fetch('/api/game_record/read', {
    method: 'GET',
    headers: {
      Authorization: storeToken.value,
    },
  })
}

export function saveGameRecord(body: { data: any }): R_P<any> {
  return $fetch('/api/game_record/save', {
    method: 'POST',
    headers: {
      Authorization: storeToken.value,
    },
    body,
  })
}
