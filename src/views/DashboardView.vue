<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  DollarSign,
  Users,
  ShoppingBag,
  Sparkles,
  ArrowUpRight,
  Palette,
  Layers,
  Zap,
} from 'lucide-vue-next'
import { useThemeStore } from '@/stores/theme'
import UiStatCard from '@/components/ui/UiStatCard.vue'
import UiCard from '@/components/ui/UiCard.vue'
import UiBadge from '@/components/ui/UiBadge.vue'
import UiButton from '@/components/ui/UiButton.vue'

const themeStore = useThemeStore()
const selectedRange = ref<'7d' | '30d' | '90d'>('30d')

interface ChartPoint {
  label: string
  revenue: number
  orders: number
}

const chartDatasets: Record<'7d' | '30d' | '90d', ChartPoint[]> = {
  '7d': [
    { label: 'Sen', revenue: 62, orders: 44 },
    { label: 'Sel', revenue: 78, orders: 52 },
    { label: 'Rab', revenue: 71, orders: 61 },
    { label: 'Kam', revenue: 89, orders: 68 },
    { label: 'Jum', revenue: 95, orders: 79 },
    { label: 'Sab', revenue: 84, orders: 70 },
    { label: 'Min', revenue: 98, orders: 86 },
  ],
  '30d': [
    { label: 'Mgg 1', revenue: 48, orders: 35 },
    { label: 'Mgg 2', revenue: 68, orders: 52 },
    { label: 'Mgg 3', revenue: 74, orders: 60 },
    { label: 'Mgg 4', revenue: 92, orders: 78 },
    { label: 'Mgg 5', revenue: 85, orders: 71 },
    { label: 'Mgg 6', revenue: 97, orders: 88 },
  ],
  '90d': [
    { label: 'Jan', revenue: 45, orders: 30 },
    { label: 'Feb', revenue: 58, orders: 46 },
    { label: 'Mar', revenue: 72, orders: 55 },
    { label: 'Apr', revenue: 69, orders: 59 },
    { label: 'Mei', revenue: 88, orders: 74 },
    { label: 'Jun', revenue: 99, orders: 89 },
  ],
}

const activeChart = computed(() => chartDatasets[selectedRange.value])

const teamGoals = [
  {
    name: 'Integrasi Custom Design System',
    category: 'UI Architecture',
    progress: 96,
    variant: 'primary' as const,
  },
  {
    name: 'Target Konversi SaaS Q4',
    category: 'Growth & Marketing',
    progress: 82,
    variant: 'secondary' as const,
  },
  {
    name: 'Optimasi Bundle Vite + Bun',
    category: 'Performance DX',
    progress: 94,
    variant: 'accent' as const,
  },
  {
    name: 'Cakupan Strict TypeScript',
    category: 'Code Quality',
    progress: 100,
    variant: 'success' as const,
  },
]

const recentTransactions = [
  {
    id: 'INV-2041',
    customer: 'Nadia Putri',
    email: 'nadia@kreatif.id',
    plan: 'Enterprise Cloud',
    amount: 'Rp 4.850.000',
    status: 'Paid',
    statusVariant: 'success' as const,
    time: '5 menit lalu',
    avatarBg: 'bg-primary text-primary-content',
  },
  {
    id: 'INV-2040',
    customer: 'Bima Prakoso',
    email: 'bima@startupkita.co',
    plan: 'Pro Team Annual',
    amount: 'Rp 1.950.000',
    status: 'Paid',
    statusVariant: 'success' as const,
    time: '28 menit lalu',
    avatarBg: 'bg-secondary text-secondary-content',
  },
  {
    id: 'INV-2039',
    customer: 'Siti Rahmawati',
    email: 'siti@nusatech.io',
    plan: 'Starter Bundle',
    amount: 'Rp 650.000',
    status: 'Pending',
    statusVariant: 'warning' as const,
    time: '1 jam lalu',
    avatarBg: 'bg-accent text-accent-content',
  },
  {
    id: 'INV-2038',
    customer: 'Reza Mahendra',
    email: 'reza@studio88.id',
    plan: 'Pro Team Monthly',
    amount: 'Rp 450.000',
    status: 'Review',
    statusVariant: 'info' as const,
    time: '3 jam lalu',
    avatarBg: 'bg-info text-info-content',
  },
]
</script>

