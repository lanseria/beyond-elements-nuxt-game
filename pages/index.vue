<script setup lang="ts">
import type { Character } from '~/composables/character'
import type { Card } from '~/composables/card'
import { appName } from '~/constants'

const router = useRouter()
const characterObjects = useLocalStorage<Character[]>('characterObjects', [])
const bossObjects = useLocalStorage<Character[]>('bossObjects', [])
// 卡片池
const cardPool = useLocalStorage<Card[]>('cardPool', [])
// 手牌
const handCards = useLocalStorage<Card[]>('handCards', [])
// 发动牌库
const dropCards = useLocalStorage<Card[]>('dropCards', [])

globalFetchUserInfo(router)
async function onSaveGame() {
  const saveData = {
    characterObjects: characterObjects.value,
    bossObjects: bossObjects.value,
    cardPool: cardPool.value,
    handCards: handCards.value,
    dropCards: dropCards.value,
  }
  const { code, msg } = await saveGameRecord({ data: saveData })
  if (code) {
    Message.warning(msg)
  }
  else {
    Message.success('保存成功')
  }
}
async function onReadGame() {
  const { code, msg, data } = await readGameRecord()
  if (code) {
    Message.warning(msg)
  }
  else {
    characterObjects.value = data.data.characterObjects
    bossObjects.value = data.data.bossObjects
    cardPool.value = data.data.cardPool
    handCards.value = data.data.handCards
    dropCards.value = data.data.dropCards
  }
}
</script>

<template>
  <div class="h-screen w-screen flex flex-col">
    <div v-if="storeIsLogin" class="relative flex flex-y-hidden">
      <HomeMapContainer />
      <div class="absolute left-12px top-12px">
        <div class="cursor-pointer rounded bg-white p-8px hover:bg-gray-1" @click="setStoreMenubar(!storeMenubar)">
          <div class="i-carbon-menu text-20px" />
        </div>
      </div>
      <div class="absolute left-1/2 top-12px translate-x--1/2">
        <div class="rounded bg-white px-8px py-2px">
          <div class="flex items-center gap-2">
            <img src="/icon.svg" class="h-36px w-36px">
            <div v-if="!storeMenubar">
              {{ appName }}
            </div>
            <div v-else class="flex">
              <ALink @click="onSaveGame()">
                <template #icon>
                  <IconSave />
                </template>
                保存
              </ALink>
              <ALink @click="onReadGame()">
                <template #icon>
                  <IconRecord />
                </template>
                读取
              </ALink>
            </div>
          </div>
        </div>
      </div>
      <div class="absolute right-12px top-12px">
        <HomeUserInfoDropDown />
      </div>
    </div>
  </div>
</template>
