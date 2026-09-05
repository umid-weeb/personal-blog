import { useEffect, useRef, useState } from 'react'
import { articles, getArticle } from '@/data/lab'
import { lab } from '@/data/site'
import { useLanguage } from '@/state/LanguageContext'

/**
 * The lab: an index of write-ups, and a reader.
 *
 * Long-form prose inside a panel that also has to be a window onto a 3D scene
 * is a real tension. It is resolved by giving the reader the whole panel —
 * the index is replaced rather than pushed aside, so the measure stays
 * readable and there is exactly one thing to look at.
 */
export function LabPanel() {
  const { copy } = useLanguage()
  const [open, setOpen] = useState<string | null>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const article = open ? getArticle(open) : undefined

  /* A new article starts at its own beginning, not at the scroll position
     the index happened to be left at. */
  useEffect(() => {
    const parent = scroller.current?.closest('.panel-body')
    if (parent) parent.scrollTop = 0
  }, [open])

  if (articles.length === 0) {
    return (
      <div className="lab" ref={scroller}>
        <p className="lab-status">{lab.status}</p>
        <p className="lab-body">{lab.body}</p>
      </div>
    )
  }

  if (article) {
    return (
      <div className="reader" ref={scroller}>
        <button type="button" className="reader-back" onClick={() => setOpen(null)}>
          ← {copy.viewAllNotes}
        </button>

        <header className="reader-head">
          <p className="reader-meta">
            {article.meta.project && <span>{article.meta.project}</span>}
            <span>{article.meta.minutes} MIN {copy.read}</span>
            {article.meta.status === 'draft' && <span className="reader-draft">DRAFT</span>}
          </p>
          <h3 className="reader-title">{article.meta.title}</h3>
        </header>

        {/* The markup is produced from local .md files at build time by
            plugins/markdown — it is authored content, not user input. */}
        <div className="prose" dangerouslySetInnerHTML={{ __html: article.html }} />

        <footer className="reader-foot">
          <button type="button" className="btn" onClick={() => setOpen(null)}>
            {copy.backToLab}
          </button>
        </footer>
      </div>
    )
  }

  return (
    <div className="lab" ref={scroller}>
      <p className="panel-lead">{lab.body}</p>

      <ol className="notes">
        {articles.map((entry, i) => (
          <li key={entry.meta.slug}>
            <button type="button" className="note" onClick={() => setOpen(entry.meta.slug)}>
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
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}
