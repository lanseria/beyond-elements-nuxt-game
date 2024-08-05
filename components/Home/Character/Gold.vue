<script lang="ts" setup>
const { Character } = useCharacter()
const character = ref(new Character('gold', 15000, 247, 250, 0, 0, -0.15, 0, 0, 0))
</script>

<template>
  <div class="flex flex-col items-center">
    <div>gold</div>
    <div>hp:{{ character.health }}</div>
    <img class="h-56px w-56px" src="~/public/assets/images/character/gold.png">
  </div>
</template>
