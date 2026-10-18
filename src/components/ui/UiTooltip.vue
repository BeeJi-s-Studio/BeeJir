<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ColorVariant } from '@/types/theme'

export interface UiTooltipProps {
  text: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  variant?: ColorVariant
}

const props = withDefaults(defineProps<UiTooltipProps>(), {
  position: 'top',
  variant: 'neutral',
})

const isVisible = ref(false)

const positionClasses = computed(() => {
  switch (props.position) {
    case 'bottom':
      return 'top-full left-1/2 -translate-x-1/2 mt-2'
    case 'left':
      return 'right-full top-1/2 -translate-y-1/2 mr-2'
    case 'right':
      return 'left-full top-1/2 -translate-y-1/2 ml-2'
    case 'top':
    default:
      return 'bottom-full left-1/2 -translate-x-1/2 mb-2'
  }
})

const variantClasses = computed(() => {
  const map: Record<ColorVariant, string> = {
    neutral: 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950',
    primary: 'bg-primary text-primary-content',
    secondary: 'bg-secondary text-secondary-content',
    accent: 'bg-accent text-accent-content',
    info: 'bg-info text-info-content',
    success: 'bg-success text-success-content',
    warning: 'bg-warning text-slate-950',
    error: 'bg-error text-error-content',
  }
  return map[props.variant]
})
</script>

<template>
  <div
    class="relative inline-flex"
    @mouseenter="isVisible = true"
    @mouseleave="isVisible = false"
    @focusin="isVisible = true"
    @focusout="isVisible = false"
  >
    <slot />

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isVisible && text"
        role="tooltip"
        class="pointer-events-none absolute z-50 whitespace-nowrap rounded-btn px-2.5 py-1.5 text-[11px] font-semibold shadow-lg"
        :class="[positionClasses, variantClasses]"
      >
        {{ text }}
      </div>
    </Transition>
  </div>
</template>
