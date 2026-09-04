import { useEffect, useState } from 'react'
import { site } from '@/data/site'
import { routes } from '@/lib/router'
import { Link } from '@/components/site/Link'
import { useWorld } from '@/state/WorldContext'
import { useLanguage, type Language } from '@/state/LanguageContext'

/**
 * The cinematic opening, and the gesture that starts the audio context.
 *
 * The visitor has to click to enter, which is not a stylistic choice: a
 * browser will not let a page play a sound until someone has interacted with
 * it, and the same click is the only honest moment to start ambience.
 */
export function Boot() {
  const { stage, progress, enter, isTouch } = useWorld()
  const { language, setLanguage, copy } = useLanguage()
  const [gone, setGone] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)

  useEffect(() => {
    if (stage !== 'entered') return
    const timer = setTimeout(() => setGone(true), 1400)
    return () => clearTimeout(timer)
  }, [stage])

  if (gone) return null

  const ready = stage !== 'booting'
  const shown = ready ? 100 : Math.round(progress)
  const filled = Math.round((shown / 100) * 28)

  return (
    <div
      className={`boot${stage === 'entered' ? ' is-leaving' : ''}`}
      role={ready ? undefined : 'status'}
      aria-live="polite"
    >
      <div className="boot-grid" aria-hidden />

      <div className="language-switcher">
        <button
          type="button"
          className="language-trigger"
          aria-expanded={languageOpen}
          aria-controls="language-options"
          aria-label={copy.languageLabel}
          onClick={() => setLanguageOpen((open) => !open)}
        >
          <svg className="language-globe" viewBox="0 0 24 24" aria-hidden>
            <circle cx="12" cy="12" r="8.5" />
            <path d="M3.8 12h16.4M12 3.5c2.2 2.3 3.2 5.1 3.2 8.5s-1 6.2-3.2 8.5M12 3.5C9.8 5.8 8.8 8.6 8.8 12s1 6.2 3.2 8.5" />
          </svg>
          <span>{language.toUpperCase()}</span>
        </button>

        {languageOpen && (
          <div id="language-options" className="language-menu" role="menu" aria-label={copy.languageLabel}>
            {(['en', 'uz', 'ru'] as Language[]).map((option) => (
              <button
                key={option}
                type="button"
                className={language === option ? 'is-selected' : ''}
                role="menuitemradio"
                aria-checked={language === option}
                onClick={() => {
                  setLanguage(option)
                  setLanguageOpen(false)
                }}
              >
                <span>{option === 'en' ? 'English' : option === 'uz' ? 'O‘zbekcha' : 'Русский'}</span>
                {option !== 'en' && <small>{copy.beta}</small>}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="boot-inner">
        <p className="boot-mark">{site.name}</p>

        <p className="boot-status">
          {ready ? copy.ready : copy.initializing}
        </p>

        <div className="boot-bar" aria-hidden>
          <span className="boot-bar__fill" style={{ width: `${shown}%` }} />
        </div>

        <p className="boot-meter" aria-hidden>
          <span>{'█'.repeat(filled)}{'░'.repeat(28 - filled)}</span>
          <span className="boot-meter__pct">{String(shown).padStart(3, ' ')}%</span>
        </p>

        <ul className="boot-steps" aria-hidden>
          {copy.steps.map((step, i) => {
            const done = shown >= ((i + 1) / copy.steps.length) * 100
            return (
              <li key={step} className={done ? 'is-done' : ''}>
                <span>{done ? '✓' : '·'}</span>
                {step}
              </li>
            )
          })}
        </ul>

        <div className="boot-actions">
          <button
            type="button"
            className={`boot-enter${ready ? ' is-ready' : ''}`}
            onClick={enter}
            disabled={!ready}
          >
            <span>{isTouch ? copy.startDemo : copy.enterWorld}</span>
            <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden>
              <path d="M1 6h13M9 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          </button>

          <Link className="boot-read" to={routes.home}>
            {copy.portfolio}
          </Link>
        </div>

        <p className="boot-foot">
          {site.role} · {site.domain}
        </p>
      </div>
    </div>
  )
}
