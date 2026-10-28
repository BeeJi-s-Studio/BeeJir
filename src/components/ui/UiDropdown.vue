<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import type { ColorVariant } from '@/types/theme'
import { animateDropdownIn, animateDropdownOut } from '@/utils/gsap'

export interface DropdownItem {
  label?: string
  value?: string | number
  icon?: any
  badge?: string
  badgeVariant?: ColorVariant
  danger?: boolean
  disabled?: boolean
  divider?: boolean
}

export interface UiDropdownProps {
  label?: string
  items?: DropdownItem[]
  align?: 'left' | 'right'
  variant?: ColorVariant | 'ghost' | 'soft'
  size?: 'xs' | 'sm' | 'md'
  widthClass?: string
}

withDefaults(defineProps<UiDropdownProps>(), {
  label: 'Menu Aksi',
  items: () => [],
  align: 'left',
  variant: 'primary',
  size: 'md',
  widthClass: 'w-56',
})

const emit = defineEmits<{
  select: [item: DropdownItem]
}>()

const isOpen = ref(false)
const containerRef = ref<HTMLElement | null>(null)

function toggle() {
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
}

function handleSelect(item: DropdownItem) {
  if (item.disabled || item.divider) return
  emit('select', item)
  close()
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
</script>

<template>
  <div
    ref="containerRef"
    class="relative inline-flex"
    :class="isOpen ? 'z-[90]' : 'z-auto'"
  >
    <!-- Trigger -->
    <div class="inline-flex" @click="toggle">
      <slot name="trigger" :is-open="isOpen" :toggle="toggle">
        <button
          type="button"
          class="btn"
          :class="[
            variant === 'ghost'
              ? 'btn-ghost'
              : variant === 'soft'
                ? 'btn-soft btn-primary'
                : `btn-${variant}`,
            size === 'xs' ? 'btn-xs' : size === 'sm' ? 'btn-sm' : 'btn-md',
          ]"
        >
          <span>{{ label }}</span>
          <ChevronDown
            class="h-4 w-4 transition-transform duration-200"
            :class="isOpen ? 'rotate-180' : ''"
          />
        </button>
      </slot>
    </div>

    <!-- Menu Panel -->
    <Transition
      :css="false"
      @enter="(el, done) => animateDropdownIn(el, done)"
      @leave="(el, done) => animateDropdownOut(el, done)"
    >
      <div
        v-if="isOpen"
        class="absolute top-full mt-2 z-[100] rounded-panel border border-[var(--border)] bg-[var(--surface-overlay)] p-1.5 shadow-xl"
        :class="[align === 'right' ? 'right-0' : 'left-0', widthClass]"
        @click.stop
      >
        <slot :close="close">
          <template v-for="(item, idx) in items" :key="idx">
            <div
              v-if="item.divider"
              class="my-1 border-t border-[var(--border)]"
            />
            <button
              v-else
              type="button"
              :disabled="item.disabled"
              class="flex w-full items-center justify-between gap-2.5 rounded-btn px-3 py-2 text-xs font-semibold text-left transition-colors"
              :class="[
                item.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
                item.danger
                  ? 'text-error hover:bg-error/12'
                  : 'text-base-content hover:bg-[var(--surface-raised)] dark:hover:bg-white/[0.06]',
              ]"
              @click="handleSelect(item)"
            >
              <div class="flex items-center gap-2.5 min-w-0">
                <component
                  :is="item.icon"
                  v-if="item.icon"
                  class="h-4 w-4 shrink-0"
                  :class="item.danger ? 'text-error' : 'text-base-content/65'"
                />
                <span class="truncate">{{ item.label }}</span>
              </div>

              <span
                v-if="item.badge"
                class="badge badge-xs font-bold"
                :class="`badge-soft badge-${item.badgeVariant || 'primary'}`"
              >
                {{ item.badge }}
              </span>
            </button>
          </template>
        </slot>
      </div>
    </Transition>
  </div>
</template>
