<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { X, ChevronDown, Check, Plus } from 'lucide-vue-next'
import type { ColorVariant } from '@/types/theme'

export interface TagOption {
  label: string
  value: string
  variant?: ColorVariant
}

export interface UiSelectTagProps {
  modelValue?: string[]
  options?: Array<TagOption | string>
  label?: string
  placeholder?: string
  allowCreate?: boolean
  disabled?: boolean
  maxTags?: number
  defaultTagVariant?: ColorVariant
  solid?: boolean
}

const props = withDefaults(defineProps<UiSelectTagProps>(), {
  modelValue: () => [],
  options: () => [],
  label: undefined,
  placeholder: 'Pilih atau cari tag...',
  allowCreate: true,
  disabled: false,
  maxTags: undefined,
  defaultTagVariant: 'primary',
  solid: true,
})

const emit = defineEmits<{
  'update:modelValue': [values: string[]]
  create: [newTag: string]
}>()

const containerRef = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)
const isOpen = ref(false)
const searchQuery = ref('')
const activeIndex = ref(-1)

// Normalize options to TagOption objects
const normalizedOptions = computed<TagOption[]>(() => {
  return props.options.map((opt) => {
    if (typeof opt === 'string') {
      return {
        label: opt,
        value: opt,
        variant: props.defaultTagVariant,
      }
    }
    return {
      ...opt,
      variant: opt.variant || props.defaultTagVariant,
    }
  })
})

// Filtered options based on search query
const filteredOptions = computed<TagOption[]>(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return normalizedOptions.value

  return normalizedOptions.value.filter((opt) =>
    opt.label.toLowerCase().includes(query)
  )
})

// Selected tag objects
const selectedTags = computed<TagOption[]>(() => {
  return props.modelValue.map((val) => {
    const found = normalizedOptions.value.find((opt) => opt.value === val)
    return (
      found || {
        label: val,
        value: val,
        variant: props.defaultTagVariant,
      }
    )
  })
})

const isQueryNew = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return false
  const existsInOptions = normalizedOptions.value.some(
    (opt) => opt.label.toLowerCase() === query
  )
  const existsInSelected = props.modelValue.some(
    (val) => val.toLowerCase() === query
  )
  return !existsInOptions && !existsInSelected
})

function isSelected(value: string): boolean {
  return props.modelValue.includes(value)
}

function selectOption(option: TagOption) {
  if (props.disabled) return

  if (isSelected(option.value)) {
    removeTag(option.value)
  } else {
    if (props.maxTags && props.modelValue.length >= props.maxTags) return
    emit('update:modelValue', [...props.modelValue, option.value])
  }

  searchQuery.value = ''
  activeIndex.value = -1
  inputRef.value?.focus()
}

function removeTag(value: string) {
  if (props.disabled) return
  emit(
    'update:modelValue',
    props.modelValue.filter((v) => v !== value)
  )
}

function createTag() {
  const clean = searchQuery.value.trim()
  if (!clean || !props.allowCreate) return
  if (props.maxTags && props.modelValue.length >= props.maxTags) return

  if (!props.modelValue.includes(clean)) {
    emit('update:modelValue', [...props.modelValue, clean])
    emit('create', clean)
  }

  searchQuery.value = ''
  activeIndex.value = -1
}

function handleKeyDown(event: KeyboardEvent) {
  if (props.disabled) return

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    if (!isOpen.value) {
      isOpen.value = true
      return
    }
    const max = filteredOptions.value.length + (isQueryNew.value ? 1 : 0)
    if (max > 0) {
      activeIndex.value = (activeIndex.value + 1) % max
    }
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    const max = filteredOptions.value.length + (isQueryNew.value ? 1 : 0)
    if (max > 0) {
      activeIndex.value = (activeIndex.value - 1 + max) % max
    }
  } else if (event.key === 'Enter') {
    event.preventDefault()
    if (activeIndex.value >= 0 && activeIndex.value < filteredOptions.value.length) {
      selectOption(filteredOptions.value[activeIndex.value])
    } else if (isQueryNew.value && props.allowCreate) {
      createTag()
    }
  } else if (event.key === 'Backspace' && !searchQuery.value && props.modelValue.length > 0) {
    removeTag(props.modelValue[props.modelValue.length - 1])
  } else if (event.key === 'Escape') {
    isOpen.value = false
    searchQuery.value = ''
  }
}

