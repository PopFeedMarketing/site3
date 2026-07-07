import { motion, useReducedMotion } from 'framer-motion';
import { Section } from '../primitives/Section';
import { SectionHeading } from '../primitives/SectionHeading';
import { Tag } from '../primitives/Tag';
import { fadeUp, staggerChildren, revealOnce } from '../primitives/motion';
import { skills } from '../../content/skills';
import { education } from '../../content/education';
import { copy } from '../../content/copy';

export function Skills() {
  const reduce = useReducedMotion();
  return (
    <Section id="skills">
      <SectionHeading eyebrow={copy.skills.eyebrow} title={copy.skills.title} />

      <motion.div
        variants={reduce ? undefined : staggerChildren}
        initial={reduce ? undefined : 'hidden'}
        whileInView={reduce ? undefined : 'visible'}
        viewport={revealOnce}
        className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {skills.map((group) => (
          <motion.div key={group.label} variants={reduce ? undefined : fadeUp} className="flex flex-col gap-4">
            <h3 className="mono-label">{group.label}</h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Education — kept lightweight, riding alongside skills */}
      <motion.div
        variants={reduce ? undefined : fadeUp}
        initial={reduce ? undefined : 'hidden'}
        whileInView={reduce ? undefined : 'visible'}
        viewport={revealOnce}
        className="mt-16 flex flex-col gap-4 border-t border-[var(--border-subtle)] pt-10"
      >
        <h3 className="mono-label">{copy.skills.educationLabel}</h3>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <p className="text-lg font-semibold">{education.school}</p>
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">
            {education.gradDate}
          </span>
        </div>
        <p className="text-[var(--text-secondary)]">{education.degree}</p>
        <p className="font-mono text-xs text-[var(--text-muted)]">{education.location}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {education.coursework.map((c) => (
            <Tag key={c}>{c}</Tag>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
