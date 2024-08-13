<script setup lang="ts">
const props = defineProps<{ isVisible: boolean, onClose: () => void }>()

function close() {
  props.onClose()
}
</script>

<template>
  <Teleport to="body">
    <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="w-80 rounded bg-white p-4 shadow-lg">
        <h2 class="mb-4 text-xl font-bold">
          游戏结束
        </h2>
        <button class="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600" @click="close">
          关闭
        </button>
      </div>
    </div>
  </Teleport>
</template>
