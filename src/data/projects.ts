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
    id: 'turon',
    index: '01',
    name: 'Turon Kafesi',
    category: 'Food Delivery / Telegram Mini App',
    description:
      'A digital ordering and food delivery platform built for Turon Kafesi. The platform brings the cafe menu, food ordering and delivery experience into a simple and accessible digital interface. Customers can browse available meals, fast food, pizza, drinks and desserts, select products, build an order and request delivery without relying on manual phone-based ordering. The system is designed around a Telegram Mini App experience, making the ordering process fast and familiar for local customers while providing a foundation for future order management, delivery tracking and business automation.',
    technologies: [
      'Telegram Mini Apps',
      'Telegram Bot API',
      'Node.js',
      'JavaScript',
      'Web App',
    ],
    image: '/projects/turon.png',
    accent: '#ef2b2d',
  },

  {
    id: 'pyzone',
    index: '02',
    name: 'Pyzone.uz',
    category: 'Online Compiler / Developer Platform',
    description:
      'A professional online code editor and compiler designed for developers and programming learners. Pyzone.uz allows users to write, execute and test code directly from the browser without installing additional development software. The platform supports multiple programming languages including Python, JavaScript, C++, Java and Go, providing an accessible environment for experimenting with code and seeing execution results instantly. The project focuses on making development and programming practice available from any modern device through a fast, browser-based coding experience.',
    technologies: [
      'Vue.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Online Code Execution',
      'WebSocket',
    ],
    image: '/projects/pyzone.png',
    url: 'https://pyzone.uz',
    domain: 'pyzone.uz',
    accent: '#39e75f',
  },

  {
    id: 'pyzone-zone',
    index: '03',
    name: 'Pyzone Zone',
    category: 'Algorithmic Problem Solving Platform',
    description:
      'An algorithmic problem-solving platform developed as part of the Pyzone ecosystem. Pyzone Zone provides a structured environment where programmers can solve algorithmic and programming problems, submit their solutions and evaluate their results through an online judge system. The platform is focused on developing problem-solving skills, algorithmic thinking and practical programming ability through challenges with different levels of difficulty. It provides the foundation for features such as problem categories, solution evaluation, user progress, ratings, contests and competitive programming workflows.',
    technologies: [
      'Vue.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Online Judge',
      'Code Execution',
    ],
    image: '/projects/pyzone-zone.png',
    url: 'https://pyzone.uz/zone',
    domain: 'pyzone.uz/zone',
    accent: '#39e75f',
  },
]

export function getProject(id: string) {
  return projects.find((p) => p.id === id)
}
