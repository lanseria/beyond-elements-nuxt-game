<script lang="ts" setup>
const { Character } = useCharacter()
const character = ref(new Character('carbon', 5000, 319, 200, 0, 0, 0, 0, 0, 0))
</script>

<template>
  <div class="flex flex-col items-center">
    <div>carbon</div>
    <div>hp:{{ character.health }}</div>
    <img class="h-56px w-56px" src="~/public/assets/images/character/carbon.png">
  </div>
</template>
