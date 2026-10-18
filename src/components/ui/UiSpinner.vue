<script setup lang="ts">
import { computed } from 'vue'
import type { ColorVariant } from '@/types/theme'

export interface UiSpinnerProps {
  variant?: ColorVariant
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  type?: 'ring' | 'dots' | 'pulse'
  label?: string
}

const props = withDefaults(defineProps<UiSpinnerProps>(), {
  variant: 'primary',
  size: 'md',
  type: 'ring',
  label: undefined,
})

const colorClass = computed(() => {
  const map: Record<ColorVariant, string> = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    neutral: 'text-neutral',
    info: 'text-info',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
  }
  return map[props.variant]
})

const bgClass = computed(() => {
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

const sizeDimension = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'h-4 w-4'
    case 'sm':
      return 'h-5 w-5'
    case 'lg':
      return 'h-8 w-8'
    case 'xl':
      return 'h-12 w-12'
    case 'md':
    default:
      return 'h-6 w-6'
  }
})

const dotDimension = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'h-1.5 w-1.5'
    case 'sm':
      return 'h-2 w-2'
    case 'lg':
      return 'h-3 w-3'
    case 'xl':
      return 'h-4 w-4'
    case 'md':
    default:
      return 'h-2.5 w-2.5'
  }
})
</script>

<template>
  <div class="inline-flex items-center gap-2.5" role="status" aria-live="polite">
    <!-- 1. Ring Spinner -->
    <svg
      v-if="type === 'ring'"
      class="animate-spin shrink-0"
      :class="[sizeDimension, colorClass]"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-20"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="3.5"
      />
      <path
        class="opacity-95"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>

    <!-- 2. Bouncing Dots Spinner -->
    <div v-else-if="type === 'dots'" class="inline-flex items-center gap-1">
      <span
        class="rounded-full animate-bounce [animation-delay:-0.3s]"
        :class="[dotDimension, bgClass]"
      />
      <span
        class="rounded-full animate-bounce [animation-delay:-0.15s]"
        :class="[dotDimension, bgClass]"
      />
      <span
        class="rounded-full animate-bounce"
        :class="[dotDimension, bgClass]"
      />
    </div>

    <!-- 3. Pulse Ripple Spinner -->
    <div v-else-if="type === 'pulse'" class="relative inline-flex items-center justify-center" :class="sizeDimension">
      <span
        class="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
        :class="bgClass"
      />
      <span
        class="relative inline-flex rounded-full h-3/5 w-3/5"
        :class="bgClass"
      />
    </div>

    <span v-if="label" class="text-xs font-semibold text-base-content/75">
      {{ label }}
    </span>
  </div>
</template>
