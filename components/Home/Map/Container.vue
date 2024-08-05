<script lang="ts" setup>
</script>

<template>
  <div class="relative flex flex-x-hidden flex-col overflow-hidden">
    <div class="relative flex-1">
      <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        敌方
      </div>
      <HomeCharacterBoss class="absolute bottom-1/2 left-1/2 translate-y-1/2 transform -translate-x-1/2" />
    </div>
    <div class="h-1px w-full bg-gray-2" />
    <div class="relative flex-1">
      <div class="absolute left-1/2 top-0 transform -translate-x-1/2">
        我方
      </div>
      <HomeBattlefieldOur class="absolute bottom-1/2 left-1/2 translate-y-1/2 transform -translate-x-1/2" />
    </div>
  </div>
</template>
