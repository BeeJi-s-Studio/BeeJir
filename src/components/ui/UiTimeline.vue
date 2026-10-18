<script setup lang="ts">
import { CheckCircle2 } from 'lucide-vue-next'
import type { ColorVariant } from '@/types/theme'

export interface TimelineItem {
  id: string | number
  title: string
  description?: string
  time: string
  variant?: ColorVariant
  icon?: any
  badge?: string
  author?: string
}

export interface UiTimelineProps {
  items: TimelineItem[]
}

defineProps<UiTimelineProps>()

function getDotClasses(variant: ColorVariant = 'primary') {
  const map: Record<ColorVariant, string> = {
    primary: 'bg-primary text-primary-content ring-primary/20',
    secondary: 'bg-secondary text-secondary-content ring-secondary/20',
    accent: 'bg-accent text-accent-content ring-accent/20',
    neutral: 'bg-neutral text-neutral-content ring-neutral/20',
    info: 'bg-info text-info-content ring-info/20',
    success: 'bg-success text-success-content ring-success/20',
    warning: 'bg-warning text-slate-950 ring-warning/25',
    error: 'bg-error text-error-content ring-error/20',
  }
  return map[variant]
}
</script>

<template>
  <div class="relative space-y-6 before:absolute before:top-2 before:bottom-2 before:left-4 before:w-0.5 before:bg-base-300">
    <div
      v-for="item in items"
      :key="item.id"
      class="relative flex items-start gap-4 pl-10 group"
    >
      <!-- Timeline Node / Dot -->
      <div
        class="absolute left-0 top-0.5 flex h-8 w-8 items-center justify-center rounded-full ring-4 transition-transform group-hover:scale-110 shadow-xs"
        :class="getDotClasses(item.variant)"
      >
        <component
          :is="item.icon || CheckCircle2"
          class="h-4 w-4"
        />
      </div>

      <!-- Content Card -->
      <div class="flex-1 rounded-box border border-base-300/80 bg-base-100 p-4 shadow-2xs transition-all group-hover:border-primary/30">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
          <div class="flex items-center gap-2">
            <h5 class="text-sm font-bold text-base-content">
              {{ item.title }}
            </h5>
            <span
              v-if="item.badge"
              class="badge badge-xs font-bold"
              :class="`badge-soft badge-${item.variant || 'primary'}`"
            >
              {{ item.badge }}
            </span>
          </div>
          <span class="text-[11px] font-mono font-medium text-base-content/50">
            {{ item.time }}
          </span>
        </div>

        <p v-if="item.description" class="text-xs text-base-content/70 leading-relaxed">
          {{ item.description }}
        </p>

        <div v-if="item.author" class="mt-2.5 flex items-center gap-1.5 text-[11px] font-semibold text-base-content/55">
          <span>Oleh:</span>
          <span class="text-primary">{{ item.author }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
