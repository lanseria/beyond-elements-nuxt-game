import { generateKeys } from 'paseto-ts/v4'
/**
 * 初始化本地存储 设置paseto
 */
export default defineNitroPlugin(async (_nitroApp) => {
  const hasSet = await useStorage('files').hasItem('localKey')
  if (!hasSet) {
    await useStorage('files').setItem('localKey', generateKeys('local'))
  }
})
