<script setup lang="ts">
import { ref } from 'vue'
import {
  Sparkles,
  Search,
  Mail,
  Bell,
  Code2,
  Check,
  Palette,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
} from 'lucide-vue-next'
import { useThemeStore } from '@/stores/theme'
import { useToast } from '@/stores/toast'
import UiCard from '@/components/ui/UiCard.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiBadge from '@/components/ui/UiBadge.vue'
import UiInput from '@/components/ui/UiInput.vue'
import UiAlert from '@/components/ui/UiAlert.vue'
import UiModal from '@/components/ui/UiModal.vue'
import UiSelectTag from '@/components/ui/UiSelectTag.vue'
import UiSelect from '@/components/ui/UiSelect.vue'
import UiCheckbox from '@/components/ui/UiCheckbox.vue'
import UiTable from '@/components/ui/UiTable.vue'
import UiDataTable from '@/components/ui/UiDataTable.vue'
import type { ColorVariant } from '@/types/theme'
import type { TableColumn } from '@/types/table'

const themeStore = useThemeStore()
const toast = useToast()

const variants: ColorVariant[] = [
  'primary',
  'secondary',
  'accent',
  'neutral',
  'info',
  'success',
  'warning',
  'error',
]

const demoModalOpen = ref(false)
const loadingDemo = ref(false)
const sampleName = ref('BeeJir Open Source')
const sampleEmail = ref('hello@beejir.dev')
const togglePrimary = ref(true)
const toggleSecondary = ref(true)
const toggleAccent = ref(false)
const checkPrimary = ref(true)
const checkSecondary = ref(true)
const checkSuccess = ref(true)
const checkWarning = ref(false)
const checkError = ref(false)
const showCode = ref(false)

// Tag Select Demo State
const selectedTags = ref<string[]>(['vue', 'typescript', 'tailwind'])
const availableTagOptions = [
  { label: 'Vue 3.5', value: 'vue', variant: 'primary' as const },
  { label: 'TypeScript', value: 'typescript', variant: 'secondary' as const },
  { label: 'Tailwind CSS', value: 'tailwind', variant: 'accent' as const },
  { label: 'Bun Runtime', value: 'bun', variant: 'warning' as const },
  { label: 'Vite 6', value: 'vite', variant: 'info' as const },
  { label: 'Pinia Store', value: 'pinia', variant: 'success' as const },
  { label: 'Vue Router', value: 'router', variant: 'primary' as const },
]

// UiSelect Demo State (ala vueform/multiselect)
const selectedFramework = ref('vue')
const frameworkOptions = [
  { label: 'Vue 3 (Composition API)', value: 'vue', description: 'Reaktif, performa tinggi, dan ekosistem matang', variant: 'primary' as const },
  { label: 'React 19', value: 'react', description: 'Library populer dengan Server Components', variant: 'info' as const },
  { label: 'Svelte 5 (Runes)', value: 'svelte', description: 'Kompilator tanpa virtual DOM', variant: 'warning' as const },
  { label: 'Angular 18', value: 'angular', description: 'Framework enterprise berfitur lengkap', variant: 'error' as const },
  { label: 'Solid.js', value: 'solid', description: 'Reaktivitas murni dengan performa mendekati C', variant: 'secondary' as const },
  { label: 'Qwik', value: 'qwik', description: 'Resumability instan tanpa hidrasi', variant: 'accent' as const },
  { label: 'Astro 4', value: 'astro', description: 'Multi-framework static generator', variant: 'primary' as const },
  { label: 'Nuxt 3', value: 'nuxt', description: 'Full-stack SSR framework untuk Vue', variant: 'success' as const },
  { label: 'Next.js 15', value: 'next', description: 'Full-stack React framework', variant: 'neutral' as const },
  { label: 'Remix / React Router 7', value: 'remix', description: 'Standar web dan nested routing', variant: 'info' as const },
  { label: 'Ember.js', value: 'ember', description: 'Konvensi stabil jangka panjang', variant: 'warning' as const },
  { label: 'Preact', value: 'preact', description: 'Alternatif ringan 3KB untuk React', variant: 'secondary' as const },
]

