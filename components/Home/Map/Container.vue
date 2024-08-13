<script lang="ts" setup>
const {
  isAttack,
  isAutoAttack,
  duration,
  isGameOver,

  cardPool,
  dropCards,

  attackCanvas,

  initStartCards,
  startAttack,
  stopAutoAttack,
  autoAttack,

  initGame,
} = useCard()
const marks = {
  10: '10ms',
  100: '100ms',
  200: '200ms',
  300: '300ms',
  400: '400ms',
  500: '500ms',
}
onMounted(() => {
  initStartCards()
  if (attackCanvas.value) {
    attackCanvas.value.width = window.innerWidth
    attackCanvas.value.height = window.innerHeight
  }
})
</script>

<template>
  <div class="relative flex flex-x-hidden flex-col overflow-hidden">
    <canvas ref="attackCanvas" class="pointer-events-none absolute left-0 top-0" />
    <div class="h-full flex flex-grow basis-1/3 flex-col items-center justify-end">
      <HomeBattlefieldEnemy class="flex justify-center" />
      <div class="my-2 flex justify-center">
        敌方
      </div>
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
        手牌区[卡片池*{{ cardPool.length }}]
      </div>
      <HomeCardHandZone class="flex justify-center" />
      <div class="my-2 h-1px w-full bg-gray-2" />
      <div class="flex justify-center gap-2">
        <AButton type="primary" :disabled="dropCards.length === 0 || isAttack" @click="startAttack">
          <template #icon>
            <IconDoubleUp />
          </template>
          发动
        </AButton>
        <AButton v-if="!isAutoAttack" type="primary" status="success" @click="autoAttack">
          自动攻击
        </AButton>
        <AButton v-else type="primary" status="warning" @click="stopAutoAttack">
          停止自动攻击
        </AButton>
        <AButton type="primary" status="danger" :disabled="isAutoAttack || isAttack" @click="initGame">
          重置
        </AButton>
      </div>
      <div class="my-2 h-1px w-full bg-gray-2" />

      <div class="flex justify-center">
        <div class="w-90%">
          <ASlider v-model:model-value="duration" :step="5" :min="10" :max="500" class="w-full" :marks="marks" />
        </div>
      </div>
    </div>
    <HomeMapModal :is-visible="isGameOver" @close="initGame" />
  </div>
</template>
