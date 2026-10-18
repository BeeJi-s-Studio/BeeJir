<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router'
import {
  LayoutDashboard,
  Layers,
  Users,
  Palette,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
  Github,
  Wand2,
  UserCircle,
  LogIn,
  ShieldAlert,
} from 'lucide-vue-next'
import { useThemeStore } from '@/stores/theme'
import type { ColorVariant } from '@/types/theme'

const route = useRoute()
const themeStore = useThemeStore()

interface NavItem {
  label: string
  to: string
  icon: unknown
  badge?: string
  badgeVariant?: ColorVariant
}

const mainNav: NavItem[] = [
  {
    label: 'Dashboard',
    to: '/',
    icon: LayoutDashboard,
    badge: 'Live',
    badgeVariant: 'primary',
  },
  {
    label: 'UI Components',
    to: '/components',
    icon: Layers,
    badge: '22+ UI',
    badgeVariant: 'secondary',
  },
  {
    label: 'Project Wizard',
    to: '/project-wizard',
    icon: Wand2,
    badge: 'Demo',
    badgeVariant: 'accent',
  },
  {
    label: 'Users & Data',
    to: '/users',
    icon: Users,
    badge: '128',
    badgeVariant: 'info',
  },
]

const pagesNav: NavItem[] = [
  {
    label: 'User Profile',
    to: '/profile',
    icon: UserCircle,
    badge: 'New',
    badgeVariant: 'success',
  },
  {
    label: 'Login & Register',
    to: '/login',
    icon: LogIn,
    badge: 'Auth',
    badgeVariant: 'primary',
  },
  {
    label: 'Error 403 / 404 / 500',
    to: '/error/404',
    icon: ShieldAlert,
    badge: 'HTTP',
    badgeVariant: 'warning',
  },
]

function isActive(path: string): boolean {
  if (path === '/') return route.path === '/'
  if (path.startsWith('/error')) return route.path.startsWith('/error')
  return route.path.startsWith(path)
}
</script>

