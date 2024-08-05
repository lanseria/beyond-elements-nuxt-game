import Joi from 'joi'
import { nanoid } from 'nanoid'
import { inviteCodes } from '~/server/database/schemas'
import type { InviteCodesBatchGenerateRecord } from '~/types'

const postSchema = Joi.object<InviteCodesBatchGenerateRecord>({
  quantity: Joi.number().min(1).max(100).required(),
}).unknown()

export default defineEventHandler(async (event) => {
  try {
    // 获取上下文中的 payload
    const payload = event.context.payload
    if (payload.code)
      throw new Error(payload.msg)
    const postData: InviteCodesBatchGenerateRecord = await readBody(event)
    const postValue = await postSchema.validateAsync(postData)
    const codes = Array.from({ length: postValue.quantity }, () => nanoid(10))
    const codeList = codes.map((item) => {
      return {
        code: item,
      }
    })
    const db = await usePgDatabase()
    const retruningCodeList = await db.insert(inviteCodes).values(codeList).returning()
    return {
      code: 0,
      data: retruningCodeList,
    }
  }
  catch (error: any) {
    return {
      code: 1,
      msg: error.message,
    }
  }
})
