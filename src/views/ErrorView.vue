<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  ShieldAlert,
  FileSearch,
  ServerCrash,
  ArrowLeft,
  Home,
  RefreshCw,
} from 'lucide-vue-next'
import type { ColorVariant } from '@/types/theme'
import UiButton from '@/components/ui/UiButton.vue'
import UiBadge from '@/components/ui/UiBadge.vue'

const route = useRoute()
const router = useRouter()

const currentCode = computed(() => {
  const paramCode = String(route.params.code || '404')
  if (['403', '404', '500'].includes(paramCode)) return paramCode
  return '404'
})

interface ErrorConfig {
  code: string
  badge: string
  title: string
  description: string
  hint: string
  variant: ColorVariant
  icon: any
}

const errorMap: Record<string, ErrorConfig> = {
  '403': {
    code: '403',
    badge: 'Forbidden Access',
    title: 'Akses ke Halaman Ini Dibatasi',
    description:
      'Maaf, akun Anda saat ini tidak memiliki izin (role/privilege) yang cukup untuk mengakses modul atau sumber daya ini.',
    hint: 'Hubungi Administrator Workspace jika Anda memerlukan hak akses tambahan.',
    variant: 'warning',
    icon: ShieldAlert,
  },
  '404': {
    code: '404',
    badge: 'Page Not Found',
    title: 'Halaman Tidak Ditemukan',
    description:
      'Tautan yang Anda tuju mungkin telah dipindahkan, dihapus, atau alamat URL yang dimasukkan tidak tepat.',
    hint: 'Periksa kembali ejaan URL di bilah alamat browser atau kembali ke beranda.',
    variant: 'primary',
    icon: FileSearch,
  },
  '500': {
    code: '500',
    badge: 'Internal Server Error',
    title: 'Terjadi Gangguan pada Server',
    description:
      'Sistem mengalami kendala tak terduga saat memproses permintaan Anda. Tim teknis kami telah menerima laporan otomatis.',
    hint: 'Silakan coba muat ulang halaman beberapa saat lagi.',
    variant: 'error',
    icon: ServerCrash,
  },
}

const activeError = computed<ErrorConfig>(() => errorMap[currentCode.value] || errorMap['404'])

function switchErrorCode(code: string) {
  router.push(`/error/${code}`)
}
</script>

<template>
  <div class="space-y-6">
    <!-- Quick Error State Switcher Banner -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-box border border-base-300 bg-base-100 p-4 shadow-2xs">
      <div>
        <span class="text-xs font-extrabold uppercase tracking-wider text-base-content/50 block">
          Pratinjau Halaman Error HTTP
        </span>
        <p class="text-xs text-base-content/70 mt-0.5">
          Pilih kode status di samping untuk melihat desain halaman error <strong>403</strong>, <strong>404</strong>, dan <strong>500</strong>:
        </p>
      </div>

      <div class="flex items-center gap-2">
        <button
          v-for="code in ['403', '404', '500']"
          :key="code"
          type="button"
          class="btn btn-sm font-mono font-extrabold"
          :class="currentCode === code ? 'btn-primary' : 'btn-outline'"
          @click="switchErrorCode(code)"
        >
          Error {{ code }}
        </button>
      </div>
    </div>

    <!-- Main Error Showcase Card -->
    <div class="relative overflow-hidden rounded-box border border-base-300 bg-base-100 px-6 py-16 sm:py-24 text-center shadow-xs">
      <!-- Background Decorative Glow -->
      <div
        class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full blur-3xl opacity-15"
        :class="`bg-${activeError.variant}`"
      />

      <div class="relative z-10 mx-auto max-w-lg flex flex-col items-center">
        <!-- Animated Icon Circle -->
        <div
          class="flex h-20 w-20 items-center justify-center rounded-3xl mb-6 shadow-lg transition-all duration-300"
          :class="[
            activeError.variant === 'warning'
              ? 'bg-warning text-slate-950 shadow-warning/25'
              : activeError.variant === 'error'
                ? 'bg-error text-error-content shadow-error/25'
                : 'bg-primary text-primary-content shadow-primary/25',
          ]"
        >
          <component :is="activeError.icon" class="h-10 w-10" />
        </div>

        <!-- Status Code & Badge -->
        <UiBadge :variant="activeError.variant" soft size="md" class="mb-3 font-mono">
          HTTP ERROR {{ activeError.code }} • {{ activeError.badge }}
        </UiBadge>

        <h1 class="text-5xl sm:text-7xl font-extrabold tracking-tight font-mono text-base-content mb-3">
          {{ activeError.code }}
        </h1>

        <h2 class="text-xl sm:text-2xl font-extrabold text-base-content mb-2.5">
          {{ activeError.title }}
        </h2>

        <p class="text-xs sm:text-sm text-base-content/65 leading-relaxed mb-4">
          {{ activeError.description }}
        </p>

        <div class="rounded-btn bg-base-200/70 border border-base-300 px-4 py-2 text-xs text-base-content/60 mb-8">
          💡 {{ activeError.hint }}
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap items-center justify-center gap-3">
          <UiButton outline size="md" @click="router.back()">
            <template #icon-left>
              <ArrowLeft class="h-4 w-4" />
            </template>
            Halaman Sebelumnya
          </UiButton>

          <UiButton variant="primary" size="md" @click="router.push('/')">
            <template #icon-left>
              <Home class="h-4 w-4" />
            </template>
            Kembali ke Dashboard
          </UiButton>

          <UiButton
            v-if="currentCode === '500'"
            variant="secondary"
            soft
            size="md"
            @click="switchErrorCode('500')"
          >
            <template #icon-left>
              <RefreshCw class="h-4 w-4" />
            </template>
            Coba Muat Ulang
          </UiButton>
        </div>
      </div>
    </div>
  </div>
</template>
