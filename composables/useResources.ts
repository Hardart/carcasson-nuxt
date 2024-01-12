export default async () => {
  const url = 'resources'
  const resources = await useFetchWithCache<Record<ResourceType, number>>(url, { rum: 9, silk: 5, wheat: 6 })
  return resources
}
