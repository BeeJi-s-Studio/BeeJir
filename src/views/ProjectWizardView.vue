<script setup lang="ts">
import { ref } from 'vue'
import {
  Rocket,
  FileText,
  Image as ImageIcon,
  Sparkles,
  HelpCircle,
  FolderKanban,
  Layers,
} from 'lucide-vue-next'
import { useToast } from '@/stores/toast'
import UiBadge from '@/components/ui/UiBadge.vue'
import UiInput from '@/components/ui/UiInput.vue'
import UiSelect from '@/components/ui/UiSelect.vue'
import UiSelectTag from '@/components/ui/UiSelectTag.vue'
import UiDatePicker from '@/components/ui/UiDatePicker.vue'
import UiRichEditor from '@/components/ui/UiRichEditor.vue'
import UiFileUpload, { type UploadedFileItem } from '@/components/ui/UiFileUpload.vue'
import UiStepper, { type StepItem } from '@/components/ui/UiStepper.vue'
import UiProgress from '@/components/ui/UiProgress.vue'
import UiSpinner from '@/components/ui/UiSpinner.vue'
import UiCheckbox from '@/components/ui/UiCheckbox.vue'
import UiPopover from '@/components/ui/UiPopover.vue'
import UiAlert from '@/components/ui/UiAlert.vue'

const toast = useToast()

const currentStep = ref(0)
const isDeploying = ref(false)
const deployProgress = ref(0)
const isLaunched = ref(false)

const wizardSteps: StepItem[] = [
  {
    id: 'basic',
    title: 'Informasi Proyek',
    subtitle: 'Nama, kategori & jadwal',
    icon: FolderKanban,
  },
  {
    id: 'spec',
    title: 'Spesifikasi (WYSIWYG)',
    subtitle: 'Dokumentasi & arsitektur',
    icon: FileText,
  },
  {
    id: 'assets',
    title: 'Upload Dokumen & Galeri',
    subtitle: 'Drag & drop + Multi-foto',
    icon: ImageIcon,
  },
  {
    id: 'review',
    title: 'Review & Peluncuran',
    subtitle: 'Verifikasi akhir & deploy',
    icon: Rocket,
  },
]

// Step 1 Data
const projectName = ref('BeeJir Cloud Analytics v2')
const projectSlug = ref('beejir-cloud-v2')
const projectCategory = ref('saas')
const launchDate = ref('2026-11-15')
const selectedStack = ref(['vue', 'typescript', 'tailwind', 'bun'])
const isOpenSource = ref(true)

const categoryOptions = [
  { label: 'SaaS Dashboard & Analytics', value: 'saas', description: 'Aplikasi analitik bisnis multi-tenant', variant: 'primary' as const },
  { label: 'Internal Admin Backoffice', value: 'admin', description: 'Sistem operasional & manajemen pengguna', variant: 'secondary' as const },
  { label: 'E-Commerce & Fintech Portal', value: 'fintech', description: 'Manajemen transaksi & katalog produk', variant: 'accent' as const },
  { label: 'Developer Tools & Documentation', value: 'devtools', description: 'Portal API & dokumentasi teknis', variant: 'info' as const },
  { label: 'AI & Machine Learning Studio', value: 'ai', description: 'Antarmuka eksperimen model & dataset', variant: 'success' as const },
  { label: 'IoT Monitoring Center', value: 'iot', description: 'Pemantauan sensor & telemetri real-time', variant: 'warning' as const },
]

const stackOptions = [
  { label: 'Vue 3.5', value: 'vue', variant: 'primary' as const },
  { label: 'TypeScript', value: 'typescript', variant: 'secondary' as const },
  { label: 'Tailwind CSS', value: 'tailwind', variant: 'accent' as const },
  { label: 'Bun Runtime', value: 'bun', variant: 'warning' as const },
  { label: 'Pinia', value: 'pinia', variant: 'success' as const },
  { label: 'Docker', value: 'docker', variant: 'info' as const },
]

