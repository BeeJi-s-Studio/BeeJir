<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

export interface CarouselSlide {
  id?: string | number
  title?: string
  description?: string
  image?: string
  alt?: string
  [key: string]: unknown
}

export interface UiCarouselProps {
  slides?: CarouselSlide[]
  modelValue?: number
  autoplay?: boolean
  interval?: number
  loop?: boolean
  arrows?: boolean
  indicators?: boolean
  showThumbnails?: boolean
  pauseOnHover?: boolean
  aspectRatio?: 'video' | 'square' | 'wide' | 'auto'
}

const props = withDefaults(defineProps<UiCarouselProps>(), {
  slides: () => [],
  modelValue: 0,
  autoplay: false,
  interval: 5000,
  loop: true,
  arrows: true,
  indicators: true,
  showThumbnails: false,
  pauseOnHover: true,
  aspectRatio: 'video',
})

const emit = defineEmits<{
  'update:modelValue': [index: number]
  change: [index: number]
}>()

const currentIndex = ref(props.modelValue)
let timer: ReturnType<typeof setInterval> | null = null
const isHovered = ref(false)

// Touch / Swipe support
let touchStartX = 0
let touchEndX = 0

watch(
  () => props.modelValue,
  (val) => {
    if (val !== currentIndex.value && val >= 0 && val < totalSlides.value) {
      currentIndex.value = val
    }
  },
)

const totalSlides = computed(() => props.slides.length)

function goTo(index: number) {
  if (totalSlides.value === 0) return
  let next = index
  if (props.loop) {
    if (next < 0) next = totalSlides.value - 1
    if (next >= totalSlides.value) next = 0
  } else {
    if (next < 0) next = 0
    if (next >= totalSlides.value) next = totalSlides.value - 1
  }

  currentIndex.value = next
  emit('update:modelValue', next)
  emit('change', next)
}

function next() {
  goTo(currentIndex.value + 1)
}

function prev() {
  goTo(currentIndex.value - 1)
}

function startAutoplay() {
  if (!props.autoplay || totalSlides.value <= 1) return
  stopAutoplay()
  timer = setInterval(() => {
    if (!props.pauseOnHover || !isHovered.value) {
      next()
    }
  }, props.interval)
}

function stopAutoplay() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function onTouchStart(e: TouchEvent) {
  touchStartX = e.changedTouches[0].screenX
}

function onTouchEnd(e: TouchEvent) {
  touchEndX = e.changedTouches[0].screenX
  handleSwipe()
}

function handleSwipe() {
  const threshold = 40
  const diff = touchStartX - touchEndX
  if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      next() // swipe left -> next
    } else {
      prev() // swipe right -> prev
    }
  }
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})

watch(
  () => [props.autoplay, props.interval],
  () => {
    stopAutoplay()
    startAutoplay()
  },
)

const aspectRatioClass = computed(() => {
  switch (props.aspectRatio) {
    case 'square':
      return 'aspect-square'
    case 'wide':
      return 'aspect-[21/9]'
    case 'auto':
      return 'h-auto min-h-[260px]'
    case 'video':
    default:
      return 'aspect-video'
  }
})
</script>

<template>
  <div
    class="relative w-full select-none overflow-hidden rounded-box group border border-[var(--border)] bg-base-300"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @touchstart.passive="onTouchStart"
    @touchend.passive="onTouchEnd"
  >
    <!-- Slides Viewport -->
    <div class="relative w-full overflow-hidden" :class="aspectRatioClass">
      <div
        class="flex h-full w-full transition-transform duration-500 ease-out"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div
          v-for="(slide, index) in slides"
          :key="slide.id ?? index"
          class="relative h-full w-full shrink-0 flex items-center justify-center overflow-hidden bg-base-900"
        >
          <slot :name="`slide-${index}`" :slide="slide" :index="index">
            <slot :slide="slide" :index="index">
              <!-- Default Slide Render -->
              <img
                v-if="slide.image"
                :src="slide.image"
                :alt="slide.alt ?? slide.title ?? `Slide ${index + 1}`"
                class="h-full w-full object-cover select-none"
              />
              <div
                v-if="slide.title || slide.description"
                class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white"
              >
                <h3 v-if="slide.title" class="text-lg md:text-xl font-bold tracking-tight mb-1">
                  {{ slide.title }}
                </h3>
                <p v-if="slide.description" class="text-xs md:text-sm text-white/80 line-clamp-2 max-w-xl">
                  {{ slide.description }}
                </p>
              </div>
            </slot>
          </slot>
        </div>
      </div>
    </div>

    <!-- Navigation Arrows -->
    <template v-if="arrows && totalSlides > 1">
      <button
        type="button"
        class="absolute left-3 top-1/2 -translate-y-1/2 z-10 btn btn-circle btn-sm bg-[var(--surface-raised)]/80 backdrop-blur-md border border-[var(--border)] text-base-content hover:bg-[var(--surface-raised)] shadow-md transition-opacity opacity-0 group-hover:opacity-100 disabled:opacity-20"
        :disabled="!loop && currentIndex === 0"
        aria-label="Previous Slide"
        @click.stop="prev"
      >
        <ChevronLeft class="h-4 w-4" />
      </button>

      <button
        type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2 z-10 btn btn-circle btn-sm bg-[var(--surface-raised)]/80 backdrop-blur-md border border-[var(--border)] text-base-content hover:bg-[var(--surface-raised)] shadow-md transition-opacity opacity-0 group-hover:opacity-100 disabled:opacity-20"
        :disabled="!loop && currentIndex === totalSlides - 1"
        aria-label="Next Slide"
        @click.stop="next"
      >
        <ChevronRight class="h-4 w-4" />
      </button>
    </template>

    <!-- Dot Indicators -->
    <div
      v-if="indicators && totalSlides > 1"
      class="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md"
    >
      <button
        v-for="(_, idx) in totalSlides"
        :key="idx"
        type="button"
        class="h-2 rounded-full transition-all duration-300"
        :class="[
          currentIndex === idx ? 'w-6 bg-primary' : 'w-2 bg-white/50 hover:bg-white/80',
        ]"
        :aria-label="`Slide ${idx + 1}`"
        @click.stop="goTo(idx)"
      />
    </div>
  </div>

  <!-- Thumbnails row (optional) -->
  <div
    v-if="showThumbnails && totalSlides > 1"
    class="flex items-center gap-2 mt-3 overflow-x-auto pb-1 scrollbar-thin"
  >
    <button
      v-for="(slide, idx) in slides"
      :key="slide.id ?? idx"
      type="button"
      class="relative shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all"
      :class="[
        currentIndex === idx
          ? 'border-primary ring-2 ring-primary/20 scale-105'
          : 'border-transparent opacity-60 hover:opacity-100',
      ]"
      @click="goTo(idx)"
    >
      <img
        v-if="slide.image"
        :src="slide.image"
        :alt="slide.title ?? `Thumbnail ${idx + 1}`"
        class="w-full h-full object-cover"
      />
      <div v-else class="w-full h-full bg-base-300 flex items-center justify-center text-[10px] font-bold">
        {{ idx + 1 }}
      </div>
    </button>
  </div>
</template>
