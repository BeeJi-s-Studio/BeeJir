<script setup lang="ts">
import { ref } from 'vue'
import {
  User,
  Mail,
  MapPin,
  Briefcase,
  Globe,
  Shield,
  GitCommit,
  CheckCircle2,
  Sparkles,
  Award,
  Laptop,
  Smartphone,
  Save,
  Share2,
  MoreHorizontal,
  Edit3,
  KeyRound,
} from 'lucide-vue-next'
import { useToast } from '@/stores/toast'
import UiCard from '@/components/ui/UiCard.vue'
import UiBadge from '@/components/ui/UiBadge.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiInput from '@/components/ui/UiInput.vue'
import UiSelect from '@/components/ui/UiSelect.vue'
import UiSelectTag from '@/components/ui/UiSelectTag.vue'
import UiDatePicker from '@/components/ui/UiDatePicker.vue'
import UiRichEditor from '@/components/ui/UiRichEditor.vue'
import UiFileUpload, { type UploadedFileItem } from '@/components/ui/UiFileUpload.vue'
import UiProgress from '@/components/ui/UiProgress.vue'
import UiTimeline, { type TimelineItem } from '@/components/ui/UiTimeline.vue'
import UiList, { type ListItem } from '@/components/ui/UiList.vue'
import UiCheckbox from '@/components/ui/UiCheckbox.vue'
import UiDropdown from '@/components/ui/UiDropdown.vue'
import UiTooltip from '@/components/ui/UiTooltip.vue'

const toast = useToast()

const activeTab = ref<'overview' | 'edit' | 'security'>('overview')

// Profile Form State
const profileName = ref('Arif Pratama')
const profileTitle = ref('Lead Frontend Architect')
const profileEmail = ref('arif.pratama@beejir.dev')
const profileLocation = ref('Jakarta Selatan, Indonesia')
const profileWebsite = ref('https://beejir.dev')
const profileBirthDate = ref('1998-05-14')
const profileDepartment = ref('engineering')
const profileSkills = ref(['vue', 'typescript', 'tailwind', 'bun', 'architecture'])
const profileBio = ref(
  '<h3>Tentang Saya</h3><p>Seorang <strong>Frontend Architect</strong> yang berfokus pada pengembangan sistem desain modern, arsitektur komponen modular di <em>Vue 3 & TypeScript</em>, serta performa tinggi menggunakan runtime <strong>Bun</strong>.</p><ul><li>Maintainer utama proyek open-source BeeJir Admin Template.</li><li>Aktif menulis dokumentasi teknis dan standar UI/UX aksesibel.</li></ul>'
)

const avatarFiles = ref<UploadedFileItem[]>([
  {
    id: 'avatar-1',
    name: 'profile-avatar-hd.png',
    size: 425984,
    type: 'image/png',
    progress: 100,
    status: 'done',
  },
])

const departmentOptions = [
  { label: 'Core Engineering & Architecture', value: 'engineering', description: 'Pengembangan platform & infrastruktur', variant: 'primary' as const },
  { label: 'Product Design & Design System', value: 'design', description: 'UI/UX, token warna & komponen', variant: 'secondary' as const },
  { label: 'DevOps & Cloud Reliability', value: 'devops', description: 'CI/CD, Docker & Kubernetes', variant: 'accent' as const },
  { label: 'Product Management', value: 'product', description: 'Roadmap & strategi rilis', variant: 'info' as const },
  { label: 'Quality Assurance', value: 'qa', description: 'Automated testing & E2E', variant: 'success' as const },
  { label: 'Security Operations', value: 'secops', description: 'Audit keamanan & kepatuhan', variant: 'warning' as const },
]

