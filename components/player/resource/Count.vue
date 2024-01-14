<script setup lang="ts">
defineProps<{
  count: number
}>()
</script>

<template>
  <div class="absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full bg-stone-600 text-neutral-100 z-20 px-0.5 grid place-items-center">
    <div class="text-[10px] leading-4 font-light"><span class="text-[8px]">x</span>{{ count }}</div>
  </div>
</template>

<style></style>
