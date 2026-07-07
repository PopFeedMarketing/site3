import type { Project } from './types';

// ============================================================================
// PROJECTS — the portfolio core. To add a project, append one object here.
// Nothing else needs to change: components map over this array.
//   featured: true  → renders as a large card
//   featured: false → renders in the compact secondary grid
//   accentIndex     → 0..2, picks an accent from the token set
// ============================================================================

export const projects: Project[] = [
  {
    slug: 'popfeed',
    title: 'PopFeed',
    tagline: 'A live AI SaaS that runs a brand’s social presence on autopilot.',
    description:
      'PopFeed is an AI-powered social-media automation platform I founded and ship solo. It generates, edits, and schedules content end to end on Cloudflare’s edge, with the LLM confined to a strict translator role so its output is validated before it ever touches a real account.',
    highlights: [
      'Deployed on Cloudflare Workers with R2 for asset storage and D1 for relational state — no origin server to babysit.',
      'LLM image-editing pipeline that runs generated commands inside a sandboxed Docker executor, isolating untrusted output from the host.',
      'Strict “LLM-as-translator” contract: the model only emits structured, schema-validated instructions, never free-form actions.',
      'Automated content scheduling and delivery that keeps posting without a human in the loop.',
    ],
    stack: ['Cloudflare Workers', 'R2', 'D1', 'Docker', 'TypeScript', 'LLM APIs'],
    status: 'live',
    links: [
      // TODO(owner): add the live PopFeed URL and repo link if public.
      { label: 'Live', url: 'https://popfeed.app' },
    ],
    featured: true,
    accentIndex: 0,
  },
  {
    slug: 'n8n-rag-agent',
    title: 'n8n RAG Agent',
    tagline: 'A retrieval-augmented agent that answers from your own knowledge base.',
    description:
      'A production RAG agent built on n8n that ingests documents, embeds and retrieves relevant context, and grounds an LLM’s answers in that context. Designed to be operated and modified without redeploying code — the workflow is the program.',
    highlights: [
      'End-to-end retrieval pipeline: ingestion, chunking, embedding, vector retrieval, and grounded generation.',
      'Built as a visual n8n workflow so the logic is inspectable and editable without a code deploy.',
      'Context-grounded responses that cite from the underlying corpus instead of hallucinating.',
    ],
    stack: ['n8n', 'Vector DB', 'LLM APIs', 'Webhooks'],
    status: 'live',
    links: [
      // TODO(owner): add a demo video or repo/writeup link.
    ],
    featured: true,
    accentIndex: 1,
  },
  {
    slug: 'agentic-trading-system',
    title: 'Agentic Trading System',
    tagline: 'A defensively-engineered trading agent with hard safety rails.',
    description:
      'An autonomous trading agent built as an MCP client, engineered defense-first: the interesting problem isn’t the strategy, it’s making sure an autonomous system can’t hurt you. Hard caps and circuit breakers bound every action, and Discord webhooks stream what it’s doing in real time.',
    highlights: [
      'Implemented as an MCP client so tools and data sources are swappable behind a typed protocol.',
      'Hard position/exposure caps enforced in code — the agent physically cannot exceed its limits.',
      'Circuit breakers that halt trading automatically when guardrail conditions trip.',
      'Discord webhook hooks for real-time observability into every decision the agent makes.',
    ],
    stack: ['Python', 'MCP', 'LLM APIs', 'Discord Webhooks'],
    status: 'in-progress',
    links: [
      // TODO(owner): add repo or writeup link if you want to share it.
    ],
    featured: true,
    accentIndex: 2,
  },

  // --- Secondary work (compact grid) -------------------------------------
  {
    slug: 'powerbi-webgl-dashboards',
    title: 'WebGL Dashboard Backgrounds',
    tagline: 'Custom animated backgrounds for Power BI reporting.',
    description:
      'A set of WebGL-rendered animated backgrounds built to sit behind Power BI dashboards, giving operational reporting a polished, branded surface without hurting readability.',
    highlights: [
      'GPU-rendered visuals tuned to stay subtle behind dense data.',
      'Reusable across multiple report pages and datasets.',
    ],
    stack: ['WebGL', 'Power BI', 'JavaScript'],
    status: 'archived',
    links: [],
    featured: false,
    accentIndex: 1,
  },
  {
    slug: 'django-security-architecture',
    title: 'Django Security Architecture',
    tagline: 'A security-first Django application structure.',
    description:
      'A Django project built around a defensive security architecture — authentication, authorization boundaries, and hardened configuration treated as first-class design concerns rather than afterthoughts.',
    highlights: [
      'Layered authorization boundaries between application concerns.',
      'Hardened configuration and secure-by-default settings.',
    ],
    stack: ['Django', 'Python', 'PostgreSQL'],
    status: 'archived',
    links: [],
    featured: false,
    accentIndex: 2,
  },
  {
    slug: 'ffmpeg-video-generation',
    title: 'Automated Video Generation',
    tagline: 'Programmatic video assembly with Python + ffmpeg.',
    description:
      'A Python pipeline that assembles and renders video content programmatically with ffmpeg — turning structured inputs into finished clips without manual editing.',
    highlights: [
      'Scripted ffmpeg composition for repeatable, hands-off rendering.',
      'Structured inputs in, finished video out — no manual timeline work.',
    ],
    stack: ['Python', 'ffmpeg'],
    status: 'archived',
    links: [],
    featured: false,
    accentIndex: 0,
  },
];
