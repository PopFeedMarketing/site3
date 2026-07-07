import { motion, useReducedMotion } from 'framer-motion';
import { Section } from '../primitives/Section';
import { SectionHeading } from '../primitives/SectionHeading';
import { Tag } from '../primitives/Tag';
import { fadeUp, staggerChildren, revealOnce } from '../primitives/motion';
import { experience } from '../../content/experience';
import { copy } from '../../content/copy';
import type { Experience as ExperienceItem } from '../../content/types';

function TimelineItem({ item }: { item: ExperienceItem }) {
  const reduce = useReducedMotion();
  return (
    <motion.li variants={reduce ? undefined : fadeUp} className="relative pl-8 sm:pl-10">
      {/* node on the rail */}
      <span
        aria-hidden
        className="absolute left-0 top-1.5 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full border border-[var(--border-strong)] bg-[var(--bg-elev-2)]"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-1)] shadow-[0_0_10px_rgba(var(--accent-1-rgb),0.8)]" />
      </span>

      <div className="flex flex-col gap-3 pb-10">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-xl font-semibold">
            {item.role} <span className="text-[var(--text-muted)]">·</span>{' '}
            <span className="text-[var(--accent-1)]">{item.company}</span>
          </h3>
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">
            {item.start} — {item.end}
          </span>
        </div>
        <p className="font-mono text-xs text-[var(--text-muted)]">{item.location}</p>

        <ul className="flex flex-col gap-2">
          {item.bullets.map((b) => (
            <li key={b} className="flex gap-3 text-[var(--text-secondary)] leading-relaxed">
              <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[var(--text-muted)]" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 pt-1">
          {item.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      </div>
    </motion.li>
  );
}

export function Experience() {
  const reduce = useReducedMotion();
  return (
    <Section id="experience" className="bg-[var(--bg-elev-1)]/40">
      <SectionHeading eyebrow={copy.experience.eyebrow} title={copy.experience.title} />

      <motion.ul
        variants={reduce ? undefined : staggerChildren}
        initial={reduce ? undefined : 'hidden'}
        whileInView={reduce ? undefined : 'visible'}
        viewport={revealOnce}
        className="relative mt-12 border-l border-[var(--border-subtle)]"
      >
        {experience.map((item) => (
          <TimelineItem key={`${item.company}-${item.role}`} item={item} />
        ))}
      </motion.ul>
    </Section>
  );
}
