<script setup lang="ts">
defineProps<{
  type: ResourceType
}>()
</script>

<template>
  <div class="absolute z-20 h-full w-full">
    <img :src="`/images/${type}.png`" class="object-contain h-full w-full" :alt="type" />
  </div>
</template>

<style></style>
