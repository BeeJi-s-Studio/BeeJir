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
  FolderPlus,
  Download,
  Share2,
  Trash2,
  Settings,
  Rocket,
  FileText,
  HelpCircle,
  Plus,
  Pencil,
  Eye,
  Copy,
  Heart,
  Bookmark,
  Bot,
  Brain,
  Cpu,
  Zap,
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
import UiInputCurrency from '@/components/ui/UiInputCurrency.vue'
import UiInputPercent from '@/components/ui/UiInputPercent.vue'
import UiRadioCard, { type RadioCardOption } from '@/components/ui/UiRadioCard.vue'
import UiTable from '@/components/ui/UiTable.vue'
import UiDataTable from '@/components/ui/UiDataTable.vue'
import UiDatePicker from '@/components/ui/UiDatePicker.vue'
import UiFileUpload, { type UploadedFileItem } from '@/components/ui/UiFileUpload.vue'
import UiRichEditor from '@/components/ui/UiRichEditor.vue'
import UiStepper, { type StepItem } from '@/components/ui/UiStepper.vue'
import UiProgress from '@/components/ui/UiProgress.vue'
import UiList, { type ListItem } from '@/components/ui/UiList.vue'
import UiTimeline, { type TimelineItem } from '@/components/ui/UiTimeline.vue'
import UiSpinner from '@/components/ui/UiSpinner.vue'
import UiEmptyState from '@/components/ui/UiEmptyState.vue'
import UiDropdown, { type DropdownItem } from '@/components/ui/UiDropdown.vue'
import UiTooltip from '@/components/ui/UiTooltip.vue'
import UiPopover from '@/components/ui/UiPopover.vue'
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

// Financial & Percentage Input Demo State
const demoCurrencyValue = ref<number | null>(47500000)
const demoSelectedCurrency = ref('IDR')
const demoPercentValue = ref<number | null>(18.5)

// Phase 3 New Components Demo State
const demoDate = ref('2026-10-18')
const demoRichText = ref(
  '<h3>Catatan Rilis BeeJir v0.3</h3><p>Editor ini mendukung format <strong>tebal</strong>, <em>miring</em>, <u>garis bawah</u>, daftar poin, dan tampilan kode HTML langsung.</p><ul><li>Komponen Date Picker interaktif</li><li>Upload File Drag & Drop serta Galeri Multi-Foto</li><li>Wizard Stepper & Timeline</li></ul>'
)

const singleUploadFiles = ref<UploadedFileItem[]>([
  {
    id: 'f1',
    name: 'Laporan-Keuangan-Q4-2026.pdf',
    size: 2458000,
    type: 'application/pdf',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    progress: 100,
    status: 'done',
  },
  {
    id: 'f2',
    name: 'config-production.env',
    size: 1420,
    type: 'text/plain',
    url: 'data:text/plain;charset=utf-8,APP_ENV=production%0APORT=8080%0ADATABASE_URL=postgresql://user:secret@localhost:5432/beejir%0ACACHE_TTL=3600%0ADEBUG=false',
    progress: 100,
    status: 'done',
  },
  {
    id: 'f3',
    name: 'arsip-backup-biner.tar.gz',
    size: 15420000,
    type: 'application/gzip',
    progress: 100,
    status: 'done',
  },
])

const dropzoneFiles = ref<UploadedFileItem[]>([
  {
    id: 'f2',
    name: 'Backup-Database-Cluster.zip',
    size: 8420000,
    type: 'application/zip',
    progress: 100,
    status: 'done',
  },
  {
    id: 'f4',
    name: 'sample-design-mockup.png',
    size: 642000,
    type: 'image/png',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    progress: 100,
    status: 'done',
  },
])

const multiPhotoFiles = ref<UploadedFileItem[]>([
  {
    id: 'p1',
    name: 'ui-dashboard-preview.jpg',
    size: 540200,
    type: 'image/jpeg',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    progress: 100,
    status: 'done',
  },
  {
    id: 'p2',
    name: 'analytics-dark-theme.jpg',
    size: 489100,
    type: 'image/jpeg',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    progress: 100,
    status: 'done',
  },
])

