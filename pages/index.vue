<script setup lang="ts">
import { appName } from '~/constants'

const router = useRouter()

const btnTextContent = ref(MAP_BASE_LAYER[0])

function handleChangeLayer() {
  const map = window.map
  const previousBaseLayer = MAP_BASE_LAYER[storeCurrentBaseLayer.value]
  map.setLayoutProperty(`${previousBaseLayer}-layer`, 'visibility', 'none')

  storeCurrentBaseLayer.value = (storeCurrentBaseLayer.value + 1) % MAP_BASE_LAYER.length
  const newBaseLayer = MAP_BASE_LAYER[storeCurrentBaseLayer.value]
  map.setLayoutProperty(`${newBaseLayer}-layer`, 'visibility', 'visible')

  const baseLayerName = newBaseLayer
  btnTextContent.value = `${baseLayerName}`
}
globalFetchUserInfo(router)
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
            <div v-else>
              <AButton @click.stop="handleChangeLayer">
                {{ btnTextContent }}
              </AButton>
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
