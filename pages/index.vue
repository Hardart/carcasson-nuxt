<script lang="ts" setup>
const players: Ref<IPlayer[]> = ref([])
const options: Ref<IOption[]> = ref([
  { id: 'blue', title: 'Синий' },
  { id: 'yellow', title: 'Желтый' },
  { id: 'pink', title: 'Розовый' },
  { id: 'black', title: 'Черный' },
  { id: 'green', title: 'Зеленый' },
  { id: 'red', title: 'Красный' },
])
const resources: IResource[] = [
  { type: 'rum', count: 0, maxValue: 9 },
  { type: 'silk', count: 0, maxValue: 5 },
  { type: 'wheat', count: 0, maxValue: 6 },
]

const player = reactive<IPlayer>({
  name: '',
  colorId: 'blue',
  points: {
    current: 0,
    total: 0,
    showCurrent: false,
  },
  resources,
})

const addPlayer = () => {
  options.value = options.value.filter(option => option.id !== player.colorId)
  players.value.push({ ...player })
  if (options.value.length) player.colorId = options.value[0].id
  player.name = ''
}

const startGame = () => {
  const router = useRouter()
  useSessionStorage('players', players)
  router.push('/game')
}
</script>

<template>
  <div class="fixed inset-0 grid place-items-center bg-stone-500">
    <div class="absolute top-2">
      <ul>
        <li v-for="(player, index) in players" class="flex gap-3 text-white">
          <div>{{ index + 1 }}:</div>
          <div>{{ player.name }}</div>
        </li>
      </ul>
    </div>
    <div class="px-10 py-6 bg-stone-300 rounded-lg space-y-3">
      <div v-if="options.length" class="space-y-3">
        <UiInput type="text" icon="el:adult" v-model.trim="player.name" />
        <UiSelect :options="options" v-model="player.colorId" />
        <UiSimpleButton class="w-full rounded-[6px]" text="Добавить" @click="addPlayer" :disabled="player.name.length <= 2" />
      </div>
      <div v-if="players.length >= 2">
        <UiSimpleButton class="w-full rounded-[6px] bg-green-700" text="Начать игру" @click="startGame" />
      </div>
    </div>
  </div>
</template>
