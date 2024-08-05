import { createHash } from 'node:crypto'
import dayjs from 'dayjs'
import { sampleAvatar } from '~/composables/user'
import { dictItems, dicts, users } from '~/server/database/schemas'
import type { DictItemsRecord, DictRecord } from '~/types'

async function initUser() {
  // 初始化用户
  try {
    const db = await usePgDatabase()
    const results = await db.select().from(users)

    if (results.length > 0) {
      throw new Error('管理员已经初始化')
    }
    await db.insert(users).values({
      name: 'admin',
      username: 'admin',
      avatar: sampleAvatar(),
      password: createHash('sha512').update('123456').digest('base64'),
      role: 'admin',
      gender: 'male',
    })
    console.warn('管理员初始化完成')
  }
  catch (error: any) {
    throw new Error(error.message)
  }
}

async function initDict() {
  function csv2DictItem(data: any): DictItemsRecord {
    return {
      id: data.id,
      dictId: data.dict_id,
      label: data.label,
      value: data.value,
      sort: data.sort,
      description: data.description,
      createdAt: dayjs(data.created_at).unix(),
      updatedAt: dayjs(data.updated_at).unix(),
    }
  }
  function csv2Dict(data: any): DictRecord {
    return {
      id: data.id,
      label: data.label,
      value: data.value,
      createdAt: dayjs(data.created_at).unix(),
      updatedAt: dayjs(data.updated_at).unix(),
    }
  }
  // 初始化字典
  try {
    const db = await usePgDatabase()
    const results = await db.select().from(dicts)
    if (results.length > 0) {
      throw new Error('字典已经初始化')
    }
    const dictList = await csvToObjectArray<DictRecord>('./public/assets/csv/dicts.csv', csv2Dict)
    const dictItemList = await csvToObjectArray<DictItemsRecord>('./public/assets/csv/dict_items.csv', csv2DictItem)
    dictList.forEach(async (item: any) => {
      await db.insert(dicts).values(item).returning()
      const children = dictItemList.filter((ite: any) => ite.dictId === item.id)
      children.forEach(async (it: any) => {
        await db.insert(dictItems).values(it)
      })
    })

    console.warn('字典初始化完成')
  }
  catch (error: any) {
    throw new Error(error.message)
  }
}

export function systemInit() {
  // 初始化用户
  initUser()
  // 初始化字典
  initDict()
}
