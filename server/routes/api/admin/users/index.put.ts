import { eq } from 'drizzle-orm'
import Joi from 'joi'
import { omit } from 'lodash-es'
import { users } from '~/server/database/schemas'
import type { UserRecord } from '~/types'

const putSchema = Joi.object<UserRecord>({
  id: Joi.string().required(),
  name: Joi.string().required(),
  username: Joi.string().required(),
  avatar: Joi.string().allow(''),
}).unknown()

export default defineEventHandler(async (event) => {
  try {
    // 获取上下文中的 payload
    const payload = event.context.payload
    if (payload.code)
      throw new Error(payload.msg)
    const putData: UserRecord = await readBody(event)
    const putValue = await putSchema.validateAsync(putData)
    const db = await usePgDatabase()
    const [updated] = await db.update(users)
      .set({ name: putValue.name, username: putValue.username, avatar: putValue.avatar })
      .where(eq(users.id, putValue.id))
      .returning()
    if (!updated) {
      throw new Error('未找到用户')
    }
    const formatUpdated = omit(updated, 'password')
    return {
      code: 0,
      data: formatUpdated,
    }
  }
  catch (error: any) {
    return {
      code: 1,
      msg: error.message,
    }
  }
})
