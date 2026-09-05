import { site } from '@/data/site'
import { routes } from '@/lib/router'
import { Link } from './Link'
import { useLanguage } from '@/state/LanguageContext'

/** The bar on every page route. Deliberately not present inside the world. */
export function SiteHeader({
  canEnterWorld,
  back,
}: {
  canEnterWorld?: boolean
  /** Renders a return link instead of the section nav. */
  back?: { to: string; label: string }
}) {
  const { language, setLanguage, copy } = useLanguage()
  return (
    <header className="site-head">
      <Link className="site-mark" to={routes.home}>
        <span className="site-mark__dot" aria-hidden />
        {site.name}
      </Link>

      <nav className="site-nav" aria-label="Site">
        {back ? (
          <Link className="site-link" to={back.to}>
            {back.label}
          </Link>
        ) : (
          <>
            <Link className="site-link" to={routes.blog}>
              {copy.lab}
            </Link>
            {canEnterWorld && (
              <Link className="site-link site-link--3d" to={routes.world}>
                {copy.demoTour}
              </Link>
            )}
          </>
        )}
      </nav>

      <div className="language-switcher language-switcher--site">
        <button
          type="button"
          className="language-trigger"
          aria-label={copy.languageLabel}
          onClick={(event) => {
            const menu = event.currentTarget.nextElementSibling
            menu?.classList.toggle('is-open')
          }}
        >
          <span>{language.toUpperCase()}</span>
        </button>
        <div className="language-menu" role="menu">
          {(['en', 'uz', 'ru'] as const).map((option) => (
            <button
              key={option}
              type="button"
              className={language === option ? 'is-selected' : ''}
              onClick={() => setLanguage(option)}
            >
              <span>{option === 'en' ? 'English' : option === 'uz' ? 'O‘zbekcha' : 'Русский'}</span>
              {option !== 'en' && <small>{copy.beta}</small>}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-foot">
      <p className="site-foot__brand">
        {site.name} — {site.role}
      </p>
      <p className="site-foot__meta">
        © {new Date().getFullYear()} {site.domain}
      </p>
    </footer>
  )
}
