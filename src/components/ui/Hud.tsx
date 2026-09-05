import { useEffect, useState } from 'react'
import { getZone, zones } from '@/data/zones'
import { getProject } from '@/data/projects'
import { site } from '@/data/site'
import { routes } from '@/lib/router'
import { Link } from '@/components/site/Link'
import { useWorld } from '@/state/WorldContext'
import { useLanguage } from '@/state/LanguageContext'

/**
 * The 2D layer over the world.
 *
 * Everything here is transient: it names what the player is standing next to
 * and then gets out of the way. Nothing occupies screen space permanently
 * except the wordmark and the two controls in the corner.
 */
export function Hud() {
  const { copy } = useLanguage()
  const {
    stage, nearZone, nearProject, openZone, openProject,
    openPanel, showProject, hintSeen, isTouch, audioOn, toggleAudio,
  } = useWorld()

  if (stage !== 'entered') return null
  const overlayOpen = openZone !== null || openProject !== null

  const project = nearProject ? getProject(nearProject) : undefined
  const zone = nearZone ? getZone(nearZone) : undefined

  /* Standing at an exhibit takes priority over standing in the bay. */
  const target = project
    ? { label: project.name, caption: `PROJECT ${project.index}`, accent: project.accent, act: () => showProject(project.id) }
    : zone
      ? { label: zone.label, caption: zone.caption, accent: zone.accent, act: () => openPanel(zone.id) }
      : null

  return (
    <>
      <header className={`hud-top${overlayOpen ? ' is-hidden' : ''}`}>
        <p className="hud-mark">
          <span className="hud-mark__dot" aria-hidden />
          {site.name}
        </p>
        <p className="hud-role">{site.role}</p>
      </header>

      <div className={`hud-tools${overlayOpen ? ' is-hidden' : ''}`}>
        <Link className="hud-btn" to={routes.home}>
          <span aria-hidden>←</span>
          <span className="hud-btn__label">{copy.portfolio.replace('← ', '')}</span>
        </Link>

        <button
          type="button"
          className={`hud-btn${audioOn ? ' is-on' : ''}`}
          onClick={toggleAudio}
          aria-pressed={audioOn}
        >
          <span className="sr-only">{audioOn ? copy.muteAmbience : copy.enableAmbience}</span>
          <span aria-hidden>{audioOn ? '◉' : '◎'}</span>
          <span className="hud-btn__label" aria-hidden>{copy.sound}</span>
        </button>
      </div>

      {!hintSeen && <ControlsHint isTouch={isTouch} />}

      <Prompt target={target} isTouch={isTouch} hidden={overlayOpen} />

      <Compass hidden={overlayOpen} />
    </>
  )
}

/* ─── INTERACT PROMPT ─────────────────────────────────────────── */

function Prompt({
  target,
  isTouch,
  hidden,
}: {
  target: { label: string; caption: string; accent: string; act: () => void } | null
  isTouch: boolean
  hidden: boolean
}) {
  const { copy } = useLanguage()
  const visible = Boolean(target) && !hidden

  return (
    <div
      className={`prompt${visible ? ' is-visible' : ''}`}
      style={target ? ({ ['--accent' as string]: target.accent }) : undefined}
    >
      <p className="prompt-caption">{target?.caption ?? ''}</p>
      <p className="prompt-label">{target?.label ?? ''}</p>

      {/* A real button, so the prompt works with a click, a tap, Enter or E. */}
      <button
        type="button"
        className="prompt-key"
        onClick={() => target?.act()}
        tabIndex={visible ? 0 : -1}
        aria-hidden={!visible}
      >
        {isTouch ? (
          <span>{copy.tapToExplore}</span>
        ) : (
          <>
            <kbd>E</kbd>
            <span>{copy.interact}</span>
          </>
        )}
      </button>
    </div>
  )
}

/* ─── CONTROLS HINT ───────────────────────────────────────────── */

function ControlsHint({ isTouch }: { isTouch: boolean }) {
  const { copy } = useLanguage()
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShown(true), 900)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`hint${shown ? ' is-visible' : ''}`}>
      {isTouch ? (
        <>
          <span>{copy.dragMove}</span>
          <span>{copy.swipeLook}</span>
          <span>{copy.tapInteract}</span>
        </>
      ) : (
        <>
          <span>{copy.keyboardMove}</span>
          <span>{copy.keyboardLook}</span>
          <span><b>E</b> {copy.interact}</span>
        </>
      )}
    </div>
  )
}

/* ─── DESTINATION COMPASS ─────────────────────────────────────── */

/** Which destinations exist, and which one you are standing in. */
function Compass({ hidden }: { hidden: boolean }) {
  const { nearZone, openPanel } = useWorld()
  const { t } = useLanguage()

  return (
    <nav className={`compass${hidden ? ' is-hidden' : ''}`} aria-label="Destinations">
      {zones.map((zone) => (
        <button
          key={zone.id}
          type="button"
          className={`compass-item${nearZone === zone.id ? ' is-active' : ''}`}
          style={{ ['--accent' as string]: zone.accent }}
          onClick={() => openPanel(zone.id)}
        >
          <span className="compass-dot" aria-hidden />
          <span className="compass-label">{t(`zone:${zone.id}:label`, zone.label)}</span>
        </button>
      ))}
    </nav>
  )
}
