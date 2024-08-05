import type { Router } from 'vue-router'

export async function globalFetchUserInfo(router: Router) {
  try {
    const res = await queryUserInfo()
    if (res.code) {
      storeIsLogin.value = false
      router.push('/login')
      storeToken.value = ''
      storeUserInfo.value = initUserRecord()
    }
    else {
      storeIsLogin.value = true
      storeUserInfo.value = res.data
      const { code, data, msg } = await queryDictTree()
      if (code) {
        throw new Error(msg)
      }
      else {
        storeDictTree.value = data
      }
    }
  }
  catch (error) {
    console.warn(error)
  }
}

export function globalLogoutHandler(router: Router) {
  storeToken.value = ''
  storeUserInfo.value = initUserRecord()
  router.push('/login')
}

export function globalDashboardHandler(router: Router) {
  router.push('/dashboard')
}

export function globalIndexHandler(router: Router) {
  router.push('/')
}