const selectedRoles = ref(['frontend', 'uiux'])
const roleOptions = [
  { label: 'Frontend Developer', value: 'frontend', description: 'Vue, React, CSS Architecture' },
  { label: 'Backend Engineer', value: 'backend', description: 'Go, Node.js, PostgreSQL' },
  { label: 'UI/UX Designer', value: 'uiux', description: 'Figma, Design Tokens, User Journey' },
  { label: 'DevOps / SRE', value: 'devops', description: 'Docker, Kubernetes, CI/CD Pipelines' },
  { label: 'QA Automation', value: 'qa', description: 'Playwright, Cypress, E2E Testing' },
  { label: 'Product Manager', value: 'pm', description: 'Roadmap, User Stories, Scrum' },
  { label: 'Data Scientist', value: 'data', description: 'Python, Pandas, ML Pipelines' },
  { label: 'Mobile Engineer', value: 'mobile', description: 'Flutter, React Native, Swift' },
]

function triggerLoading() {
  loadingDemo.value = true
  setTimeout(() => {
    loadingDemo.value = false
  }, 1200)
}

// Toast Demo Helpers
function triggerToast(type: 'success' | 'error' | 'warning' | 'info' | 'primary') {
  switch (type) {
    case 'success':
      toast.success(
        'Data Berhasil Disimpan!',
        'Perubahan profil pengguna telah disimpan ke database cloud.'
      )
      break
    case 'error':
      toast.error(
        'Gagal Memproses Permintaan',
        'Terjadi kendala jaringan saat mencoba menghubungi webhook.'
      )
      break
    case 'warning':
      toast.warning(
        'Batas Kuota Hampir Penuh',
        'Penggunaan storage server Anda mencapai 85% dari kuota maksimal.'
      )
      break
    case 'info':
      toast.info(
        'Pembaruan Sistem Tersedia',
        'Versi BeeJir v0.2 siap diunduh dengan fitur form wizard baru.'
      )
      break
    case 'primary':
      toast.primary(
        'Tema Berhasil Diterapkan!',
        `Preset aktif kini menggunakan tema "${themeStore.currentPreset.name}".`
      )
      break
  }
}

// Simple Table Demo Data
const simpleColumns: TableColumn[] = [
  { key: 'name', label: 'Komponen UI' },
  { key: 'category', label: 'Kategori' },
  { key: 'status', label: 'Status Kesiapan' },
  { key: 'version', label: 'Versi', align: 'right' },
]

const simpleItems = [
  { name: 'UiSelectTag', category: 'Form Controls', status: 'Baru Dirilis', version: 'v0.2.0', variant: 'primary' },
  { name: 'UiDataTable', category: 'Data Display', status: 'Stabil', version: 'v0.2.0', variant: 'success' },
  { name: 'UiToastContainer', category: 'Feedback & Toast', status: 'Baru Dirilis', version: 'v0.2.0', variant: 'accent' },
  { name: 'UiAlert', category: 'Feedback & Alert', status: 'Redesigned', version: 'v0.2.0', variant: 'info' },
]

// Complex DataTable Demo Data
const dataTableColumns: TableColumn[] = [
  { key: 'task', label: 'Nama Tugas', sortable: true },
  { key: 'assignee', label: 'Penanggung Jawab', sortable: true },
  { key: 'priority', label: 'Prioritas', sortable: true },
  { key: 'budget', label: 'Estimasi Budget', sortable: true, align: 'right' },
  { key: 'status', label: 'Status Pengerjaan', sortable: true },
]

const dataTableItems = ref([
  { id: 101, task: 'Rancang Searchable Tag Select', assignee: 'Arif Pratama', priority: 'High', budget: 'Rp 3.500.000', status: 'Selesai', variant: 'success' },
  { id: 102, task: 'Buat Sistem Floating Toast', assignee: 'Larasati Dewi', priority: 'High', budget: 'Rp 2.800.000', status: 'Selesai', variant: 'success' },
  { id: 103, task: 'Redesign Alert & Glow Effect', assignee: 'Dimas Anggara', priority: 'Medium', budget: 'Rp 1.500.000', status: 'Selesai', variant: 'success' },
  { id: 104, task: 'Buat Complex DataTable ala Datatable.js', assignee: 'Arif Pratama', priority: 'Urgent', budget: 'Rp 4.200.000', status: 'Selesai', variant: 'success' },
  { id: 105, task: 'Integrasi Global Search & Pagination', assignee: 'Karina Putri', priority: 'Medium', budget: 'Rp 1.900.000', status: 'Dalam Proses', variant: 'warning' },
  { id: 106, task: 'Testing Kompatibilitas Bun di Windows', assignee: 'Fajar Nugroho', priority: 'Low', budget: 'Rp 800.000', status: 'Review', variant: 'info' },
  { id: 107, task: 'Penyusunan Dokumentasi OpenAPI', assignee: 'Maya Kusuma', priority: 'Low', budget: 'Rp 1.100.000', status: 'Dalam Proses', variant: 'warning' },
  { id: 108, task: 'Optimasi CSS Bundle & Tree Shaking', assignee: 'Bima Prakoso', priority: 'Medium', budget: 'Rp 2.100.000', status: 'Selesai', variant: 'success' },
])

