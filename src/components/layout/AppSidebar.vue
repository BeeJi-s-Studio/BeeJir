<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router'
import {
  LayoutDashboard,
  Layers,
  Users,
  Palette,
  ChevronsLeft,
  ChevronsRight,
  X,
  Wand2,
  UserCircle,
  LogIn,
  ShieldAlert,
} from 'lucide-vue-next'
import { useThemeStore } from '@/stores/theme'
import type { ColorVariant } from '@/types/theme'
import UiTooltip from '@/components/ui/UiTooltip.vue'

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
    label: 'Dashboard CRM',
    to: '/',
    icon: LayoutDashboard,
    badge: 'CRM',
    badgeVariant: 'error',
  },
  {
    label: 'Users Management',
    to: '/users',
    icon: Users,
    badge: '4',
    badgeVariant: 'primary',
  },
  {
    label: 'Project Wizard',
    to: '/project-wizard',
    icon: Wand2,
  },
]

const pagesNav: NavItem[] = [
  {
    label: 'User Profile',
    to: '/profile',
    icon: UserCircle,
  },
  {
    label: 'Auth Cover Login',
    to: '/login',
    icon: LogIn,
  },
  {
    label: 'Misc Error Pages',
    to: '/error/404',
    icon: ShieldAlert,
    badge: '3',
    badgeVariant: 'warning',
  },
]

