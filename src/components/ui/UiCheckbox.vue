<script setup lang="ts">
import { computed } from 'vue'
import type { ColorVariant } from '@/types/theme'

export interface UiCheckboxProps {
  modelValue?: boolean | any[]
  value?: any
  label?: string
  description?: string
  variant?: ColorVariant
  size?: 'xs' | 'sm' | 'md' | 'lg'
  disabled?: boolean
  indeterminate?: boolean
}

const props = withDefaults(defineProps<UiCheckboxProps>(), {
  modelValue: false,
  value: undefined,
  label: undefined,
  description: undefined,
  variant: 'primary',
  size: 'md',
  disabled: false,
  indeterminate: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: any]
  change: [event: Event]
}>()

const isChecked = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.includes(props.value)
  }
  return Boolean(props.modelValue)
})

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (Array.isArray(props.modelValue)) {
    const arr = [...props.modelValue]
    if (target.checked) {
      if (!arr.includes(props.value)) arr.push(props.value)
    } else {
      const idx = arr.indexOf(props.value)
      if (idx !== -1) arr.splice(idx, 1)
    }
    emit('update:modelValue', arr)
  } else {
    emit('update:modelValue', target.checked)
  }
  emit('change', event)
}

const variantClass = computed(() => {
  const map: Record<ColorVariant, string> = {
    primary: 'checkbox-primary',
    secondary: 'checkbox-secondary',
    accent: 'checkbox-accent',
    neutral: 'checkbox-neutral',
    info: 'checkbox-info',
    success: 'checkbox-success',
    warning: 'checkbox-warning',
    error: 'checkbox-error',
  }
  return map[props.variant] || 'checkbox-primary'
})

const sizeClass = computed(() => {
  const map = {
    xs: 'checkbox-xs',
    sm: 'checkbox-sm',
    md: 'checkbox-md',
    lg: 'checkbox-lg',
  }
  return map[props.size] || 'checkbox-md'
})
</script>

<template>
  <label
    class="inline-flex items-start gap-2.5 select-none"
    :class="[
      disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
      label || description ? 'py-1' : '',
    ]"
  >
    <input
      type="checkbox"
      :checked="isChecked"
      :disabled="disabled"
      :indeterminate.prop="indeterminate"
      class="checkbox mt-0.5"
      :class="[variantClass, sizeClass]"
      @change="handleChange"
    />
    <div v-if="label || description" class="flex flex-col leading-tight">
      <span v-if="label" class="text-xs font-semibold text-base-content">
        {{ label }}
      </span>
      <span v-if="description" class="text-[11px] text-base-content/60 mt-0.5">
        {{ description }}
      </span>
    </div>
  </label>
</template>
