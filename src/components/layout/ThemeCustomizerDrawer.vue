<script setup lang="ts">
import { ref } from 'vue'
import {
  X,
  Palette,
  RotateCcw,
  Copy,
  Check,
  Sparkles,
} from 'lucide-vue-next'
import { useThemeStore } from '@/stores/theme'
import type { RadiusScale, ContentWidth } from '@/types/theme'

const themeStore = useThemeStore()
const copied = ref(false)

const radiusKeys: RadiusScale[] = ['none', 'sm', 'md', 'lg', 'full']
const contentWidthOptions: Array<{ id: ContentWidth; label: string; desc: string }> = [
  { id: 'compact', label: 'Compact', desc: 'Maks. 1440px (Default)' },
  { id: 'wide', label: 'Wide', desc: 'Maks. 1720px' },
  { id: 'full', label: 'Full Width', desc: '100% Layar Penuh' },
]

async function copyCssConfig() {
  try {
    await navigator.clipboard.writeText(themeStore.exportThemeCSS())
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    // Fallback if clipboard blocked
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="themeStore.customizerOpen"
        class="fixed inset-0 z-50 bg-neutral/40 backdrop-blur-xs"
        @click="themeStore.customizerOpen = false"
      />
    </Transition>

    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-200 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <aside
        v-if="themeStore.customizerOpen"
        class="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-base-300 bg-base-100 text-base-content shadow-2xl"
      >
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-base-300/80 px-6 py-4">
          <div class="flex items-center gap-2.5">
            <div class="flex h-9 w-9 items-center justify-center rounded-btn bg-primary/12 text-primary">
              <Palette class="h-5 w-5" />
            </div>
            <div>
              <h2 class="text-base font-extrabold text-base-content">Theme Studio</h2>
              <p class="text-xs text-base-content/55">
                Adjustable Clean & Colorful Engine
              </p>
            </div>
          </div>
          <button
            type="button"
            class="btn btn-ghost btn-sm btn-circle"
            @click="themeStore.customizerOpen = false"
          >
            <X class="h-4 w-4" />
          </button>
        </div>

        <!-- Body -->
        <div class="flex-1 overflow-y-auto p-6 space-y-6">
          <!-- 1. Theme Presets -->
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-bold uppercase tracking-wider text-base-content/60">
                1. Preset Palet Tema
              </span>
              <span class="badge badge-sm badge-soft badge-primary">6 Presets</span>
            </div>

            <div class="grid grid-cols-2 gap-2.5">
              <button
                v-for="preset in themeStore.presets"
                :key="preset.id"
                type="button"
                class="group flex flex-col gap-2 rounded-btn border p-3 text-left transition-all"
                :class="
                  themeStore.activeTheme === preset.id
                    ? 'border-primary bg-primary/8 ring-2 ring-primary/20'
                    : 'border-base-300 hover:border-primary/40 hover:bg-base-200/50'
                "
                @click="themeStore.setTheme(preset.id)"
              >
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-base-content">
                    {{ preset.name }}
                  </span>
                  <span
                    class="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-base-200 text-base-content/60"
                  >
                    {{ preset.mode }}
                  </span>
                </div>

                <!-- Color Swatch Bar -->
                <div
                  class="flex items-center gap-1.5 rounded-md border border-base-300/80 p-1.5"
                  :style="{ backgroundColor: preset.preview.bg }"
                >
                  <span
                    class="h-4 flex-1 rounded-xs"
                    :style="{ backgroundColor: preset.preview.primary }"
                  />
                  <span
                    class="h-4 flex-1 rounded-xs"
                    :style="{ backgroundColor: preset.preview.secondary }"
                  />
                  <span
                    class="h-4 flex-1 rounded-xs"
                    :style="{ backgroundColor: preset.preview.accent }"
                  />
                </div>
              </button>
            </div>
          </div>

          <!-- 2. Live Custom Color Overrides -->
          <div class="border-t border-base-300/70 pt-5">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-bold uppercase tracking-wider text-base-content/60">
                2. Custom Warna Brand (Live)
              </span>
              <span
                v-if="themeStore.customColors.enabled"
                class="badge badge-sm badge-soft badge-secondary"
              >
                Custom Aktif
              </span>
            </div>

            <p class="text-xs text-base-content/60 mb-3">
              Ubah variabel CSS <code class="font-mono text-primary">--p</code>,
              <code class="font-mono text-secondary">--s</code>, dan
              <code class="font-mono text-accent">--a</code> secara langsung:
            </p>

            <div class="grid grid-cols-3 gap-2.5">
              <!-- Primary Picker -->
              <label
                class="flex flex-col items-center gap-1.5 rounded-btn border border-base-300 p-2.5 cursor-pointer hover:border-primary/50"
              >
                <input
                  type="color"
                  :value="themeStore.customColors.primary"
                  class="h-8 w-full cursor-pointer rounded border-0 bg-transparent"
                  @input="
                    themeStore.setCustomColor(
                      'primary',
                      ($event.target as HTMLInputElement).value
                    )
                  "
                />
                <span class="text-[11px] font-bold text-base-content">Primary</span>
                <span class="font-mono text-[10px] text-base-content/50">
                  {{ themeStore.customColors.primary }}
                </span>
              </label>

              <!-- Secondary Picker -->
              <label
                class="flex flex-col items-center gap-1.5 rounded-btn border border-base-300 p-2.5 cursor-pointer hover:border-secondary/50"
              >
                <input
                  type="color"
                  :value="themeStore.customColors.secondary"
                  class="h-8 w-full cursor-pointer rounded border-0 bg-transparent"
                  @input="
                    themeStore.setCustomColor(
                      'secondary',
                      ($event.target as HTMLInputElement).value
                    )
                  "
                />
                <span class="text-[11px] font-bold text-base-content">Secondary</span>
                <span class="font-mono text-[10px] text-base-content/50">
                  {{ themeStore.customColors.secondary }}
                </span>
              </label>

              <!-- Accent Picker -->
              <label
                class="flex flex-col items-center gap-1.5 rounded-btn border border-base-300 p-2.5 cursor-pointer hover:border-accent/50"
              >
                <input
                  type="color"
                  :value="themeStore.customColors.accent"
                  class="h-8 w-full cursor-pointer rounded border-0 bg-transparent"
                  @input="
                    themeStore.setCustomColor(
                      'accent',
                      ($event.target as HTMLInputElement).value
                    )
                  "
                />
                <span class="text-[11px] font-bold text-base-content">Accent</span>
                <span class="font-mono text-[10px] text-base-content/50">
                  {{ themeStore.customColors.accent }}
                </span>
              </label>
            </div>
          </div>

          <!-- 3. Adjustable Border Radius -->
          <div class="border-t border-base-300/70 pt-5">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-bold uppercase tracking-wider text-base-content/60">
                3. Kelengkungan Sudut (Radius)
              </span>
              <span class="font-mono text-xs text-primary font-semibold">
                {{ themeStore.radiusScale.toUpperCase() }}
              </span>
            </div>

            <div class="grid grid-cols-5 gap-1.5">
              <button
                v-for="scale in radiusKeys"
                :key="scale"
                type="button"
                class="btn btn-sm"
                :class="
                  themeStore.radiusScale === scale
                    ? 'btn-primary'
                    : 'btn-ghost border border-base-300'
                "
                @click="themeStore.setRadius(scale)"
              >
                {{ scale }}
              </button>
            </div>
          </div>

          <!-- 4. Content Width (Compact / Wide / Full) -->
          <div class="border-t border-base-300/70 pt-5">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-bold uppercase tracking-wider text-base-content/60">
                4. Lebar Konten Layar
              </span>
              <span class="badge badge-sm badge-soft badge-primary font-mono text-[10px]">
                {{ themeStore.contentWidth.toUpperCase() }}
              </span>
            </div>

            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="opt in contentWidthOptions"
                :key="opt.id"
                type="button"
                class="flex flex-col items-center justify-center p-2.5 rounded-btn border text-center transition-all cursor-pointer"
                :class="
                  themeStore.contentWidth === opt.id
                    ? 'border-primary bg-primary/10 ring-2 ring-primary/25 text-primary'
                    : 'border-base-300 hover:border-base-content/30 text-base-content/75 hover:bg-base-200/50'
                "
                @click="themeStore.setContentWidth(opt.id)"
              >
                <div class="flex items-center justify-center mb-1.5">
                  <div
                    class="h-3.5 rounded-xs border border-current transition-all"
                    :class="
                      opt.id === 'compact'
                        ? 'w-6'
                        : opt.id === 'wide'
                          ? 'w-9'
                          : 'w-11'
                    "
                  />
                </div>
                <span class="text-xs font-bold leading-tight">{{ opt.label }}</span>
                <span class="text-[9px] text-base-content/50 mt-0.5 leading-tight">{{ opt.desc }}</span>
              </button>
            </div>
          </div>

          <!-- 5. Live Component Preview & CSS Export -->
          <div class="border-t border-base-300/70 pt-5 space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-base-content/60 block">
              5. Export CSS Variables
            </span>
            <pre
              class="rounded-box bg-base-200 border border-base-300 p-3 font-mono text-[11px] text-base-content/80 overflow-x-auto leading-relaxed"
            >{{ themeStore.exportThemeCSS() }}</pre>

            <button
              type="button"
              class="btn btn-soft btn-primary btn-sm btn-block"
              @click="copyCssConfig"
            >
              <Check v-if="copied" class="h-4 w-4 text-success" />
              <Copy v-else class="h-4 w-4" />
              <span>{{ copied ? 'Berhasil Disalin ke Clipboard!' : 'Salin CSS Variabel Tema' }}</span>
            </button>
          </div>
        </div>

        <!-- Footer -->
        <div class="border-t border-base-300/80 p-4 flex items-center gap-2 bg-base-200/40">
          <button
            type="button"
            class="btn btn-outline btn-sm flex-1"
            @click="themeStore.resetCustomizations"
          >
            <RotateCcw class="h-3.5 w-3.5" />
            Reset Default
          </button>
          <button
            type="button"
            class="btn btn-primary btn-sm flex-1"
            @click="themeStore.customizerOpen = false"
          >
            <Sparkles class="h-3.5 w-3.5" />
            Selesai
          </button>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>
