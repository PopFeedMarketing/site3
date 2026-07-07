import { motion, useReducedMotion } from 'framer-motion';
import { Section } from '../primitives/Section';
import { SectionHeading } from '../primitives/SectionHeading';
import { GlowContainer } from '../primitives/GlowContainer';
import { Tag } from '../primitives/Tag';
import { fadeUp, staggerChildren, revealOnce } from '../primitives/motion';
import { cn } from '../primitives/cn';
import { projects } from '../../content/projects';
import { copy } from '../../content/copy';
import type { Project } from '../../content/types';

const STATUS_LABEL: Record<Project['status'], string> = {
  live: 'Live',
  'in-progress': 'In progress',
  archived: 'Archived',
};

const STATUS_DOT: Record<Project['status'], string> = {
  live: 'bg-[var(--accent-1)]',
  'in-progress': 'bg-[var(--accent-2)]',
  archived: 'bg-[var(--text-muted)]',
};

function StatusBadge({ status }: { status: Project['status'] }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-[var(--text-muted)]">
      <span className={cn('h-1.5 w-1.5 rounded-full', STATUS_DOT[status])} />
      {STATUS_LABEL[status]}
    </span>
  );
}

function ProjectLinks({ links }: { links: Project['links'] }) {
  if (!links.length) return null;
  return (
    <div className="flex flex-wrap gap-2 pt-1">
      {links.map((l) => (
        <a
          key={l.url}
          href={l.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border border-[var(--border-strong)] px-3 py-1.5 text-sm text-[var(--text-secondary)] transition-colors duration-[var(--dur-fast)] hover:border-[rgba(var(--glow-rgb),0.45)] hover:text-[var(--text-primary)]"
        >
          {l.label}
          <span aria-hidden className="transition-transform duration-[var(--dur-fast)] group-hover/link:translate-x-0.5">
            ↗
          </span>
        </a>
      ))}
    </div>
  );
}

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion();
  // Alternate the emphasis column so featured cards don't feel like a stack.
  return (
    <motion.div variants={reduce ? undefined : fadeUp}>
      <GlowContainer accentIndex={project.accentIndex ?? 0} as="article" className="p-6 sm:p-9">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <span className="mono-label">{String(index + 1).padStart(2, '0')}</span>
              <StatusBadge status={project.status} />
            </div>
            <h3 className="text-[clamp(1.5rem,3.2vw,2.1rem)] font-semibold">{project.title}</h3>
            <p className="text-[1.05rem] text-[var(--text-primary)]">{project.tagline}</p>
            <p className="text-[var(--text-secondary)] leading-relaxed">{project.description}</p>
            <div className="mt-auto pt-2">
              <ProjectLinks links={project.links} />
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:border-l lg:border-[var(--border-subtle)] lg:pl-10">
            <div>
              <p className="mono-label mb-3">Highlights</p>
              <ul className="flex flex-col gap-2.5">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-[0.95rem] text-[var(--text-secondary)]">
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--glow)]"
                    />
                    <span className="leading-snug">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mono-label mb-3">Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </div>
          </div>
        </div>
      </GlowContainer>
    </motion.div>
  );
}

function SecondaryCard({ project }: { project: Project }) {
  const reduce = useReducedMotion();
  return (
    <motion.div variants={reduce ? undefined : fadeUp} className="h-full">
      <GlowContainer accentIndex={project.accentIndex ?? 0} as="article" className="flex h-full flex-col gap-3 p-6">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-lg font-semibold">{project.title}</h4>
          <StatusBadge status={project.status} />
        </div>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{project.tagline}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
        <ProjectLinks links={project.links} />
      </GlowContainer>
    </motion.div>
  );
}

export function Projects() {
  const reduce = useReducedMotion();
  const featured = projects.filter((p) => p.featured);
  const secondary = projects.filter((p) => !p.featured);

  return (
    <Section id="projects">
      <SectionHeading
        eyebrow={copy.projects.eyebrow}
        title={copy.projects.title}
        intro={copy.projects.intro}
      />

      <motion.div
        variants={reduce ? undefined : staggerChildren}
        initial={reduce ? undefined : 'hidden'}
        whileInView={reduce ? undefined : 'visible'}
        viewport={revealOnce}
        className="mt-12 flex flex-col gap-6"
      >
        {featured.map((p, i) => (
          <FeaturedCard key={p.slug} project={p} index={i} />
        ))}
      </motion.div>

      {secondary.length > 0 && (
        <>
          <p className="mono-label mt-16 mb-6">{copy.projects.moreLabel}</p>
          <motion.div
            variants={reduce ? undefined : staggerChildren}
            initial={reduce ? undefined : 'hidden'}
            whileInView={reduce ? undefined : 'visible'}
            viewport={revealOnce}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {secondary.map((p) => (
              <SecondaryCard key={p.slug} project={p} />
            ))}
          </motion.div>
        </>
      )}
    </Section>
  );
}
