import Joi from 'joi'
import { inArray } from 'drizzle-orm'
import { inviteCodes, users } from '~/server/database/schemas'

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
    const deleteList = await db.delete(users).where(inArray(users.id, deleteIdsValue)).returning()
    // 通过 userId 查出所有邀请码
    const inviteCodeList = await db.select().from(inviteCodes).where(inArray(inviteCodes.userId, deleteIdsValue))
    const inviteCodeIds = inviteCodeList.map(item => item.id)
    const initInviteCodeList = await inviteCodesInit(inviteCodeIds)
    return {
      code: 0,
      data: {
        deleteList,
        initInviteCodeList,
      },
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
