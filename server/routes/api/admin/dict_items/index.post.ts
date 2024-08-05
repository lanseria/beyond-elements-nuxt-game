import Joi from 'joi'
import { dictItems } from '~/server/database/schemas'
import type { DictItemsRecord } from '~/types'

const postSchema = Joi.object<DictItemsRecord>({
  dictId: Joi.string().required(),
  label: Joi.string().required(),
  value: Joi.string().required(),
  description: Joi.string().allow(''),
}).unknown()

export default defineEventHandler(async (event) => {
  try {
    // 获取上下文中的 payload
    const payload = event.context.payload
    if (payload.code)
      throw new Error(payload.msg)
    const postData: DictItemsRecord = await readBody(event)
    const postValue = await postSchema.validateAsync(postData)
    const db = await usePgDatabase()
    const insert = await db.insert(dictItems).values({
      dictId: postData.dictId,
      label: postValue.label,
      value: postValue.value,
      description: postValue.description,
    }).returning()
    return {
      code: 0,
      data: insert,
    }
  }
  catch (error: any) {
    return {
      code: 1,
      msg: error.message,
    }
  }
})
