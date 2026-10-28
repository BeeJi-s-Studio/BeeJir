<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import { ArrowDown } from 'lucide-vue-next'

export interface UiMessageScrollProps {
  autoScroll?: boolean
  smooth?: boolean
  showScrollButton?: boolean
  threshold?: number
}

const props = withDefaults(defineProps<UiMessageScrollProps>(), {
  autoScroll: true,
  smooth: true,
  showScrollButton: true,
  threshold: 80,
})

const emit = defineEmits<{
  'scroll-bottom': []
  'scroll-top': []
}>()

const scrollContainerRef = ref<HTMLDivElement | null>(null)
const isAtBottom = ref(true)
const hasNewMessages = ref(false)

function checkIfAtBottom(): boolean {
  if (!scrollContainerRef.value) return true
  const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.value
  return scrollHeight - scrollTop - clientHeight <= props.threshold
}

function handleScroll() {
  if (!scrollContainerRef.value) return
  const atBottom = checkIfAtBottom()
  isAtBottom.value = atBottom

  if (atBottom) {
    hasNewMessages.value = false
    emit('scroll-bottom')
  } else if (scrollContainerRef.value.scrollTop === 0) {
    emit('scroll-top')
  }
}

function scrollToBottom(forceSmooth = props.smooth) {
  if (!scrollContainerRef.value) return
  const el = scrollContainerRef.value
  el.scrollTo({
    top: el.scrollHeight,
    behavior: forceSmooth ? 'smooth' : 'instant',
  })
  isAtBottom.value = true
  hasNewMessages.value = false
}

// Expose scrollToBottom to parent components
defineExpose({
  scrollToBottom,
  scrollContainerRef,
})

// MutationObserver to detect DOM changes (e.g. new messages added)
let observer: MutationObserver | null = null

onMounted(() => {
  if (scrollContainerRef.value) {
    scrollToBottom(false)

    observer = new MutationObserver(() => {
      if (props.autoScroll && isAtBottom.value) {
        nextTick(() => {
          scrollToBottom(props.smooth)
        })
      } else {
        hasNewMessages.value = true
      }
    })

    observer.observe(scrollContainerRef.value, {
      childList: true,
      subtree: true,
      characterData: true,
    })
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})
</script>

<template>
  <div class="relative w-full h-full min-h-0 flex flex-col overflow-hidden">
    <!-- Main Scrollable Message Feed -->
    <div
      ref="scrollContainerRef"
      class="flex-1 w-full overflow-y-auto overscroll-contain p-4 space-y-3.5 scrollbar-thin select-text"
      @scroll.passive="handleScroll"
    >
      <slot />
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-2 scale-90"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-2 scale-90"
    >
      <div
        v-if="showScrollButton && (!isAtBottom || hasNewMessages)"
        class="absolute bottom-4 right-6 z-20"
      >
        <button
          type="button"
          class="btn btn-circle btn-sm shadow-xl bg-[var(--surface-overlay)] backdrop-blur-md border border-[var(--border)] text-base-content hover:bg-[var(--surface-raised)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center relative cursor-pointer"
          aria-label="Scroll to bottom"
          @click="scrollToBottom(true)"
        >
          <ArrowDown class="h-4 w-4" />

          <!-- Unread indicator pulse badge -->
          <span
            v-if="hasNewMessages"
            class="absolute -top-1 -right-1 flex h-3 w-3"
          >
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span class="relative inline-flex rounded-full h-3 w-3 bg-primary" />
          </span>
        </button>
      </div>
    </Transition>
  </div>
</template>
