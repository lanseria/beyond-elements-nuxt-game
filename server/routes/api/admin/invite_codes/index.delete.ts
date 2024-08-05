import Joi from 'joi'
import { inArray } from 'drizzle-orm'
import { inviteCodes } from '~/server/database/schemas'

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
    const deleteInviteCodeList = await db.delete(inviteCodes).where(inArray(inviteCodes.id, deleteIdsValue)).returning()
    return {
      code: 0,
      data: deleteInviteCodeList,
    }
  }
  catch (error: any) {
    return {
      code: 1,
      msg: error.message,
    }
  }
})
