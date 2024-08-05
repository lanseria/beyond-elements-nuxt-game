import { eq } from 'drizzle-orm'
import Joi from 'joi'
import { dicts } from '~/server/database/schemas'
import type { DictRecord } from '~/types'

const putSchema = Joi.object<DictRecord>({
  id: Joi.string().required(),
  label: Joi.string().required(),
  value: Joi.string().required(),
}).unknown()

export default defineEventHandler(async (event) => {
  try {
    // 获取上下文中的 payload
    const payload = event.context.payload
    if (payload.code)
      throw new Error(payload.msg)
    const putData: DictRecord = await readBody(event)
    const putValue = await putSchema.validateAsync(putData)
    const db = await usePgDatabase()
    const [updated] = await db.update(dicts)
      .set({ label: putValue.label, value: putValue.value })
      .where(eq(dicts.id, putValue.id))
      .returning()
    if (!updated) {
      throw new Error('未找到字典')
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
