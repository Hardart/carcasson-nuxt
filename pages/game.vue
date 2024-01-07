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

const getColor = (color: PlayerColor) => EColor[color]
</script>

<template>
  <ClientOnly>
    <table class="w-full border-spacing-y-3">
      <thead class="h-10">
        <tr>
          <th class="w-[100px]">Цвет</th>
          <th class="text-left">Имя игрока</th>
          <th class="w-[100px]">Очки</th>
        </tr>
      </thead>

      <tbody>
        <template v-for="player in players" v-if="players && players.length">
          <tr class="h-10" :class="isActive(player.colorId) && 'bg-neutral-200'" @click="setActivePlayer(player)">
            <td :class="getColor(player.colorId)" class="px-8 py-2">
              <svg width="40px" height="40px" viewBox="0 0 212 212" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <path
                  d="M95.8,1.3c-13.6,3.9 -20.7,14.4 -23.1,33.8l-1.1,9.9l-12.6,4.1c-42.9,14.3 -60.7,27.8 -58.5,44.3c0.8,6.6 3.7,11.2 8.7,13.7c4,2.1 16.3,3.8 26.6,3.9c6.9,-0 11.2,2.2 11.2,5.7c0,3.6 -4,12.2 -14.4,30.8c-15.4,27.7 -21.7,42.2 -23.1,53.7c-0.6,4.5 -0.4,5.8 1.3,7.8l2,2.5l28.9,0.3c18.8,0.2 30.1,-0.1 32.5,-0.8c4.2,-1.2 5.7,-3 16.8,-21.5c7.7,-12.9 12.3,-18.5 15.2,-18.5c2.5,-0 6.2,4.3 12,14c12.4,20.5 15.7,24.9 19.6,26c2.4,0.7 13.7,1 32.5,0.8l28.9,-0.3l2,-2.5c5.2,-6.4 -1.5,-24.9 -22,-61.8c-15.5,-27.7 -16.9,-32.5 -10.2,-34.8c1.9,-0.7 9.4,-1.6 16.5,-2.1c19,-1.4 24.5,-5 26,-16.9c2.2,-16.5 -15.6,-30 -58.5,-44.3l-12.6,-4.1l-1.1,-9.3c-2.2,-17.5 -7.2,-26.8 -17.4,-32c-6.8,-3.5 -18.5,-4.5 -26.1,-2.4Z"
                />
              </svg>
            </td>
            <td class="px-2">{{ player.name }}</td>
            <td class="text-center text-lg font-bold">{{ player.points }}</td>
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
