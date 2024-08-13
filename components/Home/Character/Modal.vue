<script setup lang="ts">
import type { CharacterProps } from '~/composables/character'

const props = defineProps<{ character: CharacterProps, isVisible: boolean, onClose: () => void }>()

function close() {
  props.onClose()
}

function formatKey(key: string) {
  return key.replace(/([A-Z])/g, ' $1').toLowerCase()
}
</script>

<template>
  <Teleport to="body">
    <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="w-80 rounded bg-white p-4 shadow-lg">
        <h2 class="mb-4 text-xl font-bold">
          {{ character.name }}
        </h2>
        <ul>
          <li v-for="(value, key) in character" :key="key" class="mb-2">
            <span class="font-semibold capitalize">{{ formatKey(key) }}:</span> {{ value }}
          </li>
        </ul>
        <button class="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600" @click="close">
          关闭
        </button>
      </div>
    </div>
  </Teleport>
</template>