function handleBulkDelete(rows: any[]) {
  const idsToDelete = new Set(rows.map((r) => r.id))
  dataTableItems.value = dataTableItems.value.filter((item) => !idsToDelete.has(item.id))
  toast.success('Pilihan Berhasil Dihapus', `${rows.length} tugas telah dihapus dari tabel.`)
}
</script>

<template>
  <div class="space-y-8">
    <!-- Top Header Banner -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-box border border-base-300 bg-base-100 p-5">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <UiBadge variant="primary" soft>Dual-API System</UiBadge>
          <UiBadge variant="secondary" soft>Pure Tailwind CSS</UiBadge>
        </div>
        <h2 class="text-xl font-extrabold text-base-content">
          Katalog Komponen Semantik UI
        </h2>
        <p class="text-xs text-base-content/65 mt-0.5">
          Gunakan class CSS semantik seperti <code class="font-mono text-primary">.btn .btn-primary</code>
          atau komponen Vue bertipe <code class="font-mono text-secondary">&lt;UiButton variant="primary"&gt;</code>.
        </p>
      </div>
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="btn btn-soft btn-primary btn-sm"
          @click="showCode = !showCode"
        >
          <Code2 class="h-4 w-4" />
          {{ showCode ? 'Sembunyikan Snippet' : 'Tampilkan Snippet Kode' }}
        </button>
        <button
          type="button"
          class="btn btn-primary btn-sm"
          @click="themeStore.customizerOpen = true"
        >
          <Palette class="h-4 w-4" />
          Ganti Tema
        </button>
      </div>
    </div>

    <!-- 1. Searchable Tag Select (Baru!) -->
    <UiCard
      title="1. Searchable Tag Select (<UiSelectTag>)"
      subtitle="Input multi-pilih dengan live search, chip badge yang bisa dihapus, keyboard navigation, dan opsi buat tag baru"
      accent-top="primary"
    >
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="space-y-4">
          <UiSelectTag
            v-model="selectedTags"
            :options="availableTagOptions"
            label="Keahlian & Tech Stack (Bisa Cari & Buat Tag Baru)"
            placeholder="Ketik untuk mencari atau menambah tag..."
            allow-create
          />
          <p class="text-xs text-base-content/60 leading-relaxed">
            Cobalah mengetik nama tag baru (misal: <em>Docker</em> atau <em>GraphQL</em>) lalu tekan <strong>Enter</strong>.
            Tekan <strong>Backspace</strong> ketika input kosong untuk menghapus tag terakhir.
          </p>
        </div>

        <div class="rounded-box border border-base-300 bg-base-200/50 p-4 space-y-2">
          <div class="flex items-center justify-between text-xs font-bold text-base-content/70">
            <span>Nilai Reaktif (v-model array):</span>
            <span class="badge badge-primary badge-sm font-mono">{{ selectedTags.length }} tag</span>
          </div>
          <pre class="rounded-btn bg-base-100 p-3 font-mono text-xs text-primary border border-base-300 overflow-x-auto">{{ JSON.stringify(selectedTags, null, 2) }}</pre>
        </div>
      </div>
    </UiCard>

    <!-- 2. Searchable & Paginated Select Option (Baru! ala vueform/multiselect) -->
    <UiCard
      title="2. Searchable & Paginated Select (<UiSelect>)"
      subtitle="Pengganti default select option dengan gaya ala vueform/multiselect: live search, pagination built-in, deskripsi item, single & multi select"
      accent-top="secondary"
    >
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Single Select with Pagination & Search -->
        <div class="space-y-4">
          <UiSelect
            v-model="selectedFramework"
            :options="frameworkOptions"
            label="Pilih Framework (Single Select + Live Search + Paginasi 5/Hal)"
            placeholder="Ketik untuk mencari framework..."
            :page-size="5"
            hint="Navigasi paginasi di bawah dropdown atau gunakan tombol panah kiri/kanan keyboard"
          />

          <div class="rounded-box border border-base-300 bg-base-200/50 p-3.5 flex items-center justify-between text-xs">
            <span class="text-base-content/70 font-medium">Framework Terpilih:</span>
            <span class="badge badge-primary font-bold">{{ selectedFramework }}</span>
          </div>
        </div>

        <!-- Multi Select with Pagination & Search -->
        <div class="space-y-4">
          <UiSelect
            v-model="selectedRoles"
            :options="roleOptions"
            label="Pilih Peran Tim (Multi-Select Tags + Paginasi 4/Hal)"
            placeholder="Pilih satu atau beberapa peran..."
            multiple
            :page-size="4"
            hint="Mendukung multi-select tag chip yang dapat dihapus individual atau sekaligus"
          />

          <div class="rounded-box border border-base-300 bg-base-200/50 p-3.5 flex items-center justify-between text-xs">
            <span class="text-base-content/70 font-medium">Peran Terpilih ({{ selectedRoles.length }}):</span>
            <div class="flex flex-wrap gap-1 justify-end max-w-xs">
              <span v-for="r in selectedRoles" :key="r" class="badge badge-secondary badge-xs font-semibold">
                {{ r }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </UiCard>

    <!-- 3. Floating Toast System (Baru!) -->
    <UiCard
      title="3. Floating Toast Notifications (useToast)"
      subtitle="Sistem notifikasi mengambang dengan timer auto-dismiss, animasi halus, dan varian semantik"
      accent-top="secondary"
    >
      <div class="space-y-3">
        <span class="text-xs font-bold uppercase tracking-wider text-base-content/50 block">
          Klik tombol di bawah untuk memicu Toast Notifications secara live:
        </span>
        <div class="flex flex-wrap items-center gap-3">
          <UiButton variant="success" size="sm" @click="triggerToast('success')">
            <template #icon-left>
              <CheckCircle2 class="h-4 w-4" />
            </template>
            Toast Success
          </UiButton>
          <UiButton variant="error" size="sm" @click="triggerToast('error')">
            <template #icon-left>
              <XCircle class="h-4 w-4" />
            </template>
            Toast Error
          </UiButton>
          <UiButton variant="warning" size="sm" @click="triggerToast('warning')">
            <template #icon-left>
              <AlertTriangle class="h-4 w-4" />
            </template>
            Toast Warning
          </UiButton>
          <UiButton variant="info" size="sm" @click="triggerToast('info')">
            <template #icon-left>
              <Info class="h-4 w-4" />
            </template>
            Toast Info
          </UiButton>
          <UiButton variant="primary" size="sm" @click="triggerToast('primary')">
            <template #icon-left>
              <Sparkles class="h-4 w-4" />
            </template>
            Toast Primary
          </UiButton>
        </div>
      </div>
    </UiCard>

    <!-- 3. Redesigned Alerts (<UiAlert>) -->
    <UiCard
      title="3. Redesigned Alerts (<UiAlert>)"
      subtitle="Pesan umpan balik dengan gaya estetika yang lebih selaras dengan konsep Clean & Colorful"
      accent-top="accent"
    >
      <div class="space-y-4">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-base-content/50 block mb-2">
            Varian Accent-Left (Garis Indikator Sisi Kiri - Elegan & Bersih)
          </span>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <UiAlert
              variant="info"
              style-type="accent-left"
              title="Informasi Arsitektur"
              dismissible
            >
              Komponen UI ini 100% modular dan terikat langsung dengan CSS Variables tema aktif.
            </UiAlert>
            <UiAlert
              variant="success"
              style-type="accent-left"
              title="Sinkronisasi Berhasil"
              dismissible
            >
              Seluruh aset build Vite telah diperbarui dan lulus pengecekan type-check.
            </UiAlert>
            <UiAlert
              variant="warning"
              style-type="accent-left"
              title="Peringatan Kuota"
              dismissible
            >
              Batas penggunaan API bulanan Anda telah mencapai 82% dari kuota.
            </UiAlert>
            <UiAlert
              variant="error"
              style-type="accent-left"
              title="Koneksi Terputus"
              dismissible
            >
              Tidak dapat menghubungi server cloud. Periksa pengaturan koneksi jaringan.
            </UiAlert>
          </div>
        </div>

        <div class="pt-2 border-t border-base-300/70">
          <span class="text-xs font-bold uppercase tracking-wider text-base-content/50 block mb-2">
            Varian Glass & Soft Pastel (Tanpa Solid Background)
          </span>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <UiAlert
              variant="primary"
              style-type="glass"
              title="Gaya Glassmorphism"
              dismissible
            >
              Efek latar transparan dengan aksen border berkilau yang halus di mata.
            </UiAlert>
            <UiAlert
              variant="secondary"
              style-type="soft"
              title="Gaya Soft Pastel"
              dismissible
            >
              Latar belakang pastel lembut dengan teks kontras tinggi untuk pengumuman harian.
            </UiAlert>
          </div>
        </div>

        <div class="pt-2 border-t border-base-300/70">
          <span class="text-xs font-bold uppercase tracking-wider text-base-content/50 block mb-2">
            Varian Solid Background (Opsi solid=true)
          </span>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <UiAlert
              variant="primary"
              solid
              title="Solid Primary Alert"
              dismissible
            >
              Warna background solid penuh untuk pengumuman penting atau banner prioritas tinggi.
            </UiAlert>
            <UiAlert
              variant="success"
              solid
              title="Solid Success Alert"
              dismissible
            >
              Operasi berhasil diselesaikan dengan warna solid yang kontras dan tajam.
            </UiAlert>
            <UiAlert
              variant="warning"
              solid
              title="Solid Warning Alert"
              dismissible
            >
              Peringatan kuota atau atensi penting dengan teks kontras tinggi yang jelas terbaca.
            </UiAlert>
            <UiAlert
              variant="error"
              solid
              title="Solid Error Alert"
              dismissible
            >
              Kegagalan sistem darurat dengan warna merah tegas dan icon kontras tinggi.
            </UiAlert>
          </div>
        </div>
      </div>
    </UiCard>

    <!-- 4. Tables: Simple Table vs Complex DataTable (Baru!) -->
    <div class="space-y-6">
      <!-- Simple Table -->
      <UiCard
        title="4. Simple Table Component (<UiTable>)"
        subtitle="Tabel sederhana yang bersih dengan zebra stripe dan hoverable rows"
        accent-top="info"
      >
        <UiTable :columns="simpleColumns" :items="simpleItems">
          <template #cell-status="{ item }">
            <UiBadge :variant="item.variant" soft size="sm">
              {{ item.status }}
            </UiBadge>
          </template>
          <template #cell-version="{ value }">
            <span class="font-mono text-xs font-bold text-primary">{{ value }}</span>
          </template>
        </UiTable>
      </UiCard>

      <!-- Complex DataTable -->
      <UiCard
        title="5. Complex DataTable Component (<UiDataTable>)"
        subtitle="DataTable lengkap tanpa dependensi eksternal: Global Search, Column Sorting, Multi-select Checkbox, Pagination, dan Ekspor CSV"
        accent-top="primary"
      >
        <UiDataTable
          :columns="dataTableColumns"
          :items="dataTableItems"
          :page-size-options="[5, 10, 20]"
          :initial-page-size="5"
          selectable
          searchable
          @bulk-delete="handleBulkDelete"
        >
          <template #cell-priority="{ value }">
            <UiBadge
              :variant="value === 'Urgent' ? 'error' : value === 'High' ? 'warning' : 'info'"
              soft
              size="sm"
            >
              {{ value }}
            </UiBadge>
          </template>
          <template #cell-budget="{ value }">
            <span class="font-bold text-base-content font-mono">{{ value }}</span>
          </template>
          <template #cell-status="{ item }">
            <UiBadge :variant="item.variant" soft dot size="sm">
              {{ item.status }}
            </UiBadge>
          </template>
        </UiDataTable>
      </UiCard>
    </div>

    <!-- 5. Buttons Showcase -->
    <UiCard
      title="6. Buttons (.btn & <UiButton>)"
      subtitle="Mendukung varian Solid, Soft Pastel (Clean & Colorful), Outline, Ghost, Ukuran, dan Loading state"
      accent-top="secondary"
    >
      <div class="space-y-5">
        <!-- Solid Buttons -->
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-base-content/50 block mb-2.5">
            Solid Semantic Variants
          </span>
          <div class="flex flex-wrap gap-2.5">
            <UiButton
              v-for="v in variants"
              :key="`solid-${v}`"
              :variant="v"
              class="capitalize"
            >
              {{ v }}
            </UiButton>
            <UiButton variant="ghost">Ghost</UiButton>
          </div>
        </div>

        <!-- Soft Pastel Buttons -->
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-base-content/50 block mb-2.5">
            Soft Pastel Variants (.btn-soft)
          </span>
          <div class="flex flex-wrap gap-2.5">
            <UiButton
              v-for="v in variants.filter((x) => x !== 'neutral')"
              :key="`soft-${v}`"
              :variant="v"
              soft
              class="capitalize"
            >
              Soft {{ v }}
            </UiButton>
          </div>
        </div>

        <!-- Sizes & Interactive States -->
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-base-content/50 block mb-2.5">
            Sizes & Interactive States
          </span>
          <div class="flex flex-wrap items-center gap-3">
            <UiButton variant="primary" size="xs">Extra Small (xs)</UiButton>
            <UiButton variant="secondary" size="sm">Small (sm)</UiButton>
            <UiButton variant="accent" size="md">Medium Default (md)</UiButton>
            <UiButton variant="primary" size="lg">Large Button (lg)</UiButton>
            <UiButton
              variant="success"
              :loading="loadingDemo"
              @click="triggerLoading"
            >
              Klik untuk Uji Loading
            </UiButton>
            <UiButton variant="primary" @click="demoModalOpen = true">
              <template #icon-left>
                <Sparkles class="h-4 w-4" />
              </template>
              Buka Modal Dialog
            </UiButton>
          </div>
        </div>
      </div>
    </UiCard>

    <!-- 6. Form Controls & Badges Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Form Controls -->
      <UiCard
        title="7. Standard Form Inputs & Toggles"
        subtitle="Kontrol form bersih yang otomatis mengikuti radius dan warna tema"
        accent-top="accent"
      >
        <div class="space-y-4">
          <UiInput
            v-model="sampleName"
            label="Nama Proyek"
            placeholder="Masukkan nama proyek..."
            hint="Menggunakan komponen <UiInput> dengan two-way binding v-model"
          >
            <template #icon-left>
              <Sparkles class="h-4 w-4" />
            </template>
          </UiInput>

          <UiInput
            v-model="sampleEmail"
            label="Alamat Email Maintainer"
            type="email"
            placeholder="nama@domain.com"
          >
            <template #icon-left>
              <Mail class="h-4 w-4" />
            </template>
          </UiInput>

          <UiInput
            model-value="input_tidak_valid"
            label="Contoh State Validasi Error"
            error="Format token tidak sesuai standar keamanan."
          >
            <template #icon-left>
              <Search class="h-4 w-4" />
            </template>
          </UiInput>

          <!-- Modern Select Option in Form -->
          <UiSelect
            v-model="selectedFramework"
            :options="frameworkOptions"
            label="Default Select Form (<UiSelect> ala multiselect)"
            placeholder="Pilih framework default proyek..."
            :page-size="5"
            hint="Mendukung live filter pencarian dan navigasi paginasi"
          />

          <!-- Checkboxes (Baru!) -->
          <div class="pt-2 border-t border-base-300/70 space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-base-content/50 block">
              Theme-Aligned Checkboxes (.checkbox & &lt;UiCheckbox&gt;)
            </span>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <UiCheckbox
                v-model="checkPrimary"
                variant="primary"
                label="Primary Checkbox"
                description="Terikat langsung dengan tema aktif"
              />
              <UiCheckbox
                v-model="checkSecondary"
                variant="secondary"
                label="Secondary Checkbox"
                description="Warna pink neon semantik"
              />
              <UiCheckbox
                v-model="checkSuccess"
                variant="success"
                label="Success Checkbox"
                description="Status valid atau selesai"
              />
              <UiCheckbox
                v-model="checkWarning"
                variant="warning"
                label="Warning Checkbox"
                description="Aksen amber dengan kontras tinggi"
              />
              <UiCheckbox
                v-model="checkError"
                variant="error"
                label="Error Checkbox"
                description="Pilihan kritis atau perhatian"
              />
              <UiCheckbox
                :model-value="true"
                disabled
                label="Disabled Checkbox"
                description="State non-aktif terlindungi"
              />
            </div>

            <!-- Checkbox Sizes -->
            <div class="flex flex-wrap items-center gap-4 pt-1 text-xs text-base-content/70">
              <span class="font-semibold text-base-content/50">Ukuran:</span>
              <label class="inline-flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" class="checkbox checkbox-xs checkbox-primary" checked />
                <span>XS</span>
              </label>
              <label class="inline-flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" class="checkbox checkbox-sm checkbox-primary" checked />
                <span>SM (Default Table)</span>
              </label>
              <label class="inline-flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" class="checkbox checkbox-md checkbox-primary" checked />
                <span>MD</span>
              </label>
              <label class="inline-flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" class="checkbox checkbox-lg checkbox-primary" checked />
                <span>LG</span>
              </label>
            </div>
          </div>

          <!-- Toggles -->
          <div class="pt-2 border-t border-base-300/70 flex flex-wrap items-center gap-6">
            <label class="inline-flex items-center gap-2.5 cursor-pointer text-xs font-semibold">
              <input v-model="togglePrimary" type="checkbox" class="toggle" />
              <span>Primary Toggle</span>
            </label>
            <label class="inline-flex items-center gap-2.5 cursor-pointer text-xs font-semibold">
              <input v-model="toggleSecondary" type="checkbox" class="toggle toggle-secondary" />
              <span>Secondary Toggle</span>
            </label>
            <label class="inline-flex items-center gap-2.5 cursor-pointer text-xs font-semibold">
              <input v-model="toggleAccent" type="checkbox" class="toggle toggle-accent" />
              <span>Accent Toggle</span>
            </label>
          </div>
        </div>
      </UiCard>

      <!-- Badges -->
      <UiCard
        title="8. Badges (.badge & <UiBadge>)"
        subtitle="Indikator status ringkas dengan opsi solid, soft pastel, outline, dan dot"
        accent-top="info"
      >
        <div class="space-y-4">
          <div class="flex flex-wrap items-center gap-2.5">
            <UiBadge v-for="v in variants" :key="`badge-solid-${v}`" :variant="v" class="capitalize">
              {{ v }}
            </UiBadge>
          </div>

          <div class="flex flex-wrap items-center gap-2.5">
            <UiBadge
              v-for="v in variants.filter((x) => x !== 'neutral')"
              :key="`badge-soft-${v}`"
              :variant="v"
              soft
              dot
              class="capitalize"
            >
              {{ v }} status
            </UiBadge>
          </div>

          <div class="flex flex-wrap items-center gap-2.5">
            <UiBadge
              v-for="v in variants.filter((x) => x !== 'neutral')"
              :key="`badge-outline-${v}`"
              :variant="v"
              outline
              class="capitalize"
            >
              {{ v }} outline
            </UiBadge>
          </div>
        </div>
      </UiCard>
    </div>

    <!-- Interactive Demo Modal -->
    <UiModal
      v-model="demoModalOpen"
      title="Contoh Dialog Modal BeeJir"
      subtitle="Mendukung penutupan via tombol Esc, klik backdrop, dan kustomisasi penuh"
    >
      <div class="space-y-4 text-sm text-base-content/80">
        <p>
          Modal ini dibangun menggunakan komponen <code class="font-mono text-primary">&lt;UiModal&gt;</code>
          dan otomatis mengikuti kelengkungan sudut (<code class="font-mono">--rounded-box</code>) serta
          palet warna dari tema <strong>{{ themeStore.currentPreset.name }}</strong>.
        </p>
        <div class="rounded-btn bg-primary/10 border border-primary/20 p-3.5 flex items-center gap-3">
          <Bell class="h-5 w-5 text-primary shrink-0" />
          <span class="text-xs font-medium text-base-content">
            Anda dapat menggunakan modal ini untuk form konfirmasi, pratinjau detail, maupun pengaturan cepat.
          </span>
        </div>
      </div>

      <template #footer="{ close }">
        <UiButton variant="ghost" size="sm" @click="close">Batal</UiButton>
        <UiButton variant="primary" size="sm" @click="close">
          <template #icon-left>
            <Check class="h-4 w-4" />
          </template>
          Mengerti &amp; Tutup
        </UiButton>
      </template>
    </UiModal>
  </div>
</template>
