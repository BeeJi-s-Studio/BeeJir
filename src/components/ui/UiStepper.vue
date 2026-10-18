<script setup lang="ts">
import { computed } from 'vue'
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
}

const props = withDefaults(defineProps<UiStepperProps>(), {
  modelValue: 0,
  clickable: true,
  showControls: true,
  showProgress: true,
  progressLabel: 'Progres Konfigurasi Wizard',
  finishLabel: 'Selesaikan & Simpan',
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

const completionPercentage = computed(() => {
  if (totalSteps.value <= 0) return 0
  return Math.round(((currentStep.value + 1) / totalSteps.value) * 100)
})

function goToStep(index: number) {
  if (!props.clickable) return
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
  <div class="card card-bordered overflow-hidden">
    <!-- Seamless Top Card Progress Bar (Replaces redundant top accent border) -->
    <div
      v-if="showProgress"
      class="relative h-1.5 w-full bg-base-300/40 dark:bg-white/10 overflow-hidden"
    >
      <div
        class="h-full bg-primary transition-all duration-500 ease-out"
        :style="{ width: `${completionPercentage}%` }"
      />
    </div>

    <!-- Unified Wizard Header: Status Label + Stepper Navigation -->
    <div
      class="relative border-b border-base-300/80 dark:border-white/[0.09] bg-base-200/40 dark:bg-base-200/50 p-4 sm:p-5 space-y-3.5"
    >
      <!-- Integrated Progress Status -->
      <div v-if="showProgress" class="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div class="flex items-center gap-2">
          <span class="font-bold text-base-content">{{ progressLabel }}</span>
          <span class="text-base-content/40 hidden sm:inline">•</span>
          <span class="text-base-content/65 font-medium hidden sm:inline">
            Langkah {{ currentStep + 1 }} dari {{ totalSteps }}: <strong class="text-base-content">{{ steps[currentStep]?.title }}</strong>
          </span>
        </div>
        <div class="flex items-center gap-2">
          <span class="badge badge-sm badge-soft badge-primary font-mono font-medium">
            {{ completionPercentage }}% Selesai
          </span>
        </div>
      </div>

      <!-- Step Indicators Row -->
      <div class="relative flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div
          v-for="(step, idx) in steps"
          :key="step.id"
          class="relative flex items-center flex-1 min-w-0"
        >
          <!-- Step Pill Box -->
          <div
            class="flex items-center gap-3 flex-1 min-w-0 rounded-btn px-3 py-2 transition-all duration-200"
            :class="[
              clickable ? 'cursor-pointer group' : '',
              idx === currentStep
                ? 'bg-base-100 dark:bg-white/[0.05] border border-primary/35 shadow-xs'
                : idx < currentStep
                  ? 'bg-base-100/60 dark:bg-white/[0.02] border border-base-300 dark:border-white/10'
                  : 'border border-transparent hover:bg-base-100/50 dark:hover:bg-white/[0.02]',
            ]"
            @click="goToStep(idx)"
          >
            <!-- Step Circle Indicator -->
            <div
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-bold text-xs transition-all duration-200"
              :class="[
                idx < currentStep
                  ? 'bg-success text-success-content shadow-xs'
                  : idx === currentStep
                    ? 'bg-primary text-primary-content ring-4 ring-primary/20 shadow-xs'
                    : 'bg-base-200 dark:bg-base-300/80 border border-base-300 dark:border-white/15 text-base-content/50 group-hover:border-primary/40',
              ]"
            >
              <Check v-if="idx < currentStep" class="h-4 w-4 stroke-[2.5]" />
              <component :is="step.icon" v-else-if="step.icon" class="h-3.5 w-3.5" />
              <span v-else>{{ idx + 1 }}</span>
            </div>

            <!-- Step Label -->
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-1.5">
                <span
                  class="text-xs font-bold truncate transition-colors"
                  :class="[
                    idx === currentStep
                      ? 'text-primary'
                      : idx < currentStep
                        ? 'text-base-content'
                        : 'text-base-content/55',
                  ]"
                >
                  {{ step.title }}
                </span>
              </div>
              <p v-if="step.subtitle" class="text-[11px] text-base-content/50 truncate">
                {{ step.subtitle }}
              </p>
            </div>
          </div>

          <!-- Connector Line (Desktop) -->
          <div
            v-if="idx < steps.length - 1"
            class="hidden lg:block h-0.5 w-5 shrink-0 mx-1 rounded-full transition-colors duration-300"
            :class="
              idx < currentStep
                ? 'bg-success'
                : 'bg-base-300 dark:bg-white/15'
            "
          />
        </div>
      </div>
    </div>

    <!-- Step Content Body -->
    <div class="relative z-10 p-5 sm:p-6">
      <slot :name="`step-${currentStep}`" :current-step="currentStep" :step="steps[currentStep]">
        <slot :current-step="currentStep" :step="steps[currentStep]" />
      </slot>
    </div>

    <!-- Stepper Footer Controls -->
    <div
      v-if="showControls"
      class="flex flex-wrap items-center justify-between gap-3 border-t border-base-300/80 dark:border-white/[0.08] bg-base-200/35 dark:bg-base-200/45 px-5 py-4 rounded-b-[inherit]"
    >
      <button
        type="button"
        class="btn btn-outline btn-sm"
        :disabled="isFirstStep"
        @click="prevStep"
      >
        <ChevronLeft class="h-4 w-4" />
        Langkah Sebelumnya
      </button>

      <div class="flex items-center gap-3">
        <span class="text-xs font-mono text-base-content/55 hidden sm:inline">
          Langkah {{ currentStep + 1 }} / {{ totalSteps }}
        </span>

        <button
          type="button"
          class="btn btn-sm"
          :class="isLastStep ? 'btn-success' : 'btn-primary'"
          @click="nextStep"
        >
          <span>{{ isLastStep ? finishLabel : 'Langkah Selanjutnya' }}</span>
          <Check v-if="isLastStep" class="h-4 w-4" />
          <ChevronRight v-else class="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
</template>
