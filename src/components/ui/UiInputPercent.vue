<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: number | null
    label?: string
    placeholder?: string
    hint?: string
    error?: string
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    min?: number
    max?: number
    decimals?: number
    showSlider?: boolean
  }>(),
  {
    modelValue: null,
    label: undefined,
    placeholder: '0',
    hint: undefined,
    error: undefined,
    size: 'md',
    disabled: false,
    min: 0,
    max: 100,
    decimals: 1,
    showSlider: false,
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | null): void
  (e: 'change', value: number | null): void
}>()

const isFocused = ref(false)
const displayValue = ref('')
const inputElementRef = ref<HTMLInputElement | null>(null)

function formatFormatted(num: number): string {
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: props.decimals,
  }).format(num)
}

function syncDisplayFromModel() {
  if (props.modelValue === null || props.modelValue === undefined || isNaN(props.modelValue)) {
    displayValue.value = ''
    return
  }
  displayValue.value = formatFormatted(props.modelValue)
}

watch(
  () => props.modelValue,
  () => {
    if (!isFocused.value) {
      syncDisplayFromModel()
    }
  },
  { immediate: true }
)

function onFocus() {
  isFocused.value = true
  if (props.modelValue !== null && props.modelValue !== undefined && !isNaN(props.modelValue)) {
    displayValue.value = formatFormatted(props.modelValue)
  }
}

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  const raw = target.value

  if (!raw.trim()) {
    displayValue.value = ''
    emit('update:modelValue', null)
    emit('change', null)
    return
  }

  // Filter numeric and decimal comma/dot
  const cleaned = raw.replace(/[^0-9.,]/g, '')
  // Normalize comma/dot to single dot for parsing
  const normalized = cleaned.replace(/,/g, '.')

  if (normalized === '' || normalized === '.') {
    displayValue.value = cleaned
    emit('update:modelValue', null)
    emit('change', null)
    return
  }

  let num = parseFloat(normalized)
  if (!isNaN(num)) {
    const effectiveMin = props.min !== undefined ? props.min : 0
    const effectiveMax = props.max !== undefined ? props.max : 100

    // Strict clamp to 100 (or max)
    if (num > effectiveMax) {
      num = effectiveMax
      displayValue.value = num.toString()
      nextTick(() => {
        if (inputElementRef.value) {
          inputElementRef.value.value = num.toString()
        }
      })
    } else if (num < effectiveMin) {
      num = effectiveMin
      displayValue.value = cleaned
    } else {
      displayValue.value = cleaned
    }

    emit('update:modelValue', num)
    emit('change', num)
  }
}

function onBlur() {
  isFocused.value = false
  syncDisplayFromModel()
}

function onSliderInput(event: Event) {
  const target = event.target as HTMLInputElement
  const val = parseFloat(target.value)
  if (!isNaN(val)) {
    emit('update:modelValue', val)
    emit('change', val)
    displayValue.value = val.toString()
  }
}
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <div v-if="label || showSlider" class="flex items-center justify-between">
      <label v-if="label" class="label-text">
        {{ label }}
      </label>
      <span v-if="showSlider && modelValue !== null" class="font-mono text-xs font-semibold text-primary">
        {{ modelValue }}%
      </span>
    </div>

    <!-- Wrapper styled strictly identical to standard .input -->
    <div
      class="w-full rounded-btn bg-base-100 text-base-content border border-base-300 transition-colors duration-150 flex items-center hover:border-primary/40 focus-within:!outline-none focus-within:!bg-base-100 focus-within:!ring-2 focus-within:!ring-primary/20 focus-within:!border-primary dark:border-base-300 dark:bg-base-100 dark:hover:border-primary/40"
      :class="[
        error ? '!border-error focus-within:!border-error focus-within:!ring-error/20' : '',
        disabled ? 'opacity-50 cursor-not-allowed bg-base-200/50' : '',
        size === 'sm' ? 'h-8 text-xs' : size === 'lg' ? 'h-12 text-base' : 'h-10 text-sm'
      ]"
    >
      <!-- Numeric Input -->
      <input
        ref="inputElementRef"
        type="text"
        :value="displayValue"
        :placeholder="placeholder"
        :disabled="disabled"
        class="w-full h-full bg-transparent px-3 text-sm font-mono text-base-content outline-none ring-0 border-0 focus:outline-none focus:ring-0 focus:border-0 placeholder:text-base-content/40 shadow-none"
        :class="size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'"
        @focus="onFocus"
        @input="onInput"
        @blur="onBlur"
      />

      <!-- Percent Symbol Addon -->
      <div class="pr-3 pl-1 shrink-0 select-none flex items-center gap-1.5">
        <span class="rounded bg-base-200/80 px-2 py-0.5 text-xs font-bold text-base-content/75 font-mono">
          %
        </span>
      </div>
    </div>

    <!-- Optional Range Slider for quick adjustments -->
    <div v-if="showSlider" class="mt-1 flex items-center gap-2">
      <input
        type="range"
        :min="min"
        :max="max"
        :step="decimals > 0 ? 0.5 : 1"
        :value="modelValue ?? min"
        :disabled="disabled"
        class="range range-primary range-xs flex-1"
        @input="onSliderInput"
      />
      <span class="text-[10px] font-mono text-base-content/50 shrink-0">
        {{ min }}% - {{ max }}%
      </span>
    </div>

    <!-- Error or Hint message -->
    <span v-if="error" class="text-xs font-medium text-error">
      {{ error }}
    </span>
    <span v-else-if="hint" class="text-xs text-base-content/55">
      {{ hint }}
    </span>
  </div>
</template>
