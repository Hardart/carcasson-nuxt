<script setup lang="ts">
defineProps<{
  resources: IResource[]
  isActive: (res: IResource) => boolean
}>()
defineEmits(['on-active'])
</script>

<template>
  <ul class="flex justify-around">
    <Resourse v-for="resource in resources" :class="isActive(resource) && 'bg-neutral-400'" @click="$emit('on-active', resource)" :resource="resource" />
  </ul>
</template>

<style></style>
