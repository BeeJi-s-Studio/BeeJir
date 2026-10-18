<script setup lang="ts">
import { computed } from 'vue'
import type { ColorVariant } from '@/types/theme'

export interface UiProgressProps {
  value?: number
  max?: number
  variant?: ColorVariant
  size?: 'xs' | 'sm' | 'md' | 'lg'
  label?: string
  showValue?: boolean
  striped?: boolean
  animated?: boolean
}

const props = withDefaults(defineProps<UiProgressProps>(), {
  value: 0,
  max: 100,
  variant: 'primary',
  size: 'md',
  label: undefined,
  showValue: false,
  striped: false,
  animated: false,
})

const percentage = computed(() => {
  if (props.max <= 0) return 0
  const raw = (props.value / props.max) * 100
  return Math.min(100, Math.max(0, Math.round(raw)))
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'h-1.5'
    case 'sm':
      return 'h-2.5'
    case 'lg':
      return 'h-5'
    case 'md':
    default:
      return 'h-3.5'
  }
})

const variantBarClass = computed(() => {
  const map: Record<ColorVariant, string> = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
    neutral: 'bg-neutral',
    info: 'bg-info',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
  }
  return map[props.variant]
})
</script>

<template>
  <div class="w-full space-y-1.5">
    <div v-if="label || showValue" class="flex items-center justify-between text-xs">
      <span v-if="label" class="font-semibold text-base-content/85">{{ label }}</span>
      <span v-if="showValue" class="font-mono font-bold text-base-content/75">
        {{ percentage }}%
      </span>
    </div>

    <div
      class="progress"
      :class="sizeClass"
      role="progressbar"
      :aria-valuenow="value"
      :aria-valuemin="0"
      :aria-valuemax="max"
    >
      <div
        class="progress-bar"
        :class="[
          variantBarClass,
          striped ? 'progress-striped' : '',
          animated ? 'progress-striped progress-animated' : '',
        ]"
        :style="{ width: `${percentage}%` }"
      />
    </div>
  </div>
</template>
