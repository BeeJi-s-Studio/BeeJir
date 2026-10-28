<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { X } from 'lucide-vue-next'

export interface UiPopoverProps {
  title?: string
  subtitle?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  widthClass?: string
  triggerMode?: 'click' | 'hover'
}

const props = withDefaults(defineProps<UiPopoverProps>(), {
  title: undefined,
  subtitle: undefined,
  position: 'bottom',
  widthClass: 'w-72',
  triggerMode: 'click',
})

const isOpen = ref(false)
const containerRef = ref<HTMLElement | null>(null)

function toggle() {
  if (props.triggerMode === 'click') {
    isOpen.value = !isOpen.value
  }
}

function close() {
  isOpen.value = false
}

function handleMouseEnter() {
  if (props.triggerMode === 'hover') {
    isOpen.value = true
  }
}

function handleMouseLeave() {
  if (props.triggerMode === 'hover') {
    isOpen.value = false
  }
}

function handleClickOutside(event: MouseEvent) {
  const path = event.composedPath ? event.composedPath() : []
  if (
    containerRef.value &&
    !containerRef.value.contains(event.target as Node) &&
    !path.includes(containerRef.value)
  ) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const positionClasses = computed(() => {
  switch (props.position) {
    case 'top':
      return 'bottom-full left-1/2 -translate-x-1/2 mb-2.5'
    case 'left':
      return 'right-full top-1/2 -translate-y-1/2 mr-2.5'
    case 'right':
      return 'left-full top-1/2 -translate-y-1/2 ml-2.5'
    case 'bottom':
    default:
      return 'top-full left-1/2 -translate-x-1/2 mt-2.5'
  }
})
</script>

<template>
  <div
    ref="containerRef"
    class="relative inline-flex"
    :class="isOpen ? 'z-40' : 'z-auto'"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="inline-flex cursor-pointer" @click="toggle">
      <slot name="trigger" :is-open="isOpen" :toggle="toggle" />
    </div>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 scale-95 translate-y-1"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute z-50 rounded-panel border border-[var(--border)] bg-[var(--surface-overlay)] p-4 shadow-xl text-left"
        :class="[positionClasses, widthClass]"
        @click.stop
      >
        <div
          v-if="title || subtitle || triggerMode === 'click'"
          class="flex items-start justify-between gap-2 mb-2.5 pb-2 border-b border-[var(--border)]"
        >
          <div>
            <h5 v-if="title" class="text-xs font-extrabold text-base-content">
              {{ title }}
            </h5>
            <p v-if="subtitle" class="text-[11px] text-base-content/55 mt-0.5">
              {{ subtitle }}
            </p>
          </div>
          <button
            v-if="triggerMode === 'click'"
            type="button"
            class="btn btn-ghost btn-xs btn-circle h-5 w-5 text-base-content/50 hover:text-base-content"
            @click="close"
          >
            <X class="h-3.5 w-3.5" />
          </button>
        </div>

        <div class="text-xs text-base-content/80 leading-relaxed">
          <slot :close="close" />
        </div>
      </div>
    </Transition>
  </div>
</template>
