import { motion, useReducedMotion } from 'framer-motion';
import { Section } from '../primitives/Section';
import { fadeUp, staggerChildren, revealOnce } from '../primitives/motion';
import { site } from '../../content/site';
import { copy } from '../../content/copy';

export function Contact() {
  const reduce = useReducedMotion();
  return (
    <Section id="contact">
      <motion.div
        variants={reduce ? undefined : staggerChildren}
        initial={reduce ? undefined : 'hidden'}
        whileInView={reduce ? undefined : 'visible'}
        viewport={revealOnce}
        className="flex flex-col items-center text-center"
      >
        <motion.span variants={reduce ? undefined : fadeUp} className="mono-label mb-5">
          {copy.contact.eyebrow}
        </motion.span>
        <motion.h2
          variants={reduce ? undefined : fadeUp}
          className="max-w-3xl text-[clamp(2rem,5.5vw,3.4rem)] font-semibold"
        >
          {copy.contact.title}
        </motion.h2>
        <motion.p
          variants={reduce ? undefined : fadeUp}
          className="mt-5 max-w-xl text-[var(--text-secondary)] text-[1.05rem]"
        >
          {copy.contact.intro}
        </motion.p>

        <motion.div
          variants={reduce ? undefined : fadeUp}
          className="mt-10 grid w-full max-w-2xl gap-3 sm:grid-cols-3"
        >
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              {...(s.url.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group flex min-w-0 flex-col items-center gap-1 rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--bg-elev-1)] px-5 py-5 transition-[transform,border-color,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-standard)] hover:-translate-y-0.5 hover:border-[rgba(var(--accent-1-rgb),0.4)] hover:shadow-[0_0_40px_-14px_rgba(var(--accent-1-rgb),0.5)]"
            >
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                {s.label}
              </span>
              <span className="max-w-full break-words text-center text-[0.95rem] text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-1)]">
                {s.handle ?? s.label}
              </span>
            </a>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  );
}
