import { createHash } from 'node:crypto'
import { encrypt } from 'paseto-ts/v4'
import { eq } from 'drizzle-orm'
import { omit } from 'lodash-es'
import { loginRecords } from '~/server/database/schemas'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const requestIp = getRequestIP(event)
  const { username, password } = body
  const hash = createHash('sha512').update(password).digest('base64')
  const db = await usePgDatabase()
  const user = await db.query.users.findFirst({
    where: b => eq(b.username, username),
  })
  if (!user) {
    return {
      code: 1,
      msg: '帐号不存在',
    }
  }
  else if (user.password !== hash) {
    await db.insert(loginRecords).values({
      userId: user.id,
      password,
      isLogin: false,
      passwordHash: hash,
      ip: requestIp,
    })
    return {
      code: 1,
      msg: `帐号${user.username}密码错误`,
    }
  }
  await db.insert(loginRecords).values({
    userId: user.id,
    password: '',
    isLogin: true,
    passwordHash: hash,
    ip: requestIp,
  })
  const localKey = await useStorage('files').getItem('localKey') as string
  // 用 lodash-es 中的 omit 移除 password
  const payload = omit(user, 'password')
  const token = await encrypt(
    localKey,
    payload,
  )
  return {
    code: 0,
    data: token,
  }
})
