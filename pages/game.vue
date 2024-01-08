<script lang="ts" setup>
enum EColor {
  blue = 'text-blue-400',
  pink = 'text-pink-400',
  yellow = 'text-yellow-300',
  black = 'text-neutral-900',
  red = 'text-red-600',
  green = 'text-green-500',
}

const players = await usePlayers()
let timerId: Ref<NodeJS.Timeout | null> = ref(null)
const total = ref(0)
const buttons = [1, 4, 9]
const activePlayer = ref<IPlayer | null>(null)

const isActive = (color: PlayerColor) => {
  if (activePlayer.value) return activePlayer.value.colorId === color
  return false
}

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

const getColor = (color: PlayerColor) => EColor[color]
</script>

<template>
  <ClientOnly>
    <table class="w-full border-spacing-y-3">
      <thead class="h-10">
        <tr>
          <th class="w-[90px]">Цвет</th>
          <th class="text-left">Имя игрока</th>
          <th class="w-[100px]">Очки</th>
        </tr>
      </thead>

      <tbody>
        <template v-for="player in players" v-if="players && players.length">
          <tr class="h-10" :class="isActive(player.colorId) && 'bg-emerald-500 text-neutral-100'" @click="setActivePlayer(player)">
            <td :class="getColor(player.colorId)" class="flex justify-center py-2">
              <div class="bg-white p-2.5 rounded-full">
                <UiMipple />
              </div>
            </td>
            <td class="px-2 text-xl">{{ player.name }}</td>
            <td class="text-center text-2xl font-bold">{{ player.points }}</td>
          </tr>
        </template>
      </tbody>
    </table>

    <div class="p-8" v-if="players">
      <div class="grid grid-cols-3 grid-rows-2 grid-flow-col justify-items-center gap-y-5 text-3xl">
        <template v-for="value in buttons">
          <UiSimpleButton class="w-20 h-20 rounded-full" :text="String(value)" @click="incPoints(value)" />
          <UiSimpleButton class="w-20 h-20 rounded-full" :text="String(value * -1)" @click="incPoints(value * -1)" />
        </template>
      </div>
    </div>
  </ClientOnly>

  <div class="fixed bottom-20 w-full h-10 text-center" v-if="total">
    <h3 class="font-black text-7xl">{{ total }}</h3>
  </div>
</template>

<style scoped></style>
