<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Info,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  X,
} from 'lucide-vue-next'
import type { ColorVariant } from '@/types/theme'

export type AlertStyleType = 'accent-left' | 'soft' | 'glass' | 'solid'

export interface UiAlertProps {
  variant?: ColorVariant
  styleType?: AlertStyleType
  solid?: boolean
  title?: string
  dismissible?: boolean
}

const props = withDefaults(defineProps<UiAlertProps>(), {
  variant: 'info',
  styleType: 'accent-left',
  solid: false,
  title: undefined,
  dismissible: false,
})

const emit = defineEmits<{
  dismiss: []
}>()

const visible = ref(true)

function getIcon(variant: ColorVariant) {
  switch (variant) {
    case 'success':
      return CheckCircle2
    case 'error':
      return XCircle
    case 'warning':
      return AlertTriangle
    case 'primary':
    case 'secondary':
    case 'accent':
      return Sparkles
    case 'info':
    case 'neutral':
    default:
      return Info
  }
}

const isSolid = computed(() => props.solid || props.styleType === 'solid')

const styleClasses = computed(() => {
  const v = props.variant

  if (isSolid.value) {
    const map: Record<ColorVariant, string> = {
      primary: 'bg-primary text-slate-950 border-primary/40 shadow-sm shadow-primary/20 dark:bg-primary/20 dark:text-slate-100 dark:border-primary/40 dark:shadow-none',
      secondary: 'bg-secondary text-slate-950 border-secondary/40 shadow-sm shadow-secondary/20 dark:bg-secondary/20 dark:text-slate-100 dark:border-secondary/40 dark:shadow-none',
      accent: 'bg-accent text-slate-950 border-accent/40 shadow-sm shadow-accent/20 dark:bg-accent/20 dark:text-slate-100 dark:border-accent/40 dark:shadow-none',
      neutral: 'bg-base-300 text-slate-950 border-base-300 shadow-sm dark:bg-base-300 dark:text-base-content dark:border-base-300',
      info: 'bg-info text-slate-950 border-info/40 shadow-sm shadow-info/20 dark:bg-info/20 dark:text-slate-100 dark:border-info/40 dark:shadow-none',
      success: 'bg-success text-slate-950 border-success/40 shadow-sm shadow-success/20 dark:bg-success/20 dark:text-slate-100 dark:border-success/40 dark:shadow-none',
      warning: 'bg-warning text-slate-950 border-warning/50 shadow-sm shadow-warning/20 dark:bg-warning/20 dark:text-slate-100 dark:border-warning/40 dark:shadow-none',
      error: 'bg-error text-slate-950 border-error/40 shadow-sm shadow-error/20 dark:bg-error/20 dark:text-slate-100 dark:border-error/40 dark:shadow-none',
    }
    return `${map[v]} border`
  }

  if (props.styleType === 'glass') {
    const map: Record<ColorVariant, string> = {
      primary: 'bg-primary/8 border-primary/25 text-base-content shadow-xs shadow-primary/10',
      secondary: 'bg-secondary/8 border-secondary/25 text-base-content shadow-xs shadow-secondary/10',
      accent: 'bg-accent/8 border-accent/25 text-base-content shadow-xs shadow-accent/10',
      neutral: 'bg-base-300/30 border-base-300 text-base-content',
      info: 'bg-info/8 border-info/25 text-base-content shadow-xs shadow-info/10',
      success: 'bg-success/8 border-success/25 text-base-content shadow-xs shadow-success/10',
      warning: 'bg-warning/8 border-warning/25 text-base-content shadow-xs shadow-warning/10',
      error: 'bg-error/8 border-error/25 text-base-content shadow-xs shadow-error/10',
    }
    return `${map[v]} border backdrop-blur-md`
  }

  if (props.styleType === 'soft') {
    const map: Record<ColorVariant, string> = {
      primary: 'bg-primary/12 border-primary/20 text-base-content',
      secondary: 'bg-secondary/12 border-secondary/20 text-base-content',
      accent: 'bg-accent/12 border-accent/20 text-base-content',
      neutral: 'bg-base-200 border-base-300 text-base-content',
      info: 'bg-info/12 border-info/20 text-base-content',
      success: 'bg-success/12 border-success/20 text-base-content',
      warning: 'bg-warning/15 border-warning/25 text-base-content',
      error: 'bg-error/12 border-error/20 text-base-content',
    }
    return `${map[v]} border`
  }

  // Default: 'accent-left'
  const map: Record<ColorVariant, string> = {
    primary: 'border-l-4 border-l-primary border-y border-r border-base-300/80 bg-base-100 text-base-content',
    secondary: 'border-l-4 border-l-secondary border-y border-r border-base-300/80 bg-base-100 text-base-content',
    accent: 'border-l-4 border-l-accent border-y border-r border-base-300/80 bg-base-100 text-base-content',
    neutral: 'border-l-4 border-l-neutral border-y border-r border-base-300/80 bg-base-100 text-base-content',
    info: 'border-l-4 border-l-info border-y border-r border-base-300/80 bg-base-100 text-base-content',
    success: 'border-l-4 border-l-success border-y border-r border-base-300/80 bg-base-100 text-base-content',
    warning: 'border-l-4 border-l-warning border-y border-r border-base-300/80 bg-base-100 text-base-content',
    error: 'border-l-4 border-l-error border-y border-r border-base-300/80 bg-base-100 text-base-content',
  }
  return map[v]
})

