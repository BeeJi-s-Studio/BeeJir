<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  Menu,
  Search,
  Palette,
  Sun,
  Moon,
  Bell,
  Check,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  CheckCheck,
  Inbox,
} from 'lucide-vue-next'
import { useThemeStore } from '@/stores/theme'

interface NotificationItem {
  id: string
  title: string
  description: string
  time: string
  unread: boolean
  variant: 'primary' | 'success' | 'warning' | 'error' | 'info'
  icon: any
}

const route = useRoute()
const themeStore = useThemeStore()
const showPresetMenu = ref(false)
const showNotifications = ref(false)
const searchQuery = ref('')

const notifications = ref<NotificationItem[]>([
  {
    id: '1',
    title: 'Deployment v1.2.0 Sukses',
    description: 'Seluruh build aset Vite telah dipublikasikan ke production server.',
    time: '5 menit lalu',
    unread: true,
    variant: 'success',
    icon: CheckCircle2,
  },
  {
    id: '2',
    title: 'Penggunaan Cloud Storage 85%',
    description: 'Kapasitas tersisa 15 GB. Pertimbangkan upgrade kuota penyimpanan.',
    time: '45 menit lalu',
    unread: true,
    variant: 'warning',
    icon: AlertTriangle,
  },
  {
    id: '3',
    title: 'Pengguna Baru Bergabung',
    description: 'Sarah Jenkins (Frontend Dev) baru saja mendaftar dan verifikasi.',
    time: '2 jam lalu',
    unread: true,
    variant: 'primary',
    icon: Sparkles,
  },
  {
    id: '4',
    title: 'Backup Database Otomatis',
    description: 'Arsip harian 4.2 GB berhasil diunggah ke secure vault.',
    time: '6 jam lalu',
    unread: false,
    variant: 'info',
    icon: Info,
  },
])

const unreadCount = computed(() => notifications.value.filter((n) => n.unread).length)

function markAllAsRead() {
  notifications.value.forEach((n) => (n.unread = false))
}

function markAsRead(id: string) {
  const item = notifications.value.find((n) => n.id === id)
  if (item) {
    item.unread = false
  }
}
</script>