const uiNav: NavItem[] = [
  {
    label: 'UI Components',
    to: '/components',
    icon: Layers,
    badge: '22+',
    badgeVariant: 'info',
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

  <!-- Sidebar Panel (BeeJir Vertical Menu Style) -->
  <aside
    class="fixed inset-y-0 left-0 z-40 flex flex-col bg-[var(--surface-1)] border-r border-[var(--border)] shadow-[0_0.125rem_0.625rem_0_rgba(38,43,67,0.06)] dark:shadow-[0_0.125rem_0.625rem_0_rgba(0,0,0,0.28)] transition-all duration-300 ease-out lg:sticky lg:top-0 lg:h-screen lg:max-h-screen shrink-0"
    :class="[
      themeStore.sidebarCollapsed ? 'lg:w-[74px]' : 'lg:w-[260px]',
      themeStore.mobileSidebarOpen
        ? 'translate-x-0 w-[260px] shadow-2xl'
        : '-translate-x-full w-[260px] lg:translate-x-0',
    ]"
  >
    <!-- Brand Header (BeeJir app-brand style) -->
    <div
      class="flex h-16 shrink-0 items-center transition-all"
      :class="themeStore.sidebarCollapsed ? 'justify-center px-2' : 'justify-between px-5'"
    >
      <RouterLink
        to="/"
        class="flex items-center gap-2.5 overflow-hidden"
        @click="themeStore.mobileSidebarOpen = false"
      >
        <!-- BeeJir Hexagon Bee Emblem Logo -->
        <span class="shrink-0 flex items-center justify-center">
          <svg class="h-8 w-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Modern Hexagon Shield Base -->
            <polygon
              points="16,2 29,9.5 29,22.5 16,30 3,22.5 3,9.5"
              fill="rgb(var(--p))"
              class="transition-colors"
            />
            <!-- Hexagon Soft Inner Glow -->
            <polygon
              points="16,4.5 26.5,10.6 26.5,21.4 16,27.5 5.5,21.4 5.5,10.6"
              fill="rgb(var(--p))"
              fill-opacity="0.25"
            />
            <!-- Bee Head -->
            <circle cx="16" cy="11" r="2.8" fill="white" />
            <!-- Bee Wings -->
            <ellipse cx="11.2" cy="13.2" rx="3.5" ry="2.2" transform="rotate(-28 11.2 13.2)" fill="white" fill-opacity="0.85" />
            <ellipse cx="20.8" cy="13.2" rx="3.5" ry="2.2" transform="rotate(28 20.8 13.2)" fill="white" fill-opacity="0.85" />
            <!-- Bee Abdomen Body -->
            <path
              d="M13 14.8C13 13.8 19 13.8 19 14.8V20C19 21.6 17.5 23.5 16 24.5C14.5 23.5 13 21.6 13 20V14.8Z"
              fill="#181a20"
            />
            <!-- Honey Golden Stripes -->
            <path d="M13 16.5H19" stroke="#fdb528" stroke-width="1.4" stroke-linecap="round" />
            <path d="M13.4 19.2H18.6" stroke="#fdb528" stroke-width="1.4" stroke-linecap="round" />
          </svg>
        </span>

        <span
          v-show="!themeStore.sidebarCollapsed || themeStore.mobileSidebarOpen"
          class="text-[1.25rem] font-bold tracking-tight text-base-content"
        >
          Bee<span class="text-primary">Jir</span>
        </span>
      </RouterLink>

      <!-- Desktop Collapse Toggle (Double Chevron like BeeJir) -->
      <button
        v-show="!themeStore.sidebarCollapsed"
        type="button"
        class="hidden lg:inline-flex h-7 w-7 items-center justify-center rounded-full text-base-content/55 hover:bg-base-200 hover:text-base-content transition-colors cursor-pointer"
        title="Collapse Menu"
        @click="themeStore.sidebarCollapsed = true"
      >
        <ChevronsLeft class="h-4.5 w-4.5" />
      </button>

      <!-- Mobile Close Button -->
      <button
        type="button"
        class="btn btn-ghost btn-sm btn-circle lg:hidden"
        @click="themeStore.mobileSidebarOpen = false"
      >
        <X class="h-4 w-4" />
      </button>
    </div>

    <!-- Expand Button When Collapsed -->
    <div v-if="themeStore.sidebarCollapsed" class="hidden lg:flex justify-center pb-2">
      <button
        type="button"
        class="h-7 w-7 flex items-center justify-center rounded-full text-base-content/55 hover:bg-base-200 hover:text-primary transition-colors cursor-pointer"
        title="Expand Menu"
        @click="themeStore.sidebarCollapsed = false"
      >
        <ChevronsRight class="h-4 w-4" />
      </button>
    </div>

    <!-- Navigation Links -->
    <div
      class="flex-1 min-h-0 overflow-y-auto py-2 space-y-5"
      :class="themeStore.sidebarCollapsed ? 'px-2.5' : 'px-3.5'"
    >
      <!-- Group 1: Dashboards & Apps -->
      <div>
        <div
          v-show="!themeStore.sidebarCollapsed || themeStore.mobileSidebarOpen"
          class="flex items-center gap-2 px-3 mb-2 text-[11px] font-medium uppercase tracking-wider text-[var(--text-faint)]"
        >
          <span>Dashboards &amp; Apps</span>
          <span class="h-px flex-1 bg-[var(--border)]" />
        </div>

        <nav class="space-y-1">
          <template v-for="item in mainNav" :key="item.to">
            <!-- Collapsed state with right tooltip -->
            <UiTooltip
              v-if="themeStore.sidebarCollapsed && !themeStore.mobileSidebarOpen"
              :text="item.label"
              position="right"
              teleport
              class="w-full flex justify-center"
            >
              <RouterLink
                :to="item.to"
                class="group relative flex items-center justify-center h-10 w-10 rounded-btn text-[14px] transition-colors duration-150 border"
                :class="[
                  isActive(item.to)
                    ? 'bg-[var(--accent-soft)] text-[var(--accent)] font-semibold border-[var(--accent)]/30 shadow-xs'
                    : 'text-[var(--text-muted)] border-transparent hover:bg-[var(--surface-raised)] hover:text-[var(--text)]',
                ]"
                @click="themeStore.mobileSidebarOpen = false"
              >
                <component
                  :is="item.icon"
                  class="h-[19px] w-[19px] shrink-0"
                  :class="isActive(item.to) ? 'text-[var(--accent)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text)]'"
                />
              </RouterLink>
            </UiTooltip>

            <!-- Expanded state -->
            <RouterLink
              v-else
              :to="item.to"
              class="group relative flex items-center justify-start gap-3 px-3.5 py-2 w-full rounded-btn text-[14px] transition-colors duration-150 border"
              :class="[
                isActive(item.to)
                  ? 'bg-[var(--accent-soft)] text-[var(--accent)] font-semibold border-[var(--accent)]/30 shadow-xs'
                  : 'text-[var(--text-muted)] border-transparent hover:bg-[var(--surface-raised)] hover:text-[var(--text)]',
              ]"
              @click="themeStore.mobileSidebarOpen = false"
            >
              <component
                :is="item.icon"
                class="h-[19px] w-[19px] shrink-0"
                :class="isActive(item.to) ? 'text-[var(--accent)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text)]'"
              />
              <span class="flex-1 truncate">
                {{ item.label }}
              </span>
              <span
                v-if="item.badge"
                class="badge badge-xs rounded-full font-semibold"
                :class="`badge-soft badge-${item.badgeVariant || 'primary'}`"
              >
                {{ item.badge }}
              </span>
            </RouterLink>
          </template>
        </nav>
      </div>

      <!-- Group 2: Pages & Auth -->
      <div>
        <div
          v-show="!themeStore.sidebarCollapsed || themeStore.mobileSidebarOpen"
          class="flex items-center gap-2 px-3 mb-2 text-[11px] font-medium uppercase tracking-wider text-[var(--text-faint)]"
        >
          <span>Pages &amp; Auth</span>
          <span class="h-px flex-1 bg-[var(--border)]" />
        </div>

        <nav class="space-y-1">
          <template v-for="item in pagesNav" :key="item.to">
            <!-- Collapsed state with right tooltip -->
            <UiTooltip
              v-if="themeStore.sidebarCollapsed && !themeStore.mobileSidebarOpen"
              :text="item.label"
              position="right"
              teleport
              class="w-full flex justify-center"
            >
              <RouterLink
                :to="item.to"
                class="group relative flex items-center justify-center h-10 w-10 rounded-btn text-[14px] transition-colors duration-150 border"
                :class="[
                  isActive(item.to)
                    ? 'bg-[var(--accent-soft)] text-[var(--accent)] font-semibold border-[var(--accent)]/30 shadow-xs'
                    : 'text-[var(--text-muted)] border-transparent hover:bg-[var(--surface-raised)] hover:text-[var(--text)]',
                ]"
                @click="themeStore.mobileSidebarOpen = false"
              >
                <component
                  :is="item.icon"
                  class="h-[19px] w-[19px] shrink-0"
                  :class="isActive(item.to) ? 'text-[var(--accent)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text)]'"
                />
              </RouterLink>
            </UiTooltip>

            <!-- Expanded state -->
            <RouterLink
              v-else
              :to="item.to"
              class="group relative flex items-center justify-start gap-3 px-3.5 py-2 w-full rounded-btn text-[14px] transition-colors duration-150 border"
              :class="[
                isActive(item.to)
                  ? 'bg-[var(--accent-soft)] text-[var(--accent)] font-semibold border-[var(--accent)]/30 shadow-xs'
                  : 'text-[var(--text-muted)] border-transparent hover:bg-[var(--surface-raised)] hover:text-[var(--text)]',
              ]"
              @click="themeStore.mobileSidebarOpen = false"
            >
              <component
                :is="item.icon"
                class="h-[19px] w-[19px] shrink-0"
                :class="isActive(item.to) ? 'text-[var(--accent)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text)]'"
              />
              <span class="flex-1 truncate">
                {{ item.label }}
              </span>
              <span
                v-if="item.badge"
                class="badge badge-xs rounded-full font-semibold"
                :class="`badge-soft badge-${item.badgeVariant || 'primary'}`"
              >
                {{ item.badge }}
              </span>
            </RouterLink>
          </template>
        </nav>
      </div>

      <!-- Group 3: Components & Theme -->
      <div>
        <div
          v-show="!themeStore.sidebarCollapsed || themeStore.mobileSidebarOpen"
          class="flex items-center gap-2 px-3 mb-2 text-[11px] font-medium uppercase tracking-wider text-[var(--text-faint)]"
        >
          <span>Components &amp; UI</span>
          <span class="h-px flex-1 bg-[var(--border)]" />
        </div>

        <nav class="space-y-1">
          <template v-for="item in uiNav" :key="item.to">
            <!-- Collapsed state with right tooltip -->
            <UiTooltip
              v-if="themeStore.sidebarCollapsed && !themeStore.mobileSidebarOpen"
              :text="item.label"
              position="right"
              teleport
              class="w-full flex justify-center"
            >
              <RouterLink
                :to="item.to"
                class="group relative flex items-center justify-center h-10 w-10 rounded-btn text-[14px] transition-colors duration-150 border"
                :class="[
                  isActive(item.to)
                    ? 'bg-[var(--accent-soft)] text-[var(--accent)] font-semibold border-[var(--accent)]/30 shadow-xs'
                    : 'text-[var(--text-muted)] border-transparent hover:bg-[var(--surface-raised)] hover:text-[var(--text)]',
                ]"
                @click="themeStore.mobileSidebarOpen = false"
              >
                <component
                  :is="item.icon"
                  class="h-[19px] w-[19px] shrink-0"
                  :class="isActive(item.to) ? 'text-[var(--accent)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text)]'"
                />
              </RouterLink>
            </UiTooltip>

            <!-- Expanded state -->
            <RouterLink
              v-else
              :to="item.to"
              class="group relative flex items-center justify-start gap-3 px-3.5 py-2 w-full rounded-btn text-[14px] transition-colors duration-150 border"
              :class="[
                isActive(item.to)
                  ? 'bg-[var(--accent-soft)] text-[var(--accent)] font-semibold border-[var(--accent)]/30 shadow-xs'
                  : 'text-[var(--text-muted)] border-transparent hover:bg-[var(--surface-raised)] hover:text-[var(--text)]',
              ]"
              @click="themeStore.mobileSidebarOpen = false"
            >
              <component
                :is="item.icon"
                class="h-[19px] w-[19px] shrink-0"
                :class="isActive(item.to) ? 'text-[var(--accent)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text)]'"
              />
              <span class="flex-1 truncate">
                {{ item.label }}
              </span>
              <span
                v-if="item.badge"
                class="badge badge-xs rounded-full font-semibold"
                :class="`badge-soft badge-${item.badgeVariant || 'primary'}`"
              >
                {{ item.badge }}
              </span>
            </RouterLink>
          </template>

          <!-- Theme Customizer Trigger -->
          <UiTooltip
            v-if="themeStore.sidebarCollapsed && !themeStore.mobileSidebarOpen"
            text="Theme Customizer"
            position="right"
            teleport
            class="w-full flex justify-center"
          >
            <button
              type="button"
              class="group flex items-center justify-center h-10 w-10 rounded-btn text-[14px] text-[var(--text-muted)] border border-transparent hover:bg-[var(--surface-raised)] hover:text-[var(--text)] transition-colors duration-150 cursor-pointer"
              @click="themeStore.customizerOpen = true; themeStore.mobileSidebarOpen = false"
            >
              <Palette class="h-[19px] w-[19px] shrink-0 text-primary" />
            </button>
          </UiTooltip>

          <button
            v-else
            type="button"
            class="group flex items-center w-full justify-start gap-3 px-3.5 py-2 rounded-btn text-[14px] font-normal text-[var(--text-muted)] border border-transparent hover:bg-[var(--surface-raised)] hover:text-[var(--text)] transition-colors duration-150 cursor-pointer"
            @click="themeStore.customizerOpen = true; themeStore.mobileSidebarOpen = false"
          >
            <Palette class="h-[19px] w-[19px] shrink-0 text-primary" />
            <span class="flex-1 text-left truncate">
              Theme Customizer
            </span>
            <span class="flex items-center gap-1">
              <span class="h-2 w-2 rounded-full bg-primary" />
              <span class="h-2 w-2 rounded-full bg-secondary" />
              <span class="h-2 w-2 rounded-full bg-accent" />
            </span>
          </button>
        </nav>
      </div>
    </div>

    <!-- Bottom Active Preset Summary -->
    <div
      class="shrink-0 border-t border-[var(--border)]"
      :class="themeStore.sidebarCollapsed ? 'p-2' : 'p-3.5'"
    >
      <div
        v-show="!themeStore.sidebarCollapsed || themeStore.mobileSidebarOpen"
        class="rounded-btn bg-[var(--surface-2)] border border-[var(--border)] p-3 flex items-center justify-between gap-2"
      >
        <div class="min-w-0">
          <div class="text-xs font-semibold text-[var(--text)] truncate">
            {{ themeStore.currentPreset.name }}
          </div>
          <div class="text-[11px] text-[var(--text-muted)] truncate">
            Mode: {{ themeStore.isDark ? 'Dark Theme' : 'Light Theme' }}
          </div>
        </div>
        <button
          type="button"
          class="btn btn-soft btn-primary btn-xs shrink-0"
          @click="themeStore.customizerOpen = true"
        >
          Customize
        </button>
      </div>
    </div>
  </aside>
</template>
