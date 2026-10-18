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
      iconBg: 'bg-primary/12 border-primary/20',
      iconText: 'text-primary',
      glow: 'from-primary/10 to-transparent',
      bar: 'bg-primary',
    },
    secondary: {
      iconBg: 'bg-secondary/12 border-secondary/20',
      iconText: 'text-secondary',
      glow: 'from-secondary/10 to-transparent',
      bar: 'bg-secondary',
    },
    accent: {
      iconBg: 'bg-accent/12 border-accent/20',
      iconText: 'text-accent',
      glow: 'from-accent/10 to-transparent',
      bar: 'bg-accent',
    },
    neutral: {
      iconBg: 'bg-neutral/12 border-neutral/20',
      iconText: 'text-neutral',
      glow: 'from-neutral/10 to-transparent',
      bar: 'bg-neutral',
    },
    info: {
      iconBg: 'bg-info/12 border-info/20',
      iconText: 'text-info',
      glow: 'from-info/10 to-transparent',
      bar: 'bg-info',
    },
    success: {
      iconBg: 'bg-success/12 border-success/20',
      iconText: 'text-success',
      glow: 'from-success/10 to-transparent',
      bar: 'bg-success',
    },
    warning: {
      iconBg: 'bg-warning/15 border-warning/25',
      iconText: 'text-warning',
      glow: 'from-warning/10 to-transparent',
      bar: 'bg-warning',
    },
    error: {
      iconBg: 'bg-error/12 border-error/20',
      iconText: 'text-error',
      glow: 'from-error/10 to-transparent',
      bar: 'bg-error',
    },
  }
  return map[props.variant]
})
</script>

<template>
  <div class="card card-bordered card-hover relative overflow-hidden group">
    <!-- Subtle colorful corner wash -->
    <div
      class="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-bl opacity-80 transition-transform duration-300 group-hover:scale-125"
      :class="palette.glow"
    />

    <div class="card-body p-5 gap-3">
      <div class="flex items-center justify-between gap-3">
        <span class="text-xs font-bold uppercase tracking-wider text-base-content/55">
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
          class=" badge badge-sm badge-soft font-bold"
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

      <p v-if="description" class="text-xs text-base-content/60">
        {{ description }}
      </p>
    </div>

    <!-- Bottom colorful indicator line -->
    <div class="h-1 w-full opacity-75" :class="palette.bar" />
  </div>
</template>
