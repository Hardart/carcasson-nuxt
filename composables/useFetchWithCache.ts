import { StorageSerializers } from '@vueuse/core'

export default async <T>(url: string, value: any = null) => {
  const serializer = StorageSerializers.object
  const cached = useSessionStorage<T>(url, value, { serializer })
  if (!cached.value) cached.value = null
  return cached
}
