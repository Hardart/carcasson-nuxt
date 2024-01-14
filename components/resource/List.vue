<script setup lang="ts">
defineProps<{
  resources: IResource[]
  isActive: (res: IResource) => boolean
}>()
defineEmits(['set-active'])
</script>

<template>
  <ul class="flex justify-around relative">
    <Resourse
      v-for="resource in resources"
      :class="isActive(resource) && 'text-neutral-100 !bg-white  border-fuchsia-400'"
      @click="$emit('set-active', resource)"
      :resource="resource"
    />
  </ul>
</template>

<style></style>