<template>
  <div class="space-y-6">
    <!-- Hero Welcome Banner -->
    <div
      class="relative overflow-hidden rounded-box border border-primary/20 bg-gradient-to-r from-primary/12 via-secondary/10 to-accent/12 p-6 sm:p-7"
    >
      <div class="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div class="space-y-2 max-w-2xl">
          <div class="flex flex-wrap items-center gap-2">
            <UiBadge variant="primary" soft dot>Vue 3 + Vite + Bun + TS</UiBadge>
            <UiBadge variant="secondary" soft>Custom Semantic Tailwind</UiBadge>
            <UiBadge variant="accent" soft>Tema: {{ themeStore.currentPreset.name }}</UiBadge>
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-base-content">
            Selamat Datang di <span class="text-primary">BeeJir</span> Admin Template
          </h2>
          <p class="text-sm text-base-content/70 leading-relaxed">
            Template administrator open-source dengan estetika <strong>clean &amp; colorful</strong>.
            Nikmati penulisan class semantik modern (<code class="font-mono text-primary">.btn</code>,
            <code class="font-mono text-secondary">.card</code>,
            <code class="font-mono text-accent">.badge</code>) yang sepenuhnya dapat diatur temanya secara real-time.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2.5 shrink-0">
          <UiButton variant="primary" @click="themeStore.customizerOpen = true">
            <template #icon-left>
              <Palette class="h-4 w-4" />
            </template>
            Kustomisasi Tema
          </UiButton>
          <RouterLink to="/components" class="btn btn-soft btn-secondary">
            <Layers class="h-4 w-4" />
            Eksplorasi Komponen
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- 4 Colorful KPI Stat Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
      <UiStatCard
        title="Total Pendapatan"
        value="Rp 148,5 Jt"
        change="+24.8%"
        trend="up"
        description="Dibandingkan bulan lalu (Rp 118,9 Jt)"
        variant="primary"
        :icon="DollarSign"
      />
      <UiStatCard
        title="Pengguna Aktif"
        value="18.420"
        change="+14.2%"
        trend="up"
        description="1.290 pengguna baru minggu ini"
        variant="secondary"
        :icon="Users"
      />
      <UiStatCard
        title="Transaksi Selesai"
        value="3.842"
        change="+9.6%"
        trend="up"
        description="Tingkat keberhasilan checkout 98.4%"
        variant="accent"
        :icon="ShoppingBag"
      />
      <UiStatCard
        title="Performa Sistem"
        value="99.98%"
        change="Optimal"
        trend="up"
        description="Rata-rata waktu respon API 42ms"
        variant="success"
        :icon="Zap"
      />
    </div>

    <!-- Middle Section: Interactive Theme-Aware Chart + Team Goals -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Revenue & Orders Bar/Visual Chart -->
      <UiCard
        class="lg:col-span-2"
        title="Analitik Pertumbuhan & Transaksi"
        subtitle="Visualisasi otomatis mengikuti warna Primary & Secondary dari tema yang dipilih"
        accent-top="primary"
      >
        <template #actions>
          <div class="inline-flex rounded-btn border border-base-300 bg-base-200/60 p-1">
            <button
              v-for="range in (['7d', '30d', '90d'] as const)"
              :key="range"
              type="button"
              class="rounded-md px-2.5 py-1 text-xs font-bold transition-all"
              :class="
                selectedRange === range
                  ? 'bg-primary text-primary-content shadow-xs'
                  : 'text-base-content/60 hover:text-base-content'
              "
              @click="selectedRange = range"
            >
              {{ range.toUpperCase() }}
            </button>
          </div>
        </template>

        <!-- Legend -->
        <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div class="flex items-center gap-5 text-xs font-semibold">
            <span class="flex items-center gap-2">
              <span class="h-3 w-3 rounded-xs bg-primary" />
              Pendapatan (Revenue)
            </span>
            <span class="flex items-center gap-2">
              <span class="h-3 w-3 rounded-xs bg-secondary" />
              Volume Order
            </span>
          </div>
          <span class="text-xs font-mono text-base-content/55">
            Target Kuartal: <strong class="text-success">+18.5% tercapai</strong>
          </span>
        </div>

        <!-- Clean Responsive Bar Visualization -->
        <div class="h-60 flex items-end justify-between gap-3 sm:gap-6 pt-6 pb-2 px-2 border-b border-base-300/70">
          <div
            v-for="point in activeChart"
            :key="point.label"
            class="flex-1 flex flex-col items-center gap-2 h-full justify-end group"
          >
            <div class="w-full flex items-end justify-center gap-1.5 sm:gap-2 h-full">
              <!-- Revenue Bar -->
              <div
                class="w-full max-w-7 rounded-t-md bg-gradient-to-t from-primary to-primary/70 transition-all duration-300 group-hover:brightness-110 relative"
                :style="{ height: `${point.revenue}%` }"
              >
                <span
                  class="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-6 left-1/2 -translate-x-1/2 rounded bg-neutral px-1.5 py-0.5 text-[10px] font-mono text-neutral-content whitespace-nowrap"
                >
                  {{ point.revenue }}%
                </span>
              </div>
              <!-- Orders Bar -->
              <div
                class="w-full max-w-7 rounded-t-md bg-gradient-to-t from-secondary to-secondary/65 transition-all duration-300 group-hover:brightness-110"
                :style="{ height: `${point.orders}%` }"
              />
            </div>
            <span class="text-xs font-semibold text-base-content/65">
              {{ point.label }}
            </span>
          </div>
        </div>

        <template #footer>
          <div class="flex w-full items-center justify-between text-xs text-base-content/60">
            <span>Diperbarui secara real-time melalui state reaktif Vue 3</span>
            <RouterLink to="/users" class="font-bold text-primary hover:underline inline-flex items-center gap-1">
              Lihat Detail Data
              <ArrowUpRight class="h-3.5 w-3.5" />
            </RouterLink>
          </div>
        </template>
      </UiCard>

      <!-- Colorful Goal Progress -->
      <UiCard
        title="Target & Kesehatan Proyek"
        subtitle="Metrik kesiapan rilis open-source"
        accent-top="secondary"
      >
        <div class="space-y-4">
          <div
            v-for="goal in teamGoals"
            :key="goal.name"
            class="rounded-btn border border-base-300/70 bg-base-200/40 p-3.5 space-y-2"
          >
            <div class="flex items-center justify-between gap-2">
              <div>
                <h4 class="text-xs font-bold text-base-content">{{ goal.name }}</h4>
                <span class="text-[11px] text-base-content/55">{{ goal.category }}</span>
              </div>
              <UiBadge :variant="goal.variant" soft size="sm">
                {{ goal.progress }}%
              </UiBadge>
            </div>
            <div class="h-2 w-full overflow-hidden rounded-full bg-base-300/80">
              <div
                class="h-full rounded-full transition-all duration-500"
                :class="{
                  'bg-primary': goal.variant === 'primary',
                  'bg-secondary': goal.variant === 'secondary',
                  'bg-accent': goal.variant === 'accent',
                  'bg-success': goal.variant === 'success',
                }"
                :style="{ width: `${goal.progress}%` }"
              />
            </div>
          </div>
        </div>

        <template #footer>
          <button
            type="button"
            class="btn btn-soft btn-accent btn-sm btn-block"
            @click="themeStore.customizerOpen = true"
          >
            <Sparkles class="h-4 w-4" />
            Uji Warna Progress Bar di Theme Studio
          </button>
        </template>
      </UiCard>
    </div>

    <!-- Bottom Section: Recent Transactions Table -->
    <UiCard
      title="Transaksi & Aktivitas Terbaru"
      subtitle="Contoh penggunaan class .table, .table-hover, dan .badge-soft"
      accent-top="accent"
    >
      <template #actions>
        <RouterLink to="/users" class="btn btn-outline btn-primary btn-sm">
          Kelola Semua Pengguna
        </RouterLink>
      </template>

      <div class="overflow-x-auto -mx-6 px-6">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>ID Invoice</th>
              <th>Pelanggan</th>
              <th>Paket Layanan</th>
              <th>Nominal</th>
              <th>Status</th>
              <th>Waktu</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in recentTransactions" :key="item.id">
              <td class="font-mono text-xs font-bold text-primary">
                {{ item.id }}
              </td>
              <td>
                <div class="flex items-center gap-3">
                  <div
                    class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                    :class="item.avatarBg"
                  >
                    {{ item.customer.slice(0, 2).toUpperCase() }}
                  </div>
                  <div>
                    <div class="font-bold text-base-content text-xs sm:text-sm">
                      {{ item.customer }}
                    </div>
                    <div class="text-xs text-base-content/55">{{ item.email }}</div>
                  </div>
                </div>
              </td>
              <td>
                <span class="font-medium text-xs sm:text-sm">{{ item.plan }}</span>
              </td>
              <td class="font-bold text-base-content">
                {{ item.amount }}
              </td>
              <td>
                <UiBadge :variant="item.statusVariant" soft dot size="sm">
                  {{ item.status }}
                </UiBadge>
              </td>
              <td class="text-xs text-base-content/60">
                {{ item.time }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </UiCard>
  </div>
</template>
