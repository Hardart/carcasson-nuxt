<script setup lang="ts">
enum EColor {
  blue = 'bg-blue-300',
  pink = 'bg-pink-300',
  yellow = 'bg-yellow-300',
  black = 'bg-neutral-600',
  red = 'bg-red-300',
  green = 'bg-green-300',
}
const props = defineProps<{
  label?: string
  options: { id: keyof typeof EColor; title: string }[]
  modelValue?: any
  isRequried?: boolean
  name?: string
  positon?: 'top' | 'bottom'
}>()

const emit = defineEmits(['update:model-value'])
const defaultValue = computed(() => {
  return props.options.find(opn => opn.id == props.modelValue)?.title || props.options[0].title
})

const open = ref(false)
const openState = () => {
  open.value = !open.value
}

const changeActiveElement = (id: string) => {
  emit('update:model-value', id)
  openState()
}
</script>
<template>
  <div>
    <div>
      <div class="relative">
        <UiSelectButton :value="defaultValue" @click="openState" />
        <TransitionExpand :duration="150">
          <div
            v-if="open"
            class="z-10 absolute max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            :class="positon === 'bottom' ? 'mt-1' : 'bottom-full mb-1'"
          >
            <ul v-for="option in options">
              <li
                :class="['relative cursor-default select-none py-2 pl-7 pr-4', EColor[option.id], option.id === 'black' && 'text-white']"
                @click="changeActiveElement(option.id)"
              >
                <span :class="['block truncate']">{{ option.title }}</span>
                <span v-if="defaultValue == option.title" class="absolute inset-y-0 left-0 flex items-center pl-2 text-emerald-700">
                  <Icon name="heroicons:check" size="14" aria-hidden="true" />
                </span>
              </li>
            </ul>
          </div>
        </TransitionExpand>
      </div>
    </div>
  </div>
</template>
