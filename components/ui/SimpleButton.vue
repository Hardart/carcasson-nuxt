<script setup lang="ts">
defineProps<{
  text: string
  disabled?: boolean
}>()
</script>

<template>
  <button class="px-5 py-2 bg-sky-500 text-white hover:bg-sky-600 active:bg-sky-700 disabled:bg-neutral-400" :disabled="disabled">
    {{ text }}
  </button>
</template>
