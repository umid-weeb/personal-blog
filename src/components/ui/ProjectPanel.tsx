import { getProject } from '@/data/projects'
import { useWorld } from '@/state/WorldContext'
import { Panel } from './Panel'
import { useLanguage } from '@/state/LanguageContext'

/**
 * One exhibit, opened.
 *
 * The image is the point of this panel, so it is loaded eagerly and given
 * the space — the copy sits under it rather than beside it, because a
 * screenshot squeezed into a column is worse than no screenshot at all.
 */
export function ProjectPanel() {
  const { copy, t } = useLanguage()
  const { openProject, closeProject } = useWorld()
  if (!openProject) return null

  const project = getProject(openProject)
  if (!project) return null

  return (
    <Panel
      eyebrow={`${copy.open} ${project.index}`}
      title={project.name}
      accent={project.accent}
      onClose={closeProject}
      wide
    >
      <div className="exhibit">
        <p className="exhibit-category">{t(`project:${project.id}:category`, project.category)}</p>

        <figure className="exhibit-figure">
          <img
            src={project.image}
            alt={`${project.name} — ${t(`project:${project.id}:category`, project.category)}`}
            width={1760}
            height={1100}
            decoding="async"
          />
          <span className="exhibit-figure__scan" aria-hidden />
        </figure>

        <p className="exhibit-description">{t(`project:${project.id}:description`, project.description)}</p>

        <div className="exhibit-meta">
          <div>
            <p className="exhibit-label">{copy.stackLabel}</p>
            <ul className="exhibit-stack">
              {project.technologies.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </div>

          {project.domain && (
            <div>
              <p className="exhibit-label">{copy.liveAt}</p>
              <p className="exhibit-domain">{project.domain}</p>
            </div>
          )}
        </div>

        <div className="exhibit-actions">
          {project.url ? (
            <a
              className="btn btn--primary"
              href={project.url}
              target="_blank"
              rel="noreferrer noopener"
            >
              {copy.viewLiveProject}
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                <path d="M1 11L11 1M4 1h7v7" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </a>
          ) : (
            <p className="exhibit-private">{copy.noPublicDeployment}</p>
          )}

          <button type="button" className="btn" onClick={closeProject}>
            {copy.returnToBay}
          </button>
        </div>
      </div>
    </Panel>
  )
}