const demoStepIndex = ref(1)
const demoSteps: StepItem[] = [
  { id: 1, title: 'Konfigurasi Awal', subtitle: 'Pilih nama & region' },
  { id: 2, title: 'Integrasi Database', subtitle: 'Koneksi PostgreSQL' },
  { id: 3, title: 'Verifikasi & Deploy', subtitle: 'Siap diluncurkan' },
]

// AI Model Selection / Radio Cards Demo State
const selectedAiModel = ref('claude-3-7')
const aiModelOptions: RadioCardOption[] = [
  {
    value: 'gpt-4o',
    title: 'GPT-4o Omnimodal',
    subtitle: 'High-speed reasoning & multimodal analysis',
    description: 'Model multimodal flagship dari OpenAI dengan throughput tinggi untuk pemrosesan teks, audio, dan gambar secara instan.',
    icon: Bot,
    badge: 'Multi-Modal',
    badgeVariant: 'success',
    tags: ['128k Tokens', 'Vision', 'Realtime Audio'],
    meta: '92 tps • $5/M',
  },
  {
    value: 'claude-3-7',
    title: 'Claude 3.7 Sonnet',
    subtitle: 'Hybrid thought & deep coding intelligence',
    description: 'Standar terdepan untuk penalaran kode kompleks, arsitektur sistem, dan evaluasi berbasis rantai pemikiran (hybrid thinking).',
    icon: Brain,
    badge: 'State of the Art',
    badgeVariant: 'primary',
    tags: ['200k Window', 'Deep Thinking', 'Coding SOTA'],
    meta: '75 tps • $3/M',
    recommended: true,
  },
  {
    value: 'deepseek-r1',
    title: 'DeepSeek R1 Distill',
    subtitle: 'Open weight mathematical & algorithmic reasoning',
    description: 'Arsitektur Mixture-of-Experts open weights dengan efisiensi komputasi tinggi untuk kalkulasi saintifik dan inferensi lokal.',
    icon: Cpu,
    badge: 'Cost Efficient',
    badgeVariant: 'info',
    tags: ['MoE 671B', 'Open Weights', 'Self-Hosted'],
    meta: '110 tps • $0.55/M',
  },
  {
    value: 'gemini-2-flash',
    title: 'Gemini 2.0 Flash',
    subtitle: 'Ultra-low latency sub-second responses',
    description: 'Dioptimalkan untuk respon secepat kilat pada task agen otonom, streaming interaktif, dan context caching masif.',
    icon: Zap,
    badge: 'Sub-second',
    badgeVariant: 'warning',
    tags: ['1M Context', 'Search Grounding', 'Fast Stream'],
    meta: '160 tps • $0.10/M',
  },
]

const demoProgressValue = ref(72)

const demoListItems: ListItem[] = [
  {
    id: 1,
    title: 'Deployment Cluster Asia-Southeast (Jakarta)',
    subtitle: '8 Nodes aktif • Uptime 99.98% selama 30 hari terakhir',
    badge: 'Healthy',
    badgeVariant: 'success',
    meta: '14ms',
    icon: Rocket,
    variant: 'primary',
  },
  {
    id: 2,
    title: 'Sinkronisasi Dokumentasi API OpenAPI 3.1',
    subtitle: 'Diperbarui otomatis melalui GitHub Actions pipeline',
    badge: 'Synced',
    badgeVariant: 'info',
    meta: '2m lalu',
    icon: FileText,
    variant: 'secondary',
  },
  {
    id: 3,
    title: 'Peringatan Kapasitas Penyimpanan Object Storage',
    subtitle: 'Bucket media-assets mencapai 82% dari batas kuota bulanan',
    badge: '82% Used',
    badgeVariant: 'warning',
    meta: '820 GB',
    icon: AlertTriangle,
    variant: 'warning',
  },
]

