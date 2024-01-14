<script lang="ts" setup>
enum EColor {
  blue = 'text-blue-400',
  pink = 'text-pink-400',
  yellow = 'text-yellow-300',
  black = 'text-neutral-900',
  red = 'text-red-600',
  green = 'text-green-500',
}
const delay = (ms: number = 0) => new Promise(res => setTimeout(res, ms))

const prevPlayerTimerId = reactive<Record<string, NodeJS.Timeout>>({})

const players = await usePlayers()
const resourcesData = await useResources()

const timerId: Ref<NodeJS.Timeout | null> = ref(null)
const buttons = [1, 4, 9]
const activePlayer = ref<IPlayer | null>(null)
const activeResource = ref<IResource | null>(null)

const isActivePlayer = (colorId: PlayerColor) => activePlayer.value?.colorId === colorId

const isActiveResourse = (resource: IResource) => activeResource.value?.type === resource.type

const setActivePlayer = (player: IPlayer) => {
  activePlayer.value = player
  if (player.points.showCurrent) clearTimeout(prevPlayerTimerId[player.colorId])
  timerId.value = null
}

const setActiveResourse = (resource: IResource) => {
  if (!activePlayer.value) return
  activeResource.value = resource
}

const incPoints = (value: number) => {
  if (!activePlayer.value) return
  activePlayer.value.points.showCurrent = true
  resetTotal(activePlayer.value)
  activePlayer.value.points.total += value
  activePlayer.value.points.current += value
  sortPayers()
}

const incResourse = (increase: boolean = true) => {
  if (!activePlayer.value || !activeResource.value) return
  activePlayer.value.resources = activePlayer.value.resources.map(changeResourceCount(increase))
  console.log(resourcesData.value)
}

function changeResourceCount(increase: boolean) {
  return function (item: IResource) {
    const searchType = activeResource.value!.type
    if (item.type === searchType) {
      if (increase && resourcesData.value[searchType] > 0) {
        resourcesData.value[searchType]--
        item.count++
      } else if (!increase && resourcesData.value[searchType] < item.maxValue) {
        resourcesData.value[searchType]++
        item.count--
      }
    }
    return item
  }
}

const resetTotal = (player: IPlayer) => {
  const timerid = timerId.value
  if (timerid) clearTimeout(timerid)
  timerId.value = setTimeout(() => resetCurrentPoints(player), 4000)
  prevPlayerTimerId[player.colorId] = timerId.value
}

async function resetCurrentPoints(player: IPlayer) {
  player.points.showCurrent = false
  await delay(300)
  player.points.current = 0
}
const findResourse = () => activePlayer.value?.resources.find(res => res.type === activeResource.value?.type)
const sortPayers = () => (players.value = players.value.sort((a, b) => b.points.total - a.points.total))
const getColor = (color: PlayerColor) => EColor[color]

const mustDisabled = () => {
  return !(activePlayer.value && activeResource.value)
}
</script>

<template>
  <ClientOnly>
    <div class="grid grid-cols-12 h-10 text-xl mx-2 items-center font-bold gap-x-3">
      <div class="col-span-2 text-center">Цвет</div>
      <div class="col-span-8 sm:col-span-5">Имя игрока</div>
      <div class="col-span-4 sm:col-span-3 text-center hidden sm:block">Ресурсы</div>
      <div class="col-span-2 text-center">Очки</div>
    </div>

    <TransitionFade group tag="ul" class="space-y-3">
      <div
        v-for="player in players"
        :key="player.colorId"
        v-if="players && players.length"
        class="grid grid-cols-12 text-xl mx-2 items-center gap-x-3"
        :class="isActivePlayer(player.colorId) && 'bg-emerald-500 text-neutral-100'"
        @click="setActivePlayer(player)"
      >
        <div :class="getColor(player.colorId)" class="col-span-2 flex justify-center p-2">
          <UiMipple />
        </div>
        <div class="col-span-8 sm:col-span-5 px-2 first-letter:uppercase relative">
          {{ player.name }}
          <PlayerPointsCurrent :points="player.points" />
        </div>
        <div class="col-span-4 sm:col-span-3 px-2 text-2xl font-bold hidden sm:block">
          <PlayerResourceList :resources="player.resources" />
        </div>
        <div class="col-span-2 text-center px-2 text-2xl font-bold">{{ player.points.total }}</div>
      </div>
    </TransitionFade>

    <div class="p-8" v-if="players" @dblclick.prevent>
      <div class="grid grid-cols-3 grid-rows-2 grid-flow-col justify-items-center gap-y-5 text-3xl">
        <template v-for="value in buttons">
          <UiSimpleButton @dblclick.prevent class="w-20 h-20 rounded-full" :text="String(value)" @click="incPoints(value)" />
          <UiSimpleButton @dblclick.prevent class="w-20 h-20 rounded-full" :text="String(value * -1)" @click="incPoints(value * -1)" />
        </template>
      </div>
    </div>

    <div class="bg-zinc-100 py-6">
      <ResourceList v-if="players" :resources="players[0].resources" :is-active="isActiveResourse" @set-active="setActiveResourse" />
      <div class="flex justify-around max-w-[70%] mx-auto">
        <UiSimpleButton @dblclick.prevent class="w-20 h-20 rounded-full" text="1" @click="incResourse" :disabled="mustDisabled()" />
        <UiSimpleButton @dblclick.prevent class="w-20 h-20 rounded-full" text="-1" @click="incResourse(false)" :disabled="mustDisabled()" />
      </div>
    </div>
  </ClientOnly>

  <!-- <div class="fixed bottom-20 w-full h-10 text-center" v-if="total">
    <h3 class="font-black text-7xl">{{ total }}</h3>
  </div> -->
</template>

<style>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}
</style>