const skillOptions = [
  { label: 'Vue 3.5', value: 'vue', variant: 'primary' as const },
  { label: 'TypeScript', value: 'typescript', variant: 'secondary' as const },
  { label: 'Tailwind CSS', value: 'tailwind', variant: 'accent' as const },
  { label: 'Bun Runtime', value: 'bun', variant: 'warning' as const },
  { label: 'UI Architecture', value: 'architecture', variant: 'success' as const },
  { label: 'Vite 6', value: 'vite', variant: 'info' as const },
  { label: 'Pinia Store', value: 'pinia', variant: 'primary' as const },
]

// Activity Timeline
const timelineActivities: TimelineItem[] = [
  {
    id: 1,
    title: 'Merilis Komponen Searchable & Paginated Select',
    description: 'Menambahkan komponen <UiSelect> dengan fitur pencarian real-time, pill paginasi, dan dukungan multi-tag.',
    time: '2 jam yang lalu',
    variant: 'primary',
    badge: 'Release v0.3',
    icon: Sparkles,
    author: 'Arif Pratama',
  },
  {
    id: 2,
    title: 'Menyelesaikan Audit Kontras Tema Gelap & Terang',
    description: 'Memperbarui token warna teks dan ikon pada komponen Alert Solid agar tetap tajam di seluruh preset tema.',
    time: 'Kemarin, 18:40',
    variant: 'success',
    badge: 'Design System',
    icon: CheckCircle2,
    author: 'Arif Pratama',
  },
  {
    id: 3,
    title: 'Mengintegrasikan Komponen DataTable & CSV Exporter',
    description: 'Membangun tabel interaktif dengan sorting kolom, pemilihan baris massal, dan ekspor langsung ke CSV.',
    time: '3 hari yang lalu',
    variant: 'secondary',
    badge: 'Feature',
    icon: GitCommit,
    author: 'Arif Pratama',
  },
  {
    id: 4,
    title: 'Penghargaan Top Open-Source Contributor',
    description: 'Mencapai 100+ commit pertama pada repositori utama BeeJir Admin Template.',
    time: 'Minggu lalu',
    variant: 'warning',
    badge: 'Milestone',
    icon: Award,
    author: 'System Bot',
  },
]

// Active Projects List
const activeProjects: ListItem[] = [
  {
    id: 'p1',
    title: 'BeeJir Core UI Library',
    subtitle: '24 Komponen Vue 3 + TypeScript + Custom Tailwind CSS',
    badge: 'Active',
    badgeVariant: 'success',
    meta: 'v0.3.0',
    variant: 'primary',
    avatar: 'BJ',
  },
  {
    id: 'p2',
    title: 'Theme Engine & Live Customizer',
    subtitle: 'Sistem variabel RGB dinamis dengan 6 preset warna bawaan',
    badge: 'Stable',
    badgeVariant: 'primary',
    meta: '100%',
    variant: 'secondary',
    avatar: 'TE',
  },
  {
    id: 'p3',
    title: 'Dokumentasi & Starter Kit CLI',
    subtitle: 'Panduan instalasi cepat berbasis Bun untuk developer',
    badge: 'In Progress',
    badgeVariant: 'warning',
    meta: '75%',
    variant: 'accent',
    avatar: 'DK',
  },
]

// Active Sessions List
const deviceSessions: ListItem[] = [
  {
    id: 's1',
    title: 'Windows 11 Pro • Chrome 132 (Perangkat Ini)',
    subtitle: 'Jakarta, Indonesia • IP 103.144.22.18',
    badge: 'Sesi Aktif',
    badgeVariant: 'success',
    icon: Laptop,
    variant: 'primary',
  },
  {
    id: 's2',
    title: 'iPhone 16 Pro • Safari Mobile',
    subtitle: 'Bandung, Indonesia • Terakhir aktif 3 jam lalu',
    badge: 'Terverifikasi',
    badgeVariant: 'info',
    icon: Smartphone,
    variant: 'secondary',
  },
]

// Security Preferences
const enable2FA = ref(true)
const emailAlerts = ref(true)
const weeklyDigest = ref(false)
const loginNotifications = ref(true)

