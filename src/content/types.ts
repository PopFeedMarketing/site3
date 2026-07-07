// ============================================================================
// THE CONTRACT — frozen in Phase 1. All shared interfaces live here.
// Components are pure renderers that consume these types. Do not mutate this
// file to resolve a component conflict; fix the component instead.
// ============================================================================

export interface Project {
  slug: string;
  title: string;
  tagline: string; // one line, recruiter-facing
  description: string; // 2–3 sentences, engineer-facing
  highlights: string[]; // 2–4 concrete technical bullets
  stack: string[];
  status: 'live' | 'in-progress' | 'archived';
  links: { label: string; url: string }[]; // demo, repo, writeup
  featured: boolean; // featured projects render large
  accentIndex?: number; // picks from a token-defined accent set
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  start: string; // "Jan 2026"
  end: string | 'Present';
  bullets: string[]; // impact-first, metric where honest
  stack: string[];
}

export interface SkillGroup {
  label: string; // e.g. "Languages", "Cloud & Infra", "Data & BI", "AI/Agents"
  skills: string[];
}

// ---------------------------------------------------------------------------
// Supporting content shapes (site-level metadata & education). These support
// the sections in §5 without expanding the three core schemas above.
// ---------------------------------------------------------------------------

export interface SocialLink {
  label: string; // "GitHub", "LinkedIn", "Email"
  url: string;
  handle?: string; // display value, e.g. "@aydenoc"
}

export interface SiteContent {
  name: string;
  monogram: string; // nav mark, e.g. "AO"
  tagline: string; // the positioning line
  heroContext: string; // one sentence: UC '27 · co-op at FST · founder of PopFeed
  role: string; // short descriptor under the name
  about: string[]; // paragraphs for the About section
  email: string;
  resumeUrl: string;
  socials: SocialLink[];
  meta: {
    title: string;
    description: string;
  };
  ctas: {
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
}

export interface Education {
  school: string;
  degree: string;
  location: string;
  gradDate: string; // "May 2027"
  coursework: string[];
}

// ---------------------------------------------------------------------------
// Editorial section copy (eyebrows, titles, intros). Kept out of components so
// every visible string on the site is owner-editable from src/content/.
// ---------------------------------------------------------------------------

export interface SectionCopy {
  eyebrow: string;
  title: string;
  intro?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface UICopy {
  nav: NavLink[];
  resumeLabel: string;
  projects: SectionCopy & { moreLabel: string };
  experience: SectionCopy;
  skills: SectionCopy & { educationLabel: string };
  about: SectionCopy;
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  footerNote: string;
}
