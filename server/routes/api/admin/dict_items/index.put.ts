import { eq } from 'drizzle-orm'
import Joi from 'joi'
import { dictItems } from '~/server/database/schemas'
import type { DictItemsRecord } from '~/types'

const putSchema = Joi.object<DictItemsRecord>({
  id: Joi.string().required(),
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
    const putData: DictItemsRecord = await readBody(event)
    const putValue = await putSchema.validateAsync(putData)
    const db = await usePgDatabase()
    const [updated] = await db.update(dictItems)
      .set({
        label: putValue.label,
        value: putValue.value,
        description: putValue.description,
      })
      .where(eq(dictItems.id, putValue.id))
      .returning()
    if (!updated) {
      throw new Error('未找到子字典')
    }
    return {
      code: 0,
      data: updated,
    }
  }
  catch (error: any) {
    return {
      code: 1,
      msg: error.message,
    }
  }
})
