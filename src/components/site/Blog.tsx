import { articles, getArticle } from '@/data/lab'
import { lab } from '@/data/site'
import { routes } from '@/lib/router'
import { Link } from './Link'
import { SiteHeader, SiteFooter } from './Chrome'
import { useLanguage } from '@/state/LanguageContext'

/** `/blog` — every write-up. */
export function BlogIndex() {
  const { copy } = useLanguage()
  return (
    <div className="page page--narrow">
      <SiteHeader back={{ to: routes.home, label: copy.portfolio }} />

      <main>
        <header className="block-head">
          <p className="block-eyebrow">
            <span className="block-eyebrow__rule" aria-hidden />
            {copy.fieldNotes}
          </p>
          <h1 className="block-title">{copy.lab}</h1>
        </header>

        <p className="block-lead">{lab.body}</p>

        {articles.length === 0 ? (
          <p className="lab-status">{lab.status}</p>
        ) : (
          <ol className="notes">
            {articles.map((entry, i) => (
              <li key={entry.meta.slug}>
                <Link className="note" to={routes.article(entry.meta.slug)}>
                  <span className="note-index">{String(i + 1).padStart(2, '0')}</span>
                  <span className="note-main">
                    <span className="note-title">{entry.meta.title}</span>
                    <span className="note-summary">{entry.meta.summary}</span>
                    <span className="note-meta">
                      {entry.meta.project && <span className="note-project">{entry.meta.project}</span>}
                      <span>{entry.meta.minutes} min</span>
                      {entry.meta.status === 'draft' && <span className="note-draft">DRAFT</span>}
                    </span>
                  </span>
                  <span className="note-go" aria-hidden>{copy.read} →</span>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}

/** `/blog/:slug` — one write-up. */
export function BlogArticle({ slug }: { slug: string }) {
  const { copy } = useLanguage()
  const article = getArticle(slug)

  if (!article) {
    return (
      <div className="page page--narrow">
        <SiteHeader back={{ to: routes.blog, label: `← ${copy.viewAllNotes}` }} />
        <main>
          <h1 className="block-title">{copy.noPublicDeployment}</h1>
          <p className="block-lead">
            There is no note at that address. It may have been renamed.
          </p>
          <Link className="btn" to={routes.blog}>
            {copy.viewAllNotes} →
          </Link>
        </main>
        <SiteFooter />
      </div>
    )
  }

  const index = articles.findIndex((a) => a.meta.slug === slug)
  const next = articles[index + 1]

  return (
    <div className="page page--narrow">
      <SiteHeader back={{ to: routes.blog, label: `← ${copy.viewAllNotes}` }} />

      <main>
        <article>
          <header className="reader-head">
            <p className="reader-meta">
              {article.meta.project && <span>{article.meta.project}</span>}
              <span>{article.meta.minutes} MIN {copy.read}</span>
              {article.meta.status === 'draft' && <span className="reader-draft">DRAFT</span>}
            </p>
            <h1 className="reader-title">{article.meta.title}</h1>
            <p className="reader-summary">{article.meta.summary}</p>
          </header>

          {/* Compiled from local .md files at build time by plugins/markdown —
              authored content, never anything a visitor supplied. */}
          <div className="prose" dangerouslySetInnerHTML={{ __html: article.html }} />
        </article>

        <nav className="reader-next" aria-label="More notes">
          {next ? (
            <Link className="next-note" to={routes.article(next.meta.slug)}>
              <span className="next-note__k">{copy.next}</span>
              <span className="next-note__v">{next.meta.title}</span>
              <span aria-hidden>→</span>
            </Link>
          ) : (
            <Link className="btn" to={routes.blog}>
              {copy.viewAllNotes} →
            </Link>
          )}
        </nav>
      </main>

      <SiteFooter />
    </div>
  )
}
