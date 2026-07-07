import { motion, useReducedMotion } from 'framer-motion';
import { Section } from '../primitives/Section';
import { SectionHeading } from '../primitives/SectionHeading';
import { fadeUp, staggerChildren, revealOnce } from '../primitives/motion';
import { site } from '../../content/site';
import { copy } from '../../content/copy';

export function About() {
  const reduce = useReducedMotion();
  return (
    <Section id="about" className="bg-[var(--bg-elev-1)]/40">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading eyebrow={copy.about.eyebrow} title={copy.about.title} />

        <motion.div
          variants={reduce ? undefined : staggerChildren}
          initial={reduce ? undefined : 'hidden'}
          whileInView={reduce ? undefined : 'visible'}
          viewport={revealOnce}
          className="flex flex-col gap-5"
        >
          {site.about.map((para) => (
            <motion.p
              key={para.slice(0, 24)}
              variants={reduce ? undefined : fadeUp}
              className="text-[1.05rem] leading-relaxed text-[var(--text-secondary)]"
            >
              {para}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
