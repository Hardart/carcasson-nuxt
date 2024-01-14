<script setup lang="ts">
defineProps<{
  resources: IResource[]
  active: IResource | null
}>()
defineEmits(['set-active'])
</script>

<template>
  <ul class="flex justify-around relative">
    <Resourse
      v-for="resource in resources"
      :class="active?.type == resource.type && 'text-neutral-100 !bg-white  border-fuchsia-400'"
      @click="$emit('set-active', resource)"
      :resource="resource"
    />
  </ul>
</template>

<style></style>
