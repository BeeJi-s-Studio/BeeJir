<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Search,
  UserPlus,
  Trash2,
  CheckCircle2,
  Eye,
  Pencil,
  ChevronLeft,
  ChevronRight,
} from 'lucide-vue-next'
import UiCard from '@/components/ui/UiCard.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiBadge from '@/components/ui/UiBadge.vue'
import UiInput from '@/components/ui/UiInput.vue'
import UiModal from '@/components/ui/UiModal.vue'
import type { ColorVariant } from '@/types/theme'

interface UserRecord {
  id: number
  name: string
  email: string
  role: 'Maintainer' | 'Developer' | 'Designer' | 'Viewer'
  status: 'Active' | 'Pending' | 'Suspended'
  department: string
  joinedAt: string
  color: ColorVariant
}

const users = ref<UserRecord[]>([
  {
    id: 1,
    name: 'Arif Pratama',
    email: 'arif@beejir.dev',
    role: 'Maintainer',
    status: 'Active',
    department: 'Core Platform',
    joinedAt: '12 Jan 2026',
    color: 'primary',
  },
  {
    id: 2,
    name: 'Larasati Dewi',
    email: 'laras@beejir.dev',
    role: 'Designer',
    status: 'Active',
    department: 'Design System',
    joinedAt: '04 Feb 2026',
    color: 'secondary',
  },
  {
    id: 3,
    name: 'Dimas Anggara',
    email: 'dimas@komunitas.id',
    role: 'Developer',
    status: 'Active',
    department: 'Frontend UI',
    joinedAt: '19 Mar 2026',
    color: 'accent',
  },
  {
    id: 4,
    name: 'Karina Putri',
    email: 'karina@cloud.co.id',
    role: 'Developer',
    status: 'Pending',
    department: 'API & Integrations',
    joinedAt: '28 Apr 2026',
    color: 'info',
  },
  {
    id: 5,
    name: 'Fajar Nugroho',
    email: 'fajar@nusantara.io',
    role: 'Viewer',
    status: 'Suspended',
    department: 'QA & Testing',
    joinedAt: '15 Mei 2026',
    color: 'warning',
  },
  {
    id: 6,
    name: 'Maya Kusuma',
    email: 'maya@studio.id',
    role: 'Designer',
    status: 'Active',
    department: 'Brand & Motion',
    joinedAt: '02 Jun 2026',
    color: 'success',
  },
])

const searchQuery = ref('')
const selectedRole = ref<string>('ALL')
const selectedStatus = ref<string>('ALL')
const addModalOpen = ref(false)

// New User Form
const newName = ref('')
const newEmail = ref('')
const newRole = ref<UserRecord['role']>('Developer')
const newDept = ref('Frontend Engineering')

const filteredUsers = computed(() => {
  return users.value.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      u.department.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesRole = selectedRole.value === 'ALL' || u.role === selectedRole.value
    const matchesStatus =
      selectedStatus.value === 'ALL' || u.status === selectedStatus.value
    return matchesSearch && matchesRole && matchesStatus
  })
})

function statusVariant(status: UserRecord['status']): ColorVariant {
  if (status === 'Active') return 'success'
  if (status === 'Pending') return 'warning'
  return 'error'
}

function roleVariant(role: UserRecord['role']): ColorVariant {
  if (role === 'Maintainer') return 'primary'
  if (role === 'Designer') return 'secondary'
  if (role === 'Developer') return 'accent'
  return 'info'
}

function handleAddUser() {
  if (!newName.value.trim() || !newEmail.value.trim()) return
  users.value.unshift({
    id: Date.now(),
    name: newName.value.trim(),
    email: newEmail.value.trim(),
    role: newRole.value,
    status: 'Active',
    department: newDept.value.trim() || 'Community',
    joinedAt: 'Baru saja',
    color: 'primary',
  })
  newName.value = ''
  newEmail.value = ''
  addModalOpen.value = false
}

function removeUser(id: number) {
  users.value = users.value.filter((u) => u.id !== id)
}
</script>

