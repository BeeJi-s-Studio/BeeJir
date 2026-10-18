<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  Sparkles,
  Mail,
  Lock,
  User,
  ArrowRight,
  Github,
  Chrome,
  Palette,
  Sun,
  Moon,
  LayoutDashboard,
  ShieldCheck,
  Zap,
  Layers,
} from 'lucide-vue-next'
import { useThemeStore } from '@/stores/theme'
import { useToast } from '@/stores/toast'
import UiInput from '@/components/ui/UiInput.vue'
import UiCheckbox from '@/components/ui/UiCheckbox.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiBadge from '@/components/ui/UiBadge.vue'
import UiAlert from '@/components/ui/UiAlert.vue'

const router = useRouter()
const themeStore = useThemeStore()
const toast = useToast()

const authMode = ref<'login' | 'register'>('login')
const fullName = ref('Arif Pratama')
const email = ref('admin@beejir.dev')
const password = ref('••••••••••••')
const rememberMe = ref(true)
const agreeTerms = ref(true)
const isSubmitting = ref(false)
const errorMessage = ref('')

function handleSubmit() {
  errorMessage.value = ''
  if (!email.value.trim() || !password.value.trim()) {
    errorMessage.value = 'Mohon isi alamat email dan kata sandi Anda terlebih dahulu.'
    return
  }

  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    toast.success(
      authMode.value === 'login' ? 'Berhasil Masuk!' : 'Akun Berhasil Dibuat!',
      `Selamat datang kembali di dashboard BeeJir, ${authMode.value === 'login' ? 'Administrator' : fullName.value}.`
    )
    router.push('/')
  }, 900)
}

function handleQuickSocial(provider: string) {
  toast.info(`Autentikasi ${provider}`, `Menghubungkan sesi OAuth ${provider} ke dashboard...`)
  setTimeout(() => {
    router.push('/')
  }, 700)
}
</script>

