import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import ComponentsView from '@/views/ComponentsView.vue'
import UsersTableView from '@/views/UsersTableView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
      meta: {
        title: 'Dashboard Overview',
        subtitle: 'Ringkasan analitik, performa, dan aktivitas sistem BeeJir',
      },
    },
    {
      path: '/components',
      name: 'components',
      component: ComponentsView,
      meta: {
        title: 'UI Components Showcase',
        subtitle: 'Sistem komponen semantik modular di atas murni Tailwind CSS',
      },
    },
    {
      path: '/users',
      name: 'users',
      component: UsersTableView,
      meta: {
        title: 'Users & Data Management',
        subtitle: 'Contoh tabel data dengan filter, pencarian, dan modal CRUD',
      },
    },
  ],
})

export default router
