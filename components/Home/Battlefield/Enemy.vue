<script lang="ts" setup>
const { bossObjects, initBoss } = useCharacter()
onMounted(() => {
  initBoss()
})
</script>

<template>
  <div class="flex gap-4">
    <HomeCharacterBoss v-for="(item, index) in bossObjects" :id="item.props.name" :key="index" :character="item" />
  </div>
</template>
