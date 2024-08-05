import Joi from 'joi'
import { dicts } from '~/server/database/schemas'
import type { DictRecord } from '~/types'

const postSchema = Joi.object<DictRecord>({
  label: Joi.string().required(),
  value: Joi.string().required(),
}).unknown()

export default defineEventHandler(async (event) => {
  try {
    // 获取上下文中的 payload
    const payload = event.context.payload
    if (payload.code)
      throw new Error(payload.msg)
    const postData: DictRecord = await readBody(event)
    const postValue = await postSchema.validateAsync(postData)
    const db = await usePgDatabase()
    const dict = await db.insert(dicts).values({
      label: postValue.label,
      value: postValue.value,
    }).returning()
    return {
      code: 0,
      data: dict,
    }
  }
  catch (error: any) {
    return {
      code: 1,
      msg: error.message,
    }
  }
})
