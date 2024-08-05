import { createHash } from 'node:crypto'
import dayjs from 'dayjs'
import { sampleAvatar } from '~/composables/user'
import { areas, cities, dictItems, dicts, provinces, streets, users, villages } from '~/server/database/schemas'
import type { AreasRecord, CitiesRecord, DictItemsRecord, DictRecord, ProvincesRecord, StreetsRecord, VillagesRecord } from '~/types'

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
    const dictList = await csvToObjectArray<DictRecord>('./public/csv/dicts.csv', csv2Dict)
    const dictItemList = await csvToObjectArray<DictItemsRecord>('./public/csv/dict_items.csv', csv2DictItem)
    dictList.forEach(async (item) => {
      await db.insert(dicts).values(item).returning()
      const children = dictItemList.filter(ite => ite.dictId === item.id)
      children.forEach(async (it) => {
        await db.insert(dictItems).values(it)
      })
    })

    console.warn('字典初始化完成')
  }
  catch (error: any) {
    throw new Error(error.message)
  }
}

async function initCity() {
  function csv2Common<T>(data: T): T {
    return data
  }
  // 初始化城镇数据
  try {
    const db = await usePgDatabase()
    const results = await db.select().from(provinces)
    if (results.length > 0) {
      throw new Error('城镇已经初始化')
    }
    const provincesList = await csvToObjectArray<ProvincesRecord>('./public/csv/Administrative-divisions-of-China/provinces.csv', csv2Common)
    const citiesList = await csvToObjectArray<CitiesRecord>('./public/csv/Administrative-divisions-of-China/cities.csv', csv2Common)
    const areasList = await csvToObjectArray<AreasRecord>('./public/csv/Administrative-divisions-of-China/areas.csv', csv2Common)
    const streetsList = await csvToObjectArray<StreetsRecord>('./public/csv/Administrative-divisions-of-China/streets.csv', csv2Common)
    const villagesList = await csvToObjectArray<VillagesRecord>('./public/csv/Administrative-divisions-of-China/villages.csv', csv2Common)
    // console.warn('插入了', provincesList.length, '个省', citiesList.length, '个市', areasList.length, '个区', streetsList.length, '个街道', villagesList.length, '个村')
    for (const p of provincesList) {
      await db.insert(provinces).values(p)
    }
    for (const c of citiesList) {
      await db.insert(cities).values(c)
    }
    for (const a of areasList) {
      await db.insert(areas).values(a)
    }
    for (const s of streetsList) {
      await db.insert(streets).values(s)
    }
    for (const v of villagesList) {
      await db.insert(villages).values(v)
    }
    console.warn('城镇初始化完成')
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
  // 初始化城镇数据
  initCity()
}
