import { areas, cities, provinces } from '~/server/database/schemas'

export default defineEventHandler(async (event) => {
  try {
    // 获取上下文中的 payload
    const payload = event.context.payload
    if (payload.code)
      throw new Error(payload.msg)
    const db = await usePgDatabase()
    const provinceList = await db.select().from(provinces)
    const cityList = await db.select().from(cities)
    const areaList = await db.select().from(areas)
    const provinceTree: any[] = provinceList.map((province) => {
      return {
        value: province.code,
        label: province.name,
        children: [],
      }
    })

    cityList.forEach((city) => {
      const provinceNode = provinceTree.find(province => province.value === city.provinceCode)
      if (provinceNode) {
        provinceNode.children.push({
          value: city.code,
          label: city.name,
          children: [],
        })
      }
    })

    areaList.forEach((area) => {
      const provinceNode = provinceTree.find(province => province.value === area.provinceCode)
      if (provinceNode) {
        const cityNode = provinceNode.children.find((city: any) => city.value === area.cityCode)
        if (cityNode) {
          cityNode.children.push({
            value: area.code,
            label: area.name,
          })
        }
      }
    })
    return {
      code: 0,
      data: provinceTree,
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
