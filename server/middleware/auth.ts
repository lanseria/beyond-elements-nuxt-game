import { decrypt } from 'paseto-ts/v4'
import type { UserRecord } from '~/types'

export default defineEventHandler(async (event) => {
  const localKey = await useStorage('files').getItem('localKey') as string
  const token = getHeader(event, 'Authorization')
  if (token) {
    try {
      const { payload } = await decrypt<UserRecord>(
        localKey,
        token,
      )
      const path = event.path
      const isAdminPath = path.startsWith('/api/admin')
      if (isAdminPath) {
        if (payload.role === 'admin') {
          event.context.payload = {
            code: 0,
            data: payload,
          }
        }
        else {
          event.context.payload = {
            code: 1,
            msg: `admin token认证失败`,
          }
        }
      }
      else {
        event.context.payload = {
          code: 0,
          data: payload,
        }
      }
    }
    catch (error) {
      console.warn(error)
      event.context.payload = {
        code: 1,
        msg: `token认证失败`,
      }
    }
  }
  else {
    event.context.payload = {
      code: 1,
      msg: '没有token',
    }
  }
})
