<script setup lang="ts">
import { computed, type Component } from 'vue'
import { ChevronUp, ChevronDown } from 'lucide-vue-next'
import type { ColorVariant } from '@/types/theme'

export interface UiStatCardProps {
  title: string
  value: string
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  description?: string
  badgeText?: string
  variant?: ColorVariant
  icon?: Component
  layout?: 'vertical' | 'horizontal'
}

const props = withDefaults(defineProps<UiStatCardProps>(), {
  change: undefined,
  trend: 'up',
  description: undefined,
  badgeText: undefined,
  variant: 'primary',
  icon: undefined,
  layout: 'horizontal',
})

const avatarSoftClass = computed(() => {
  const map: Record<ColorVariant, string> = {
    primary: 'bg-primary/15 text-primary',
    secondary: 'bg-secondary/15 text-secondary',
    accent: 'bg-accent/15 text-accent',
    neutral: 'bg-neutral/15 text-neutral dark:text-base-content',
    info: 'bg-info/15 text-info',
    success: 'bg-success/15 text-success',
    warning: 'bg-warning/15 text-warning',
    error: 'bg-error/15 text-error',
  }
  return map[props.variant]
})
</script>

<template>
  <!-- Layout 1: CRM Vertical Card (Icon top-left, Trend top-right, Value + Label + Pill below) -->
  <div v-if="layout === 'vertical'" class="card h-full">
    <div class="card-body p-5 flex flex-col justify-between gap-4">
      <div class="flex items-start justify-between gap-2">
        <div
          v-if="icon"
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-btn"
          :class="avatarSoftClass"
        >
          <component :is="icon" class="h-5 w-5" />
        </div>

        <div
          v-if="change"
          class="inline-flex items-center text-xs font-medium"
          :class="
            trend === 'up'
              ? 'text-success'
              : trend === 'down'
                ? 'text-error'
                : 'text-info'
          "
        >
          <span>{{ change }}</span>
          <ChevronUp v-if="trend === 'up'" class="h-4 w-4" />
          <ChevronDown v-else-if="trend === 'down'" class="h-4 w-4" />
        </div>
      </div>

      <div>
        <h4 class="text-xl font-semibold text-base-content mb-0.5">
          {{ value }}
        </h4>
        <p class="text-xs text-base-content/60 mb-2.5">
          {{ title }}
        </p>
        <span
          v-if="badgeText || description"
          class="badge badge-xs bg-base-200 text-base-content/65 font-medium rounded-full"
        >
          {{ badgeText || description }}
        </span>
      </div>
    </div>
  </div>

  <!-- Layout 2: BeeJir Horizontal Stat Card (Left: Title, Value + Change, Description | Right: Soft Square Avatar Icon) -->
  <div v-else class="card h-full">
    <div class="card-body p-5 flex flex-row items-start justify-between gap-3">
      <div class="space-y-1">
        <span class="text-sm font-normal text-base-content/80 block">
          {{ title }}
        </span>
        <div class="flex items-baseline gap-2 flex-wrap">
          <h4 class="text-2xl font-semibold text-base-content tracking-tight">
            {{ value }}
          </h4>
          <span
            v-if="change"
            class="text-xs font-medium"
            :class="
              trend === 'up'
                ? 'text-success'
                : trend === 'down'
                  ? 'text-error'
                  : 'text-info'
            "
          >
            ({{ change }})
          </span>
        </div>
        <p v-if="description" class="text-xs text-base-content/55">
          {{ description }}
        </p>
      </div>

      <div
        v-if="icon"
        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-btn"
        :class="avatarSoftClass"
      >
        <component :is="icon" class="h-5 w-5" />
      </div>
    </div>
  </div>
</template>
