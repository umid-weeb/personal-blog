import { useState } from 'react'
import { about, contact } from '@/data/site'
import { projects } from '@/data/projects'
import { skillGroups } from '@/data/skills'
import { missions, statusLabel } from '@/data/experience'
import { processSteps } from '@/data/process'
import { getZone, type ZoneId } from '@/data/zones'
import { useWorld } from '@/state/WorldContext'
import { Panel } from './Panel'
import { LabPanel } from './lab/LabPanel'
import { useLanguage } from '@/state/LanguageContext'

/** Routes the open zone to its content. */
export function ZonePanel() {
  const { t } = useLanguage()
  const { openZone, closePanel } = useWorld()
  if (!openZone) return null

  const zone = getZone(openZone)
  const content: Record<ZoneId, () => React.ReactNode> = {
    about: AboutBody,
    projects: ProjectsBody,
    skills: SkillsBody,
    experience: ExperienceBody,
    process: ProcessBody,
    lab: LabBody,
    contact: ContactBody,
  }
  const Body = content[openZone]

  return (
    <Panel
      eyebrow={t(`zone:${zone.id}:caption`, zone.caption)}
      title={t(`zone:${zone.id}:label`, zone.label)}
      accent={zone.accent}
      onClose={closePanel}
      wide={openZone === 'projects' || openZone === 'skills' || openZone === 'lab'}
    >
      <Body />
    </Panel>
  )
}

/* ─── ABOUT ───────────────────────────────────────────────────── */

function AboutBody() {
  const { t } = useLanguage()
  return (
    <div className="about">
      <p className="about-name">{about.heading}</p>
      <p className="about-role">{about.role}</p>

      <p className="about-statement">{t('about:statement', about.statement)}</p>
      <p className="about-body">{t('about:body', about.body)}</p>

      <ul className="about-disciplines">
        {about.disciplines.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>

      <div className="about-closing">
        {about.closing.map((line, i) => (
          <p key={line} className={i === 1 ? 'is-strong' : undefined}>
            {t(`about:closing${i}`, line)}
          </p>
        ))}
      </div>
    </div>
  )
}

/* ─── PROJECTS ────────────────────────────────────────────────── */

/** The bay directory — every exhibit, openable without walking to it. */
function ProjectsBody() {
  const { copy, t } = useLanguage()
  const { showProject } = useWorld()

  return (
    <div className="bay">
      <p className="panel-lead">
        {copy.selectedWorkLead}
      </p>

      <ul className="bay-list">
        {projects.map((project) => (
          <li key={project.id} style={{ ['--accent' as string]: project.accent }}>
            <button type="button" className="bay-item" onClick={() => showProject(project.id)}>
              <span className="bay-index">{project.index}</span>
              <span className="bay-main">
                <span className="bay-name">{project.name}</span>
                <span className="bay-category">{t(`project:${project.id}:category`, project.category)}</span>
              </span>
              <span className="bay-go" aria-hidden>{copy.open} →</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ─── SKILLS ──────────────────────────────────────────────────── */

function SkillsBody() {
  const { copy } = useLanguage()
  const [selected, setSelected] = useState(skillGroups[0].id)
  const group = skillGroups.find((g) => g.id === selected) ?? skillGroups[0]
  const [focus, setFocus] = useState<string | null>(null)
  const detail = group.items.find((s) => s.name === focus)

  return (
    <div className="skills">
      <div className="skills-tabs" role="tablist" aria-label={copy.stack}>
        {skillGroups.map((g) => (
          <button
            key={g.id}
            type="button"
            role="tab"
            aria-selected={g.id === selected}
            className={`skills-tab${g.id === selected ? ' is-active' : ''}`}
            style={{ ['--accent' as string]: g.accent }}
            onClick={() => {
              setSelected(g.id)
              setFocus(null)
            }}
          >
            {g.label}
            <span>{g.items.length}</span>
          </button>
        ))}
      </div>

      <p className="skills-note">{group.note}</p>

      <ul className="skills-grid" style={{ ['--accent' as string]: group.accent }}>
        {group.items.map((skill) => (
          <li key={skill.name}>
            <button
              type="button"
              className={`skills-node${focus === skill.name ? ' is-active' : ''}`}
              onClick={() => setFocus((v) => (v === skill.name ? null : skill.name))}
              onPointerEnter={() => setFocus(skill.name)}
            >
              {skill.name}
            </button>
          </li>
        ))}
      </ul>

      <p className="skills-detail" aria-live="polite">
        {detail ? detail.context : copy.selectTechnology}
      </p>
    </div>
  )
}

/* ─── EXPERIENCE ──────────────────────────────────────────────── */

function ExperienceBody() {
  return (
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
  )
}

/* ─── PROCESS ─────────────────────────────────────────────────── */

function ProcessBody() {
  const { copy } = useLanguage()
  return (
    <div className="process">
      <p className="panel-lead">{copy.processLead}</p>
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
    </div>
  )
}

/* ─── LAB ─────────────────────────────────────────────────────── */

function LabBody() {
  return <LabPanel />
}

/* ─── CONTACT ─────────────────────────────────────────────────── */

function ContactBody() {
  return (
    <div className="uplink">
      <p className="uplink-heading">{contact.heading}</p>
      <p className="uplink-sub">{contact.sub}</p>
      <p className="uplink-body">{contact.body}</p>

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
    </div>
  )
}
