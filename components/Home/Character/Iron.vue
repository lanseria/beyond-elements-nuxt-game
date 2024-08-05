<script lang="ts" setup>
const { Character } = useCharacter()
const character = ref(new Character('iron', 8500, 555, 275, 0.6, 0.5, 0, 0, 0.05, 0))
</script>

<template>
  <div class="flex flex-col items-center">
    <div>iron</div>
    <div>hp:{{ character.health }}</div>
    <img class="h-56px w-56px" src="~/public/assets/images/character/iron.png">
  </div>
</template>
