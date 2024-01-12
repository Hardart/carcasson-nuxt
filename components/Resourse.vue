<script setup lang="ts">
defineProps<{
  resource: IResource
}>()
</script>

<template>
  <div class="grid place-items-center w-28 h-28 rounded-full bg-neutral-200 text-black">{{ resource.type }}</div>
</template>

<style></style>
