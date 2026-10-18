import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import ComponentsView from '@/views/ComponentsView.vue'
import UsersTableView from '@/views/UsersTableView.vue'
import ProjectWizardView from '@/views/ProjectWizardView.vue'
import ProfileView from '@/views/ProfileView.vue'
import LoginView from '@/views/LoginView.vue'
import ErrorView from '@/views/ErrorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
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
        subtitle: 'Katalog 20+ komponen semantik modular di atas murni Tailwind CSS',
      },
    },
    {
      path: '/project-wizard',
      name: 'project-wizard',
      component: ProjectWizardView,
      meta: {
        title: 'Project Wizard Demo',
        subtitle: 'Alur pembuatan proyek 4 langkah dengan Stepper, Rich Editor & Multi-Upload',
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
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: {
        title: 'User Profile & Settings',
        subtitle: 'Profil pengguna, linimasa aktivitas, pengaturan keamanan & sesi aktif',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: 'Authentication — Sign In & Register',
        layout: 'blank',
      },
    },
    {
      path: '/error/:code?',
      name: 'error',
      component: ErrorView,
      meta: {
        title: 'Error Pages Showcase (403, 404, 500)',
        subtitle: 'Tampilan halaman status HTTP Error 403, 404, dan 500',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/error/404',
    },
  ],
})

export default router
