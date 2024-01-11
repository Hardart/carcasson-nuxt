export default async () => {
  const url = 'players'
  const players = await useFetchWithCache<IPlayer[]>(url)
  return players
}
