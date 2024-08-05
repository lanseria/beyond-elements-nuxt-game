import { and, asc, eq, sql } from 'drizzle-orm'
import Joi from 'joi'
import { inviteCodes, users } from '~/server/database/schemas'
import type { InviteCodesRecord } from '~/types'

const paginationQuerySchema = Joi.object<{
  current: number
  pageSize: number
  isUsed: boolean
}>({
  current: Joi.number().default(1),
  pageSize: Joi.number().default(10),
  isUsed: Joi.boolean().allow(''),
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
      records: {
        ...inviteCodes,
        name: users.name,
        username: users.username,
      },
      count: sql<number>`count(*) over()`.mapWith(Number),
    })
      .from(inviteCodes)
      .leftJoin(users, eq(inviteCodes.userId, users.id))
      .where(
        and(
          paginationQueryValue.isUsed
            ? eq(inviteCodes.isUsed, paginationQueryValue.isUsed)
            : undefined,
        ),
      )
      .orderBy(
        asc(inviteCodes.usedAt), // 先按 usedAt 排序
        asc(inviteCodes.createdAt),
      )
      .limit(paginationQueryValue.pageSize)
      .offset((paginationQueryValue.current - 1) * paginationQueryValue.pageSize)
    return paginationReturning<InviteCodesRecord>(results, paginationQueryValue)
  }
  catch (error: any) {
    console.error(error)
    return {
      code: 1,
      msg: error.message,
    }
  }
})
