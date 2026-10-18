<script setup lang="ts">
import { RouterView } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { useThemeStore } from '@/stores/theme'

// Initialize theme store on root mount so data-theme is immediately synced
useThemeStore()
</script>

<template>
  <AdminLayout>
    <RouterView />
  </AdminLayout>
</template>
