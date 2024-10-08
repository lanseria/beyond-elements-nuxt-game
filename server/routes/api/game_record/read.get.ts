import { desc, eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    // 获取上下文中的 payload
    const payload = event.context.payload
    if (payload.code)
      throw new Error(payload.msg)
    const db = await usePgDatabase()
    const gameRecord = await db.query.gameRecords.findFirst({
      where: b => eq(b.userId, payload.data.id),
      orderBy: b => desc(b.createdAt),
    })
    if (!gameRecord)
      throw new Error('游戏数据不存在')
    return {
      code: 0,
      data: gameRecord,
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
