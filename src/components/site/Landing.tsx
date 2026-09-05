import { about, contact, lab } from '@/data/site'
import { projects } from '@/data/projects'
import { skillGroups } from '@/data/skills'
import { missions, statusLabel } from '@/data/experience'
import { processSteps } from '@/data/process'
import { articles } from '@/data/lab'
import { routes } from '@/lib/router'
import { Link } from './Link'
import { SiteHeader, SiteFooter } from './Chrome'
import { useLanguage } from '@/state/LanguageContext'

/**
 * The portfolio as a page.
 *
 * This is the default on touch, and what anyone gets when WebGL is
 * unavailable. It is not a fallback in the apologetic sense — a phone reaches
 * this content faster by reading it than by walking a station on a five-inch
 * screen, so on a phone this *is* the site and the 3D world is the optional
 * demo.
 */
export function Landing({ canEnterWorld }: { canEnterWorld: boolean }) {
  const { copy, t } = useLanguage()
  return (
    <div className="page">
      <SiteHeader canEnterWorld={canEnterWorld} />

      <main>
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="hero">
          <p className="hero-kicker">
            <span className="hero-kicker__dot" aria-hidden />
            {about.role}
          </p>

          <h1 className="hero-title">{about.heading}</h1>
          <p className="hero-statement">{t('about:statement', about.statement)}</p>
          <p className="hero-body">{t('about:body', about.body)}</p>

          <ul className="hero-tags">
            {about.disciplines.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>

          <div className="hero-cta">
            <a className="btn btn--primary" href="#projects">
              {copy.viewWork}
            </a>
            {canEnterWorld && (
              <Link className="btn" to={routes.world}>
                {copy.demoTour} →
              </Link>
            )}
          </div>

          <p className="hero-closing">
            {about.closing.map((line, i) => (
              <span key={line} className={i === 1 ? 'is-strong' : undefined}>
                {t(`about:closing${i}`, line)}
              </span>
            ))}
          </p>
        </section>

        {/* ── PROJECTS ─────────────────────────────────────────── */}
        <section id="projects" className="block">
          <Heading index="01" label={copy.selectedWork}>
            {copy.selectedWorkLead}
          </Heading>

          <div className="cards">
            {projects.map((project) => (
              <article
                key={project.id}
                className="card"
                style={{ ['--accent' as string]: project.accent }}
              >
                <div className="card-shot">
                  <img
                    src={project.image}
                    alt={`${project.name} — ${t(`project:${project.id}:category`, project.category)}`}
                    width={1760}
                    height={1100}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="card-body">
                  <p className="card-meta">
                    <span className="card-index">{project.index}</span>
                    {t(`project:${project.id}:category`, project.category)}
                  </p>

                  <h3 className="card-title">{project.name}</h3>
                  <p className="card-desc">{t(`project:${project.id}:description`, project.description)}</p>

                  <ul className="chips">
                    {project.technologies.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>

                  {project.url ? (
                    <a
                      className="card-live"
                      href={project.url}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {copy.viewLiveProject}
                      <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden>
                        <path d="M1 11L11 1M4 1h7v7" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      </svg>
                    </a>
                  ) : (
                    <p className="card-private">{copy.noPublicDeployment}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── SKILLS ───────────────────────────────────────────── */}
        <section id="skills" className="block">
          <Heading index="02" label={copy.stack}>
            {copy.stackLead}
          </Heading>

          <div className="stack">
            {skillGroups.map((group) => (
              <div key={group.id} className="stack-group" style={{ ['--accent' as string]: group.accent }}>
                <p className="stack-label">{group.label}</p>
                <p className="stack-note">{group.note}</p>
                <ul className="chips">
                  {group.items.map((skill) => (
                    <li key={skill.name} title={skill.context}>
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── EXPERIENCE ───────────────────────────────────────── */}
        <section id="experience" className="block">
          <Heading index="03" label={copy.missionLog}>
            {copy.missionLead}
          </Heading>

          <ol className="log">
            {missions.map((mission) => (
              <li key={mission.id} className={`log-entry is-${mission.status}`}>
                <p className="log-status">[ {statusLabel[mission.status]} ]</p>
                <h3 className="log-title">{mission.title}</h3>
                {mission.org && <p className="log-org">{mission.org}</p>}
                <p className="log-body">{mission.body}</p>
                <ul className="log-points">
                  {mission.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        {/* ── PROCESS ──────────────────────────────────────────── */}
        <section id="process" className="block">
          <Heading index="04" label={copy.process}>
            {copy.processLead}
          </Heading>

          <ol className="process-list">
            {processSteps.map((step) => (
              <li key={step.n}>
                <span className="process-n">{step.n}</span>
                <span className="process-main">
                  <span className="process-title">{step.title}</span>
                  <span className="process-body">{step.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* ── LAB ──────────────────────────────────────────────── */}
        <section id="lab" className="block">
          <Heading index="05" label={copy.fieldNotes}>
            {copy.lab}
          </Heading>

          <p className="block-lead">{lab.body}</p>

          {articles.length === 0 ? (
            <p className="lab-status">{lab.status}</p>
          ) : (
            <>
              <ol className="notes">
                {articles.slice(0, 3).map((entry, i) => (
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

              <Link className="btn block-more" to={routes.blog}>
                {copy.viewAllNotes} →
              </Link>
            </>
          )}
        </section>

        {/* ── CONTACT ──────────────────────────────────────────── */}
        <section id="contact" className="block">
          <Heading index="06" label={copy.contact}>
            {contact.heading}
            <br />
            <span className="is-accent">{contact.sub}</span>
          </Heading>

          <p className="block-lead">{contact.body}</p>

          <ul className="uplink-links">
            {contact.links.map((link) => (
              <li key={link.id}>
                <a href={link.href} target="_blank" rel="noreferrer noopener">
                  <span className="uplink-k">{link.label}</span>
                  <span className="uplink-v">{link.value}</span>
                  <span className="uplink-go" aria-hidden>↗</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

function Heading({
  index,
  label,
  children,
}: {
  index: string
  label: string
  children: React.ReactNode
}) {
  return (
    <header className="block-head">
      <p className="block-eyebrow">
        <span className="block-eyebrow__idx">{index}</span>
        <span className="block-eyebrow__rule" aria-hidden />
        {label}
      </p>
      <h2 className="block-title">{children}</h2>
    </header>
  )
}
