import type { Experience } from './types';

// ============================================================================
// EXPERIENCE — jobs & co-op, newest first. Impact-first bullets.
// ============================================================================

export const experience: Experience[] = [
  {
    company: 'FST Logistics',
    role: 'Information Systems Co-op',
    location: 'Columbus, OH',
    // TODO(owner): confirm your actual co-op start month/year.
    start: 'Jan 2026',
    end: 'Present',
    bullets: [
      'Automate operational workflows that previously ran manually, cutting repetitive hands-on steps out of daily operations.',
      'Write SQL against the company data warehouse to pull, join, and shape data for reporting and analysis.',
      'Build and maintain Power BI dashboards that surface operational metrics to the team.',
      'Work alongside the cybersecurity staff, learning how production systems are monitored and defended in practice.',
    ],
    stack: ['SQL', 'Power BI', 'Data Warehouse', 'Workflow Automation'],
  },
  {
    company: 'PopFeed',
    role: 'Founder',
    location: 'Remote',
    // TODO(owner): confirm the month/year you started PopFeed.
    start: '2024',
    end: 'Present',
    bullets: [
      'Founded and ship an AI social-media automation SaaS solo — product, infrastructure, and deployment.',
      'Run the whole stack on Cloudflare’s edge (Workers, R2, D1) with no origin server to maintain.',
    ],
    stack: ['Cloudflare', 'TypeScript', 'LLM APIs', 'Docker'],
  },
];
