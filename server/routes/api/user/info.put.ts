import { eq } from 'drizzle-orm'
import Joi from 'joi'
import { omit } from 'lodash-es'
import { users } from '~/server/database/schemas'
import type { UserRecord } from '~/types'

const putUserSchema = Joi.object({
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
    const putData = await readBody(event)
    const putValue = await putUserSchema.validateAsync(putData)
    const payloadUser: UserRecord = {
      ...payload.data,
      ...putValue,
    }
    const db = await usePgDatabase()
    const [updatedUser] = await db.update(users)
      .set({ name: putValue.name, username: putValue.username, avatar: putValue.avatar })
      .where(eq(users.id, payloadUser.id))
      .returning()
    if (!updatedUser) {
      throw new Error('未找到更新后的用户')
    }
    const formatUpdatedUser = omit(updatedUser, 'password')
    return {
      code: 0,
      data: formatUpdatedUser,
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
