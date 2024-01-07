<script lang="ts" setup>
export type PlayerColor = 'pink' | 'blue' | 'yellow' | 'black' | 'green' | 'red'
interface IOption {
  id: PlayerColor
  title: string
}

export interface IPlayer {
  name: string
  color: PlayerColor
  points: number
}
const players: Ref<IPlayer[]> = ref([])
const options: Ref<IOption[]> = ref([
  { id: 'blue', title: 'Синий' },
  { id: 'yellow', title: 'Желтый' },
  { id: 'pink', title: 'Розовый' },
  { id: 'black', title: 'Черный' },
  { id: 'green', title: 'Зеленый' },
  { id: 'red', title: 'Красный' },
])

const player = reactive<IPlayer>({
  name: '',
  color: 'blue',
  points: 0,
})

const addPlayer = () => {
  options.value = options.value.filter(option => option.id !== player.color)
  players.value.push({ ...player })
  if (options.value.length) player.color = options.value[0].id
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
        <li v-for="player in players">{{ player.name }}</li>
      </ul>
    </div>
    <div class="px-10 py-6 bg-stone-300 rounded-lg space-y-3">
      <div v-if="options.length" class="space-y-3">
        <UiInput type="text" icon="el:adult" v-model.trim="player.name" />
        <UiSelect :options="options" v-model="player.color" />
        <UiSimpleButton class="w-full" text="Добавить" @click="addPlayer" />
      </div>
      <div>
        <UiSimpleButton class="w-full bg-green-700" text="Начать игру" @click="startGame" />
      </div>
    </div>
  </div>
</template>
