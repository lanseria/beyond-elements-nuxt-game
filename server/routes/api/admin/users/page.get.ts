import { and, like, sql } from 'drizzle-orm'
import Joi from 'joi'
import { omit } from 'lodash-es'
import { users } from '~/server/database/schemas'

const paginationQuerySchema = Joi.object<{
  current: number
  pageSize: number
  username: string
  name: string
}>({
  current: Joi.number().default(1),
  pageSize: Joi.number().default(10),
  username: Joi.string().allow(''),
  name: Joi.string().allow(''),
})

export default defineEventHandler(async (event) => {
  try {
    // 获取上下文中的 payload
    const payload = event.context.payload
    if (payload.code)
      throw new Error(payload.msg)
    const query = getQuery(event)
    // query 包含 current pageSize 两个分页参数 如果没有则默认为 1 10
    const paginationQueryValue = await paginationQuerySchema.validateAsync(query)
    const db = await usePgDatabase()
    const results = await db.select({
      records: omit(users, 'password'),
      count: sql<number>`count(*) over()`.mapWith(Number),
    })
      .from(users)
      .where(
        and(
          paginationQueryValue.username
            ? like(users.username, `%${paginationQueryValue.username}%`)
            : undefined,
          paginationQueryValue.name
            ? like(users.name, `%${paginationQueryValue.name}%`)
            : undefined,
        ),
      )
      .orderBy(users.createdAt)
      .limit(paginationQueryValue.pageSize)
      .offset((paginationQueryValue.current - 1) * paginationQueryValue.pageSize)

    return paginationReturning<any>(results, paginationQueryValue)
  }
  catch (error: any) {
    return {
      code: 1,
      msg: error.message,
    }
  }
})
