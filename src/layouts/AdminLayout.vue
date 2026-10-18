<script setup lang="ts">
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import ThemeCustomizerDrawer from '@/components/layout/ThemeCustomizerDrawer.vue'
import UiToastContainer from '@/components/ui/UiToastContainer.vue'
</script>

<template>
  <div class="flex min-h-screen bg-base-200 text-base-content">
    <!-- Left Navigation Sidebar -->
    <AppSidebar />

    <!-- Main Content Area -->
    <div class="flex flex-1 flex-col min-w-0">
      <AppNavbar />

      <main class="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
        <slot />
      </main>

      <footer
        class="border-t border-base-300/60 px-6 py-4 text-xs text-base-content/55 flex flex-wrap items-center justify-between gap-2"
      >
        <div>
          <strong class="font-bold text-base-content">BeeJir Admin Template</strong>
          — Dibuat dengan Vue 3 + Vite + Bun + TypeScript & Custom Tailwind CSS.
        </div>
        <div class="flex items-center gap-3">
          <span class="badge badge-sm badge-soft badge-primary">MIT Open Source</span>
          <span class="badge badge-sm badge-soft badge-secondary">Pure Tailwind CSS</span>
        </div>
      </footer>
    </div>

    <!-- Slide-over Live Theme Studio -->
    <ThemeCustomizerDrawer />

    <!-- Global Floating Toast Container -->
    <UiToastContainer />
  </div>
</template>
