import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type { ThemeId, ThemeMode, RadiusScale, ContentWidth, ThemePreset, CustomColorOverrides } from '@/types/theme'

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'daybreak',
    name: 'Daybreak Indigo',
    tagline: 'Neutral indigo slate dengan aksen Royal Indigo yang tenang & tajam',
    mode: 'dark',
    preview: {
      bg: '#0C0E18',
      card: '#121526',
      primary: '#5E61F0',
      secondary: '#818CF8',
      accent: '#38BDF8',
    },
    lightPreview: {
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
    tagline: 'Deep navy neutral dengan aksen Sapphire Blue & Sky Cyan',
    mode: 'dark',
    preview: {
      bg: '#0B0F17',
      card: '#111826',
      primary: '#5B8DEF',
      secondary: '#7AA5F5',
      accent: '#38BDF8',
    },
    lightPreview: {
      bg: '#f4f7fc',
      card: '#ffffff',
      primary: '#3b82f6',
      secondary: '#0ea5e9',
      accent: '#6366f1',
    },
  },
  {
    id: 'aurora',
    name: 'Aurora Emerald',
    tagline: 'Botanical charcoal tenang dengan aksen Mint Emerald & Lagoon',
    mode: 'dark',
    preview: {
      bg: '#0A100E',
      card: '#0F1816',
      primary: '#2DD4A0',
      secondary: '#5EEAC0',
      accent: '#10B981',
    },
    lightPreview: {
      bg: '#f5faf8',
      card: '#ffffff',
      primary: '#10b981',
      secondary: '#06b6d4',
      accent: '#14b8a6',
    },
  },
  {
    id: 'nebula',
    name: 'Cosmic Nebula',
    tagline: 'Deep obsidian plum dengan aksen Soft Electric Violet',
    mode: 'dark',
    preview: {
      bg: '#0D0B14',
      card: '#14111E',
      primary: '#8B7CF6',
      secondary: '#A399FA',
      accent: '#C084FC',
    },
    lightPreview: {
      bg: '#f8f7fc',
      card: '#ffffff',
      primary: '#7c3aed',
      secondary: '#a855f7',
      accent: '#ec4899',
    },
  },
  {
    id: 'sunset',
    name: 'Tropical Sunset',
    tagline: 'Warm espresso neutral dengan aksen Sunset Amber & Tangerine',
    mode: 'dark',
    preview: {
      bg: '#120D0B',
      card: '#1A1411',
      primary: '#FB8C4A',
      secondary: '#FDA574',
      accent: '#F43F5E',
    },
    lightPreview: {
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
    tagline: 'Deep oceanic slate dengan aksen Cerulean Sky & Aqua',
    mode: 'dark',
    preview: {
      bg: '#090F14',
      card: '#0F1820',
      primary: '#2AA9E0',
      secondary: '#5CC8F5',
      accent: '#06B6D4',
    },
    lightPreview: {
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
    tagline: 'Earthy forest neutral dengan aksen Matcha Sage & Leaf Green',
    mode: 'dark',
    preview: {
      bg: '#0C100B',
      card: '#121811',
      primary: '#8FBF6A',
      secondary: '#A9D488',
      accent: '#4ADE80',
    },
    lightPreview: {
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
    tagline: 'Plum nocturnal neutral dengan aksen Berry Orchid & Lavender',
    mode: 'dark',
    preview: {
      bg: '#100A12',
      card: '#181019',
      primary: '#C26BE8',
      secondary: '#D38DF0',
      accent: '#E879F9',
    },
    lightPreview: {
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
  md: { box: '0.625rem', btn: '0.5rem', badge: '0.5rem', label: 'Medium (Default)' },
  lg: { box: '1rem', btn: '0.625rem', badge: '0.625rem', label: 'Large' },
  full: { box: '1.5rem', btn: '9999px', badge: '9999px', label: 'Pill / Full' },
}

const RADIUS_DERIVED = {
  field: 'min(var(--rounded-btn), 0.75rem)',
  panel: 'min(var(--rounded-box), 0.875rem)',
} as const

/**
 * Converts a #RRGGBB hex string into space-separated RGB channels: "R G B"
 */
export function hexToRgbChannels(hex: string): string {
  const clean = hex.replace('#', '').trim()
  if (clean.length !== 6) return '114 117 246'
  const r = parseInt(clean.slice(0, 2), 16)
  const g = parseInt(clean.slice(2, 4), 16)
  const b = parseInt(clean.slice(4, 6), 16)
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return '114 117 246'
  return `${r} ${g} ${b}`
}

function hexToHsl(hex: string): [number, number, number] {
  const clean = hex.replace('#', '').trim()
  const r = parseInt(clean.slice(0, 2), 16) / 255
  const g = parseInt(clean.slice(2, 4), 16) / 255
  const b = parseInt(clean.slice(4, 6), 16) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

function hslToHex(h: number, s: number, l: number): string {
  const sNorm = s / 100
  const lNorm = l / 100
  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = lNorm - c / 2
  let r = 0
  let g = 0
  let b = 0
  if (h >= 0 && h < 60) [r, g, b] = [c, x, 0]
  else if (h >= 60 && h < 120) [r, g, b] = [x, c, 0]
  else if (h >= 120 && h < 180) [r, g, b] = [0, c, x]
  else if (h >= 180 && h < 240) [r, g, b] = [0, x, c]
  else if (h >= 240 && h < 300) [r, g, b] = [x, 0, c]
  else [r, g, b] = [c, 0, x]

  const toHex = (v: number) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, '0')
      .toUpperCase()
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

/**
 * Automatically derives low-saturation dark neutrals (bg, surface-1, surface-2, raised, input)
 * and hover/contrast tokens from any custom primary accent hex according to low-saturation (10-20%)
 * and elevation hierarchy principles.
 */
export function deriveDarkTokensFromAccent(primaryHex: string) {
  const [h, s, l] = hexToHsl(primaryHex)
  const bg = hslToHex(h, 15, 5)
  const surface1 = hslToHex(h, 16, 7.5)
  const surface2 = hslToHex(h, 16, 9)
  const surfaceRaised = hslToHex(h, 16, 13)
  const surfaceInput = hslToHex(h, 16, 6.5)
  const hover = hslToHex(h, Math.min(100, s + 8), Math.min(86, l + 10))

  // WCAG relative luminance check for button text contrast
  const clean = primaryHex.replace('#', '').trim()
  const r = parseInt(clean.slice(0, 2), 16) / 255
  const g = parseInt(clean.slice(2, 4), 16) / 255
  const b = parseInt(clean.slice(4, 6), 16) / 255
  const toLin = (c: number) => c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  const lum = 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b)
  const cWhite = 1.05 / (lum + 0.05)
  const pc = cWhite >= 4.5 ? '#FFFFFF' : bg

  const rgb = hexToRgbChannels(primaryHex).split(' ').join(', ')
  const accentSoft = `rgba(${rgb}, 0.15)`
  const ring = `rgba(${rgb}, 0.30)`

  return { bg, surface1, surface2, surfaceRaised, surfaceInput, hover, pc, accent: primaryHex, accentHover: hover, accentSoft, ring }
}

const CUSTOM_DARK_VARS = [
  '--p',
  '--p-hover',
  '--pc',
  '--s',
  '--a',
  '--bg',
  '--surface-1',
  '--surface-2',
  '--surface-raised',
  '--surface-input',
  '--accent',
  '--accent-hover',
  '--accent-soft',
  '--ring',
  '--b1',
  '--b2',
] as const

export const useThemeStore = defineStore('beejir-theme', () => {
  // Support URL query params for testing & deep-linking
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
  const themeFromUrl = urlParams?.get('theme') as ThemeId | null
  const modeFromUrl = urlParams?.get('mode') as ThemeMode | null

  // State
  const activeTheme = ref<ThemeId>(
    themeFromUrl || (localStorage.getItem('beejir:theme') as ThemeId) || 'daybreak'
  )
  const themeMode = ref<ThemeMode>(
    modeFromUrl || (localStorage.getItem('beejir:mode') as ThemeMode) || 'dark'
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
    primary: '#5E61F0',
    secondary: '#818CF8',
    accent: '#38BDF8',
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
    const base =
      THEME_PRESETS.find((t) => t.id === activeTheme.value) ?? THEME_PRESETS[0]
    return {
      ...base,
      mode: themeMode.value,
      preview: themeMode.value === 'dark' ? base.preview : base.lightPreview,
    }
  })

  const isDark = computed(() => themeMode.value === 'dark')

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
    root.style.setProperty('--rounded-field', RADIUS_DERIVED.field)
    root.style.setProperty('--rounded-panel', RADIUS_DERIVED.panel)

    // Apply or clear custom color overrides
    if (customColors.value.enabled) {
      root.style.setProperty('--p', hexToRgbChannels(customColors.value.primary))
      root.style.setProperty('--s', hexToRgbChannels(customColors.value.secondary))
      root.style.setProperty('--a', hexToRgbChannels(customColors.value.accent))

      if (isDark.value) {
        const derived = deriveDarkTokensFromAccent(customColors.value.primary)
        root.style.setProperty('--p-hover', hexToRgbChannels(derived.hover))
        root.style.setProperty('--pc', hexToRgbChannels(derived.pc))
        root.style.setProperty('--bg', derived.bg)
        root.style.setProperty('--surface-1', derived.surface1)
        root.style.setProperty('--surface-2', derived.surface2)
        root.style.setProperty('--surface-raised', derived.surfaceRaised)
        root.style.setProperty('--surface-input', derived.surfaceInput)
        root.style.setProperty('--accent', derived.accent)
        root.style.setProperty('--accent-hover', derived.accentHover)
        root.style.setProperty('--accent-soft', derived.accentSoft)
        root.style.setProperty('--ring', derived.ring)
        root.style.setProperty('--b1', hexToRgbChannels(derived.surface2))
        root.style.setProperty('--b2', hexToRgbChannels(derived.bg))
      } else {
        for (const prop of CUSTOM_DARK_VARS) {
          root.style.removeProperty(prop)
        }
      }
    } else {
      for (const prop of CUSTOM_DARK_VARS) {
        root.style.removeProperty(prop)
      }
    }
  }

  function setTheme(themeId: ThemeId) {
    activeTheme.value = themeId
    const preset = THEME_PRESETS.find((t) => t.id === themeId)
    if (preset && !customColors.value.enabled) {
      const palette = isDark.value ? preset.preview : preset.lightPreview
      customColors.value.primary = palette.primary
      customColors.value.secondary = palette.secondary
      customColors.value.accent = palette.accent
    }
  }

  function setMode(mode: ThemeMode) {
    themeMode.value = mode
  }

  function toggleDarkLight() {
    themeMode.value = isDark.value ? 'light' : 'dark'
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
    const primaryHex = customColors.value.enabled
      ? customColors.value.primary
      : preset.preview.primary
    const p = hexToRgbChannels(primaryHex)
    const s = customColors.value.enabled
      ? hexToRgbChannels(customColors.value.secondary)
      : hexToRgbChannels(preset.preview.secondary)
    const a = customColors.value.enabled
      ? hexToRgbChannels(customColors.value.accent)
      : hexToRgbChannels(preset.preview.accent)
    const radius = RADIUS_MAP[radiusScale.value]
    const derived = deriveDarkTokensFromAccent(primaryHex)

    if (isDark.value) {
      return `[data-theme="${activeTheme.value}-custom"] {
  color-scheme: dark;
  --bg: ${customColors.value.enabled ? derived.bg : preset.preview.bg};
  --surface-1: ${derived.surface1};
  --surface-2: ${customColors.value.enabled ? derived.surface2 : preset.preview.card};
  --surface-raised: ${derived.surfaceRaised};
  --surface-input: ${derived.surfaceInput};
  --border: rgba(255, 255, 255, 0.08);
  --border-strong: rgba(255, 255, 255, 0.14);
  --text: #E8EAF0;
  --text-muted: #A0A6B5;
  --text-faint: #7C8294;
  --accent: ${primaryHex};
  --accent-hover: ${derived.hover};
  --accent-soft: rgb(var(--p) / 0.15);
  --ring: rgb(var(--p) / 0.30);
  --p: ${p};
  --s: ${s};
  --a: ${a};
  --rounded-box: ${radius.box};
  --rounded-btn: ${radius.btn};
  --rounded-badge: ${radius.badge};
  --rounded-field: ${RADIUS_DERIVED.field};
  --rounded-panel: ${RADIUS_DERIVED.panel};
}`
    }

    return `[data-theme="${activeTheme.value}-custom"] {
  color-scheme: light;
  --p: ${p};
  --s: ${s};
  --a: ${a};
  --rounded-box: ${radius.box};
  --rounded-btn: ${radius.btn};
  --rounded-badge: ${radius.badge};
  --rounded-field: ${RADIUS_DERIVED.field};
  --rounded-panel: ${RADIUS_DERIVED.panel};
}`
  }

  // Watchers for persistence & DOM sync
  watch(
    [activeTheme, themeMode, radiusScale, contentWidth, customColors],
    () => {
      localStorage.setItem('beejir:theme', activeTheme.value)
      localStorage.setItem('beejir:mode', themeMode.value)
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
    themeMode,
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
    setMode,
    toggleDarkLight,
    setRadius,
    setContentWidth,
    setCustomColor,
    resetCustomizations,
    exportThemeCSS,
    applyThemeToDom,
  }
})
