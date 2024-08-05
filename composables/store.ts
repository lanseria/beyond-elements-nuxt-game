import type { DictTreeNode, UserRecord } from '~/types'

export const storeIsLogin = useLocalStorage<boolean>('storeIsLogin', false)

export const storeUserInfo = useLocalStorage<UserRecord>('storeUserInfo', initUserRecord())

export const storeToken = useLocalStorage<string>('storeToken', '')

export const storeDictTree = useLocalStorage<DictTreeNode[]>('storeDictTree', [])

export const storeMenubar = useLocalStorage<boolean>('storeMenubar', true)
export function setStoreMenubar(value: boolean) {
  storeMenubar.value = value
}

export const storeActiveTabMenuValue = useLocalStorage<string>('storeActiveTabMenuValue', '')
export function setStoreActiveTabMenuValue(value: string) {
  if (storeActiveTabMenuValue.value === value) {
    storeActiveTabMenuValue.value = ''
  }
  else {
    storeActiveTabMenuValue.value = value
  }
}
