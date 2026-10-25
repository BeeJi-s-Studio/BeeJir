/**
 * Shared scroll lock manager for overlays (Modals, Lightboxes, Drawers)
 * Prevents layout shift by compensating for scrollbar width.
 * Uses a reference counter so multiple stacked overlays work gracefully.
 */

let lockCount = 0
let originalOverflow = ''
let originalPaddingRight = ''

export function lockScroll() {
  if (typeof document === 'undefined') return

  if (lockCount === 0) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    originalOverflow = document.body.style.overflow
    originalPaddingRight = document.body.style.paddingRight

    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }
  }

  lockCount++
}

export function unlockScroll() {
  if (typeof document === 'undefined') return

  lockCount = Math.max(0, lockCount - 1)

  if (lockCount === 0) {
    document.body.style.overflow = originalOverflow
    document.body.style.paddingRight = originalPaddingRight
  }
}
