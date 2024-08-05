import { dicts } from '~/server/database/schemas'

export default defineEventHandler(async (event) => {
  try {
    // 获取上下文中的 payload
    const payload = event.context.payload
    if (payload.code)
      throw new Error(payload.msg)
    const db = await usePgDatabase()
    const results = await db.select().from(dicts)
      .orderBy(dicts.createdAt)
    return {
      code: 0,
      data: results,
    }
  }
  catch (error: any) {
    console.error(error)
    return {
      code: 1,
      msg: error.message,
    }
  }
})
