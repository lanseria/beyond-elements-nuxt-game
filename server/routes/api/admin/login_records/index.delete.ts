import Joi from 'joi'
import { inArray } from 'drizzle-orm'
import { loginRecords } from '~/server/database/schemas'

const deleteIdsSchema = Joi.array().items(Joi.string()).required()

export default defineEventHandler(async (event) => {
  try {
    // 获取上下文中的 payload
    const payload = event.context.payload
    if (payload.code)
      throw new Error(payload.msg)
    const deleteIdsData: string[] = await readBody(event)
    const deleteIdsValue: string[] = await deleteIdsSchema.validateAsync(deleteIdsData)
    const db = await usePgDatabase()
    const deleteLoginRecordList = await db.delete(loginRecords).where(inArray(loginRecords.id, deleteIdsValue)).returning()
    return {
      code: 0,
      data: deleteLoginRecordList,
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
