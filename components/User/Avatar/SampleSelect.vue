<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})
const emits = defineEmits(['update:modelValue'])
const avatar = useVModel(props, 'modelValue', emits)
function handleAvatar() {
  avatar.value = sampleAvatar()
}
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <AImage :src="avatar" :width="100" />
    <ALink @click="handleAvatar()">
      更换头像
    </ALink>
  </div>
</template>
