<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Check, ChevronLeft, ChevronRight } from 'lucide-vue-next'

export interface StepItem {
  id: string | number
  title: string
  subtitle?: string
  icon?: any
}

export interface UiStepperProps {
  modelValue?: number
  steps: StepItem[]
  clickable?: boolean
  showControls?: boolean
  showProgress?: boolean
  progressLabel?: string
  finishLabel?: string
  allowJumpForward?: boolean
}

const props = withDefaults(defineProps<UiStepperProps>(), {
  modelValue: 0,
  clickable: true,
  showControls: false,
  showProgress: true,
  progressLabel: 'Progres Konfigurasi Wizard',
  finishLabel: 'Submit & Launch',
  allowJumpForward: false,
})

const emit = defineEmits<{
  'update:modelValue': [stepIndex: number]
  change: [stepIndex: number]
  finish: []
}>()

const currentStep = computed(() => props.modelValue)
const totalSteps = computed(() => props.steps.length)
const isFirstStep = computed(() => currentStep.value <= 0)
const isLastStep = computed(() => currentStep.value >= totalSteps.value - 1)

// Track the highest step index reached by the user
const maxVisitedStep = ref(props.modelValue)

watch(
  () => props.modelValue,
  (val) => {
    if (val > maxVisitedStep.value) {
      maxVisitedStep.value = val
    }
  },
  { immediate: true },
)

function isStepAccessible(index: number): boolean {
  if (props.allowJumpForward) return true
  // Can only jump to steps already visited or the immediate current step
  return index <= maxVisitedStep.value
}

function goToStep(index: number) {
  if (!props.clickable) return
  if (!isStepAccessible(index)) return
  if (index >= 0 && index < totalSteps.value) {
    emit('update:modelValue', index)
    emit('change', index)
  }
}

function prevStep() {
  if (!isFirstStep.value) {
    const next = currentStep.value - 1
    emit('update:modelValue', next)
    emit('change', next)
  }
}

function nextStep() {
  if (!isLastStep.value) {
    const next = currentStep.value + 1
    emit('update:modelValue', next)
    emit('change', next)
  } else {
    emit('finish')
  }
}
</script>

<template>
  <div class="w-full">
    <!-- BeeJir Numbered Wizard Header -->
    <div class="px-2 py-3 sm:px-4">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div
          v-for="(step, idx) in steps"
          :key="step.id"
          class="flex items-center gap-3 flex-1 min-w-0"
        >
          <!-- Step Clickable Area -->
          <div
            class="flex items-center gap-3 min-w-0 flex-1 transition-all"
            :class="[
              clickable && isStepAccessible(idx)
                ? 'cursor-pointer group'
                : 'cursor-not-allowed opacity-60',
            ]"
            :title="
              !isStepAccessible(idx)
                ? 'Selesaikan tahap sebelumnya terlebih dahulu'
                : undefined
            "
            @click="goToStep(idx)"
          >
            <!-- BeeJir Refined Square Step Avatar -->
            <div
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-btn font-bold text-xs transition-all duration-150"
              :class="[
                idx === currentStep
                  ? 'bg-primary text-primary-content shadow-[0_2px_6px_0_rgb(var(--p)/0.45)] ring-2 ring-primary/25'
                  : idx < currentStep
                    ? 'bg-primary/15 text-primary'
                    : isStepAccessible(idx)
                      ? 'bg-base-200 text-base-content/60 group-hover:bg-base-300/80 group-hover:text-base-content'
                      : 'bg-base-200/50 text-base-content/35 border border-base-300/60',
              ]"
            >
              <Check v-if="idx < currentStep" class="h-3.5 w-3.5 stroke-[2.4]" />
              <component :is="step.icon" v-else-if="step.icon" class="h-4 w-4 shrink-0 stroke-[1.9]" />
              <span v-else class="text-[11px] font-mono font-semibold">{{ String(idx + 1).padStart(2, '0') }}</span>
            </div>

            <!-- Step Number + Title + Subtitle -->
            <div class="min-w-0 flex-1">
              <div
                class="text-xs sm:text-sm font-semibold truncate transition-colors"
                :class="
                  idx === currentStep
                    ? 'text-base-content'
                    : idx < currentStep
                      ? 'text-base-content/85'
                      : isStepAccessible(idx)
                        ? 'text-base-content/60 group-hover:text-base-content'
                        : 'text-base-content/40'
                "
              >
                {{ step.title }}
              </div>
              <p v-if="step.subtitle" class="text-[11px] text-base-content/50 truncate">
                {{ step.subtitle }}
              </p>
            </div>
          </div>

          <!-- Chevron Connector (BeeJir Style) -->
          <ChevronRight
            v-if="idx < steps.length - 1"
            class="hidden md:block h-5 w-5 text-base-content/30 shrink-0"
          />
        </div>
      </div>
    </div>

    <!-- Step Content Body (Rendered only when default slot is provided) -->
    <div v-if="$slots.default || $slots[`step-${currentStep}`]" class="p-5 sm:p-6 border-t border-base-300/80">
      <slot :name="`step-${currentStep}`" :current-step="currentStep" :step="steps[currentStep]">
        <slot :current-step="currentStep" :step="steps[currentStep]" />
      </slot>
    </div>

    <!-- Stepper Footer Controls -->
    <div
      v-if="showControls"
      class="flex flex-wrap items-center justify-between gap-3 border-t border-base-300/70 px-5 py-4 sm:px-6"
    >
      <button
        type="button"
        class="btn btn-outline btn-md"
        :disabled="isFirstStep"
        @click="prevStep"
      >
        <ChevronLeft class="h-4 w-4" />
        <span>Previous</span>
      </button>

      <button
        type="button"
        class="btn btn-md"
        :class="isLastStep ? 'btn-success' : 'btn-primary'"
        @click="nextStep"
      >
        <span>{{ isLastStep ? finishLabel : 'Next' }}</span>
        <Check v-if="isLastStep" class="h-4 w-4" />
        <ChevronRight v-else class="h-4 w-4" />
      </button>
    </div>
  </div>
</template>
