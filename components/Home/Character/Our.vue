<script lang="ts" setup>
import type { Character } from '~/composables/character.js'

defineProps({
  character: {
    type: Object as PropType<Character>,
    required: true,
  },
})
</script>

<template>
  <div class="flex flex-col items-center">
    <div>{{ character.props.name }}</div>
    <div>hp:{{ character.props.health }}</div>
    <img class="h-56px w-56px" :src="character.imageUrl">
  </div>
</template>
