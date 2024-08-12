<script lang="ts" setup>
const { characterObjects, initCharacter } = useCharacter()
onMounted(() => {
  initCharacter()
})
</script>

<template>
  <div class="flex gap-4">
    <HomeCharacterOur v-for="(item, index) in characterObjects" :id="item.props.name" :key="index" :character="item" />
  </div>
</template>
