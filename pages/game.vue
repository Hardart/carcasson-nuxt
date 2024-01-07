<script lang="ts" setup>
import type { IPlayer, PlayerColor } from './index.vue'
const players = await usePlayers()
const buttons = [1, 4, 9]
const activePlayer = ref<IPlayer | null>(null)
const isActive = (color: PlayerColor) => {
  if (activePlayer.value) return activePlayer.value.colorId === color
  return false
}
let timerId: Ref<NodeJS.Timeout | null> = ref(null)
const total = ref(0)

const setActivePlayer = (player: IPlayer) => {
  total.value = 0
  activePlayer.value = player
}
const incPoints = (value: number) => {
  if (!activePlayer.value) return
  resetTotal()
  activePlayer.value!.points += value
  total.value += value
}
const resetTotal = () => {
  if (timerId.value) clearTimeout(timerId.value)
  timerId.value = setTimeout(() => {
    total.value = 0
  }, 3000)
}
</script>

<template>
  <ClientOnly>
    <table class="w-full border-spacing-y-3">
      <thead class="h-10">
        <tr>
          <th class="w-3/4">Имя игрока</th>
          <th>Очки</th>
        </tr>
      </thead>

      <tbody>
        <template v-for="player in players" v-if="players && players.length">
          <tr :class="isActive(player.colorId) && 'bg-neutral-200'" @click="setActivePlayer(player)">
            <td class="p-2">{{ player.name }}</td>
            <td class="text-center">{{ player.points }}</td>
          </tr>
        </template>
      </tbody>
    </table>

    <div class="grid gap-5 p-10" v-if="players">
      <div class="grid grid-cols-2 gap-5">
        <template v-for="value in buttons">
          <UiSimpleButton :text="String(value)" @click="incPoints(value)" />
          <UiSimpleButton :text="String(value * -1)" @click="incPoints(value * -1)" />
        </template>
      </div>
    </div>
  </ClientOnly>

  <div class="fixed bottom-20 w-full h-10 text-center" v-if="total">
    <h3 class="font-black text-7xl">{{ total }}</h3>
  </div>
</template>

<style scoped></style>
