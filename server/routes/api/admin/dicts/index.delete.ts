import Joi from 'joi'
import { inArray } from 'drizzle-orm'
import { dicts } from '~/server/database/schemas'

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
    const data = await db.delete(dicts).where(inArray(dicts.id, deleteIdsValue)).returning()
    return {
      code: 0,
      data,
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
