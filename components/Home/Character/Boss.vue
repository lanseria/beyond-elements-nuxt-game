<script lang="ts" setup>
import type { Character } from '~/composables/character.js'

defineProps({
  character: {
    type: Object as PropType<Character>,
    required: true,
  },
})
const isVisible = ref(false)
</script>

<template>
  <div class="flex flex-col items-center" @click="isVisible = true">
    <div>{{ character.currentState.name }}</div>
    <div>hp:{{ character.currentState.health }}</div>
    <img class="h-56px w-56px" :src="character.imageUrl">
    <HomeCharacterModal :character="character.currentState" :is-visible="isVisible" @close="isVisible = false" />
  </div>
</template>
