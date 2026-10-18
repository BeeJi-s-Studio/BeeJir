<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from 'lucide-vue-next'

export interface UiDatePickerProps {
  modelValue?: string
  label?: string
  placeholder?: string
  hint?: string
  error?: string
  clearable?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<UiDatePickerProps>(), {
  modelValue: '',
  label: undefined,
  placeholder: 'Pilih tanggal...',
  hint: undefined,
  error: undefined,
  clearable: true,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [dateStr: string]
  change: [dateStr: string]
}>()

const isOpen = ref(false)
const containerRef = ref<HTMLElement | null>(null)

const monthNames = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
]
const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

// Parse initial YYYY-MM-DD or use current date
const today = new Date()
const viewYear = ref(today.getFullYear())
const viewMonth = ref(today.getMonth())

function parseDateString(val?: string): Date | null {
  if (!val) return null
  const parts = val.split('-').map(Number)
  if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
    return new Date(parts[0], parts[1] - 1, parts[2])
  }
  return null
}

function toIsoDateString(year: number, monthIndex: number, day: number): string {
  const m = String(monthIndex + 1).padStart(2, '0')
  const d = String(day).padStart(2, '0')
  return `${year}-${m}-${d}`
}

const formattedDisplay = computed(() => {
  const parsed = parseDateString(props.modelValue)
  if (!parsed) return ''
  const d = parsed.getDate()
  const m = monthNames[parsed.getMonth()]
  const y = parsed.getFullYear()
  return `${d} ${m} ${y}`
})

interface CalendarCell {
  day: number
  month: number
  year: number
  iso: string
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
}

const calendarCells = computed<CalendarCell[]>(() => {
  const y = viewYear.value
  const m = viewMonth.value

  const firstDayOfMonth = new Date(y, m, 1).getDay()
  const daysInCurrentMonth = new Date(y, m + 1, 0).getDate()
  const daysInPrevMonth = new Date(y, m, 0).getDate()

  const todayIso = toIsoDateString(today.getFullYear(), today.getMonth(), today.getDate())
  const cells: CalendarCell[] = []

  // Leading days from previous month
  const prevMonth = m === 0 ? 11 : m - 1
  const prevYear = m === 0 ? y - 1 : y
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i
    const iso = toIsoDateString(prevYear, prevMonth, day)
    cells.push({
      day,
      month: prevMonth,
      year: prevYear,
      iso,
      isCurrentMonth: false,
      isToday: iso === todayIso,
      isSelected: iso === props.modelValue,
    })
  }

  // Current month days
  for (let day = 1; day <= daysInCurrentMonth; day++) {
    const iso = toIsoDateString(y, m, day)
    cells.push({
      day,
      month: m,
      year: y,
      iso,
      isCurrentMonth: true,
      isToday: iso === todayIso,
      isSelected: iso === props.modelValue,
    })
  }

  // Trailing days to complete 42 cells (6 weeks)
  const nextMonth = m === 11 ? 0 : m + 1
  const nextYear = m === 11 ? y + 1 : y
  const remaining = 42 - cells.length
  for (let day = 1; day <= remaining; day++) {
    const iso = toIsoDateString(nextYear, nextMonth, day)
    cells.push({
      day,
      month: nextMonth,
      year: nextYear,
      iso,
      isCurrentMonth: false,
      isToday: iso === todayIso,
      isSelected: iso === props.modelValue,
    })
  }

  return cells
})

function openPicker() {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  if (isOpen.value && props.modelValue) {
    const parsed = parseDateString(props.modelValue)
    if (parsed) {
      viewYear.value = parsed.getFullYear()
      viewMonth.value = parsed.getMonth()
    }
  }
}

function prevMonth(event?: Event) {
  event?.stopPropagation()
  if (viewMonth.value === 0) {
    viewMonth.value = 11
    viewYear.value--
  } else {
    viewMonth.value--
  }
}

function nextMonth(event?: Event) {
  event?.stopPropagation()
  if (viewMonth.value === 11) {
    viewMonth.value = 0
    viewYear.value++
  } else {
    viewMonth.value++
  }
}

function selectCell(cell: CalendarCell) {
  emit('update:modelValue', cell.iso)
  emit('change', cell.iso)
  viewYear.value = cell.year
  viewMonth.value = cell.month
  isOpen.value = false
}

function selectToday() {
  const iso = toIsoDateString(today.getFullYear(), today.getMonth(), today.getDate())
  viewYear.value = today.getFullYear()
  viewMonth.value = today.getMonth()
  emit('update:modelValue', iso)
  emit('change', iso)
  isOpen.value = false
}

