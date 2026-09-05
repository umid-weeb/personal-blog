import { useEffect, useRef, type ReactNode } from 'react'
import { useLanguage } from '@/state/LanguageContext'

/**
 * The shell every destination's content opens inside.
 *
 * One shell rather than one per section: the frame, the focus trap, the
 * close affordance and the entrance are identical everywhere, and a section
 * that wrote its own would drift from the others within a week.
 */
export function Panel({
  eyebrow,
  title,
  accent,
  onClose,
  children,
  wide,
}: {
  eyebrow: string
  title: string
  accent: string
  onClose: () => void
  children: ReactNode
  wide?: boolean
}) {
  const { copy } = useLanguage()
  const sheet = useRef<HTMLDivElement>(null)
  const closer = useRef<HTMLButtonElement>(null)

  /* Focus moves in on open, is kept inside while open, and is handed back on
     close by whatever opened the panel. */
  useEffect(() => {
    closer.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !sheet.current) return
      const focusable = sheet.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div
      className="panel-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className={`panel${wide ? ' is-wide' : ''}`}
        ref={sheet}
        style={{ ['--accent' as string]: accent }}
      >
        <span className="panel-scan" aria-hidden />

        <header className="panel-head">
          <p className="panel-eyebrow">
            <span className="panel-eyebrow__tick" aria-hidden />
            {eyebrow}
          </p>
          <h2 className="panel-title">{title}</h2>
        </header>

        <button type="button" className="panel-close" onClick={onClose} ref={closer}>
          <span className="sr-only">{copy.close}</span>
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
          <kbd>ESC</kbd>
        </button>

        <div className="panel-body">{children}</div>

        {/* Frame corners, matching the holograms in the world. */}
        {['tl', 'tr', 'bl', 'br'].map((corner) => (
          <span key={corner} className={`panel-corner is-${corner}`} aria-hidden />
        ))}
      </div>
    </div>
  )
}
