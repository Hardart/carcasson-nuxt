<script lang="ts" setup>
defineProps<{
  points: IPoints
}>()
</script>

<template>
  <span
    class="absolute ml-6 -top-1 duration-300 font-bold text-3xl transition-opacity"
    :class="points.showCurrent ? 'opacity-100' : 'opacity-0'"
    >{{ points.current }}</span
  >
</template>

<style scoped></style>
