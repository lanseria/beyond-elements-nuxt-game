import { createHash } from 'node:crypto'
import { eq } from 'drizzle-orm'
import dayjs from 'dayjs'
import Joi from 'joi'
import { inviteCodes, users } from '~/server/database/schemas'
import type { RegisterData } from '~/types'

const postSchema = Joi.object<RegisterData>({
  inviteCode: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.only': '确认密码必须与密码相同',
  }),
}).unknown()

async function checkInviteCode(inviteCode: string) {
  const db = await usePgDatabase()
  const result = await db.select({
    code: inviteCodes.code,
    isUsed: inviteCodes.isUsed,
  })
    .from(inviteCodes)
    .where(eq(inviteCodes.code, inviteCode))
    .limit(1)

  if (result.length === 0) {
    return { exists: false, isUsed: false }
  }

  return {
    exists: true,
    isUsed: result[0].isUsed,
  }
}

export default defineEventHandler(async (event) => {
  try {
    const postData: RegisterData = await readBody(event)
    const postValue = await postSchema.validateAsync(postData)
    const { username, password, inviteCode } = postValue
    const { exists, isUsed } = await checkInviteCode(inviteCode)

    if (!exists) {
      throw new Error('邀请码不存在')
    }
    else if (isUsed) {
      throw new Error('邀请码已被使用')
    }
    const hash = createHash('sha512').update(password).digest('base64')
    const db = await usePgDatabase()
    // TODO: 忘记做是否已经存在用户
    const user = await db.insert(users).values({
      name: username,
      username,
      password: hash,
      role: 'user',
      gender: 'male',
    }).returning()
    await db.update(inviteCodes).set({
      isUsed: true,
      userId: user[0].id,
      usedAt: dayjs().unix(),
    }).where(eq(inviteCodes.code, inviteCode))
    return {
      code: 0,
      data: user,
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
