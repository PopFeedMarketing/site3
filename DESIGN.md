# Design System

The visual identity in one page. If you want to re-theme the whole site, you
almost always only touch **one file**: `src/styles/tokens.css`.

## Temperature & intent

Deep **petrol / cool-graphite near-black** — deliberately *not* PopFeed's
indigo+violet, *not* a single acid-green, *not* warm-cream/terracotta. The
signature accent is a **teal** ("petrol glow"). The whole surface stays quiet;
boldness is spent in exactly one place — the hero's ambient network canvas.

## Tokens — the single source of truth

Every color, font, radius, shadow, and duration is a CSS custom property in
[`src/styles/tokens.css`](src/styles/tokens.css). Components never hardcode a
hex value; they read `var(--…)`. Change a value there and it propagates
everywhere.

| Group | Variables |
|-------|-----------|
| Surfaces | `--bg-base`, `--bg-elev-1..3` (one base + 3 elevation steps) |
| Text | `--text-primary`, `--text-secondary`, `--text-muted` |
| Accents | `--accent-1` (signature teal), `--accent-2`, `--accent-3` + matching `--accent-N-rgb` channels for alpha glows |
| Borders | `--border-subtle`, `--border-strong` |
| Radii | `--radius-sm/md/lg/pill` |
| Shadows | `--shadow-card`, `--shadow-lift`, `--glow-accent` |
| Motion | `--dur-fast/base/slow` (150/240/350ms), `--ease-standard` |
| Type | `--font-display`, `--font-body`, `--font-mono` |
| Layout | `--content-max`, `--section-py`, `--gutter` |

### Re-theme in one place

- **New palette:** edit `--bg-base`, the three `--accent-*` values, and their
  `--accent-*-rgb` channels. Keep the `-rgb` triplets in sync with the hex — the
  glows and focus rings composite from them.
- **New fonts:** change `--font-display/body/mono` in tokens, then update the
  Google Fonts `<link>` in `index.html`. Display face is Bricolage Grotesque,
  body is Instrument Sans, mono is JetBrains Mono.

## Typography

- **Display** (headings): *Bricolage Grotesque* — characterful, not Inter/Space
  Grotesque (those are PopFeed's).
- **Body**: *Instrument Sans* — clean, neutral, readable.
- **Mono**: *JetBrains Mono* — used for eyebrows, stack tags, and data-flavored
  labels (`.mono-label` utility in `src/index.css`).

All fonts load with `display=swap`; the system-font fallback stack is close in
metrics so there's no jarring reflow.

## Gloss = depth discipline

One consistent card treatment, implemented once in
[`GlowContainer`](src/components/primitives/GlowContainer.tsx):

- 1px low-alpha border
- soft elevation shadow
- a faint accent glow **only on hover/focus** (never a permanent glow)
- a thin top hairline sheen that fades in on hover — the quiet "glossy" cue

Each card picks its accent via `accentIndex` (0–2), so the glow color varies
without any per-card CSS.

## Motion system

Named Framer Motion variants live in
[`primitives/motion.ts`](src/components/primitives/motion.ts): `fadeUp`,
`staggerChildren`, `hoverLift`, plus a shared `revealOnce` viewport config
(sections reveal once on scroll, never re-trigger). One easing curve site-wide
(`--ease-standard`), durations 150–350ms.

**Reduced motion:** every animated component checks `useReducedMotion()`. When a
visitor prefers reduced motion, initial/animate props are dropped so all content
renders immediately with no movement, and the hero canvas paints a single frozen
frame instead of animating.

## The signature: ambient network canvas

[`AmbientCanvas`](src/components/sections/AmbientCanvas.tsx) draws a loose lattice
of nodes with pulses gliding along the edges — "systems that run autonomously."

- **Lazy-loaded** (`React.lazy`) so it never blocks first paint.
- **Cost-controlled:** capped device-pixel-ratio, capped node count, and it
  *pauses* when scrolled off-screen (IntersectionObserver) or when the tab is
  hidden.
- **Reduced-motion:** stops animating, paints one static frame.
- **No JS:** absent entirely; the CSS gradient backdrop keeps the hero intact.

## Quality floor (unannounced)

Responsive from 360px up, visible keyboard focus rings (`:focus-visible`),
semantic landmarks (`<header>`, `<main>`, `<footer>`, `<nav aria-label>`), a
skip-to-content link, and WCAG-AA text contrast on the dark surfaces.
