<script setup lang="ts">
import { computed } from 'vue'
import type { ColorVariant } from '@/types/theme'

export interface UiBadgeProps {
  variant?: ColorVariant
  size?: 'sm' | 'md' | 'lg'
  soft?: boolean
  outline?: boolean
  dot?: boolean
}

const props = withDefaults(defineProps<UiBadgeProps>(), {
  variant: undefined,
  size: 'md',
  soft: false,
  outline: false,
  dot: false,
})

const classes = computed(() => {
  const variantMap: Record<ColorVariant, string> = {
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    accent: 'badge-accent',
    neutral: 'badge-neutral',
    info: 'badge-info',
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
  }

  return [
    'badge',
    props.variant ? variantMap[props.variant] : '',
    props.size === 'sm' ? 'badge-sm' : '',
    props.size === 'lg' ? 'badge-lg' : '',
    props.soft ? 'badge-soft' : '',
    props.outline ? 'badge-outline' : '',
  ]
    .filter(Boolean)
    .join(' ')
})
</script>

<template>
  <span :class="classes">
    <span
      v-if="dot"
      class="h-1.5 w-1.5 rounded-full bg-current opacity-75"
    />
    <slot />
  </span>
</template>
