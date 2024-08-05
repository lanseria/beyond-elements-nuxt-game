<script setup lang="ts">
const router = useRouter()
globalFetchUserInfo(router)
</script>

<template>
  <NuxtLayout name="dashboard">
    <NuxtPage />
  </NuxtLayout>
</template>
