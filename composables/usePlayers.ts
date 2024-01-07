import type { IPlayer } from '~/pages/index.vue'

export default async () => {
  const url = 'players'
  const players = await useFetchWithCache<IPlayer[]>(url)
  return players
}
