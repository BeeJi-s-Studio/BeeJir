export type ToastVariant = 'success' | 'error' | 'warning' | 'info' | 'primary'

export interface ToastItem {
  id: string
  title: string
  message?: string
  variant: ToastVariant
  duration?: number
}
