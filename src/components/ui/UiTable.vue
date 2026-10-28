<script setup lang="ts" generic="T extends Record<string, any>">
import type { TableColumn } from '@/types/table'

export interface UiTableProps<T = Record<string, any>> {
  columns?: TableColumn<T>[]
  items?: T[]
  zebra?: boolean
  hoverable?: boolean
  bordered?: boolean
  compact?: boolean
}

withDefaults(defineProps<UiTableProps<T>>(), {
  columns: () => [],
  items: () => [],
  zebra: true,
  hoverable: true,
  bordered: true,
  compact: false,
})
</script>

<template>
  <div
    class="w-full overflow-hidden rounded-box bg-base-100"
    :class="bordered ? 'border border-base-300' : ''"
  >
    <div class="overflow-x-auto">
      <table
        class="table"
        :class="[
          zebra ? 'table-zebra' : '',
          hoverable ? 'table-hover' : '',
        ]"
      >
        <thead>
          <slot name="header">
            <tr>
              <th
                v-for="col in columns"
                :key="col.key"
                :style="{ width: col.width }"
                :class="[
                  col.align === 'center' ? 'text-center' : '',
                  col.align === 'right' ? 'text-right' : 'text-left',
                  compact ? 'py-2 px-3' : 'py-3.5 px-4',
                ]"
              >
                <slot :name="`th-${col.key}`" :column="col">
                  {{ col.label }}
                </slot>
              </th>
            </tr>
          </slot>
        </thead>

        <tbody>
          <slot name="body">
            <tr v-for="(row, idx) in items" :key="row.id || idx">
              <td
                v-for="col in columns"
                :key="col.key"
                :class="[
                  col.align === 'center' ? 'text-center' : '',
                  col.align === 'right' ? 'text-right' : 'text-left',
                  compact ? 'py-2 px-3' : 'py-3.5 px-4',
                ]"
              >
                <slot :name="`cell-${col.key}`" :item="row" :value="row[col.key]" :index="idx">
                  {{ row[col.key] }}
                </slot>
              </td>
            </tr>

            <tr v-if="items.length === 0">
              <td :colspan="columns.length || 1" class="py-12 text-center text-base-content/50">
                <slot name="empty">
                  Tidak ada data untuk ditampilkan.
                </slot>
              </td>
            </tr>
          </slot>
        </tbody>
      </table>
    </div>

    <div v-if="$slots.footer" class="border-t border-base-300/70 p-3 bg-base-200/30">
      <slot name="footer" />
    </div>
  </div>
</template>
