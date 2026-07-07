import { lazy, Suspense } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '../primitives/Button';
import { fadeUp, staggerChildren } from '../primitives/motion';
import { site } from '../../content/site';

// Lazy-load the canvas so the hero text paints immediately; the visual is
// pure enhancement and never blocks first contentful paint.
const AmbientCanvas = lazy(() => import('./AmbientCanvas'));

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] w-full items-center overflow-hidden"
      style={{ paddingBlock: 'var(--section-py)' }}
    >
      {/* Signature ambient visual — absent without JS, frozen under reduced-motion */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Suspense fallback={null}>
          <AmbientCanvas />
        </Suspense>
        {/* Fade the network into the page so text stays legible (WCAG AA) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(8,11,15,0.35)] via-[rgba(8,11,15,0.55)] to-[var(--bg-base)]" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_20%_30%,transparent,rgba(8,11,15,0.7))]" />
      </div>

      <motion.div
        variants={reduce ? undefined : staggerChildren}
        initial={reduce ? undefined : 'hidden'}
        animate={reduce ? undefined : 'visible'}
        className="relative mx-auto w-full"
        style={{ maxWidth: 'var(--content-max)', paddingInline: 'var(--gutter)' }}
      >
        <motion.p variants={reduce ? undefined : fadeUp} className="mono-label mb-6">
          {site.role}
        </motion.p>

        <motion.h1
          variants={reduce ? undefined : fadeUp}
          className="max-w-[16ch] text-[clamp(2.6rem,8vw,5.5rem)] font-bold leading-[0.98] tracking-[-0.03em]"
        >
          {site.name}
        </motion.h1>

        <motion.p
          variants={reduce ? undefined : fadeUp}
          className="mt-6 max-w-[24ch] bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] bg-clip-text text-[clamp(1.4rem,3.6vw,2.4rem)] font-display font-semibold leading-[1.1] tracking-[-0.02em] text-transparent"
        >
          {site.tagline}
        </motion.p>

        <motion.p
          variants={reduce ? undefined : fadeUp}
          className="mt-6 max-w-2xl text-[clamp(1rem,2.2vw,1.15rem)] text-[var(--text-secondary)]"
        >
          {site.heroContext}
        </motion.p>

        <motion.div
          variants={reduce ? undefined : fadeUp}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Button as="a" href={site.ctas.primary.href} variant="primary" size="lg">
            {site.ctas.primary.label}
            <span aria-hidden>→</span>
          </Button>
          <Button as="a" href={site.ctas.secondary.href} variant="ghost" size="lg">
            {site.ctas.secondary.label}
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        initial={reduce ? undefined : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[var(--text-muted)] sm:flex"
      >
        <span className="mono-label">scroll</span>
        <span className="h-8 w-px bg-gradient-to-b from-[var(--text-muted)] to-transparent" />
      </motion.div>
    </section>
  );
}
