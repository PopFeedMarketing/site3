import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, staggerChildren, revealOnce } from './motion';
import { cn } from './cn';

interface SectionHeadingProps {
  /** Monospace eyebrow, e.g. "02 · Projects" */
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  className,
}: SectionHeadingProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      variants={reduce ? undefined : staggerChildren}
      initial={reduce ? undefined : 'hidden'}
      whileInView={reduce ? undefined : 'visible'}
      viewport={revealOnce}
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && (
        <motion.span variants={reduce ? undefined : fadeUp} className="mono-label">
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        variants={reduce ? undefined : fadeUp}
        className="max-w-3xl text-[clamp(1.9rem,4.5vw,3rem)] font-semibold"
      >
        {title}
      </motion.h2>
      {intro && (
        <motion.p
          variants={reduce ? undefined : fadeUp}
          className={cn(
            'max-w-2xl text-[var(--text-secondary)] text-[1.02rem] leading-relaxed',
            align === 'center' && 'mx-auto',
          )}
        >
          {intro}
        </motion.p>
      )}
    </motion.div>
  );
}
