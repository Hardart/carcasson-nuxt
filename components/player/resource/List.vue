<script setup lang="ts">
defineProps<{
  resources: IResource[]
}>()
</script>

<template>
  <div class="flex gap-x-2 lg:gap-x-5 justify-center h-14">
    <PlayerResourse v-for="resource in resources" :resource="resource" />
  </div>
</template>

<style></style>