const profileActions = [
  { label: 'Bagikan Tautan Profil', value: 'share', icon: Share2 },
  { label: 'Ekspor Resume JSON', value: 'export', icon: Briefcase, badge: 'JSON' },
  { divider: true },
  { label: 'Nonaktifkan Status Publik', value: 'disable', danger: true },
]

function saveProfile() {
  toast.success(
    'Profil Berhasil Diperbarui!',
    `Perubahan data profil untuk ${profileName.value} telah disimpan.`
  )
  activeTab.value = 'overview'
}
</script>

<template>
  <div class="space-y-6">
    <!-- Top Profile Banner Card -->
    <div class="rounded-box border border-base-300 bg-base-100 overflow-visible shadow-xs">
      <!-- Colorful Cover Gradient -->
      <div class="h-36 sm:h-44 w-full rounded-t-box bg-gradient-to-r from-primary via-secondary to-accent relative overflow-hidden">
        <div class="absolute inset-0 bg-black/10" />
        <div class="absolute top-4 right-4 flex items-center gap-2">
          <UiBadge variant="neutral" class="bg-black/40 text-white border-white/20 backdrop-blur-md">
            Core Maintainer
          </UiBadge>
        </div>
      </div>

      <!-- Profile Identity Bar -->
      <div class="px-5 sm:px-8 pb-6">
        <div class="relative -mt-12 sm:-mt-14 mb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div class="flex flex-col sm:flex-row sm:items-end gap-4">
            <!-- Avatar -->
            <div class="relative h-24 w-24 sm:h-28 sm:w-28 rounded-2xl border-4 border-base-100 bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center text-3xl font-extrabold shadow-lg">
              AP
              <span
                class="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-success border-2 border-base-100"
                title="Status: Online"
              />
            </div>

            <!-- Name & Headline -->
            <div class="pt-1">
              <div class="flex flex-wrap items-center gap-2">
                <h2 class="text-xl sm:text-2xl font-extrabold text-base-content">
                  {{ profileName }}
                </h2>
                <UiTooltip text="Akun Maintainer Terverifikasi" variant="primary">
                  <span class="badge badge-primary badge-sm gap-1">
                    <CheckCircle2 class="h-3 w-3" />
                    Verified
                  </span>
                </UiTooltip>
              </div>
              <p class="text-xs sm:text-sm font-medium text-base-content/65 mt-0.5">
                {{ profileTitle }}
              </p>
              <div class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-base-content/55">
                <span class="inline-flex items-center gap-1">
                  <MapPin class="h-3.5 w-3.5 text-primary" />
                  {{ profileLocation }}
                </span>
                <span class="inline-flex items-center gap-1">
                  <Mail class="h-3.5 w-3.5 text-secondary" />
                  {{ profileEmail }}
                </span>
                <span class="inline-flex items-center gap-1">
                  <Globe class="h-3.5 w-3.5 text-accent" />
                  {{ profileWebsite }}
                </span>
              </div>
            </div>
          </div>

          <!-- Action Buttons & Dropdown -->
          <div class="flex items-center gap-2">
            <UiButton
              variant="primary"
              size="sm"
              @click="activeTab = activeTab === 'edit' ? 'overview' : 'edit'"
            >
              <template #icon-left>
                <Edit3 class="h-4 w-4" />
              </template>
              {{ activeTab === 'edit' ? 'Lihat Profil' : 'Edit Profil' }}
            </UiButton>

            <UiDropdown
              align="right"
              :items="profileActions"
              @select="(item) => toast.info('Aksi Profil', `Memilih menu: ${item.label}`)"
            >
              <template #trigger>
                <button type="button" class="btn btn-outline btn-sm btn-square">
                  <MoreHorizontal class="h-4 w-4" />
                </button>
              </template>
            </UiDropdown>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <div class="flex flex-wrap items-center gap-2 border-t border-base-300/70 pt-4">
          <button
            type="button"
            class="btn btn-sm"
            :class="activeTab === 'overview' ? 'btn-primary' : 'btn-ghost'"
            @click="activeTab = 'overview'"
          >
            <User class="h-4 w-4" />
            Ringkasan & Aktivitas
          </button>
          <button
            type="button"
            class="btn btn-sm"
            :class="activeTab === 'edit' ? 'btn-primary' : 'btn-ghost'"
            @click="activeTab = 'edit'"
          >
            <Edit3 class="h-4 w-4" />
            Edit Profil & Bio
          </button>
          <button
            type="button"
            class="btn btn-sm"
            :class="activeTab === 'security' ? 'btn-primary' : 'btn-ghost'"
            @click="activeTab = 'security'"
          >
            <Shield class="h-4 w-4" />
            Keamanan & Preferensi
          </button>
        </div>
      </div>
    </div>

    <!-- TAB 1: OVERVIEW & ACTIVITY -->
    <div v-if="activeTab === 'overview'" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column: Profile Completeness, Bio & Skills -->
      <div class="space-y-6">
        <UiCard title="Kelengkapan Profil" subtitle="Tingkatkan kredibilitas akun Anda" accent-top="primary">
          <div class="space-y-4">
            <UiProgress
              :value="92"
              variant="primary"
              label="Skor Kelengkapan"
              show-value
              striped
              animated
            />
            <p class="text-xs text-base-content/60 leading-relaxed">
              Profil Anda hampir sempurna! Tambahkan tautan repositori publik untuk mencapai 100%.
            </p>
          </div>
        </UiCard>

        <UiCard title="Biografi & Keahlian" accent-top="secondary">
          <div class="space-y-4">
            <div
              class="prose prose-sm max-w-none text-xs text-base-content/80 leading-relaxed space-y-2"
              v-html="profileBio"
            />

            <div class="pt-3 border-t border-base-300/70">
              <span class="text-[11px] font-bold uppercase tracking-wider text-base-content/50 block mb-2">
                Tech Stack & Keahlian Utama
              </span>
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="skill in profileSkills"
                  :key="skill"
                  class="badge badge-primary badge-sm font-semibold uppercase"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </UiCard>

        <UiCard title="Proyek yang Dikelola" subtitle="Klik item untuk melihat detail" accent-top="accent">
          <UiList
            :items="activeProjects"
            compact
            @item-click="(item) => toast.info(item.title, item.subtitle)"
          />
        </UiCard>
      </div>

      <!-- Right 2 Columns: Activity Timeline -->
      <div class="lg:col-span-2">
        <UiCard
          title="Linimasa Aktivitas Terbaru (Timeline)"
          subtitle="Riwayat kontribusi, rilis komponen, dan pembaruan sistem"
          accent-top="primary"
        >
          <UiTimeline :items="timelineActivities" />
        </UiCard>
      </div>
    </div>

    <!-- TAB 2: EDIT PROFILE (Uses DatePicker, Select, SelectTag, RichEditor, FileUpload) -->
    <div v-else-if="activeTab === 'edit'" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <UiCard
          title="Informasi Pribadi & Pekerjaan"
          subtitle="Perbarui identitas publik, tanggal lahir, dan peran organisasi"
          accent-top="primary"
        >
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UiInput v-model="profileName" label="Nama Lengkap" placeholder="Nama lengkap..." />
            <UiInput v-model="profileTitle" label="Jabatan / Role Title" placeholder="Jabatan..." />
            <UiInput v-model="profileEmail" type="email" label="Email Utama" placeholder="Email..." />
            <UiDatePicker
              v-model="profileBirthDate"
              label="Tanggal Lahir (UiDatePicker)"
              hint="Format: YYYY-MM-DD dengan kalender interaktif"
            />
            <UiSelect
              v-model="profileDepartment"
              :options="departmentOptions"
              label="Departemen / Divisi (UiSelect)"
              :page-size="4"
            />
            <UiInput v-model="profileLocation" label="Lokasi Domisili" placeholder="Kota, Negara" />
          </div>

          <div class="mt-4">
            <UiSelectTag
              v-model="profileSkills"
              :options="skillOptions"
              label="Tag Keahlian (UiSelectTag)"
              allow-create
            />
          </div>

          <div class="mt-4">
            <UiRichEditor
              v-model="profileBio"
              label="Biografi Lengkap (UiRichEditor WYSIWYG)"
              hint="Gunakan toolbar di atas untuk memformat teks tebal, miring, daftar poin, atau melihat kode HTML"
            />
          </div>

          <template #footer>
            <UiButton variant="ghost" size="sm" @click="activeTab = 'overview'">
              Batal
            </UiButton>
            <UiButton variant="primary" size="sm" @click="saveProfile">
              <template #icon-left>
                <Save class="h-4 w-4" />
              </template>
              Simpan Perubahan Profil
            </UiButton>
          </template>
        </UiCard>
      </div>

      <div class="space-y-6">
        <UiCard
          title="Foto Avatar & Dokumen"
          subtitle="Unggah foto profil baru dengan preview instan"
          accent-top="secondary"
        >
          <UiFileUpload
            v-model="avatarFiles"
            mode="dropzone"
            accept="image/*"
            :multiple="false"
            label="Upload Foto Profil Baru"
            hint="Mendukung format PNG, JPG, atau WebP hingga 5MB"
          />
        </UiCard>
      </div>
    </div>

    <!-- TAB 3: SECURITY & PREFERENCES -->
    <div v-else-if="activeTab === 'security'" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <UiCard
        title="Preferensi Keamanan & Notifikasi"
        subtitle="Kelola autentikasi dua faktor dan pemberitahuan akun"
        accent-top="warning"
      >
        <div class="space-y-4">
          <UiCheckbox
            v-model="enable2FA"
            variant="primary"
            label="Aktifkan Two-Factor Authentication (2FA)"
            description="Meminta kode OTP tambahan setiap kali masuk dari perangkat baru"
          />
          <UiCheckbox
            v-model="loginNotifications"
            variant="success"
            label="Notifikasi Aktivitas Login Baru"
            description="Kirim peringatan instan ketika ada sesi login dari alamat IP baru"
          />
          <UiCheckbox
            v-model="emailAlerts"
            variant="secondary"
            label="Berlangganan Pembaruan Keamanan Sistem"
            description="Terima buletin rilis patch keamanan dan pembaruan dependensi"
          />
          <UiCheckbox
            v-model="weeklyDigest"
            variant="accent"
            label="Laporan Ringkasan Mingguan"
            description="Kirim ringkasan performa proyek setiap hari Senin pagi"
          />
        </div>

        <template #footer>
          <UiButton
            variant="primary"
            size="sm"
            @click="toast.success('Preferensi Disimpan', 'Pengaturan keamanan akun telah diperbarui.')"
          >
            <template #icon-left>
              <KeyRound class="h-4 w-4" />
            </template>
            Simpan Pengaturan Keamanan
          </UiButton>
        </template>
      </UiCard>

      <UiCard
        title="Sesi Perangkat Aktif"
        subtitle="Daftar perangkat yang saat ini masuk ke akun Anda"
        accent-top="info"
      >
        <UiList :items="deviceSessions">
          <template #item-action="{ item }">
            <div class="flex items-center gap-2">
              <span class="badge badge-xs badge-soft badge-success font-bold">{{ item.badge }}</span>
              <button
                v-if="item.id !== 's1'"
                type="button"
                class="btn btn-ghost btn-xs text-error"
                @click="toast.warning('Sesi Dihentikan', `Sesi pada ${item.title} telah dikeluarkan.`)"
              >
                Keluarkan
              </button>
            </div>
          </template>
        </UiList>
      </UiCard>
    </div>
  </div>
</template>
