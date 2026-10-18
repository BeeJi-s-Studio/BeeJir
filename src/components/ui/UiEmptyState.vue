<script setup lang="ts">
import { computed } from 'vue'
import { Inbox } from 'lucide-vue-next'
import type { ColorVariant } from '@/types/theme'

export interface UiEmptyStateProps {
  title?: string
  description?: string
  icon?: any
  variant?: ColorVariant
  compact?: boolean
}

const props = withDefaults(defineProps<UiEmptyStateProps>(), {
  title: 'Belum Ada Data Tersedia',
  description: 'Data yang Anda cari belum tersedia atau tidak ditemukan untuk kriteria pencarian saat ini.',
  icon: undefined,
  variant: 'primary',
  compact: false,
})

const iconContainerClass = computed(() => {
  const map: Record<ColorVariant, string> = {
    primary: 'bg-primary/12 text-primary ring-primary/20',
    secondary: 'bg-secondary/12 text-secondary ring-secondary/20',
    accent: 'bg-accent/12 text-accent ring-accent/20',
    neutral: 'bg-neutral/12 text-neutral ring-neutral/20',
    info: 'bg-info/12 text-info ring-info/20',
    success: 'bg-success/12 text-success ring-success/20',
    warning: 'bg-warning/15 text-warning ring-warning/25',
    error: 'bg-error/12 text-error ring-error/20',
  }
  return map[props.variant]
})
</script>

<template>
  <div
    class="flex flex-col items-center justify-center text-center rounded-box border border-dashed border-base-300 bg-base-200/30 transition-all"
    :class="compact ? 'p-6' : 'p-10 sm:p-12'"
  >
    <div
      class="flex items-center justify-center rounded-full ring-8 mb-4 transition-transform hover:scale-105"
      :class="[iconContainerClass, compact ? 'h-12 w-12' : 'h-16 w-16']"
    >
      <slot name="icon">
        <component
          :is="icon || Inbox"
          :class="compact ? 'h-6 w-6' : 'h-8 w-8'"
        />
      </slot>
    </div>

    <h4
      class="font-extrabold text-base-content"
      :class="compact ? 'text-sm' : 'text-base sm:text-lg'"
    >
      {{ title }}
    </h4>

    <p
      v-if="description"
      class="mt-1.5 max-w-md text-xs sm:text-sm text-base-content/60 leading-relaxed"
    >
      {{ description }}
    </p>

    <div v-if="$slots.actions || $slots.default" class="mt-5 flex flex-wrap items-center justify-center gap-2.5">
      <slot name="actions">
        <slot />
      </slot>
    </div>
  </div>
</template>
