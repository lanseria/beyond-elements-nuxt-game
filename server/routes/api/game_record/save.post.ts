import Joi from 'joi'
import { gameRecords } from '~/server/database/schemas'
import type { GameRecordData } from '~/types'

const postUserSchema = Joi.object({
  data: Joi.object(),
}).unknown()

export default defineEventHandler(async (event) => {
  try {
    // 获取上下文中的 payload
    const payload = event.context.payload
    if (payload.code)
      throw new Error(payload.msg)
    const postData = await readBody(event)
    const postValue = await postUserSchema.validateAsync(postData)
    const gameRecordData: GameRecordData = {
      userId: payload.data.id,
      data: postValue.data,
    }
    const db = await usePgDatabase()
    const [insertedData] = await db.insert(gameRecords)
      .values(gameRecordData)
      .returning()
    return {
      code: 0,
      data: insertedData,
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