// Step 2 Data (WYSIWYG)
const projectSpecHtml = ref(
  '<h2>Ringkasan Eksekutif Proyek</h2><p><strong>BeeJir Cloud Analytics v2</strong> dirancang untuk menyajikan metrik performa infrastruktur secara <em>real-time</em> dengan antarmuka yang bersih dan responsif.</p><h3>Target Utama</h3><ol><li>Waktu muat halaman awal di bawah <strong>400ms</strong>.</li><li>Dukungan kustomisasi warna tema penuh untuk tiap organisasi klien.</li><li>Ekspor laporan instan dalam format CSV dan PDF.</li></ol><blockquote>Semua modul wajib lulus pemeriksaan TypeScript strict mode sebelum masuk ke branch produksi.</blockquote>'
)

// Step 3 Data (File Uploads)
const specDocuments = ref<UploadedFileItem[]>([
  {
    id: 'doc-1',
    name: 'PRD-BeeJir-Analytics-v2.pdf',
    size: 1458200,
    type: 'application/pdf',
    progress: 100,
    status: 'done',
  },
  {
    id: 'doc-2',
    name: 'System-Architecture-Schema.json',
    size: 84200,
    type: 'application/json',
    progress: 100,
    status: 'done',
  },
])

const galleryPhotos = ref<UploadedFileItem[]>([
  {
    id: 'img-1',
    name: 'dashboard-preview-light.jpg',
    size: 620400,
    type: 'image/jpeg',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    progress: 100,
    status: 'done',
  },
  {
    id: 'img-2',
    name: 'analytics-chart-overview.jpg',
    size: 512000,
    type: 'image/jpeg',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    progress: 100,
    status: 'done',
  },
])

function handleFinishWizard() {
  if (isDeploying.value) return
  isDeploying.value = true
  deployProgress.value = 15

  const timer = setInterval(() => {
    if (deployProgress.value < 100) {
      deployProgress.value = Math.min(100, deployProgress.value + 25)
    } else {
      clearInterval(timer)
      isDeploying.value = false
      isLaunched.value = true
      toast.success(
        'Proyek Berhasil Diluncurkan!',
        `${projectName.value} kini telah aktif di environment produksi.`
      )
    }
  }, 350)
}

function resetDemo() {
  isLaunched.value = false
  deployProgress.value = 0
  currentStep.value = 0
}
</script>

