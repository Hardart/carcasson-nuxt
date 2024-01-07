import { StorageSerializers } from '@vueuse/core'

export default async <T>(url: string, players: any = null) => {
  const serializer = StorageSerializers.object
  const cached = useSessionStorage<T>(url, players, { serializer })
  if (!cached.value) cached.value = null
  return cached
}