function handleClickOutside(event: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div
    ref="containerRef"
    class="relative flex flex-col gap-1.5 w-full"
    :class="isOpen ? 'z-30' : 'z-auto'"
  >
    <span v-if="label" class="text-xs font-semibold text-base-content/80">
      {{ label }}
    </span>

    <!-- Input Box with Chips & Search Input -->
    <div
      class="min-h-[42px] w-full rounded-btn border border-base-300 bg-base-100 p-1.5 flex flex-wrap items-center gap-1.5 transition-all duration-150 cursor-text"
      :class="[
        isOpen ? 'ring-2 ring-primary/25 border-primary' : '',
        disabled ? 'opacity-50 cursor-not-allowed bg-base-200/50' : '',
      ]"
      @click="inputRef?.focus(); isOpen = true"
    >
      <!-- Selected Tag Chips (Solid Background) -->
      <span
        v-for="tag in selectedTags"
        :key="tag.value"
        class="badge badge-sm gap-1.5 pl-2.5 pr-1 py-1 font-semibold transition-all shadow-xs"
        :class="[
          `badge-${tag.variant || 'primary'}`,
          solid ? '' : 'badge-soft',
        ]"
      >
        <span>{{ tag.label }}</span>
        <button
          type="button"
          class="rounded-full p-0.5 transition-colors"
          :class="solid ? 'hover:bg-black/20 text-current' : 'hover:opacity-75'"
          :disabled="disabled"
          @click.stop="removeTag(tag.value)"
        >
          <X class="h-3 w-3" />
        </button>
      </span>

      <!-- Inline Search Input -->
      <div class="flex-1 min-w-[120px] flex items-center">
        <input
          ref="inputRef"
          v-model="searchQuery"
          type="text"
          :placeholder="selectedTags.length === 0 ? placeholder : ''"
          :disabled="disabled"
          class="w-full bg-transparent px-2 py-1 text-sm text-base-content placeholder:text-base-content/40 focus:outline-none"
          @focus="isOpen = true"
          @keydown="handleKeyDown"
        />
      </div>

      <!-- Dropdown Toggle Arrow -->
      <div class="flex items-center gap-1 text-base-content/40 pr-1 shrink-0">
        <button
          v-if="selectedTags.length > 0 && !disabled"
          type="button"
          class="btn btn-ghost btn-xs btn-circle h-5 w-5"
          title="Hapus semua tag"
          @click.stop="emit('update:modelValue', [])"
        >
          <X class="h-3 w-3" />
        </button>
        <ChevronDown
          class="h-4 w-4 transition-transform duration-200"
          :class="isOpen ? 'rotate-180 text-primary' : ''"
        />
      </div>
    </div>

    <!-- Dropdown Menu -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 scale-95 -translate-y-1"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen && !disabled"
        class="absolute left-0 right-0 top-full mt-1.5 z-50 max-h-60 overflow-y-auto rounded-box border border-base-300 bg-base-100 p-1.5 shadow-xl"
      >
        <!-- Create New Tag Option -->
        <button
          v-if="isQueryNew && allowCreate"
          type="button"
          class="flex w-full items-center gap-2 rounded-btn px-3 py-2 text-xs font-semibold text-primary hover:bg-primary/10 transition-colors"
          :class="activeIndex === filteredOptions.length ? 'bg-primary/10' : ''"
          @click="createTag"
        >
          <Plus class="h-4 w-4" />
          <span>Buat tag baru: <strong>"{{ searchQuery.trim() }}"</strong></span>
        </button>

        <!-- Options List -->
        <div class="space-y-0.5">
          <button
            v-for="(opt, idx) in filteredOptions"
            :key="opt.value"
            type="button"
            class="flex w-full items-center justify-between rounded-btn px-3 py-2 text-xs font-semibold text-left transition-colors"
            :class="[
              isSelected(opt.value)
                ? 'bg-primary/12 text-primary'
                : 'text-base-content hover:bg-base-200/70',
              activeIndex === idx ? 'ring-1 ring-primary/40 bg-base-200' : '',
            ]"
            @click="selectOption(opt)"
          >
            <div class="flex items-center gap-2">
              <span
                class="h-2 w-2 rounded-full"
                :class="`bg-${opt.variant || 'primary'}`"
              />
              <span>{{ opt.label }}</span>
            </div>
            <Check v-if="isSelected(opt.value)" class="h-3.5 w-3.5" />
          </button>
        </div>

        <!-- Empty State -->
        <div
          v-if="filteredOptions.length === 0 && (!isQueryNew || !allowCreate)"
          class="px-3 py-4 text-center text-xs text-base-content/50"
        >
          Tidak ada opsi yang cocok dengan "{{ searchQuery }}".
        </div>
      </div>
    </Transition>
  </div>
</template>
