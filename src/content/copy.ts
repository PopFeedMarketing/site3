import type { UICopy } from './types';

// ============================================================================
// UI / EDITORIAL COPY — every section's eyebrow, heading, and intro line.
// Change wording here; components never hardcode display strings.
// ============================================================================

export const copy: UICopy = {
  nav: [
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],
  resumeLabel: 'Résumé',
  projects: {
    eyebrow: '01 · Selected work',
    title: "Systems I've shipped",
    intro:
      'Deployed, guarded, and running — not slideware. Each of these solves a real problem end to end.',
    moreLabel: 'More work',
  },
  experience: {
    eyebrow: '02 · Experience',
    title: "Where I've done the work",
  },
  skills: {
    eyebrow: '03 · Toolkit',
    title: 'What I build with',
    educationLabel: 'Education',
  },
  about: {
    eyebrow: '04 · About',
    title: 'A bit about me',
  },
  contact: {
    eyebrow: '05 · Contact',
    title: "Let's build something that runs itself.",
    intro:
      "I'm looking for AI, automation, and infosec-adjacent internships and co-ops. If that's you, the fastest way to reach me is email.",
  },
  footerNote: 'Built with React + Vite · deployed on Cloudflare Pages',
};