const iconBoxClasses = computed(() => {
  const v = props.variant
  if (isSolid.value) {
    const solidIconMap: Record<ColorVariant, string> = {
      primary: 'bg-white text-slate-950 shadow-xs ring-1 ring-black/15 dark:bg-primary dark:text-slate-950 font-bold',
      secondary: 'bg-white text-slate-950 shadow-xs ring-1 ring-black/15 dark:bg-secondary dark:text-slate-950 font-bold',
      accent: 'bg-white text-slate-950 shadow-xs ring-1 ring-black/15 dark:bg-accent dark:text-slate-950 font-bold',
      neutral: 'bg-white text-slate-950 shadow-xs ring-1 ring-black/15 dark:bg-slate-200 dark:text-slate-900 font-bold',
      info: 'bg-white text-slate-950 shadow-xs ring-1 ring-black/15 dark:bg-info dark:text-slate-950 font-bold',
      success: 'bg-white text-slate-950 shadow-xs ring-1 ring-black/15 dark:bg-success dark:text-slate-950 font-bold',
      warning: 'bg-white text-slate-950 shadow-xs ring-1 ring-black/15 dark:bg-warning dark:text-slate-950 font-bold',
      error: 'bg-white text-slate-950 shadow-xs ring-1 ring-black/15 dark:bg-error dark:text-slate-950 font-bold',
    }
    return solidIconMap[v]
  }

  const map: Record<ColorVariant, string> = {
    primary: 'bg-primary/15 text-indigo-700 dark:text-primary',
    secondary: 'bg-secondary/15 text-pink-700 dark:text-secondary',
    accent: 'bg-accent/15 text-teal-800 dark:text-accent',
    neutral: 'bg-neutral/15 text-slate-800 dark:text-neutral',
    info: 'bg-info/15 text-sky-800 dark:text-info',
    success: 'bg-success/15 text-emerald-800 dark:text-success',
    warning: 'bg-warning/20 text-amber-900 dark:text-warning',
    error: 'bg-error/15 text-rose-700 dark:text-error',
  }
  return map[v]
})

function handleDismiss() {
  visible.value = false
  emit('dismiss')
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 -translate-y-1"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div
      v-if="visible"
      class="flex w-full items-start gap-3.5 rounded-box p-4 text-sm transition-all shadow-xs"
      :class="styleClasses"
      role="alert"
    >
      <div
        class="flex h-8 w-8 shrink-0 items-center justify-center rounded-btn"
        :class="iconBoxClasses"
      >
        <component :is="getIcon(variant)" class="h-4 w-4" />
      </div>

      <div class="flex-1 min-w-0 pt-0.5">
        <h5
          v-if="title"
          class="font-bold tracking-tight mb-1"
          :class="isSolid ? 'text-slate-950 dark:text-slate-100' : 'text-base-content'"
        >
          {{ title }}
        </h5>
        <div
          class="leading-relaxed"
          :class="isSolid ? 'text-slate-900/95 dark:text-slate-200' : 'text-base-content/80'"
        >
          <slot />
        </div>
        <div v-if="$slots.actions" class="mt-3 flex items-center gap-2">
          <slot name="actions" />
        </div>
      </div>

      <button
        v-if="dismissible"
        type="button"
        class="btn btn-ghost btn-xs btn-circle shrink-0"
        :class="isSolid ? 'text-slate-950/70 hover:text-slate-950 hover:bg-black/10 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10' : 'text-base-content/50 hover:text-base-content'"
        aria-label="Tutup pesan"
        @click="handleDismiss"
      >
        <X class="h-4 w-4" />
      </button>
    </div>
  </Transition>
</template>