<template>
  <!-- Mobile Backdrop -->
  <Transition
    enter-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-150"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="themeStore.mobileSidebarOpen"
      class="fixed inset-0 z-40 bg-neutral/50 backdrop-blur-xs lg:hidden"
      @click="themeStore.mobileSidebarOpen = false"
    />
  </Transition>

  <!-- Sidebar Panel -->
  <aside
    class="fixed inset-y-0 left-0 z-40 flex flex-col border-r border-base-300/80 bg-base-100 dark:bg-base-100/90 dark:backdrop-blur-xl transition-all duration-300 ease-out lg:sticky lg:top-0 lg:h-screen lg:max-h-screen"
    :class="[
      themeStore.sidebarCollapsed ? 'lg:w-20' : 'lg:w-68',
      themeStore.mobileSidebarOpen
        ? 'translate-x-0 w-72 shadow-2xl'
        : '-translate-x-full w-72 lg:translate-x-0 lg:shadow-none',
    ]"
  >
    <!-- Brand Header (Pinned / Fixed at top) -->
    <div
      class="flex h-16 shrink-0 items-center border-b border-base-300/70 transition-all"
      :class="themeStore.sidebarCollapsed ? 'justify-center px-2' : 'justify-between px-4'"
    >
      <RouterLink
        to="/"
        class="flex items-center gap-3 overflow-hidden"
        :class="themeStore.sidebarCollapsed ? 'justify-center' : ''"
        @click="themeStore.mobileSidebarOpen = false"
      >
        <div
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-btn bg-gradient-to-tr from-primary via-secondary to-accent text-white shadow-md shadow-primary/30 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),0_4px_18px_rgb(var(--p)/0.55)]"
        >
          <Sparkles class="h-5 w-5" />
        </div>
        <div
          v-show="!themeStore.sidebarCollapsed || themeStore.mobileSidebarOpen"
          class="flex flex-col"
        >
          <div class="flex items-center gap-1.5">
            <span class="text-lg font-extrabold tracking-tight text-base-content">
              Bee<span class="text-primary">Jir</span>
            </span>
            <span class="badge badge-sm badge-soft badge-primary font-mono text-[10px]">
              v0.3
            </span>
          </div>
          <span class="text-[11px] font-medium text-base-content/55 truncate">
            Clean & Colorful Admin
          </span>
        </div>
      </RouterLink>

      <!-- Mobile Close Button -->
      <button
        type="button"
        class="btn btn-ghost btn-sm btn-circle lg:hidden"
        @click="themeStore.mobileSidebarOpen = false"
      >
        <X class="h-4 w-4" />
      </button>
    </div>

    <!-- Navigation Links (Scrollable independently) -->
    <div
      class="flex-1 min-h-0 overflow-y-auto py-5 space-y-6"
      :class="themeStore.sidebarCollapsed ? 'px-2' : 'px-3'"
    >
      <!-- Group 1: Main Menu -->
      <div>
        <div
          v-show="!themeStore.sidebarCollapsed || themeStore.mobileSidebarOpen"
          class="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-base-content/45"
        >
          Menu Utama
        </div>
        <nav class="space-y-1.5">
          <RouterLink
            v-for="item in mainNav"
            :key="item.to"
            :to="item.to"
            class="group relative flex items-center rounded-btn text-sm font-semibold transition-all duration-150"
            :class="[
              themeStore.sidebarCollapsed
                ? 'justify-center h-11 w-11 mx-auto p-0'
                : 'justify-start gap-3 px-3 py-2.5 w-full',
              isActive(item.to)
                ? 'bg-gradient-to-r from-primary to-primary/90 text-primary-content shadow-sm shadow-primary/25 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.28),0_4px_20px_-2px_rgb(var(--p)/0.55)]'
                : 'text-base-content/75 hover:bg-base-200 dark:hover:bg-white/[0.06] hover:text-base-content',
            ]"
            :title="themeStore.sidebarCollapsed ? item.label : undefined"
            @click="themeStore.mobileSidebarOpen = false"
          >
            <component
              :is="item.icon"
              class="h-5 w-5 shrink-0 transition-transform duration-150 group-hover:scale-105"
            />
            <span
              v-show="!themeStore.sidebarCollapsed || themeStore.mobileSidebarOpen"
              class="flex-1 truncate"
            >
              {{ item.label }}
            </span>
            <span
              v-if="item.badge && (!themeStore.sidebarCollapsed || themeStore.mobileSidebarOpen)"
              class="badge badge-sm"
              :class="
                isActive(item.to)
                  ? 'border-white/25 bg-white/20 text-white'
                  : `badge-soft badge-${item.badgeVariant || 'primary'}`
              "
            >
              {{ item.badge }}
            </span>
          </RouterLink>
        </nav>
      </div>

      <!-- Group 2: Demo Pages, Profile, Auth & Errors -->
      <div>
        <div
          v-show="!themeStore.sidebarCollapsed || themeStore.mobileSidebarOpen"
          class="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-base-content/45"
        >
          Halaman & Autentikasi
        </div>
        <nav class="space-y-1.5">
          <RouterLink
            v-for="item in pagesNav"
            :key="item.to"
            :to="item.to"
            class="group relative flex items-center rounded-btn text-sm font-semibold transition-all duration-150"
            :class="[
              themeStore.sidebarCollapsed
                ? 'justify-center h-11 w-11 mx-auto p-0'
                : 'justify-start gap-3 px-3 py-2.5 w-full',
              isActive(item.to)
                ? 'bg-gradient-to-r from-primary to-primary/90 text-primary-content shadow-sm shadow-primary/25 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.28),0_4px_20px_-2px_rgb(var(--p)/0.55)]'
                : 'text-base-content/75 hover:bg-base-200 dark:hover:bg-white/[0.06] hover:text-base-content',
            ]"
            :title="themeStore.sidebarCollapsed ? item.label : undefined"
            @click="themeStore.mobileSidebarOpen = false"
          >
            <component
              :is="item.icon"
              class="h-5 w-5 shrink-0 transition-transform duration-150 group-hover:scale-105"
            />
            <span
              v-show="!themeStore.sidebarCollapsed || themeStore.mobileSidebarOpen"
              class="flex-1 truncate"
            >
              {{ item.label }}
            </span>
            <span
              v-if="item.badge && (!themeStore.sidebarCollapsed || themeStore.mobileSidebarOpen)"
              class="badge badge-sm"
              :class="
                isActive(item.to)
                  ? 'border-white/25 bg-white/20 text-white'
                  : `badge-soft badge-${item.badgeVariant || 'primary'}`
              "
            >
              {{ item.badge }}
            </span>
          </RouterLink>
        </nav>
      </div>

      <!-- Customization Quick Action -->
      <div>
        <div
          v-show="!themeStore.sidebarCollapsed || themeStore.mobileSidebarOpen"
          class="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-base-content/45"
        >
          Personalisasi
        </div>
        <button
          type="button"
          class="group flex items-center rounded-btn text-sm font-semibold text-base-content/75 hover:bg-secondary/10 dark:hover:bg-secondary/20 hover:text-secondary transition-all duration-150"
          :class="[
            themeStore.sidebarCollapsed
              ? 'justify-center h-11 w-11 mx-auto p-0'
              : 'w-full justify-start gap-3 px-3 py-2.5',
          ]"
          :title="themeStore.sidebarCollapsed ? 'Theme Customizer' : undefined"
          @click="themeStore.customizerOpen = true; themeStore.mobileSidebarOpen = false"
        >
          <Palette class="h-5 w-5 shrink-0 text-secondary group-hover:rotate-12 transition-transform" />
          <span
            v-show="!themeStore.sidebarCollapsed || themeStore.mobileSidebarOpen"
            class="flex-1 text-left truncate"
          >
            Theme Studio
          </span>
          <span
            v-show="!themeStore.sidebarCollapsed || themeStore.mobileSidebarOpen"
            class="flex items-center gap-1"
          >
            <span class="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_8px_rgb(var(--p)/0.7)]" />
            <span class="h-2.5 w-2.5 rounded-full bg-secondary shadow-[0_0_8px_rgb(var(--s)/0.7)]" />
            <span class="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_8px_rgb(var(--a)/0.7)]" />
          </span>
        </button>
      </div>
    </div>

    <!-- Bottom Open-Source Promo Card & Collapse Toggle (Pinned / Fixed at bottom) -->
    <div
      class="shrink-0 border-t border-base-300/70 space-y-2"
      :class="themeStore.sidebarCollapsed ? 'p-2' : 'p-3'"
    >
      <div
        v-show="!themeStore.sidebarCollapsed || themeStore.mobileSidebarOpen"
        class="rounded-box bg-gradient-to-br from-primary/12 via-secondary/10 to-accent/12 dark:from-primary/20 dark:via-secondary/15 dark:to-accent/20 border border-primary/20 dark:border-primary/35 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] p-3.5"
      >
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs font-bold text-base-content">Open Source Ready</span>
          <Github class="h-4 w-4 text-primary" />
        </div>
        <p class="text-[11px] text-base-content/65 leading-relaxed mb-2.5">
          Bebas digunakan & dikustomisasi tanpa ketergantungan library eksternal.
        </p>
        <button
          type="button"
          class="btn btn-primary btn-xs btn-block"
          @click="themeStore.customizerOpen = true"
        >
          Atur Tema Sekarang
        </button>
      </div>

      <!-- Desktop Collapse Button -->
      <button
        type="button"
        class="hidden lg:flex items-center justify-center rounded-btn text-xs font-semibold text-base-content/60 hover:bg-base-200 hover:text-base-content transition-colors"
        :class="themeStore.sidebarCollapsed ? 'h-10 w-10 mx-auto p-0' : 'w-full gap-2 py-2 px-3'"
        :title="themeStore.sidebarCollapsed ? 'Perluas Sidebar' : 'Ringkas Sidebar'"
        @click="themeStore.sidebarCollapsed = !themeStore.sidebarCollapsed"
      >
        <ChevronRight v-if="themeStore.sidebarCollapsed" class="h-4 w-4" />
        <template v-else>
          <ChevronLeft class="h-4 w-4" />
          <span>Ringkas Sidebar</span>
        </template>
      </button>
    </div>
  </aside>
</template>
