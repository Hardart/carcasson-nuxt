<script setup lang="ts">
const props = defineProps<{
  resource: IResource
}>()
const progress = computed(() => (props.resource.count * 100) / props.resource.maxValue)
</script>

<template>
  <div class="w-full rounded-md relative">
    <PlayerResourceCount :count="resource.count" />
    <PlayerResourceIcon :type="resource.type" />
    <PlayerResourceProgress :progress="progress" />
  </div>
</template>

<style></style>
