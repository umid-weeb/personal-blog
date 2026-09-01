/**
 * The mission log.
 *
 * Status is a state of work, not a date — no periods are recorded here
 * because none were given, and inventing them would be a lie told in a
 * very confident font.
 */
export type MissionStatus = 'completed' | 'current' | 'ongoing'

export interface Mission {
  id: string
  status: MissionStatus
  title: string
  org?: string
  body: string
  points: string[]
}

export const statusLabel: Record<MissionStatus, string> = {
  completed: 'COMPLETED',
  current: 'CURRENT',
  ongoing: 'ONGOING',
}

export const missions: Mission[] = [
  {
    id: 'software-engineer',
    status: 'completed',
    title: 'Software Engineering',
    body: 'Building production websites, web applications, dashboards, APIs, booking systems, automation and business software.',
    points: [
      'Production platforms live on their own domains',
      'REST APIs and the data models underneath them',
      'Booking systems where availability has to be correct',
      'Deployment and maintenance on Linux infrastructure',
    ],
  },
  {
    id: 'pdpuniveristy',
    status: 'current',
    title: 'Academic Development',
    org: 'PDP University — Developer / Student',
    body: 'Working with educational platforms, student projects, technical architecture and software development.',
    points: [
      'Self platform development and maintenance',
      'Technical architecture, not only implementation',
      'Mentoring students that are struggling through real project work',
      'Guiding projects from an idea to something deployed',
    ],
  },
  {
    id: 'ai',
    status: 'ongoing',
    title: 'AI / Automation',
    body: 'Integrating language models and automated pipelines into products so recurring manual work stops being manual.',
    points: [
      'Telegram bots as internal tooling',
      'AI-backed steps inside real product flows',
      'Scheduled jobs, alerts and notification systems',
    ],
  },
]
