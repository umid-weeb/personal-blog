/** Identity and copy. No component hard-codes a word of this. */

export const site = {
  name: 'IBROXIMJON',
  person: 'Ibroximjon Isroilov',
  role: 'Software Engineer',
  domain: 'ibroximjon.uz',
  origin: 'https://ibroximjon.uz',
  title: 'Ibroximjon — Software Engineer',
  description:
    'Ibroximjon Isroilov is a software engineer and AI/Ml engineer, systems, APIs, automation and interactive experiences. Explore the work as a 3D space station.',
} as const

export const about = {
  heading: 'IBROXIMJON',
  role: 'Software Engineer',
  statement:
    'I build digital products, web applications, systems and interactive experiences.',
  body: 'I work across frontend, backend, databases, APIs, infrastructure, automation and AI integrations.',
  closing: ["I don't just write code.", 'I build complete products.'],
  disciplines: [
    'Frontend',
    'Backend',
    'Databases',
    'APIs',
    'Infrastructure',
    'Automation',
    'AI Integration',
  ],
} as const

export const contact = {
  heading: 'Have an idea?',
  sub: "Let's build it.",
  body: 'Open for product work, client projects and long-running collaborations.',
  /* Only links that already existed in this repository. Nothing invented. */
  links: [
    { id: 'telegram', label: 'TELEGRAM', value: '@ibroximjon', href: 'https://t.me/ibroximjon' },
    {
      id: 'github',
      label: 'GITHUB',
      value: 'github.com/umid-weeb',
      href: 'https://github.com/umid-weeb',
    },
    { id: 'web', label: 'WEB', value: 'ibroximjon.uz', href: 'https://ibroximjon.uz' },
  ],
} as const

export const lab = {
  title: 'LAB',
  /* Rendered on the module in the world. */
  caption: 'FIELD NOTES',
  /* Shown only when no articles are filed. */
  status: 'COMING SOON',
  body: 'Write-ups on the systems behind these projects — the decisions, the constraints, and the parts that only show up in production.',
} as const
