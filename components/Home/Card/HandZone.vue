<script lang="ts" setup>
const { handCards, handleClickHandCard } = useCard()
</script>

<template>
  <div class="relative">
    <div class="grid grid-cols-4 gap-4">
      <div v-for="(item, index) in maxHandCards" :key="index" class="h-56px w-56px flex flex-col items-center justify-center border" />
    </div>
    <div class="absolute grid grid-cols-4 gap-4">
      <div
        v-for="(card, index) in handCards"
        :key="index"
        class="h-56px w-56px flex flex-col items-center justify-center border"
        @click="handleClickHandCard(card)"
      >
        <div>{{ card.owner }}</div>
        <div>{{ card.type }}</div>
      </div>
    </div>
  </div>
</template>
