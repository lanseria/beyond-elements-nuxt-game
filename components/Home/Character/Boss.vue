<script lang="ts" setup>
const { Character } = useCharacter()
const character = ref(new Character('boss', 25000, 600, 800, 0.3, 0.75, -0.15, 0.2, 0, 0))
</script>

<template>
  <div class="flex flex-col items-center">
    <div>BOSS</div>
    <div>hp:{{ character.health }}</div>
    <img class="h-128px w-128px" src="~/public/assets/images/boss/boss_1.png">
  </div>
</template>
