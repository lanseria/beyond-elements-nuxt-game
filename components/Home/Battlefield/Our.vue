<script lang="ts" setup>
const { characterObjects, initCharacter } = useCharacter()
onMounted(() => {
  initCharacter()
})
</script>

<template>
  <div class="flex gap-4">
    <HomeCharacterOur v-for="(item, index) in characterObjects" :key="index" :character="item" />
  </div>
</template>
