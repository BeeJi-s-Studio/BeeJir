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
    primary: 'bg-gradient-to-r from-primary via-primary/85 to-secondary dark:shadow-[0_2px_16px_rgb(var(--p)/0.75)]',
    secondary: 'bg-gradient-to-r from-secondary via-secondary/85 to-accent dark:shadow-[0_2px_16px_rgb(var(--s)/0.75)]',
    accent: 'bg-gradient-to-r from-accent via-accent/85 to-primary dark:shadow-[0_2px_16px_rgb(var(--a)/0.75)]',
    neutral: 'bg-neutral',
    info: 'bg-gradient-to-r from-info to-primary dark:shadow-[0_2px_16px_rgb(var(--in)/0.7)]',
    success: 'bg-gradient-to-r from-success to-accent dark:shadow-[0_2px_16px_rgb(var(--su)/0.7)]',
    warning: 'bg-gradient-to-r from-warning to-secondary dark:shadow-[0_2px_16px_rgb(var(--wa)/0.7)]',
    error: 'bg-gradient-to-r from-error to-secondary dark:shadow-[0_2px_16px_rgb(var(--er)/0.7)]',
  }
  return map[props.accentTop]
})

const cornerGlowClass = computed(() => {
  const variant = props.accentTop || 'primary'
  const map: Record<ColorVariant, string> = {
    primary: 'bg-primary/10 dark:bg-primary/20',
    secondary: 'bg-secondary/10 dark:bg-secondary/20',
    accent: 'bg-accent/10 dark:bg-accent/20',
    neutral: 'bg-neutral/10 dark:bg-neutral/20',
    info: 'bg-info/10 dark:bg-info/20',
    success: 'bg-success/10 dark:bg-success/20',
    warning: 'bg-warning/10 dark:bg-warning/20',
    error: 'bg-error/10 dark:bg-error/20',
  }
  return map[variant]
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
    <!-- Top Accent Bar OR Subtle Specular Light Edge -->
    <div
      v-if="accentTop"
      class="h-1.5 w-full rounded-t-[inherit]"
      :class="accentBarClass"
    />
    <div
      v-else
      class="pointer-events-none h-[2px] w-full rounded-t-[inherit] bg-gradient-to-r from-transparent via-primary/35 to-transparent dark:via-primary/65 opacity-85"
    />

    <!-- Non-Overflowing Ambient Corner Glow Clipping Layer -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      <div
        class="absolute -top-14 -right-14 h-36 w-36 rounded-full blur-2xl transition-colors duration-500"
        :class="cornerGlowClass"
      />
    </div>

    <div class="card-body">
      <div
        v-if="title || subtitle || $slots.header || $slots.actions"
        class="flex flex-wrap items-start justify-between gap-3 border-b border-base-300/60 dark:border-white/[0.08] pb-3.5"
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

      <div v-if="$slots.footer" class="card-actions border-t border-base-300/60 dark:border-white/[0.08] pt-3 mt-1">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