<template>
  <div class="space-y-6">
    <!-- Top Summary Bar -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="card card-bordered p-4 flex flex-row items-center justify-between">
        <div>
          <span class="text-xs font-bold uppercase text-base-content/55">Total Kontributor</span>
          <div class="text-2xl font-extrabold text-base-content mt-0.5">{{ users.length }}</div>
        </div>
        <UiBadge variant="primary" soft size="lg">Terdaftar</UiBadge>
      </div>

      <div class="card card-bordered p-4 flex flex-row items-center justify-between">
        <div>
          <span class="text-xs font-bold uppercase text-base-content/55">Status Aktif</span>
          <div class="text-2xl font-extrabold text-success mt-0.5">
            {{ users.filter((u) => u.status === 'Active').length }}
          </div>
        </div>
        <UiBadge variant="success" soft dot size="lg">Online</UiBadge>
      </div>

      <div class="card card-bordered p-4 flex flex-row items-center justify-between">
        <div>
          <span class="text-xs font-bold uppercase text-base-content/55">Menunggu Review</span>
          <div class="text-2xl font-extrabold text-warning mt-0.5">
            {{ users.filter((u) => u.status === 'Pending').length }}
          </div>
        </div>
        <UiBadge variant="warning" soft size="lg">Pending</UiBadge>
      </div>
    </div>

    <!-- Main Users Data Table Card -->
    <UiCard
      title="Manajemen Pengguna & Kontributor"
      subtitle="Contoh halaman tabel interaktif dengan pencarian, filter multi-kriteria, dan tambah data"
      accent-top="primary"
    >
      <template #actions>
        <UiButton variant="primary" size="sm" @click="addModalOpen = true">
          <template #icon-left>
            <UserPlus class="h-4 w-4" />
          </template>
          Tambah Pengguna
        </UiButton>
      </template>

      <!-- Filter & Search Toolbar -->
      <div class="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-5">
        <div class="flex-1 max-w-md">
          <UiInput
            v-model="searchQuery"
            placeholder="Cari nama, email, atau divisi..."
            size="sm"
          >
            <template #icon-left>
              <Search class="h-4 w-4" />
            </template>
          </UiInput>
        </div>

        <div class="flex flex-wrap items-center gap-2.5">
          <span class="text-xs font-semibold text-base-content/60">
            Filter:
          </span>

          <select v-model="selectedRole" class="select select-sm w-auto">
            <option value="ALL">Semua Role</option>
            <option value="Maintainer">Maintainer</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Viewer">Viewer</option>
          </select>

          <select v-model="selectedStatus" class="select select-sm w-auto">
            <option value="ALL">Semua Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto -mx-6 px-6">
        <table class="table table-hover table-zebra">
          <thead>
            <tr>
              <th>Pengguna</th>
              <th>Role</th>
              <th>Divisi</th>
              <th>Status</th>
              <th>Bergabung</th>
              <th class="text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id">
              <td>
                <div class="flex items-center gap-3">
                  <div
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-bold text-xs bg-primary/15 text-primary border border-primary/25"
                  >
                    {{ user.name.slice(0, 2).toUpperCase() }}
                  </div>
                  <div>
                    <div class="font-bold text-base-content">{{ user.name }}</div>
                    <div class="text-xs text-base-content/55">
                      {{ user.email }}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <UiBadge :variant="roleVariant(user.role)" soft size="sm">
                  {{ user.role }}
                </UiBadge>
              </td>
              <td class="text-xs font-semibold text-base-content/75">
                {{ user.department }}
              </td>
              <td>
                <UiBadge :variant="statusVariant(user.status)" soft dot size="sm">
                  {{ user.status }}
                </UiBadge>
              </td>
              <td class="text-xs text-base-content/60">
                {{ user.joinedAt }}
              </td>
              <td class="text-right">
                <div class="inline-flex items-center justify-end gap-1.5">
                  <button
                    type="button"
                    class="btn btn-square btn-xs btn-ghost text-base-content/65 hover:text-info hover:bg-info/10"
                    title="Lihat detail pengguna"
                  >
                    <Eye class="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    class="btn btn-square btn-xs btn-soft btn-primary"
                    title="Edit pengguna"
                  >
                    <Pencil class="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    class="btn btn-square btn-xs btn-soft btn-error"
                    title="Hapus pengguna"
                    @click="removeUser(user.id)"
                  >
                    <Trash2 class="h-3.5 w-3.5" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredUsers.length === 0">
              <td colspan="6" class="py-10 text-center text-base-content/55">
                Tidak ada pengguna yang cocok dengan pencarian Anda.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <template #footer>
        <div class="flex w-full items-center justify-between text-xs text-base-content/60">
          <span>Menampilkan {{ filteredUsers.length }} dari {{ users.length }} pengguna</span>
          <div class="flex items-center gap-1.5">
            <button
              type="button"
              class="btn btn-square btn-xs btn-outline"
              disabled
              title="Halaman sebelumnya"
            >
              <ChevronLeft class="h-3.5 w-3.5" />
            </button>
            <button type="button" class="btn btn-square btn-xs btn-primary font-bold">1</button>
            <button type="button" class="btn btn-square btn-xs btn-ghost">2</button>
            <button
              type="button"
              class="btn btn-square btn-xs btn-outline"
              title="Halaman berikutnya"
            >
              <ChevronRight class="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </template>
    </UiCard>

    <!-- Add User Modal -->
    <UiModal
      v-model="addModalOpen"
      title="Tambah Pengguna Baru"
      subtitle="Tambahkan anggota tim baru ke dalam daftar tabel secara reaktif"
    >
      <form class="space-y-4" @submit.prevent="handleAddUser">
        <UiInput
          v-model="newName"
          label="Nama Lengkap"
          placeholder="Contoh: Budi Santoso"
        />
        <UiInput
          v-model="newEmail"
          label="Alamat Email"
          type="email"
          placeholder="budi@beejir.dev"
        />
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label class="flex flex-col gap-1.5">
            <span class="text-xs font-semibold text-base-content/80">Role Akses</span>
            <select v-model="newRole" class="select">
              <option value="Maintainer">Maintainer</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Viewer">Viewer</option>
            </select>
          </label>
          <UiInput
            v-model="newDept"
            label="Divisi / Tim"
            placeholder="Frontend Engineering"
          />
        </div>
      </form>

      <template #footer="{ close }">
        <UiButton variant="ghost" size="sm" @click="close">Batal</UiButton>
        <UiButton variant="primary" size="sm" @click="handleAddUser">
          <template #icon-left>
            <CheckCircle2 class="h-4 w-4" />
          </template>
          Simpan Pengguna
        </UiButton>
      </template>
    </UiModal>
  </div>
</template>
