<script lang="ts" setup>
const { initStartCards } = useCard()
onMounted(() => {
  initStartCards()
})
</script>

<template>
  <div class="relative flex flex-x-hidden flex-col overflow-hidden">
    <div class="relative flex-grow basis-1/3">
      <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        敌方
      </div>
      <div class="h-200px w-full" />
      <HomeBattlefieldEnemy class="flex justify-center" />
    </div>
    <div class="h-1px w-full bg-gray-5" />
    <div class="relative flex-grow basis-2/3">
      <div class="my-2 w-full flex justify-center">
        我方
      </div>
      <HomeBattlefieldOur class="flex justify-center" />
      <div class="my-2 h-1px w-full bg-gray-2" />
      <div class="my-2 w-full flex justify-center">
        卡片放置区
      </div>
      <HomeCardDropZone class="flex justify-center" />
      <div class="my-2 h-1px w-full bg-gray-2" />
      <div class="my-2 w-full flex justify-center">
        手牌区
      </div>
      <HomeCardHandZone class="flex justify-center" />
    </div>
  </div>
</template>
