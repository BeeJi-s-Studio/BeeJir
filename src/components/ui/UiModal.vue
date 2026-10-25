<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue'
import { X } from 'lucide-vue-next'
import { animateModalIn, animateModalOut } from '@/utils/gsap'
import { lockScroll, unlockScroll } from '@/utils/scrollLock'

export interface UiModalProps {
  modelValue: boolean
  title?: string
  subtitle?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<UiModalProps>(), {
  title: undefined,
  subtitle: undefined,
  maxWidth: 'md',
})

const modalBoxRef = ref<HTMLElement | null>(null)
let isLocked = false

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

watch(
  () => props.modelValue,
  async (isOpen) => {
    if (isOpen) {
      if (!isLocked) {
        lockScroll()
        isLocked = true
      }
      await nextTick()
      if (modalBoxRef.value) {
        animateModalIn(modalBoxRef.value)
      }
    } else {
      if (isLocked) {
        unlockScroll()
        isLocked = false
      }
    }
  },
  { immediate: true },
)

function close() {
  if (modalBoxRef.value) {
    animateModalOut(modalBoxRef.value, () => {
      emit('update:modelValue', false)
    })
  } else {
    emit('update:modelValue', false)
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.modelValue) {
    close()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  if (isLocked) {
    unlockScroll()
    isLocked = false
  }
})

const widthClass = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral/50 backdrop-blur-xs"
        @click.self="close"
      >
        <div
          ref="modalBoxRef"
          class="card card-bordered w-full shadow-2xl"
          :class="widthClass[maxWidth]"
        >
          <div class="flex items-start justify-between gap-4 border-b border-base-300/70 px-6 py-4">
            <div>
              <h3 v-if="title" class="text-lg font-bold text-base-content">
                {{ title }}
              </h3>
              <p v-if="subtitle" class="text-xs text-base-content/60 mt-0.5">
                {{ subtitle }}
              </p>
            </div>
            <button
              type="button"
              class="btn btn-ghost btn-sm btn-circle text-base-content/60"
              aria-label="Tutup modal"
              @click="close"
            >
              <X class="h-4 w-4" />
            </button>
          </div>

          <div class="p-6">
            <slot />
          </div>

          <div
            v-if="$slots.footer"
            class="flex items-center justify-end gap-2 border-t border-base-300/70 bg-base-200/40 px-6 py-3.5 rounded-b-box"
          >
            <slot name="footer" :close="close" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
