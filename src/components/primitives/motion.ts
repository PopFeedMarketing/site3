import type { Variants } from 'framer-motion';

// ============================================================================
// MOTION SYSTEM — defined once, imported everywhere. Durations 150–350ms,
// one easing curve site-wide. Every consumer must pair these with a
// reduced-motion fallback (see `useReducedMotion` in framer-motion).
// ============================================================================

// Matches --ease-standard in tokens.css (cubic-bezier control points)
export const easeStandard = [0.22, 1, 0.36, 1] as const;

export const durations = {
  fast: 0.15,
  base: 0.24,
  slow: 0.35,
} as const;

/** Fade + rise. The default reveal for headings, paragraphs, cards. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.slow, ease: easeStandard },
  },
};

/** Parent that reveals children in sequence. Pair with `fadeUp` on children. */
export const staggerChildren: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

/** Hover/tap lift for interactive cards & buttons. */
export const hoverLift = {
  rest: { y: 0 },
  hover: { y: -4, transition: { duration: durations.base, ease: easeStandard } },
  tap: { y: -1, transition: { duration: durations.fast, ease: easeStandard } },
} satisfies Variants;

/** Shared viewport config: reveal once, a touch before fully in view. */
export const revealOnce = {
  once: true,
  amount: 0.25,
  margin: '0px 0px -10% 0px',
} as const;
