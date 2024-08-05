<script lang="ts" setup>
const { Character } = useCharacter()
const character = ref(new Character('oxygen', 3000, 60, 100, 0, 0, 0, 0, 0, 0.2))
</script>

<template>
  <div class="flex flex-col items-center">
    <div>oxygen</div>
    <div>hp:{{ character.health }}</div>
    <img class="h-56px w-56px" src="~/public/assets/images/character/oxygen.png">
  </div>
</template>