<template>
  <header
    class="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-base-300/80 bg-base-100/85 px-4 sm:px-6 backdrop-blur-md"
  >
    <!-- Left: Mobile Hamburger + Route Title -->
    <div class="flex items-center gap-3">
      <button
        type="button"
        class="btn btn-ghost btn-sm btn-square lg:hidden"
        aria-label="Buka navigasi"
        @click="themeStore.mobileSidebarOpen = true"
      >
        <Menu class="h-5 w-5" />
      </button>

      <div>
        <div class="flex items-center gap-2">
          <h1 class="text-base sm:text-lg font-extrabold tracking-tight text-base-content">
            {{ (route.meta.title as string) || 'Dashboard' }}
          </h1>
          <span
            class="hidden sm:inline-flex badge badge-sm badge-soft badge-primary font-medium"
          >
            {{ themeStore.currentPreset.name }}
          </span>
        </div>
        <p class="hidden md:block text-xs text-base-content/55">
          {{ (route.meta.subtitle as string) || 'BeeJir Open-Source Administrator Template' }}
        </p>
      </div>
    </div>

    <!-- Center: Clean Search Bar -->
    <div class="hidden md:flex flex-1 max-w-md mx-4">
      <div class="relative w-full">
        <Search
          class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-base-content/45"
        />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari menu, komponen, atau pengguna... (Ctrl+K)"
          class="input input-bordered input-sm w-full pl-9 pr-14 py-2 bg-base-200/60 focus:bg-base-100"
        />
        <kbd
          class="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-base-300 bg-base-100 px-1.5 py-0.5 font-mono text-[10px] text-base-content/55"
        >
          ⌘K
        </kbd>
      </div>
    </div>

    <!-- Right: Theme Switcher, Customizer Button, Notifications & Profile -->
    <div class="flex items-center gap-2">
      <!-- Quick Theme Preset Dropdown -->
      <div class="relative">
        <button
          type="button"
          class="btn btn-soft btn-primary btn-sm"
          @click="showPresetMenu = !showPresetMenu; showNotifications = false"
        >
          <Sparkles class="h-4 w-4" />
          <span class="hidden sm:inline">Tema</span>
        </button>

        <div
          v-if="showPresetMenu"
          class="fixed inset-0 z-40"
          @click="showPresetMenu = false"
        />

        <Transition
          enter-active-class="transition duration-150 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-1"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="showPresetMenu"
            class="absolute right-0 mt-2 z-50 w-64 rounded-box border border-base-300 bg-base-100 p-2 shadow-xl"
          >
            <div class="px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-base-content/50">
              Pilih Preset Tema
            </div>
            <div class="space-y-1">
              <button
                v-for="preset in themeStore.presets"
                :key="preset.id"
                type="button"
                class="flex w-full items-center justify-between rounded-btn px-2.5 py-2 text-left text-xs font-semibold transition-colors"
                :class="
                  themeStore.activeTheme === preset.id
                    ? 'bg-primary/12 text-primary'
                    : 'text-base-content hover:bg-base-200'
                "
                @click="themeStore.setTheme(preset.id); showPresetMenu = false"
              >
                <div class="flex items-center gap-2.5">
                  <div
                    class="flex items-center gap-0.5 rounded-full border border-base-300 p-1"
                    :style="{ backgroundColor: preset.preview.bg }"
                  >
                    <span
                      class="h-2.5 w-2.5 rounded-full"
                      :style="{ backgroundColor: preset.preview.primary }"
                    />
                    <span
                      class="h-2.5 w-2.5 rounded-full"
                      :style="{ backgroundColor: preset.preview.secondary }"
                    />
                    <span
                      class="h-2.5 w-2.5 rounded-full"
                      :style="{ backgroundColor: preset.preview.accent }"
                    />
                  </div>
                  <span>{{ preset.name }}</span>
                </div>
                <Check v-if="themeStore.activeTheme === preset.id" class="h-3.5 w-3.5" />
              </button>
            </div>
            <div class="mt-2 pt-2 border-t border-base-300/70">
              <button
                type="button"
                class="btn btn-primary btn-xs btn-block"
                @click="showPresetMenu = false; themeStore.customizerOpen = true"
              >
                <Palette class="h-3.5 w-3.5" />
                Buka Theme Customizer
              </button>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Quick Light/Dark Toggle -->
      <button
        type="button"
        class="btn btn-ghost btn-sm btn-square"
        :title="themeStore.isDark ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'"
        @click="themeStore.toggleDarkLight"
      >
        <Sun v-if="themeStore.isDark" class="h-4 w-4 text-warning" />
        <Moon v-else class="h-4 w-4 text-base-content/75" />
      </button>

      <!-- Live Theme Customizer Trigger -->
      <button
        type="button"
        class="btn btn-ghost btn-sm btn-square relative"
        title="Buka Theme Studio"
        @click="themeStore.customizerOpen = true"
      >
        <Palette class="h-4 w-4 text-secondary" />
        <span class="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent animate-pulse" />
      </button>

      <!-- Notifications Dropdown -->
      <div class="relative">
        <button
          type="button"
          class="btn btn-ghost btn-sm btn-square relative"
          :class="{ 'bg-base-200': showNotifications }"
          title="Notifikasi"
          aria-label="Lihat notifikasi"
          @click="showNotifications = !showNotifications; showPresetMenu = false"
        >
          <Bell class="h-4 w-4 text-base-content/75" />
          <span
            v-if="unreadCount > 0"
            class="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-error ring-2 ring-base-100"
          />
        </button>

        <div
          v-if="showNotifications"
          class="fixed inset-0 z-40"
          @click="showNotifications = false"
        />

        <Transition
          enter-active-class="transition duration-150 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-1"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="showNotifications"
            class="absolute right-0 mt-2 z-50 w-80 sm:w-96 rounded-box border border-base-300 bg-base-100 shadow-xl overflow-hidden"
          >
            <!-- Dropdown Header -->
            <div class="flex items-center justify-between border-b border-base-300/80 px-4 py-3 bg-base-200/40">
              <div class="flex items-center gap-2">
                <span class="text-sm font-bold text-base-content">Notifikasi</span>
                <span
                  v-if="unreadCount > 0"
                  class="badge badge-primary badge-xs font-bold"
                >
                  {{ unreadCount }} Baru
                </span>
              </div>
              <button
                v-if="unreadCount > 0"
                type="button"
                class="text-xs font-semibold text-primary hover:underline transition-colors flex items-center gap-1"
                @click="markAllAsRead"
              >
                <CheckCheck class="h-3.5 w-3.5" />
                <span>Tandai dibaca</span>
              </button>
            </div>

            <!-- Notification List -->
            <div class="max-h-80 overflow-y-auto divide-y divide-base-300/60">
              <div
                v-for="item in notifications"
                :key="item.id"
                class="flex items-start gap-3 p-3.5 transition-colors cursor-pointer"
                :class="item.unread ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-base-200/60'"
                @click="markAsRead(item.id)"
              >
                <div
                  class="flex h-8 w-8 shrink-0 items-center justify-center rounded-btn"
                  :class="{
                    'bg-success/15 text-emerald-800 dark:text-success': item.variant === 'success',
                    'bg-warning/20 text-amber-900 dark:text-warning': item.variant === 'warning',
                    'bg-primary/15 text-indigo-700 dark:text-primary': item.variant === 'primary',
                    'bg-info/15 text-sky-800 dark:text-info': item.variant === 'info',
                    'bg-error/15 text-rose-700 dark:text-error': item.variant === 'error',
                  }"
                >
                  <component :is="item.icon" class="h-4 w-4" />
                </div>

                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between gap-1 mb-0.5">
                    <h5
                      class="text-xs font-bold truncate"
                      :class="item.unread ? 'text-base-content' : 'text-base-content/75'"
                    >
                      {{ item.title }}
                    </h5>
                    <span class="text-[10px] text-base-content/45 shrink-0 whitespace-nowrap">
                      {{ item.time }}
                    </span>
                  </div>
                  <p class="text-xs text-base-content/65 line-clamp-2 leading-relaxed">
                    {{ item.description }}
                  </p>
                </div>

                <span
                  v-if="item.unread"
                  class="h-2 w-2 rounded-full bg-primary shrink-0 self-center"
                />
              </div>

              <!-- Empty State -->
              <div
                v-if="notifications.length === 0"
                class="flex flex-col items-center justify-center p-8 text-center text-base-content/60"
              >
                <Inbox class="h-8 w-8 mb-2 text-base-content/30" />
                <p class="text-xs font-semibold">Tidak ada notifikasi baru</p>
                <p class="text-[11px] text-base-content/45 mt-0.5">Kotak masuk Anda sudah bersih.</p>
              </div>
            </div>

            <!-- Dropdown Footer -->
            <div class="border-t border-base-300/80 p-2 bg-base-200/40 text-center">
              <button
                type="button"
                class="btn btn-ghost btn-xs btn-block text-base-content/70 hover:text-base-content font-medium"
                @click="showNotifications = false"
              >
                Tutup Notifikasi
              </button>
            </div>
          </div>
        </Transition>
      </div>

      <!-- User Profile Pill -->
      <div class="hidden sm:flex items-center gap-2.5 pl-2 ml-1 border-l border-base-300/80">
        <div
          class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold text-white shadow-xs"
        >
          BJ
        </div>
        <div class="hidden lg:flex flex-col leading-tight">
          <span class="text-xs font-bold text-base-content">BeeJir Admin</span>
          <span class="text-[10px] text-base-content/55">Maintainer</span>
        </div>
      </div>
    </div>
  </header>
</template>