const demoTimelineItems: TimelineItem[] = [
  {
    id: 1,
    title: 'Komponen Baru Berhasil Ditambahkan',
    description: 'Menambahkan DatePicker, FileUpload (3 mode), RichEditor, Stepper, Progress, List, Timeline, Spinner, EmptyState, Dropdown, Tooltip, dan Popover.',
    time: 'Baru saja',
    variant: 'primary',
    badge: 'v0.3.0',
    author: 'Arif Pratama',
  },
  {
    id: 2,
    title: 'Optimasi Kontras Tema Gelap & Terang',
    description: 'Seluruh komponen telah diuji pada 6 preset warna di mode terang maupun gelap.',
    time: '1 jam lalu',
    variant: 'success',
    badge: 'Verified',
    author: 'Larasati Dewi',
  },
  {
    id: 3,
    title: 'Inisialisasi Repositori Open Source',
    description: 'Membangun arsitektur dasar menggunakan Vue 3.5, Vite 6, Bun, dan TypeScript.',
    time: 'Kemarin',
    variant: 'secondary',
    badge: 'Init',
    author: 'Tim Inti BeeJir',
  },
]

const demoDropdownItems: DropdownItem[] = [
  { label: 'Unduh Laporan PDF', value: 'download', icon: Download, badge: 'PDF' },
  { label: 'Bagikan ke Anggota Tim', value: 'share', icon: Share2 },
  { label: 'Pengaturan Modul', value: 'settings', icon: Settings },
  { divider: true },
  { label: 'Hapus Permanen', value: 'delete', icon: Trash2, danger: true },
]
</script>