function clearDate(event?: Event) {
  event?.stopPropagation()
  emit('update:modelValue', '')
  emit('change', '')
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
    class="relative flex flex-col gap-1.5 w-full"
    :class="isOpen ? 'z-30' : 'z-auto'"
  >
    <span v-if="label" class="text-xs font-semibold text-base-content/80">
      {{ label }}
    </span>

    <!-- Trigger Box -->
    <div
      tabindex="0"
      class="relative w-full min-h-[40px] px-3.5 py-2 form-surface flex items-center justify-between gap-2 text-sm cursor-pointer select-none"
      :class="[
        isOpen ? 'form-surface-active' : '',
        disabled ? 'opacity-50 cursor-not-allowed bg-base-200/50' : '',
        error ? 'border-error ring-1 ring-error/20' : '',
      ]"
      @click="openPicker"
    >
      <div class="flex items-center gap-2.5 truncate">
        <CalendarIcon class="h-4 w-4 shrink-0 text-primary" />
        <span v-if="formattedDisplay" class="font-medium text-base-content truncate">
          {{ formattedDisplay }}
        </span>
        <span v-else class="text-base-content/40 truncate">
          {{ placeholder }}
        </span>
      </div>

      <div class="flex items-center gap-1 shrink-0">
        <button
          v-if="clearable && modelValue && !disabled"
          type="button"
          class="btn btn-ghost btn-xs btn-circle h-5 w-5 text-base-content/45 hover:text-base-content"
          title="Kosongkan tanggal"
          @click="clearDate"
        >
          <X class="h-3.5 w-3.5" />
        </button>
      </div>
    </div>

    <!-- Calendar Popup -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 scale-95 -translate-y-1"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen && !disabled"
        class="absolute left-0 top-full mt-1.5 z-50 w-72 sm:w-80 rounded-box border border-base-300 bg-base-100 p-3.5 shadow-xl select-none"
        @click.stop
        @mousedown.stop
      >
        <!-- Calendar Header: Month & Year Navigation -->
        <div class="flex items-center justify-between mb-3">
          <button
            type="button"
            class="btn btn-ghost btn-xs btn-circle h-7 w-7"
            @click.stop="prevMonth"
          >
            <ChevronLeft class="h-4 w-4" />
          </button>

          <div class="text-xs font-extrabold text-base-content">
            {{ monthNames[viewMonth] }} {{ viewYear }}
          </div>

          <button
            type="button"
            class="btn btn-ghost btn-xs btn-circle h-7 w-7"
            @click.stop="nextMonth"
          >
            <ChevronRight class="h-4 w-4" />
          </button>
        </div>

        <!-- Day Names Header -->
        <div class="grid grid-cols-7 gap-1 mb-1.5 text-center">
          <span
            v-for="day in dayNames"
            :key="day"
            class="text-[10px] font-bold uppercase text-base-content/45 py-1"
          >
            {{ day }}
          </span>
        </div>

        <!-- Calendar Grid -->
        <div class="grid grid-cols-7 gap-1">
          <button
            v-for="cell in calendarCells"
            :key="cell.iso"
            type="button"
            class="h-8 w-full rounded-btn text-xs font-semibold flex items-center justify-center transition-all cursor-pointer"
            :class="[
              cell.isSelected
                ? 'bg-primary text-primary-content font-extrabold shadow-xs shadow-primary/30'
                : cell.isToday
                  ? 'border border-primary text-primary font-bold bg-primary/10'
                  : cell.isCurrentMonth
                    ? 'text-base-content hover:bg-base-200'
                    : 'text-base-content/30 hover:bg-base-200/50',
            ]"
            @click.stop="selectCell(cell)"
          >
            {{ cell.day }}
          </button>
        </div>

        <!-- Calendar Footer -->
        <div class="mt-3 pt-2.5 border-t border-base-300/70 flex items-center justify-between text-xs">
          <button
            type="button"
            class="text-primary font-bold hover:underline cursor-pointer"
            @click.stop="selectToday"
          >
            Pilih Hari Ini
          </button>
          <span v-if="modelValue" class="font-mono text-[11px] text-base-content/55">
            {{ modelValue }}
          </span>
        </div>
      </div>
    </Transition>

    <span v-if="error" class="text-[11px] font-medium text-error">
      {{ error }}
    </span>
    <span v-else-if="hint" class="text-[11px] text-base-content/60">
      {{ hint }}
    </span>
  </div>
</template>
