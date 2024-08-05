import { createHash } from 'node:crypto'
import Joi from 'joi'
import { users } from '~/server/database/schemas'
import type { UserRecord } from '~/types'

const postSchema = Joi.object<UserRecord>({
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
    const postData: UserRecord = await readBody(event)
    const postValue = await postSchema.validateAsync(postData)
    const db = await usePgDatabase()
    const data = await db.insert(users).values({
      name: postValue.name,
      avatar: postValue.avatar,
      username: postValue.username,
      password: createHash('sha512').update('123456').digest('base64'),
      role: 'user',
      gender: 'male',
    }).returning()
    return {
      code: 0,
      data,
    }
  }
  catch (error: any) {
    return {
      code: 1,
      msg: error.message,
    }
  }
})