<template>
  <div class="space-y-6">
    <!-- Top Banner -->
    <div class="card card-bordered p-5">
      <div class="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1.5">
            <UiBadge variant="primary" soft dot>Interactive App Demo</UiBadge>
            <UiBadge variant="accent" soft>Multi-Step Wizard</UiBadge>
          </div>
          <h2 class="text-xl font-extrabold text-base-content">
            Project Creation & Deployment Wizard
          </h2>
          <p class="text-xs text-base-content/65 mt-0.5">
            Halaman demo interaktif yang menggabungkan <strong>Stepper + Integrated Progress</strong>, <strong>Date Picker</strong>, <strong>Select</strong>, <strong>Rich Text Editor</strong>, dan <strong>Multi-Photo Upload</strong>.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <!-- Popover Guide -->
          <UiPopover
            title="Panduan Halaman Demo"
            subtitle="Komponen yang digunakan di halaman ini"
            position="bottom"
            width-class="w-80"
          >
            <template #trigger>
              <button type="button" class="btn btn-soft btn-secondary btn-sm">
                <HelpCircle class="h-4 w-4" />
                Info Komponen
              </button>
            </template>
            <ul class="space-y-1.5 text-xs list-disc pl-4">
              <li><strong>UiStepper</strong>: Navigasi 4 langkah dengan progress bar terintegrasi.</li>
              <li><strong>UiDatePicker</strong>: Pemilih tanggal peluncuran.</li>
              <li><strong>UiRichEditor</strong>: Editor spesifikasi WYSIWYG.</li>
              <li><strong>UiFileUpload</strong>: Drag & drop dokumen + Galeri banyak foto.</li>
            </ul>
          </UiPopover>
        </div>
      </div>
    </div>

    <!-- Success Launched State -->
    <UiAlert
      v-if="isLaunched"
      variant="success"
      solid
      title="Selamat! Proyek Anda Telah Aktif di Server Produksi"
    >
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-1">
        <span>
          Proyek <strong>{{ projectName }}</strong> ({{ specDocuments.length }} dokumen & {{ galleryPhotos.length }} foto galeri) telah berhasil dipublikasikan.
        </span>
        <button
          type="button"
          class="btn btn-xs bg-white text-slate-950 border-none font-bold shrink-0"
          @click="resetDemo"
        >
          Ulangi Wizard dari Awal
        </button>
      </div>
    </UiAlert>

    <!-- Main Stepper Component (with Integrated Progress Bar) -->
    <UiStepper
      v-model="currentStep"
      :steps="wizardSteps"
      progress-label="Progres Konfigurasi Proyek"
      finish-label="Luncurkan Proyek Sekarang"
      @finish="handleFinishWizard"
    >
      <!-- STEP 0: BASIC PROJECT INFO -->
      <template #step-0>
        <div class="space-y-5">
          <div class="border-b border-base-300/70 pb-3">
            <h3 class="text-base font-extrabold text-base-content">
              1. Informasi Dasar & Jadwal Proyek
            </h3>
            <p class="text-xs text-base-content/60">
              Tentukan identitas proyek, kategori arsitektur, dan target tanggal peluncuran.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UiInput
              v-model="projectName"
              label="Nama Proyek"
              placeholder="Masukkan nama proyek..."
            />
            <UiInput
              v-model="projectSlug"
              label="Workspace Slug / ID"
              placeholder="contoh: beejir-cloud"
            />
            <UiSelect
              v-model="projectCategory"
              :options="categoryOptions"
              label="Kategori Aplikasi (UiSelect)"
              :page-size="4"
            />
            <UiDatePicker
              v-model="launchDate"
              label="Target Tanggal Rilis (UiDatePicker)"
            />
          </div>

          <UiSelectTag
            v-model="selectedStack"
            :options="stackOptions"
            label="Tech Stack & Infrastruktur (UiSelectTag)"
            allow-create
          />

          <div class="pt-2">
            <UiCheckbox
              v-model="isOpenSource"
              variant="primary"
              label="Publikasikan sebagai Repositori Open-Source (MIT License)"
              description="Mengizinkan kontributor eksternal melihat kode sumber dan mengirimkan pull request"
            />
          </div>
        </div>
      </template>

      <!-- STEP 1: RICH TEXT SPECIFICATION -->
      <template #step-1>
        <div class="space-y-4">
          <div class="border-b border-base-300/70 pb-3">
            <h3 class="text-base font-extrabold text-base-content">
              2. Spesifikasi & Dokumentasi Proyek (WYSIWYG Editor)
            </h3>
            <p class="text-xs text-base-content/60">
              Tulis deskripsi lengkap, daftar fitur, atau catatan teknis menggunakan Rich Text Editor.
            </p>
          </div>

          <UiRichEditor
            v-model="projectSpecHtml"
            label="Dokumen Spesifikasi Teknis"
            min-height="240px"
            hint="Cobalah memblok teks lalu klik tombol Bold, Heading, List, atau tombol HTML di pojok kanan toolbar"
          />
        </div>
      </template>

      <!-- STEP 2: DRAG & DROP + MULTI-PHOTO GALLERY -->
      <template #step-2>
        <div class="space-y-6">
          <div class="border-b border-base-300/70 pb-3">
            <h3 class="text-base font-extrabold text-base-content">
              3. Upload Dokumen & Galeri Screenshot Proyek
            </h3>
            <p class="text-xs text-base-content/60">
              Unggah dokumen spesifikasi melalui Drag & Drop serta banyak foto screenshot sekaligus.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="space-y-2">
              <UiFileUpload
                v-model="specDocuments"
                mode="dropzone"
                label="A. Upload Dokumen Pendukung (Drag & Drop + Preview)"
                hint="Seret file PDF, JSON, atau ZIP ke kotak di atas"
              />
            </div>

            <div class="space-y-2">
              <UiFileUpload
                v-model="galleryPhotos"
                mode="gallery"
                multiple
                label="B. Galeri Foto & Screenshot (Multi-Photo Upload)"
                hint="Klik '+ Tambah Foto' untuk memilih banyak gambar sekaligus. Arahkan kursor pada foto untuk melihat preview penuh."
              />
            </div>
          </div>
        </div>
      </template>

      <!-- STEP 3: REVIEW & DEPLOYMENT -->
      <template #step-3>
        <div class="space-y-6">
          <div class="border-b border-base-300/70 pb-3 flex items-center justify-between">
            <div>
              <h3 class="text-base font-extrabold text-base-content">
                4. Tinjauan Akhir & Peluncuran
              </h3>
              <p class="text-xs text-base-content/60">
                Periksa kembali ringkasan konfigurasi sebelum menekan tombol peluncuran.
              </p>
            </div>
            <UiBadge variant="success" soft>Siap Deploy</UiBadge>
          </div>

          <!-- Simulating Deployment Progress -->
          <div
            v-if="isDeploying"
            class="rounded-box border border-primary/30 bg-primary/5 p-6 space-y-4 text-center"
          >
            <UiSpinner variant="primary" size="lg" label="Sedang memproses build & mengunggah aset ke cluster..." />
            <UiProgress
              :value="deployProgress"
              variant="primary"
              label="Progres Deployment Produksi"
              show-value
              striped
              animated
            />
          </div>

          <!-- Summary Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="rounded-box border border-base-300 bg-base-200/40 p-4 space-y-2.5 text-xs">
              <div class="flex items-center gap-2 font-extrabold text-sm text-base-content mb-2">
                <Layers class="h-4 w-4 text-primary" />
                <span>Metadata Proyek</span>
              </div>
              <div class="flex justify-between py-1 border-b border-base-300/60">
                <span class="text-base-content/60">Nama Proyek:</span>
                <span class="font-bold text-base-content">{{ projectName }}</span>
              </div>
              <div class="flex justify-between py-1 border-b border-base-300/60">
                <span class="text-base-content/60">Kategori:</span>
                <span class="badge badge-soft badge-primary badge-xs font-medium uppercase">{{ projectCategory }}</span>
              </div>
              <div class="flex justify-between py-1 border-b border-base-300/60">
                <span class="text-base-content/60">Target Rilis:</span>
                <span class="font-mono font-semibold">{{ launchDate || 'Belum ditentukan' }}</span>
              </div>
              <div class="flex justify-between py-1">
                <span class="text-base-content/60">Total Aset:</span>
                <span class="font-bold text-secondary">
                  {{ specDocuments.length }} dokumen, {{ galleryPhotos.length }} foto
                </span>
              </div>
            </div>

            <div class="rounded-box border border-base-300 bg-base-200/40 p-4 space-y-2 text-xs">
              <div class="flex items-center gap-2 font-extrabold text-sm text-base-content mb-2">
                <Sparkles class="h-4 w-4 text-secondary" />
                <span>Pratinjau Spesifikasi (HTML Output)</span>
              </div>
              <div
                class="rounded-btn bg-base-100 border border-base-300 p-3 max-h-36 overflow-y-auto text-xs text-base-content/80 space-y-1"
                v-html="projectSpecHtml"
              />
            </div>
          </div>
        </div>
      </template>
    </UiStepper>
  </div>
</template>
