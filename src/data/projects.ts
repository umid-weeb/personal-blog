/**
 * The seven exhibits in the PROJECTS bay.
 *
 * Data only — nothing here knows it will be rendered as a hologram. The
 * monolith in the world, the panel that opens over it and the accessible
 * fallback list all read from this one array.
 */
export interface Project {
  id: string
  /** Two-digit exhibit number, shown in-world and in the panel. */
  index: string
  name: string
  category: string
  /** Reads on its own, without the image. */
  description: string
  technologies: string[]
  /** Under /public/projects — replace the file, nothing else changes. */
  image: string
  /** Present ⇒ the panel renders VIEW LIVE PROJECT. */
  url?: string
  domain?: string
  /** Drives the hologram's light and the panel's accent. */
  accent: string
}

export const projects: Project[] = [
  {
    id: 'dacha',
    index: '01',
    name: 'Dacha',
    category: 'Booking Platform',
    description:
      'A digital platform for discovering and booking dachas and cottages. Users can explore properties, view details, check availability and make bookings.',
    technologies: ['Vue.js', 'Node.js', 'Express.js', 'MongoDB', 'PWA'],
    image: '/projects/turon.png',
    accent: '#6ee7a8',
  },
  {
    id: 'oil',
    index: '02',
    name: 'Oil',
    category: 'Management & Automation',
    description:
      'A management and notification system designed to track oil-related operations and automatically handle important reminders and notifications.',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'Telegram Bot API'],
    image: '/projects/turon.png',
    accent: '#f0b429',
  },
  {
    id: 'swisswatchpremium',
    index: '03',
    name: 'Swiss Watch Premium',
    category: 'Luxury E-Commerce',
    description:
      'A premium e-commerce experience for luxury watches, designed around high-end visual presentation, product discovery and a refined shopping experience.',
    technologies: ['Vue.js', 'Node.js', 'Express.js', 'MongoDB'],
    image: '/projects/turon.png',
    url: 'https://swisswatchpremium.uz',
    domain: 'swisswatchpremium.uz',
    accent: '#c8a86b',
  },
  {
    id: 'algoritmedu',
    index: '04',
    name: 'Algoritm Education',
    category: 'Education Platform',
    description:
      'A digital platform for an education center, supporting modern educational experiences, content and student-focused digital services.',
    technologies: ['Vue.js', 'Node.js', 'MongoDB'],
    image: '/projects/turon.png',
    url: 'https://algoritmedu.uz',
    domain: 'algoritmedu.uz',
    accent: '#4f9dff',
  },
  {
    id: 'oxfordedu',
    index: '05',
    name: 'Oxford Education',
    category: 'Education Platform',
    description:
      'A modern educational web platform created to provide a clean digital experience for students and educational services.',
    technologies: ['Vue.js', 'Node.js', 'MongoDB'],
    image: '/projects/turon.png',
    url: 'https://oxfordedu.uz',
    domain: 'oxfordedu.uz',
    accent: '#a78bfa',
  },
  {
    id: 'alharameen',
    index: '06',
    name: 'Al-Harameen',
    category: 'Education / Digital Platform',
    description:
      'A modern educational platform built to provide users with an accessible and structured digital experience.',
    technologies: ['Vue.js', 'Node.js', 'MongoDB'],
    image: '/projects/turon.png',
    url: 'https://alharameen.uz',
    domain: 'alharameen.uz',
    accent: '#34d3c0',
  },
  {
    id: 'spring',
    index: '07',
    name: 'Spring',
    category: 'Web Project',
    description:
      'A modern web experience developed for SDS Max, focused on presenting the Spring project through a clean and professional digital interface.',
    technologies: ['Vue.js', 'Node.js'],
    image: '/projects/turon.png',
    accent: '#ff7a59',
  },
]

export function getProject(id: string) {
  return projects.find((p) => p.id === id)
}
