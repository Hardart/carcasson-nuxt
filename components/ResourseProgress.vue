<script setup lang="ts">
const props = defineProps<{
  resource: IResource
}>()
const progress = computed(() => (props.resource.count * 100) / props.resource.maxValue)
</script>

<template>
  <div class="w-16 h-[65px] bg-yellow-300 rounded-md relative">
    <div class="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-stone-600 text-neutral-100 z-20 text-sm px-0.5 font-light grid place-items-center">
      <div><span class="text-xs">x</span>{{ resource.count }}</div>
    </div>
    <div class="h-full w-full flex bg-neutral-200 rounded-md overflow-hidden relative">
      <div class="absolute bottom-0 w-full bg-sky-500 dark:bg-blue-600 z-10" :style="`height: ${progress}%`"></div>
    </div>
  </div>
</template>

<style></style>
