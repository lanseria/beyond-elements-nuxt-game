<script lang="ts" setup>
import type { Character } from '~/composables/character.js'

const props = defineProps({
  character: {
    type: Object as PropType<Character>,
    required: true,
  },
})
const isVisible = ref(false)
// 计算当前血量百分比
const healthPercentage = computed(() => {
  const { currentState, props: charProps } = props.character
  return (currentState.health / charProps.health) * 100
})
</script>

<template>
  <div class="flex flex-col items-center gap-1" @click="isVisible = true">
    <div>{{ character.currentState.name }}</div>

    <!-- 血条容器 -->
    <div class="relative h-4 w-full overflow-hidden bg-gray-4">
      <!-- 显示当前血量数值 -->
      <div class="absolute left-1/2 text-8px text-white leading-4 -translate-x-1/2">
        {{ character.currentState.health }}/{{ character.props.health }}
      </div>
      <!-- 血条 -->
      <div
        class="h-full bg-red-500 transition-all duration-300 ease-in-out"
        :style="{ width: `${healthPercentage}%` }"
      />
    </div>
    <img class="h-56px w-56px" :src="character.imageUrl">
    <HomeCharacterModal :character="character.currentState" :is-visible="isVisible" @close="isVisible = false" />
  </div>
</template>
