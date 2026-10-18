import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type { ThemeId, RadiusScale, ThemePreset, CustomColorOverrides } from '@/types/theme'

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'daybreak',
    name: 'Daybreak Pop',
    tagline: 'Clean slate white dengan Indigo, Coral & Mint',
    mode: 'light',
    preview: {
      bg: '#f4f7fe',
      card: '#ffffff',
      primary: '#6366f1',
      secondary: '#ec4899',
      accent: '#14b8a6',
    },
  },
  {
    id: 'midnight',
    name: 'Midnight Cyber',
    tagline: 'Deep obsidian dengan Electric Indigo, Hot Pink & Cyber Cyan',
    mode: 'dark',
    preview: {
      bg: '#080c18',
      card: '#11192c',
      primary: '#6366f1',
      secondary: '#ec4899',
      accent: '#06b6d4',
    },
  },
  {
    id: 'aurora',
    name: 'Aurora Matrix',
    tagline: 'Botanical night dengan Neon Emerald, Electric Cyan & Gold',
    mode: 'dark',
    preview: {
      bg: '#06100d',
      card: '#0d1f1a',
      primary: '#10b981',
      secondary: '#06b6d4',
      accent: '#f59e0b',
    },
  },
  {
    id: 'nebula',
    name: 'Cosmic Nebula',
    tagline: 'Velvet plum dark dengan Electric Violet, Fuchsia & Coral',
    mode: 'dark',
    preview: {
      bg: '#0b0716',
      card: '#171029',
      primary: '#8b5cf6',
      secondary: '#d946ef',
      accent: '#f43f5e',
    },
  },
  {
    id: 'sunset',
    name: 'Tropical Sunset',
    tagline: 'Warm cream dengan Tangerine, Rose & Violet',
    mode: 'light',
    preview: {
      bg: '#fff8f3',
      card: '#ffffff',
      primary: '#f97316',
      secondary: '#e11d48',
      accent: '#8b5cf6',
    },
  },
  {
    id: 'ocean',
    name: 'Ocean Breeze',
    tagline: 'Crisp aqua surface dengan Sky, Lagoon & Coral',
    mode: 'light',
    preview: {
      bg: '#f0f9ff',
      card: '#ffffff',
      primary: '#0284c7',
      secondary: '#06b6d4',
      accent: '#f43f5e',
    },
  },
  {
    id: 'matcha',
    name: 'Matcha Forest',
    tagline: 'Botanical sage dengan Emerald, Teal & Citrus Gold',
    mode: 'light',
    preview: {
      bg: '#f2faf6',
      card: '#ffffff',
      primary: '#059669',
      secondary: '#0d9488',
      accent: '#d97706',
    },
  },
  {
    id: 'berry',
    name: 'Berry Candy',
    tagline: 'Soft lavender dengan Royal Violet, Fuchsia & Amber',
    mode: 'light',
    preview: {
      bg: '#faf5ff',
      card: '#ffffff',
      primary: '#7c3aed',
      secondary: '#d946ef',
      accent: '#f59e0b',
    },
  },
]

const RADIUS_MAP: Record<RadiusScale, { box: string; btn: string; badge: string; label: string }> = {
  none: { box: '0rem', btn: '0rem', badge: '0.25rem', label: 'Sharp (0px)' },
  sm: { box: '0.5rem', btn: '0.375rem', badge: '0.375rem', label: 'Small' },
  md: { box: '0.875rem', btn: '0.625rem', badge: '9999px', label: 'Medium' },
  lg: { box: '1.25rem', btn: '0.75rem', badge: '9999px', label: 'Large (Default)' },
  full: { box: '1.75rem', btn: '9999px', badge: '9999px', label: 'Pill / Full' },
}

/**
 * Converts a #RRGGBB hex string into space-separated RGB channels: "R G B"
 */
export function hexToRgbChannels(hex: string): string {
  const clean = hex.replace('#', '').trim()
  if (clean.length !== 6) return '99 102 241'
  const r = parseInt(clean.slice(0, 2), 16)
  const g = parseInt(clean.slice(2, 4), 16)
  const b = parseInt(clean.slice(4, 6), 16)
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return '99 102 241'
  return `${r} ${g} ${b}`
}

