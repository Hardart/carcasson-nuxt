<script setup lang="ts">
defineProps<{
  count: number
}>()
</script>

<template>
  <div class="absolute w-6 h-6 top-0 right-1 text-neutral-200 bg-neutral-600 flex justify-center items-center rounded-full">
    {{ count }}
  </div>
</template>

<style></style>
