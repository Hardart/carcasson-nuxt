<script setup lang="ts">
defineProps<{
  count: number
}>()
</script>

<template>
  <div
    class="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-stone-600 text-neutral-100 z-20 text-sm px-0.5 font-light grid place-items-center"
  >
    <div><span class="text-[10px]">x</span>{{ count }}</div>
  </div>
</template>

<style></style>