export const useThemeStore = defineStore('beejir-theme', () => {
  // State
  const activeTheme = ref<ThemeId>(
    (localStorage.getItem('beejir:theme') as ThemeId) || 'daybreak'
  )
  const radiusScale = ref<RadiusScale>(
    (localStorage.getItem('beejir:radius') as RadiusScale) || 'lg'
  )
  const sidebarCollapsed = ref<boolean>(
    localStorage.getItem('beejir:sidebar-collapsed') === 'true'
  )
  const mobileSidebarOpen = ref<boolean>(false)
  const customizerOpen = ref<boolean>(false)

  const customColors = ref<CustomColorOverrides>({
    enabled: false,
    primary: '#6366f1',
    secondary: '#ec4899',
    accent: '#14b8a6',
  })

  // Load saved custom colors if any
  const savedCustom = localStorage.getItem('beejir:custom-colors')
  if (savedCustom) {
    try {
      customColors.value = JSON.parse(savedCustom)
    } catch {
      // ignore corrupted storage
    }
  }

  const currentPreset = computed<ThemePreset>(() => {
    return (
      THEME_PRESETS.find((t) => t.id === activeTheme.value) ?? THEME_PRESETS[0]
    )
  })

  const isDark = computed(() => currentPreset.value.mode === 'dark')

  // Apply theme attributes and CSS variables to <html>
  function applyThemeToDom() {
    const root = document.documentElement
    root.setAttribute('data-theme', activeTheme.value)
    root.classList.toggle('dark', isDark.value)

    // Apply radius variables
    const radius = RADIUS_MAP[radiusScale.value] ?? RADIUS_MAP.lg
    root.style.setProperty('--rounded-box', radius.box)
    root.style.setProperty('--rounded-btn', radius.btn)
    root.style.setProperty('--rounded-badge', radius.badge)

    // Apply or clear custom color overrides
    if (customColors.value.enabled) {
      root.style.setProperty('--p', hexToRgbChannels(customColors.value.primary))
      root.style.setProperty('--s', hexToRgbChannels(customColors.value.secondary))
      root.style.setProperty('--a', hexToRgbChannels(customColors.value.accent))
    } else {
      root.style.removeProperty('--p')
      root.style.removeProperty('--s')
      root.style.removeProperty('--a')
    }
  }

  function setTheme(themeId: ThemeId) {
    activeTheme.value = themeId
    const preset = THEME_PRESETS.find((t) => t.id === themeId)
    if (preset && !customColors.value.enabled) {
      customColors.value.primary = preset.preview.primary
      customColors.value.secondary = preset.preview.secondary
      customColors.value.accent = preset.preview.accent
    }
  }

  function toggleDarkLight() {
    if (isDark.value) {
      if (activeTheme.value === 'aurora') setTheme('matcha')
      else if (activeTheme.value === 'nebula') setTheme('berry')
      else setTheme('daybreak')
    } else {
      if (activeTheme.value === 'matcha') setTheme('aurora')
      else if (activeTheme.value === 'berry') setTheme('nebula')
      else setTheme('midnight')
    }
  }

  function setRadius(scale: RadiusScale) {
    radiusScale.value = scale
  }

  function setCustomColor(key: 'primary' | 'secondary' | 'accent', hex: string) {
    customColors.value.enabled = true
    customColors.value[key] = hex
  }

  function resetCustomizations() {
    customColors.value.enabled = false
    const preset = currentPreset.value
    customColors.value.primary = preset.preview.primary
    customColors.value.secondary = preset.preview.secondary
    customColors.value.accent = preset.preview.accent
    radiusScale.value = 'lg'
    applyThemeToDom()
  }

  function exportThemeCSS(): string {
    const preset = currentPreset.value
    const p = customColors.value.enabled
      ? hexToRgbChannels(customColors.value.primary)
      : hexToRgbChannels(preset.preview.primary)
    const s = customColors.value.enabled
      ? hexToRgbChannels(customColors.value.secondary)
      : hexToRgbChannels(preset.preview.secondary)
    const a = customColors.value.enabled
      ? hexToRgbChannels(customColors.value.accent)
      : hexToRgbChannels(preset.preview.accent)
    const radius = RADIUS_MAP[radiusScale.value]

    return `[data-theme="${activeTheme.value}-custom"] {
  color-scheme: ${preset.mode};
  --p: ${p};
  --s: ${s};
  --a: ${a};
  --rounded-box: ${radius.box};
  --rounded-btn: ${radius.btn};
  --rounded-badge: ${radius.badge};
}`
  }

  // Watchers for persistence & DOM sync
  watch(
    [activeTheme, radiusScale, customColors],
    () => {
      localStorage.setItem('beejir:theme', activeTheme.value)
      localStorage.setItem('beejir:radius', radiusScale.value)
      localStorage.setItem('beejir:custom-colors', JSON.stringify(customColors.value))
      applyThemeToDom()
    },
    { deep: true, immediate: true }
  )

  watch(sidebarCollapsed, (val) => {
    localStorage.setItem('beejir:sidebar-collapsed', String(val))
  })

  return {
    activeTheme,
    radiusScale,
    sidebarCollapsed,
    mobileSidebarOpen,
    customizerOpen,
    customColors,
    currentPreset,
    isDark,
    presets: THEME_PRESETS,
    radiusOptions: RADIUS_MAP,
    setTheme,
    toggleDarkLight,
    setRadius,
    setCustomColor,
    resetCustomizations,
    exportThemeCSS,
    applyThemeToDom,
  }
})
