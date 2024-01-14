<script setup lang="ts">
defineProps<{
  resource: IResource
}>()

const resourcesData = await useResources()
</script>

<template>
  <div class="grid place-items-center w-28 h-28 border-4 rounded-full bg-neutral-200 text-black relative">
    <ResourceCount :count="resourcesData[resource.type]" />
    <img :src="`images/${resource.type}.png`" :alt="resource.type" />
  </div>
</template>

<style></style>
