# Ayden O'Connell — Portfolio

A fast, dark, single-page portfolio. Built with **React 18 + Vite**, **Tailwind
CSS v4**, **Framer Motion**, and **TypeScript**. Deployed on **Cloudflare Pages**.

> The site is itself a portfolio piece — every visible string lives in typed
> content files, so it's meant to be edited without touching component code.

---

## Local development

```bash
npm install      # install dependencies (first time only)
npm run dev      # start the dev server (hot reload) → http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build locally
npm run typecheck # type-check only, no build
```

Requires Node 18+.

---

## How to edit your site

**You almost never touch a component.** All content lives in `src/content/`.
Pick the file that matches what you want to change:

| I want to change… | Edit this file |
|-------------------|----------------|
| My name, tagline, hero context, About paragraphs, email, résumé link, social links | `src/content/site.ts` |
| A project (add / edit / remove / reorder / feature) | `src/content/projects.ts` |
| A job or co-op | `src/content/experience.ts` |
| Skill groups & tags | `src/content/skills.ts` |
| School, degree, grad date, coursework | `src/content/education.ts` |
| Section headings, eyebrows, nav labels, footer note | `src/content/copy.ts` |
| Colors, fonts, spacing, shadows, animation speed | `src/styles/tokens.css` (see `DESIGN.md`) |

### Add a project

Open `src/content/projects.ts` and append one object to the `projects` array:

```ts
{
  slug: 'my-thing',              // unique id
  title: 'My Thing',
  tagline: 'One recruiter-facing line.',
  description: '2–3 engineer-facing sentences about what it does.',
  highlights: ['Concrete bullet', 'Another concrete bullet'],
  stack: ['TypeScript', 'Whatever'],
  status: 'live',                // 'live' | 'in-progress' | 'archived'
  links: [{ label: 'Repo', url: 'https://github.com/...' }],
  featured: true,                // true = big card, false = compact grid
  accentIndex: 0,                // 0–2, picks the glow color
}
```

Save — that's the only edit needed. Featured projects render as large cards; the
rest fall into the compact "More work" grid.

### Change the whole color scheme

Edit the accent values in `src/styles/tokens.css` (keep each `--accent-N-rgb`
triplet in sync with its hex). Full details in [`DESIGN.md`](DESIGN.md).

---

## Before you deploy — fill in the `TODO(owner)` placeholders

A few values only you can supply are marked `// TODO(owner)` so they're easy to
find:

```bash
grep -rn "TODO(owner)" src/
```

Current list:

- **`src/content/site.ts`**
  - Contact **email** — confirm it's the address you want recruiters to use.
  - **Résumé** — drop a PDF into `public/` (e.g. `public/resume.pdf`) and point
    `resumeUrl` at it (`/resume.pdf`).
  - **GitHub** URL — currently the PopFeedMarketing org; swap for your personal
    profile if you'd rather.
  - **LinkedIn** URL — replace with your real profile URL.
- **`src/content/projects.ts`**
  - **PopFeed** live URL / repo link, plus optional demo/repo links for the
    **n8n RAG Agent** and **Agentic Trading System**.
- **`src/content/experience.ts`**
  - Confirm the **start month/year** for the FST Logistics co-op and for
    founding PopFeed.

Also add a résumé PDF and (optionally) an Open Graph share image in `public/`.

---

## Deploy to Cloudflare Pages

Connect the GitHub repo in the Cloudflare dashboard (Workers & Pages → Create →
Pages → Connect to Git) and use these settings:

| Setting | Value |
|---------|-------|
| Production branch | `main` |
| Framework preset | *None* (or Vite) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | 18 or newer |

Pushes to `main` trigger a build and deploy automatically. No SPA redirect rule
is needed — this is a single HTML page with anchor-scroll navigation.

### Deployment notes (baked in already)

- `node_modules/` and `dist/` are git-ignored.
- All import paths are lowercase, exact-case-matched (Cloudflare builds on
  case-sensitive Linux).
- `base: '/'` is set in `vite.config.ts`.
- No large inline base64 assets; the only image is a tiny inline SVG favicon.
- Fonts load from Google Fonts with `display=swap`.

---

## Project structure

```
src/
  content/          # ALL editable content + the type contract
    types.ts        #   shared interfaces (the contract — rarely changes)
    site.ts projects.ts experience.ts skills.ts education.ts copy.ts
  styles/
    tokens.css      # every design token (colors, fonts, motion, spacing)
  components/
    primitives/     # Button, Card, GlowContainer, Tag, SectionHeading, Section, motion
    sections/       # Nav, Hero, AmbientCanvas, Projects, Experience, Skills, About, Contact, Footer
  App.tsx           # section composition only
```

See [`DESIGN.md`](DESIGN.md) for the design system and how to re-theme.
