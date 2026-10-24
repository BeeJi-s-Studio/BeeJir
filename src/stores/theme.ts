import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type { ThemeId, RadiusScale, ContentWidth, ThemePreset, CustomColorOverrides } from '@/types/theme'

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'daybreak',
    name: 'Daybreak Indigo',
    tagline: 'Royal Indigo (#666cff) pada permukaan putih bersih & slate profesional',
    mode: 'light',
    preview: {
      bg: '#f7f7f9',
      card: '#ffffff',
      primary: '#666cff',
      secondary: '#e83e8c',
      accent: '#20c997',
    },
  },
  {
    id: 'midnight',
    name: 'Midnight Navy',
    tagline: 'Deep Navy Slate (#282a42 / #30334e) dengan Royal Indigo & Cyan',
    mode: 'dark',
    preview: {
      bg: '#282a42',
      card: '#30334e',
      primary: '#666cff',
      secondary: '#e83e8c',
      accent: '#26c6f9',
    },
  },
  {
    id: 'aurora',
    name: 'Aurora Emerald',
    tagline: 'Forest slate gelap dengan Emerald, Lagoon Cyan & Solar Gold',
    mode: 'dark',
    preview: {
      bg: '#13221e',
      card: '#1a2e29',
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
      bg: '#211a34',
      card: '#2c2344',
      primary: '#8b5cf6',
      secondary: '#d946ef',
      accent: '#f43f5e',
    },
  },
  {
    id: 'sunset',
    name: 'Tropical Sunset',
    tagline: 'Warm alabaster dengan Tangerine, Rose & Violet',
    mode: 'light',
    preview: {
      bg: '#f9f7f6',
      card: '#ffffff',
      primary: '#f97316',
      secondary: '#e11d48',
      accent: '#8b5cf6',
    },
  },
  {
    id: 'ocean',
    name: 'Ocean Breeze',
    tagline: 'Crisp cool slate dengan Azure Sky, Lagoon & Coral',
    mode: 'light',
    preview: {
      bg: '#f5f8fb',
      card: '#ffffff',
      primary: '#0284c7',
      secondary: '#06b6d4',
      accent: '#f43f5e',
    },
  },
  {
    id: 'matcha',
    name: 'Matcha Forest',
    tagline: 'Botanical sage dengan Emerald, Teal & Citrus Amber',
    mode: 'light',
    preview: {
      bg: '#f6f9f7',
      card: '#ffffff',
      primary: '#059669',
      secondary: '#0d9488',
      accent: '#d97706',
    },
  },
  {
    id: 'berry',
    name: 'Berry Violet',
    tagline: 'Soft lavender slate dengan Royal Violet, Fuchsia & Amber',
    mode: 'light',
    preview: {
      bg: '#f8f7fb',
      card: '#ffffff',
      primary: '#7c3aed',
      secondary: '#d946ef',
      accent: '#f59e0b',
    },
  },
]

const RADIUS_MAP: Record<RadiusScale, { box: string; btn: string; badge: string; label: string }> = {
  none: { box: '0rem', btn: '0rem', badge: '0.25rem', label: 'Sharp (0px)' },
  sm: { box: '0.375rem', btn: '0.25rem', badge: '0.375rem', label: 'Small' },
  md: { box: '0.625rem', btn: '0.5rem', badge: '9999px', label: 'Medium (Default)' },
  lg: { box: '1rem', btn: '0.625rem', badge: '9999px', label: 'Large' },
  full: { box: '1.5rem', btn: '9999px', badge: '9999px', label: 'Pill / Full' },
}

/**
 * Converts a #RRGGBB hex string into space-separated RGB channels: "R G B"
 */
export function hexToRgbChannels(hex: string): string {
  const clean = hex.replace('#', '').trim()
  if (clean.length !== 6) return '102 108 255'
  const r = parseInt(clean.slice(0, 2), 16)
  const g = parseInt(clean.slice(2, 4), 16)
  const b = parseInt(clean.slice(4, 6), 16)
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return '102 108 255'
  return `${r} ${g} ${b}`
}

export const useThemeStore = defineStore('beejir-theme', () => {
  // State
  const activeTheme = ref<ThemeId>(
    (localStorage.getItem('beejir:theme') as ThemeId) || 'daybreak'
  )
  const radiusScale = ref<RadiusScale>(
    (localStorage.getItem('beejir:radius') as RadiusScale) || 'md'
  )
  const contentWidth = ref<ContentWidth>(
    (localStorage.getItem('beejir:content-width') as ContentWidth) || 'compact'
  )
  const sidebarCollapsed = ref<boolean>(
    localStorage.getItem('beejir:sidebar-collapsed') === 'true'
  )
  const mobileSidebarOpen = ref<boolean>(false)
  const customizerOpen = ref<boolean>(false)

  const customColors = ref<CustomColorOverrides>({
    enabled: false,
    primary: '#666cff',
    secondary: '#e83e8c',
    accent: '#20c997',
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
    const radius = RADIUS_MAP[radiusScale.value] ?? RADIUS_MAP.md
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

  function setContentWidth(width: ContentWidth) {
    contentWidth.value = width
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
    radiusScale.value = 'md'
    contentWidth.value = 'compact'
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
    [activeTheme, radiusScale, contentWidth, customColors],
    () => {
      localStorage.setItem('beejir:theme', activeTheme.value)
      localStorage.setItem('beejir:radius', radiusScale.value)
      localStorage.setItem('beejir:content-width', contentWidth.value)
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
    contentWidth,
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
    setContentWidth,
    setCustomColor,
    resetCustomizations,
    exportThemeCSS,
    applyThemeToDom,
  }
})
