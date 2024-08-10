<script lang="ts" setup>
const { handCards, initRandomCards } = useCard()
onMounted(() => {
  initRandomCards()
})
</script>

<template>
  <div>
    <div class="grid grid-cols-4 gap-4">
      <div v-for="(card, index) in handCards" :key="index" class="h-56px w-56px flex flex-col items-center justify-center border">
        <div>{{ card.owner }}</div>
        <div>{{ card.type }}</div>
      </div>
    </div>
  </div>
</template>
