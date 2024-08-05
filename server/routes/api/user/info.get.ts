import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    // 获取上下文中的 payload
    const payload = event.context.payload
    if (payload.code)
      throw new Error(payload.msg)
    const db = await usePgDatabase()
    const user = await db.query.users.findFirst({
      where: b => eq(b.id, payload.data.id),
    })
    if (!user)
      throw new Error('用户不存在')
    return {
      code: 0,
      data: user,
      msg: '',
    }
  }
  catch (error: any) {
    return {
      code: 1,
      msg: error.message,
    }
  }
})
