import { dictItems, dicts } from '~/server/database/schemas'
import type { DictTreeNode } from '~/types'

export default defineEventHandler(async (event) => {
  try {
    // 获取上下文中的 payload
    const payload = event.context.payload
    if (payload.code)
      throw new Error(payload.msg)
    const db = await usePgDatabase()
    const allDicts = await db.select().from(dicts)
    const allDictItems = await db.select().from(dictItems)
    // 构建树形结构
    const dictMap = new Map<string, DictTreeNode>()

    // 首先创建所有字典节点
    allDicts.forEach((dict) => {
      dictMap.set(dict.id, {
        id: dict.id,
        label: dict.label,
        value: dict.value,
        children: [],
      })
    })

    // 然后添加字典项作为子节点
    allDictItems.forEach((item) => {
      const parentNode = dictMap.get(item.dictId)
      if (parentNode) {
        parentNode.children!.push({
          id: item.id,
          label: item.label,
          value: item.value,
        })
      }
    })
    // 返回顶级节点（没有父节点的字典）
    return {
      code: 0,
      data: Array.from(dictMap.values()).filter(node => !allDictItems.some(item => item.id === node.id)),
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
