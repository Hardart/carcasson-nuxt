<script setup lang="ts">
defineProps<{
  player: IPlayer
}>()
</script>

<template>
  <div class="first-letter:uppercase relative">
    {{ player.name }}
    <PlayerPointsCurrent :points="player.points" />
  </div>
</template>

<style></style>
