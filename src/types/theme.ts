export type ThemeId =
  | 'daybreak'
  | 'midnight'
  | 'aurora'
  | 'nebula'
  | 'sunset'
  | 'ocean'
  | 'matcha'
  | 'berry'

export type RadiusScale = 'none' | 'sm' | 'md' | 'lg' | 'full'

export type ContentWidth = 'compact' | 'wide' | 'full'

export type ColorVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'

export interface ThemePreset {
  id: ThemeId
  name: string
  tagline: string
  mode: 'light' | 'dark'
  preview: {
    bg: string
    card: string
    primary: string
    secondary: string
    accent: string
  }
}

export interface CustomColorOverrides {
  enabled: boolean
  primary: string
  secondary: string
  accent: string
}
