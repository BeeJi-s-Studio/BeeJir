<script setup lang="ts">
import { computed, type Component } from 'vue'
import { TrendingUp, TrendingDown } from 'lucide-vue-next'
import type { ColorVariant } from '@/types/theme'

export interface UiStatCardProps {
  title: string
  value: string
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  description?: string
  variant?: ColorVariant
  icon?: Component
}

const props = withDefaults(defineProps<UiStatCardProps>(), {
  change: undefined,
  trend: 'up',
  description: undefined,
  variant: 'primary',
  icon: undefined,
})

const palette = computed(() => {
  const map: Record<
    ColorVariant,
    { iconBg: string; iconText: string; glow: string; bar: string }
  > = {
    primary: {
      iconBg: 'bg-primary/12 border-primary/20 dark:bg-primary/22 dark:border-primary/40 dark:shadow-sm dark:shadow-primary/25',
      iconText: 'text-primary',
      glow: 'from-primary/15 dark:from-primary/30 to-transparent',
      bar: 'bg-gradient-to-r from-primary to-secondary dark:shadow-[0_-2px_12px_rgb(var(--p)/0.6)]',
    },
    secondary: {
      iconBg: 'bg-secondary/12 border-secondary/20 dark:bg-secondary/22 dark:border-secondary/40 dark:shadow-sm dark:shadow-secondary/25',
      iconText: 'text-secondary',
      glow: 'from-secondary/15 dark:from-secondary/30 to-transparent',
      bar: 'bg-gradient-to-r from-secondary to-accent dark:shadow-[0_-2px_12px_rgb(var(--s)/0.6)]',
    },
    accent: {
      iconBg: 'bg-accent/12 border-accent/20 dark:bg-accent/22 dark:border-accent/40 dark:shadow-sm dark:shadow-accent/25',
      iconText: 'text-accent',
      glow: 'from-accent/15 dark:from-accent/30 to-transparent',
      bar: 'bg-gradient-to-r from-accent to-primary dark:shadow-[0_-2px_12px_rgb(var(--a)/0.6)]',
    },
    neutral: {
      iconBg: 'bg-neutral/12 border-neutral/20 dark:bg-neutral/30 dark:border-neutral/50',
      iconText: 'text-neutral dark:text-base-content',
      glow: 'from-neutral/15 to-transparent',
      bar: 'bg-neutral',
    },
    info: {
      iconBg: 'bg-info/12 border-info/20 dark:bg-info/22 dark:border-info/40 dark:shadow-sm dark:shadow-info/25',
      iconText: 'text-info',
      glow: 'from-info/15 dark:from-info/30 to-transparent',
      bar: 'bg-gradient-to-r from-info to-primary dark:shadow-[0_-2px_12px_rgb(var(--in)/0.6)]',
    },
    success: {
      iconBg: 'bg-success/12 border-success/20 dark:bg-success/22 dark:border-success/40 dark:shadow-sm dark:shadow-success/25',
      iconText: 'text-success',
      glow: 'from-success/15 dark:from-success/30 to-transparent',
      bar: 'bg-gradient-to-r from-success to-accent dark:shadow-[0_-2px_12px_rgb(var(--su)/0.6)]',
    },
    warning: {
      iconBg: 'bg-warning/15 border-warning/25 dark:bg-warning/22 dark:border-warning/40 dark:shadow-sm dark:shadow-warning/25',
      iconText: 'text-warning',
      glow: 'from-warning/15 dark:from-warning/30 to-transparent',
      bar: 'bg-gradient-to-r from-warning to-secondary dark:shadow-[0_-2px_12px_rgb(var(--wa)/0.6)]',
    },
    error: {
      iconBg: 'bg-error/12 border-error/20 dark:bg-error/22 dark:border-error/40 dark:shadow-sm dark:shadow-error/25',
      iconText: 'text-error',
      glow: 'from-error/15 dark:from-error/30 to-transparent',
      bar: 'bg-gradient-to-r from-error to-secondary dark:shadow-[0_-2px_12px_rgb(var(--er)/0.6)]',
    },
  }
  return map[props.variant]
})
</script>

<template>
  <div class="card card-bordered card-hover relative overflow-hidden group">
    <!-- Subtle colorful corner wash (brighter & richer in dark mode) -->
    <div
      class="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-gradient-to-bl opacity-80 dark:opacity-100 blur-md transition-transform duration-300 group-hover:scale-125"
      :class="palette.glow"
    />

    <div class="card-body p-5 gap-3 relative z-10">
      <div class="flex items-center justify-between gap-3">
        <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 dark:text-base-content/70">
          {{ title }}
        </span>
        <div
          v-if="icon"
          class="flex h-10 w-10 items-center justify-center rounded-btn border transition-transform duration-200 group-hover:scale-105"
          :class="[palette.iconBg, palette.iconText]"
        >
          <component :is="icon" class="h-5 w-5" />
        </div>
      </div>

      <div class="flex items-baseline gap-2.5">
        <span class="text-2xl sm:text-3xl font-extrabold tracking-tight text-base-content">
          {{ value }}
        </span>
        <span
          v-if="change"
          class="badge badge-sm badge-soft font-bold"
          :class="
            trend === 'up'
              ? 'badge-success'
              : trend === 'down'
                ? 'badge-error'
                : 'badge-info'
          "
        >
          <TrendingUp v-if="trend === 'up'" class="h-3 w-3" />
          <TrendingDown v-else-if="trend === 'down'" class="h-3 w-3" />
          {{ change }}
        </span>
      </div>

      <p v-if="description" class="text-xs text-base-content/60 dark:text-base-content/65">
        {{ description }}
      </p>
    </div>

    <!-- Bottom colorful indicator line -->
    <div class="h-1 w-full opacity-85 dark:opacity-100" :class="palette.bar" />
  </div>
</template>