<template>
  <div class="space-y-6">
    <!-- Top Header Banner -->
    <div class="card flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5">
      <div>
        <div class="flex items-center gap-2 mb-1.5">
          <UiBadge variant="primary" soft>Dual-API System</UiBadge>
          <UiBadge variant="secondary" soft>Enterprise UI</UiBadge>
        </div>
        <h2 class="text-xl font-bold text-base-content">
          Katalog Komponen Semantik UI
        </h2>
        <p class="text-[0.8125rem] text-base-content/60 mt-0.5">
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

        <!-- NEW: Dedicated Icon Button Concept System -->
        <div class="pt-5 border-t border-base-300/80 dark:border-white/[0.08] space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-primary block">
                Konsep Icon Button (.btn-icon, .btn-square, .btn-circle)
              </span>
              <p class="text-xs text-base-content/65 mt-0.5">
                Rasio presisi 1:1 tanpa distorsi padding, ikon terpusat sempurna, dan 4 skala ukuran baku untuk UI modern.
              </p>
            </div>
            <UiBadge variant="primary" soft size="sm">Terkonsep & Aligned</UiBadge>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Col 1: Shapes (Circle vs Square) -->
            <div class="rounded-box border border-base-300 bg-base-200/35 p-3.5 space-y-3">
              <span class="text-xs font-bold text-base-content block">1. Bentuk (Shapes)</span>
              <div class="flex items-center gap-3">
                <div class="text-center space-y-1">
                  <UiButton circle variant="primary" size="sm" :icon="Plus" title="Circle Shape" />
                  <span class="text-[10px] text-base-content/60 block">Circle (btn-circle)</span>
                </div>
                <div class="text-center space-y-1">
                  <UiButton square variant="primary" size="sm" :icon="Plus" title="Square Shape" />
                  <span class="text-[10px] text-base-content/60 block">Square (btn-square)</span>
                </div>
              </div>
            </div>

            <!-- Col 2: Size Scale (xs, sm, md, lg) -->
            <div class="rounded-box border border-base-300 bg-base-200/35 p-3.5 space-y-3">
              <span class="text-xs font-bold text-base-content block">2. Skala Ukuran (Sizes)</span>
              <div class="flex items-center gap-2">
                <div class="text-center">
                  <UiButton square variant="secondary" size="xs" :icon="Settings" title="Extra Small (28px)" />
                  <span class="text-[9px] font-mono text-base-content/50 block mt-1">28px (xs)</span>
                </div>
                <div class="text-center">
                  <UiButton square variant="secondary" size="sm" :icon="Settings" title="Small (34px)" />
                  <span class="text-[9px] font-mono text-base-content/50 block mt-1">34px (sm)</span>
                </div>
                <div class="text-center">
                  <UiButton square variant="secondary" size="md" :icon="Settings" title="Medium (40px)" />
                  <span class="text-[9px] font-mono text-base-content/50 block mt-1">40px (md)</span>
                </div>
                <div class="text-center">
                  <UiButton square variant="secondary" size="lg" :icon="Settings" title="Large (48px)" />
                  <span class="text-[9px] font-mono text-base-content/50 block mt-1">48px (lg)</span>
                </div>
              </div>
            </div>

            <!-- Col 3: Styles (Ghost, Soft, Outline, Solid) -->
            <div class="rounded-box border border-base-300 bg-base-200/35 p-3.5 space-y-3">
              <span class="text-xs font-bold text-base-content block">3. Gaya Semantik (Styles)</span>
              <div class="flex flex-wrap items-center gap-2">
                <UiButton circle variant="ghost" size="sm" :icon="Heart" title="Ghost" />
                <UiButton circle variant="primary" soft size="sm" :icon="Bookmark" title="Soft Primary" />
                <UiButton circle variant="error" soft size="sm" :icon="Trash2" title="Soft Error" />
                <UiButton circle outline size="sm" :icon="Share2" title="Outline Surface" />
                <UiButton circle variant="accent" size="sm" :icon="Sparkles" title="Solid Accent" />
              </div>
            </div>

            <!-- Col 4: Real-world Table Action Groups -->
            <div class="rounded-box border border-base-300 bg-base-200/35 p-3.5 space-y-3">
              <span class="text-xs font-bold text-base-content block">4. Aksi Tabel & Toolbar</span>
              <div class="flex items-center gap-1.5 p-1 rounded-btn bg-base-100 border border-base-300/80 w-fit">
                <button
                  type="button"
                  class="btn btn-square btn-xs btn-ghost text-base-content/70 hover:text-info hover:bg-info/10"
                  title="Detail"
                >
                  <Eye class="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  class="btn btn-square btn-xs btn-soft btn-primary"
                  title="Edit Data"
                >
                  <Pencil class="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  class="btn btn-square btn-xs btn-soft btn-error"
                  title="Hapus Data"
                >
                  <Trash2 class="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  class="btn btn-square btn-xs btn-outline"
                  title="Salin ID"
                >
                  <Copy class="h-3.5 w-3.5" />
                </button>
              </div>
              <span class="text-[11px] text-base-content/50 block">Grup tombol aksi seragam & konsisten</span>
            </div>
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

          <!-- NEW: Currency & Percent Inputs -->
          <div class="pt-3 border-t border-base-300/70 space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary block">
              Format Khusus: Currency &amp; Percentage (&lt;UiInputCurrency&gt; &amp; &lt;UiInputPercent&gt;)
            </span>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Currency with selector -->
              <UiInputCurrency
                v-model="demoCurrencyValue"
                v-model:currency="demoSelectedCurrency"
                label="Input Nilai Mata Uang (Dapat Ganti Valuta)"
                hint="Dapat memilih valuta (IDR, USD, EUR, SGD, JPY, GBP) dengan pemisah desimal otomatis"
              />

              <!-- Percentage input with slider -->
              <UiInputPercent
                v-model="demoPercentValue"
                label="Input Persentase Bunga / Rasio"
                hint="Terformat otomatis dengan simbol % dan slider penyesuaian instan"
                show-slider
                :min="0"
                :max="100"
              />
            </div>

            <!-- Preview Values State -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs font-mono">
              <div class="rounded-box border border-base-300 bg-base-200/50 p-2.5 flex items-center justify-between">
                <span class="text-base-content/70 font-sans">Raw Value (Number):</span>
                <span class="badge badge-primary font-bold">{{ demoCurrencyValue ?? 'null' }} ({{ demoSelectedCurrency }})</span>
              </div>
              <div class="rounded-box border border-base-300 bg-base-200/50 p-2.5 flex items-center justify-between">
                <span class="text-base-content/70 font-sans">Raw Value (Percent):</span>
                <span class="badge badge-secondary font-bold">{{ demoPercentValue ?? 'null' }}%</span>
              </div>
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

    <!-- 9. Date Picker & Rich Text Editor (WYSIWYG) -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <UiCard
        title="9. Interactive Date Picker (<UiDatePicker>)"
        subtitle="Kalender popup interaktif dengan navigasi bulan/tahun, tombol Hari Ini, dan format lokal"
        accent-top="primary"
      >
        <div class="space-y-4">
          <UiDatePicker
            v-model="demoDate"
            label="Pilih Tanggal Acara / Rilis (Dengan Pilihan Waktu)"
            hint="Klik untuk pilih tanggal, loncat bulan/tahun, dan atur jam"
            enable-time
          />

          <div class="rounded-box border border-base-300 bg-base-200/50 p-3.5 flex items-center justify-between text-xs">
            <span class="text-base-content/70 font-medium">Nilai ISO (v-model):</span>
            <span class="badge badge-primary font-mono">{{ demoDate || 'Kosong' }}</span>
          </div>
        </div>
      </UiCard>

      <div class="lg:col-span-2">
        <UiCard
          title="10. Rich Text Editor / WYSIWYG (<UiRichEditor>)"
          subtitle="Editor visual kaya fitur dengan toolbar pemformatan lengkap, penghitung kata, dan mode kode HTML"
          accent-top="secondary"
        >
          <UiRichEditor
            v-model="demoRichText"
            label="Konten Artikel / Dokumentasi"
            min-height="170px"
          />
        </UiCard>
      </div>
    </div>

    <!-- 11. File Upload Suite (3 Modes: File Preview, Drag & Drop, Multi-Photo Gallery) -->
    <UiCard
      title="11. File Upload Suite (<UiFileUpload> — 3 Mode Lengkap)"
      subtitle="Mendukung upload dengan daftar preview terupload, Drag & Drop Zone, serta Multi-Photo Gallery dengan lightbox"
      accent-top="accent"
    >
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Mode 1: Standard Button + Uploaded File Preview -->
        <div class="rounded-box border border-base-300 bg-base-200/25 p-4">
          <UiFileUpload
            v-model="singleUploadFiles"
            mode="file"
            label="A. Upload Tombol + Preview File Terupload"
            hint="Menampilkan nama, ukuran, progress bar, & status file"
          />
        </div>

        <!-- Mode 2: Drag & Drop Zone -->
        <div class="rounded-box border border-base-300 bg-base-200/25 p-4">
          <UiFileUpload
            v-model="dropzoneFiles"
            mode="dropzone"
            label="B. Upload Drag and Drop Zone"
            hint="Seret file apa saja ke area garis putus-putus"
          />
        </div>

        <!-- Mode 3: Multi-Photo Gallery Upload -->
        <div class="rounded-box border border-base-300 bg-base-200/25 p-4">
          <UiFileUpload
            v-model="multiPhotoFiles"
            mode="gallery"
            multiple
            label="C. Upload Banyak Foto Sekaligus (Gallery)"
            hint="Hover pada foto untuk preview ukuran penuh atau hapus"
          />
        </div>
      </div>
    </UiCard>

    <!-- 12. Wizard / Stepper & AI Model Card Selection -->
    <div class="space-y-6">
      <UiCard
        title="12. Multi-Step Form Wizard (<UiStepper>)"
        subtitle="Navigasi tahapan proses berurutan dengan status selesai, langkah aktif, dan tombol kontrol terintegrasi"
        accent-top="primary"
      >
        <UiStepper
          v-model="demoStepIndex"
          :steps="demoSteps"
          show-controls
          @finish="toast.success('Wizard Selesai!', 'Seluruh tahapan konfigurasi telah berhasil disimpan.')"
        >
          <template #default="{ currentStep, step }">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2">
              <div>
                <span class="badge badge-primary badge-sm mb-2">Tahap {{ currentStep + 1 }}</span>
                <h4 class="text-base font-extrabold text-base-content">{{ step?.title }}</h4>
                <p class="text-xs text-base-content/65 mt-1">
                  Ini adalah area konten dinamis untuk langkah <strong>{{ step?.title }}</strong> ({{ step?.subtitle }}).
                  Klik indikator langkah di atas atau tombol di bawah untuk berpindah tahap.
                </p>
              </div>
              <RouterLink to="/project-wizard" class="btn btn-soft btn-primary btn-sm shrink-0">
                Buka Halaman Demo Wizard Penuh
              </RouterLink>
            </div>
          </template>
        </UiStepper>
      </UiCard>

      <!-- Interactive Radio Card / Model Selection Card -->
      <UiCard
        title="Interactive Radio Card Selector (<UiRadioCard>)"
        subtitle="Pilihan kartu radio modern ala AI Model Selection dengan avatar icon, status check kustom, tag teknis, dan badge rekomendasi"
        accent-top="accent"
      >
        <div class="space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span class="text-xs font-semibold uppercase tracking-wider text-base-content/60">Pilih Mesin AI Utama</span>
              <p class="text-xs text-base-content/50">Digunakan pada agent reasoning engine dan pipeline otomatisasi</p>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs text-base-content/60">Model aktif:</span>
              <span class="badge badge-primary font-mono text-xs uppercase">{{ selectedAiModel }}</span>
            </div>
          </div>

          <UiRadioCard
            v-model="selectedAiModel"
            :options="aiModelOptions"
            :columns="4"
          />
        </div>
      </UiCard>
    </div>

    <!-- 13. Progress Bar & Spinners -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <UiCard
        title="13. Progress Bars (<UiProgress>)"
        subtitle="Indikator progres dalam berbagai warna semantik, ukuran, serta animasi garis belang (striped)"
        accent-top="success"
      >
        <div class="space-y-4">
          <UiProgress :value="demoProgressValue" variant="primary" label="Primary Animated Striped" show-value striped animated />
          <UiProgress :value="88" variant="success" label="Success Completion" show-value size="sm" />
          <UiProgress :value="64" variant="secondary" label="Secondary Upload" show-value size="sm" />
          <UiProgress :value="45" variant="warning" label="Warning Storage Quota" show-value size="sm" striped />
          <UiProgress :value="28" variant="error" label="Error Threshold" show-value size="xs" />

          <div class="pt-2 flex items-center gap-2">
            <button type="button" class="btn btn-xs btn-outline" @click="demoProgressValue = Math.max(0, demoProgressValue - 15)">
              -15%
            </button>
            <button type="button" class="btn btn-xs btn-primary" @click="demoProgressValue = Math.min(100, demoProgressValue + 15)">
              +15%
            </button>
          </div>
        </div>
      </UiCard>

      <UiCard
        title="14. Loading Spinners (<UiSpinner>)"
        subtitle="3 gaya animasi pemuatan (Ring, Bouncing Dots, Pulse Ripple) dengan ukuran xs hingga xl"
        accent-top="info"
      >
        <div class="space-y-5">
          <div>
            <span class="text-[11px] font-bold uppercase tracking-wider text-base-content/50 block mb-2.5">
              Varian Warna (Ring Spinner)
            </span>
            <div class="flex flex-wrap items-center gap-5">
              <UiSpinner variant="primary" size="md" />
              <UiSpinner variant="secondary" size="md" />
              <UiSpinner variant="accent" size="md" />
              <UiSpinner variant="success" size="md" />
              <UiSpinner variant="warning" size="md" />
              <UiSpinner variant="error" size="md" />
              <UiSpinner variant="info" size="md" />
            </div>
          </div>

          <div class="pt-3 border-t border-base-300/70">
            <span class="text-[11px] font-bold uppercase tracking-wider text-base-content/50 block mb-2.5">
              Tipe & Label (Ring, Dots, Pulse)
            </span>
            <div class="flex flex-wrap items-center gap-6">
              <UiSpinner type="ring" variant="primary" size="md" label="Memuat data..." />
              <UiSpinner type="dots" variant="secondary" size="md" label="Menyinkronkan..." />
              <UiSpinner type="pulse" variant="accent" size="md" label="Menunggu sinyal..." />
            </div>
          </div>
        </div>
      </UiCard>
    </div>

    <!-- 15. List & Timeline -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <UiCard
        title="15. Structured List (<UiList>)"
        subtitle="Daftar item interaktif dengan ikon/avatar, subjudul, badge status, dan event klik"
        accent-top="secondary"
      >
        <UiList
          :items="demoListItems"
          @item-click="(item) => toast.info(item.title, item.subtitle)"
        />
      </UiCard>

      <UiCard
        title="16. Activity Timeline (<UiTimeline>)"
        subtitle="Linimasa vertikal untuk menampilkan log aktivitas, riwayat rilis, dan tahapan peristiwa"
        accent-top="primary"
      >
        <UiTimeline :items="demoTimelineItems" />
      </UiCard>
    </div>

    <!-- 17. Dropdown, Tooltip, Popover & Empty State -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <UiCard
        title="17. Dropdown, Tooltip & Popover"
        subtitle="Komponen floating overlay interaktif untuk menu aksi, petunjuk singkat, dan panel informasi"
        accent-top="warning"
      >
        <div class="space-y-6">
          <!-- Dropdowns -->
          <div>
            <span class="text-[11px] font-bold uppercase tracking-wider text-base-content/50 block mb-2.5">
              Dropdown Menu (&lt;UiDropdown&gt;)
            </span>
            <div class="flex flex-wrap items-center gap-3">
              <UiDropdown
                label="Menu Aksi Utama"
                variant="primary"
                size="sm"
                :items="demoDropdownItems"
                @select="(item) => toast.info('Dropdown Dipilih', `Anda memilih: ${item.label}`)"
              />
              <UiDropdown
                label="Opsi Lainnya"
                variant="soft"
                size="sm"
                :items="demoDropdownItems"
                @select="(item) => toast.info('Dropdown Dipilih', `Anda memilih: ${item.label}`)"
              />
            </div>
          </div>

          <!-- Tooltips -->
          <div class="pt-3 border-t border-base-300/70">
            <span class="text-[11px] font-bold uppercase tracking-wider text-base-content/50 block mb-2.5">
              Directional Tooltips (&lt;UiTooltip&gt;) — Arahkan Kursor
            </span>
            <div class="flex flex-wrap items-center gap-3">
              <UiTooltip text="Tooltip di bagian Atas (Top)" position="top" variant="neutral">
                <button type="button" class="btn btn-xs btn-outline">Hover Top</button>
              </UiTooltip>
              <UiTooltip text="Tooltip dengan warna Primary" position="bottom" variant="primary">
                <button type="button" class="btn btn-xs btn-soft btn-primary">Hover Bottom</button>
              </UiTooltip>
              <UiTooltip text="Tooltip di sebelah Kanan" position="right" variant="secondary">
                <button type="button" class="btn btn-xs btn-soft btn-secondary">Hover Right</button>
              </UiTooltip>
            </div>
          </div>

          <!-- Popover -->
          <div class="pt-3 border-t border-base-300/70">
            <span class="text-[11px] font-bold uppercase tracking-wider text-base-content/50 block mb-2.5">
              Rich Interactive Popover (&lt;UiPopover&gt;) — Klik Tombol
            </span>
            <div class="flex flex-wrap items-center gap-3">
              <UiPopover
                title="Informasi Cluster Server"
                subtitle="Region: ap-southeast-1 (Jakarta)"
                position="top"
              >
                <template #trigger>
                  <button type="button" class="btn btn-sm btn-secondary">
                    <HelpCircle class="h-4 w-4" />
                    Klik Buka Popover
                  </button>
                </template>
                <template #default="{ close }">
                  <div class="space-y-2.5">
                    <p>Server berjalan normal dengan beban CPU rata-rata <strong>24%</strong>.</p>
                    <UiProgress :value="24" variant="success" size="xs" />
                    <div class="flex justify-end pt-1">
                      <button type="button" class="btn btn-xs btn-primary" @click="close">
                        Tutup Panel
                      </button>
                    </div>
                  </div>
                </template>
              </UiPopover>
            </div>
          </div>
        </div>
      </UiCard>

      <UiCard
        title="18. Empty State (<UiEmptyState>)"
        subtitle="Tampilan placeholder bersih ketika daftar data, hasil pencarian, atau folder masih kosong"
        accent-top="error"
      >
        <UiEmptyState
          title="Belum Ada Dokumen Tersimpan"
          description="Mulai unggah dokumen proyek pertama Anda atau buat folder baru untuk mengelompokkan arsip tim."
          :icon="FolderPlus"
          variant="primary"
          compact
        >
          <template #actions>
            <UiButton
              variant="primary"
              size="sm"
              @click="toast.success('Folder Dibuat', 'Folder proyek baru berhasil disiapkan.')"
            >
              <template #icon-left>
                <FolderPlus class="h-4 w-4" />
              </template>
              Buat Folder Baru
            </UiButton>
          </template>
        </UiEmptyState>
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
