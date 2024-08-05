import { eq } from 'drizzle-orm'
import Joi from 'joi'
import { dictItems } from '~/server/database/schemas'
import type { DictItemsQuery } from '~/types'

const querySchema = Joi.object<DictItemsQuery>({
  dictId: Joi.string().required(),
})

export default defineEventHandler(async (event) => {
  try {
    // 获取上下文中的 payload
    const payload = event.context.payload
    if (payload.code)
      throw new Error(payload.msg)
    const query: DictItemsQuery = getQuery(event)
    const queryValue = await querySchema.validateAsync(query)
    const db = await usePgDatabase()
    const results = await db.select().from(dictItems)
      .where(eq(dictItems.dictId, queryValue.dictId))
      .orderBy(dictItems.createdAt)
    return {
      code: 0,
      data: results,
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
