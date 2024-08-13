<script lang="ts" setup>
const {
  handCards,
  dropCards,
  initStartCards,
  pushHandCards,
  dropCardsToCardPool,
  autoDrawCardToDrop,
} = useCard()

const {
  bossObjects,
  characterObjects,

  receiveAttack,
}
= useCharacter()
const isAttack = ref(false)
const isAutoAttack = ref(false)
const attackCanvas = shallowRef<HTMLCanvasElement>()
function getCenter(selector: string) {
  const element = document.querySelector(selector)
  if (!element) {
    throw new Error('未找到元素')
  }
  const rect = element.getBoundingClientRect()
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  }
}

function drawLine(start: { x: number, y: number }, end: { x: number, y: number }): Promise<void> {
  return new Promise((resolve) => {
    if (!attackCanvas.value) {
      throw new Error('未找到画布')
    }

    const canvas = attackCanvas.value
    const ctx = canvas.getContext('2d')

    const duration = 500 // 动画持续时间 500ms
    const startTime = performance.now()

    function animate(time: number) {
      const elapsed = time - startTime
      const t = Math.min(elapsed / duration, 1) // 计算时间进度 0 到 1

      // 根据时间进度计算当前线条终点位置
      const currentX = start.x + (end.x - start.x) * t
      const currentY = start.y + (end.y - start.y) * t
      if (!ctx) {
        throw new Error('未找到上下文')
      }
      // 清除画布
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 绘制线条
      ctx.strokeStyle = 'red'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(start.x, start.y)
      ctx.lineTo(currentX, currentY)
      ctx.stroke()

      if (t < 1) {
        requestAnimationFrame(animate)
      }
      else {
        // 动画结束后清除线条并 resolve
        setTimeout(() => {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          resolve()
        }, 500) // 延迟 500ms 清除线条
      }
    }

    requestAnimationFrame(animate)
  })
}

async function startAttack() {
  isAttack.value = true
  try {
    for await (const item of dropCards.value) {
      const our = getCenter(`#${item.owner}`)
      const boss1 = getCenter('#boss1')
      await drawLine(our, boss1)
      const characterIdx = characterObjects.value.findIndex(c => c.props.name === item.owner)
      if (characterIdx === -1) {
        throw new Error('未找到角色')
      }
      // 计算角色攻击力
      const character = characterObjects.value[characterIdx]
      const attack = character.currentState.attack
      bossObjects.value.forEach((boss) => {
        receiveAttack(boss.id, attack)
      })
      // 将攻击完的卡片放入卡片池
      dropCardsToCardPool(item)
    }
    for await (const boss of bossObjects.value) {
      const boss1 = getCenter(`#${boss.props.name}`)
      // 在 characterObjects 随机挑选一位
      const characterIdx = Math.floor(Math.random() * characterObjects.value.length)
      const character = characterObjects.value[characterIdx]
      const our = getCenter(`#${character.props.name}`)
      await drawLine(boss1, our)
      // 计算角色攻击力
      const attack = boss.currentState.attack
      receiveAttack(character.id, attack)
    }
  }
  catch (error) {
    console.error(error)
  }
  pushHandCards(maxHandCards - handCards.value.length)
  isAttack.value = false
}

async function autoAttack() {
  // 自动攻击
  isAutoAttack.value = true
  while (isAutoAttack.value) {
    autoDrawCardToDrop()
    await startAttack()
  }
}

function stopAutoAttack() {
  // 停止自动攻击
  isAutoAttack.value = false
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
        手牌区
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
      </div>
    </div>
  </div>
</template>