<template>
  <div class="min-h-screen w-full bg-base-200 text-base-content flex flex-col lg:flex-row">
    <!-- Top Floating Utility Bar -->
    <div class="fixed top-4 right-4 z-40 flex items-center gap-2">
      <RouterLink to="/" class="btn btn-sm bg-base-100/90 backdrop-blur-md shadow-sm">
        <LayoutDashboard class="h-4 w-4 text-primary" />
        <span>Ke Dashboard</span>
      </RouterLink>
      <button
        type="button"
        class="btn btn-sm btn-circle bg-base-100/90 backdrop-blur-md shadow-sm"
        title="Ganti Dark/Light Mode"
        @click="themeStore.toggleDarkLight()"
      >
        <Sun v-if="themeStore.isDark" class="h-4 w-4 text-warning" />
        <Moon v-else class="h-4 w-4 text-base-content" />
      </button>
      <button
        type="button"
        class="btn btn-primary btn-sm shadow-sm"
        @click="themeStore.customizerOpen = true"
      >
        <Palette class="h-4 w-4" />
        <span class="hidden sm:inline">Tema</span>
      </button>
    </div>

    <!-- Left Column: Interactive Auth Form -->
    <div class="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16 bg-base-100">
      <div class="w-full max-w-md space-y-6">
        <!-- Brand Logo -->
        <div class="flex items-center gap-3">
          <div class="flex h-11 w-11 items-center justify-center rounded-btn bg-gradient-to-tr from-primary via-secondary to-accent text-white shadow-md shadow-primary/25">
            <Sparkles class="h-6 w-6" />
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xl font-extrabold tracking-tight text-base-content">
                Bee<span class="text-primary">Jir</span>
              </span>
              <UiBadge variant="primary" size="sm" soft>Auth Demo</UiBadge>
            </div>
            <p class="text-xs text-base-content/55">Open-Source Clean & Colorful Admin</p>
          </div>
        </div>

        <!-- Title & Mode Switcher -->
        <div class="space-y-2">
          <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-base-content">
            {{ authMode === 'login' ? 'Selamat Datang Kembali' : 'Buat Akun Baru' }}
          </h1>
          <p class="text-xs sm:text-sm text-base-content/65">
            {{
              authMode === 'login'
                ? 'Masuk menggunakan kredensial demo untuk menjelajahi panel admin.'
                : 'Daftar dalam hitungan detik untuk mulai mengelola workspace Anda.'
            }}
          </p>
        </div>

        <!-- Mode Tabs -->
        <div class="grid grid-cols-2 gap-1.5 rounded-btn bg-base-200 p-1 border border-base-300">
          <button
            type="button"
            class="py-2 rounded-btn text-xs font-extrabold transition-all cursor-pointer"
            :class="
              authMode === 'login'
                ? 'bg-base-100 text-primary shadow-xs'
                : 'text-base-content/60 hover:text-base-content'
            "
            @click="authMode = 'login'"
          >
            Masuk (Sign In)
          </button>
          <button
            type="button"
            class="py-2 rounded-btn text-xs font-extrabold transition-all cursor-pointer"
            :class="
              authMode === 'register'
                ? 'bg-base-100 text-primary shadow-xs'
                : 'text-base-content/60 hover:text-base-content'
            "
            @click="authMode = 'register'"
          >
            Daftar (Register)
          </button>
        </div>

        <!-- Validation Alert -->
        <UiAlert
          v-if="errorMessage"
          variant="error"
          title="Autentikasi Gagal"
          dismissible
          @dismiss="errorMessage = ''"
        >
          {{ errorMessage }}
        </UiAlert>

        <!-- Auth Form -->
        <form class="space-y-4" @submit.prevent="handleSubmit">
          <UiInput
            v-if="authMode === 'register'"
            v-model="fullName"
            label="Nama Lengkap"
            placeholder="Masukkan nama lengkap..."
          >
            <template #icon-left>
              <User class="h-4 w-4" />
            </template>
          </UiInput>

          <UiInput
            v-model="email"
            type="email"
            label="Alamat Email"
            placeholder="nama@perusahaan.com"
          >
            <template #icon-left>
              <Mail class="h-4 w-4" />
            </template>
          </UiInput>

          <UiInput
            v-model="password"
            type="password"
            label="Kata Sandi"
            placeholder="Masukkan kata sandi..."
            hint="Gunakan minimal 8 karakter kombinasi huruf & angka"
          >
            <template #icon-left>
              <Lock class="h-4 w-4" />
            </template>
          </UiInput>

          <div class="flex items-center justify-between pt-1">
            <UiCheckbox
              v-if="authMode === 'login'"
              v-model="rememberMe"
              variant="primary"
              size="sm"
              label="Ingat sesi saya selama 30 hari"
            />
            <UiCheckbox
              v-else
              v-model="agreeTerms"
              variant="primary"
              size="sm"
              label="Saya menyetujui Syarat & Ketentuan"
            />

            <button
              v-if="authMode === 'login'"
              type="button"
              class="text-xs font-bold text-primary hover:underline cursor-pointer"
              @click="toast.info('Reset Kata Sandi', 'Tautan pemulihan telah dikirim ke email demo Anda.')"
            >
              Lupa sandi?
            </button>
          </div>

          <UiButton
            type="submit"
            variant="primary"
            block
            :loading="isSubmitting"
          >
            <span>{{ authMode === 'login' ? 'Masuk ke Dashboard' : 'Buat Akun Sekarang' }}</span>
            <template #icon-right>
              <ArrowRight class="h-4 w-4" />
            </template>
          </UiButton>
        </form>

        <!-- Divider -->
        <div class="relative flex items-center justify-center">
          <div class="border-t border-base-300 w-full" />
          <span class="bg-base-100 px-3 text-[11px] font-bold uppercase tracking-wider text-base-content/45 whitespace-nowrap">
            Atau masuk cepat dengan
          </span>
          <div class="border-t border-base-300 w-full" />
        </div>

        <!-- Social Login Buttons -->
        <div class="grid grid-cols-2 gap-3">
          <button
            type="button"
            class="btn btn-outline btn-sm"
            @click="handleQuickSocial('GitHub')"
          >
            <Github class="h-4 w-4" />
            <span>GitHub</span>
          </button>
          <button
            type="button"
            class="btn btn-outline btn-sm"
            @click="handleQuickSocial('Google')"
          >
            <Chrome class="h-4 w-4 text-primary" />
            <span>Google</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Right Column: Colorful Feature Showcase Banner -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent p-12 xl:p-16 text-white flex-col justify-between">
      <!-- Decorative Circles -->
      <div class="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/10 blur-2xl" />
      <div class="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-black/15 blur-2xl" />

      <div class="relative z-10">
        <span class="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-3.5 py-1 text-xs font-extrabold tracking-wide">
          <Sparkles class="h-3.5 w-3.5" />
          BeeJir Design System v0.3
        </span>
      </div>

      <div class="relative z-10 space-y-6 my-auto">
        <h2 class="text-3xl xl:text-4xl font-extrabold leading-tight">
          Bangun Dashboard Modern dengan Tema Clean & Colorful.
        </h2>
        <p class="text-white/85 text-sm xl:text-base leading-relaxed max-w-lg">
          Dilengkapi puluhan komponen siap pakai: DataTable kompleks, Multi-Select, Date Picker, File Upload Drag & Drop, Rich Text Editor, hingga Multi-Step Wizard.
        </p>

        <!-- Feature Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4">
          <div class="rounded-box bg-white/15 backdrop-blur-md border border-white/20 p-4">
            <Zap class="h-5 w-5 mb-2" />
            <h4 class="text-xs font-extrabold">Zero Bloat</h4>
            <p class="text-[11px] text-white/80 mt-0.5">Murni Vue 3 + Tailwind CSS variabel RGB</p>
          </div>
          <div class="rounded-box bg-white/15 backdrop-blur-md border border-white/20 p-4">
            <Layers class="h-5 w-5 mb-2" />
            <h4 class="text-xs font-extrabold">20+ Komponen UI</h4>
            <p class="text-[11px] text-white/80 mt-0.5">Dual-API class CSS & komponen Vue</p>
          </div>
          <div class="rounded-box bg-white/15 backdrop-blur-md border border-white/20 p-4">
            <ShieldCheck class="h-5 w-5 mb-2" />
            <h4 class="text-xs font-extrabold">TypeScript Strict</h4>
            <p class="text-[11px] text-white/80 mt-0.5">Tipe aman dan siap untuk skala enterprise</p>
          </div>
        </div>
      </div>

      <div class="relative z-10 flex items-center justify-between text-xs text-white/75 border-t border-white/20 pt-6">
        <span>© 2026 BeeJir Open-Source Project</span>
        <span>MIT Licensed</span>
      </div>
    </div>
  </div>
</template>
