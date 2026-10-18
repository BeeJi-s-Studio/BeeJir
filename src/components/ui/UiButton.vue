<script setup lang="ts">
import { computed } from 'vue'
import { Loader2 } from 'lucide-vue-next'
import type { ColorVariant } from '@/types/theme'

export interface UiButtonProps {
  variant?: ColorVariant | 'ghost'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  soft?: boolean
  outline?: boolean
  block?: boolean
  circle?: boolean
  square?: boolean
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<UiButtonProps>(), {
  variant: undefined,
  size: 'md',
  soft: false,
  outline: false,
  block: false,
  circle: false,
  square: false,
  loading: false,
  disabled: false,
  type: 'button',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const classes = computed(() => {
  const variantMap: Record<string, string> = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    neutral: 'btn-neutral',
    info: 'btn-info',
    success: 'btn-success',
    warning: 'btn-warning',
    error: 'btn-error',
    ghost: 'btn-ghost',
  }

  const sizeMap: Record<string, string> = {
    xs: 'btn-xs',
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
  }

  return [
    'btn',
    props.variant ? variantMap[props.variant] : '',
    sizeMap[props.size],
    props.soft ? 'btn-soft' : '',
    props.outline ? 'btn-outline' : '',
    props.block ? 'btn-block' : '',
    props.circle ? 'btn-circle' : '',
    props.square ? 'btn-square' : '',
  ]
    .filter(Boolean)
    .join(' ')
})
</script>

<template>
  <button
    :type="type"
    :class="classes"
    :disabled="disabled || loading"
    @click="emit('click', $event)"
  >
    <Loader2 v-if="loading" class="h-4 w-4 animate-spin shrink-0" />
    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </button>
</template>
