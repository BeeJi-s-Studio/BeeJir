<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'

export interface UiTextareaProps {
  modelValue?: string
  label?: string
  placeholder?: string
  hint?: string
  error?: string
  rows?: number
  maxRows?: number
  size?: 'sm' | 'md' | 'lg'
  autoGrow?: boolean
  showCount?: boolean
  maxlength?: number
  disabled?: boolean
}

const props = withDefaults(defineProps<UiTextareaProps>(), {
  modelValue: '',
  label: undefined,
  placeholder: '',
  hint: undefined,
  error: undefined,
  rows: 3,
  maxRows: undefined,
  size: 'md',
  autoGrow: false,
  showCount: false,
  maxlength: undefined,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const textareaRef = ref<HTMLTextAreaElement | null>(null)
const charCount = computed(() => props.modelValue.length)
const atLimit = computed(
  () => props.maxlength !== undefined && charCount.value >= props.maxlength,
)

function resize() {
  const el = textareaRef.value
  if (!el || !props.autoGrow) return

  el.style.height = 'auto'
  const style = window.getComputedStyle(el)
  const lineHeight = parseFloat(style.lineHeight) || 20
  const padding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom)
  const border = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth)
  const max = props.maxRows
    ? props.maxRows * lineHeight + padding + border
    : Number.POSITIVE_INFINITY
  const nextHeight = Math.min(el.scrollHeight + border, max)

  el.style.height = `${nextHeight}px`
  el.style.overflowY = el.scrollHeight + border > max ? 'auto' : 'hidden'
}

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLTextAreaElement).value)
  if (props.autoGrow) nextTick(resize)
}

watch(
  () => props.modelValue,
  () => {
    if (props.autoGrow) nextTick(resize)
  },
)
watch(
  () => props.autoGrow,
  () => nextTick(resize),
)

onMounted(() => nextTick(resize))
</script>

<template>
  <label class="flex w-full flex-col gap-1.5">
    <span v-if="label" class="label-text">
      {{ label }}
    </span>
    <div class="relative w-full">
      <textarea
        ref="textareaRef"
        :value="modelValue"
        :rows="rows"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxlength"
        :aria-invalid="error ? 'true' : undefined"
        class="textarea"
        :class="[
          size === 'sm' ? 'textarea-sm' : size === 'lg' ? 'textarea-lg' : '',
          error ? 'textarea-error' : '',
          autoGrow ? 'resize-none' : 'resize-y',
          showCount ? 'pr-16' : '',
        ]"
        @input="onInput"
      />
      <span
        v-if="showCount"
        aria-hidden="true"
        class="pointer-events-none absolute bottom-2 right-3 text-[10px] font-medium tabular-nums"
        :class="atLimit ? 'text-warning' : 'text-[var(--text-faint)]'"
      >
        {{ maxlength ? `${charCount} / ${maxlength}` : charCount }}
      </span>
    </div>
    <span v-if="error" class="text-xs font-medium text-error">
      {{ error }}
    </span>
    <span v-else-if="hint" class="text-xs text-base-content/55">
      {{ hint }}
    </span>
  </label>
</template>
