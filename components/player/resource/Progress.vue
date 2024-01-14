<script setup lang="ts">
defineProps<{
  progress: number
}>()
</script>

<template>
  <div class="h-full w-full flex bg-neutral-200 rounded-md overflow-hidden relative">
    <div class="absolute bottom-0 w-full bg-yellow-100 z-10" :style="`height: ${progress}%`"></div>
  </div>
</template>

<style></style>
