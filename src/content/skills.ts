import type { SkillGroup } from './types';

// ============================================================================
// SKILLS — grouped tags (not bars; bars are meaningless). Edit freely.
// ============================================================================

export const skills: SkillGroup[] = [
  {
    label: 'Languages',
    skills: ['Python', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    label: 'AI & Agents',
    skills: [
      'LLM APIs',
      'RAG',
      'MCP',
      'Agentic systems',
      'Prompt/schema design',
      'LLM-as-translator pattern',
    ],
  },
  {
    label: 'Cloud & Infra',
    skills: ['Cloudflare Workers', 'R2', 'D1', 'Docker', 'WSL2', 'Linux / Ubuntu'],
  },
  {
    label: 'Data & BI',
    skills: ['Power BI', 'Data warehousing', 'SQL analytics', 'ETL / workflows'],
  },
  {
    label: 'Web',
    skills: ['React', 'Vite', 'Django', 'Node.js', 'WebGL'],
  },
  {
    label: 'Tooling',
    skills: ['Docker', 'WSL2', 'n8n', 'Claude Code', 'Git', 'ffmpeg'],
  },
];
