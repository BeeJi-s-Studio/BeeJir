<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import ThemeCustomizerDrawer from '@/components/layout/ThemeCustomizerDrawer.vue'
import UiToastContainer from '@/components/ui/UiToastContainer.vue'
import { useThemeStore } from '@/stores/theme'

// Initialize theme store on root mount so data-theme is immediately synced
useThemeStore()

const route = useRoute()
const isBlankLayout = computed(() => route.meta.layout === 'blank')
</script>

<template>
  <template v-if="isBlankLayout">
    <RouterView />
    <ThemeCustomizerDrawer />
    <UiToastContainer />
  </template>

  <AdminLayout v-else>
    <RouterView />
  </AdminLayout>
</template>
