import type { SiteContent } from './types';

// ============================================================================
// SITE-LEVEL CONTENT — name, positioning, meta, socials, about copy.
// Placeholders that only the owner can supply are marked `TODO(owner)`.
// ============================================================================

export const site: SiteContent = {
  name: "Ayden O'Connell",
  monogram: 'AO',
  role: 'Automation & AI systems',
  tagline: 'I build automation systems that run without me.',
  heroContext:
    "Information Systems @ UC '27 · Co-op at FST Logistics · Founder of PopFeed",

  about: [
    "I'm an Information Systems & Operations Management student at the University of Cincinnati, and I spend most of my time building agentic systems that do real work — RAG agents, an LLM image-editing pipeline behind a sandboxed executor, and trading agents with hard safety rails.",
    "On co-op at FST Logistics I automate operational workflows, write SQL against the data warehouse, and ship Power BI dashboards — working alongside the cybersecurity team and picking up how production infrastructure is actually defended.",
    "I run PopFeed, an AI social-media automation SaaS, on Cloudflare's edge. Most of what I know I learned by building it: deploying to Workers, wiring up R2 and D1, and treating the LLM as a translator with a strict contract rather than a black box I trust blindly.",
    "Off the keyboard I'm learning Python deeply from fundamentals up, running Ubuntu on everything I can, and fishing when the water's right.",
  ],

  // TODO(owner): confirm this is the address you want recruiters to reach.
  email: 'aoconnell2027@gmail.com',
  // TODO(owner): drop a resume PDF in /public and point this at it (e.g. '/Ayden-OConnell-Resume.pdf').
  resumeUrl: '/resumewebsite.pdf',

  socials: [
    {
      label: 'Email',
      // TODO(owner): keep in sync with `email` above.
      url: 'mailto:aoconnell2027@gmail.com',
      handle: 'aoconnell2027@gmail.com',
    },
    {
      label: 'GitHub',
      // TODO(owner): replace with your personal GitHub profile URL.
      url: 'https://github.com/aaydnn',
      handle: '@aaydnn',
    },
    {
      label: 'LinkedIn',
      // TODO(owner): replace with your LinkedIn profile URL.
      url: 'https://www.linkedin.com/in/ayden-oconnell',
      handle: 'in/ayden-oconnell',
    },
  ],

  meta: {
    title: "Ayden O'Connell — I build automation systems that run without me",
    description:
      "Ayden O'Connell — Information Systems student at the University of Cincinnati, founder of PopFeed, and builder of deployed agentic automation systems.",
  },

  ctas: {
    primary: { label: 'See projects', href: '#projects' },
    secondary: { label: 'Get in touch', href: '#contact' },
  },
};
