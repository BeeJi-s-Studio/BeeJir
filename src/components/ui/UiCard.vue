<script setup lang="ts">
import { computed } from 'vue'
import type { ColorVariant } from '@/types/theme'

export interface UiCardProps {
  title?: string
  subtitle?: string
  bordered?: boolean
  compact?: boolean
  hoverable?: boolean
  accentTop?: ColorVariant
  overflowVisible?: boolean
}

const props = withDefaults(defineProps<UiCardProps>(), {
  title: undefined,
  subtitle: undefined,
  bordered: true,
  compact: false,
  hoverable: false,
  accentTop: undefined,
  overflowVisible: true,
})

const accentBarClass = computed(() => {
  if (!props.accentTop) return ''
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
  return map[props.accentTop]
})
</script>

<template>
  <div
    class="card"
    :class="[
      overflowVisible ? 'overflow-visible' : 'overflow-hidden',
      bordered ? 'card-bordered' : '',
      compact ? 'card-compact' : '',
      hoverable ? 'card-hover' : '',
    ]"
  >
    <div v-if="accentTop" class="h-1.5 w-full rounded-t-[inherit]" :class="accentBarClass" />
    <div class="card-body">
      <div
        v-if="title || subtitle || $slots.header || $slots.actions"
        class="flex flex-wrap items-start justify-between gap-3"
      >
        <div>
          <slot name="header">
            <h3 v-if="title" class="card-title">{{ title }}</h3>
            <p v-if="subtitle" class="mt-0.5 text-xs text-base-content/60">
              {{ subtitle }}
            </p>
          </slot>
        </div>
        <div v-if="$slots.actions" class="flex items-center gap-2">
          <slot name="actions" />
        </div>
      </div>

      <div class="flex-1">
        <slot />
      </div>

      <div v-if="$slots.footer" class="card-actions border-t border-base-300/60 pt-3 mt-1">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
