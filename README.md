# hrbohra.dev — portfolio

[![ci](https://github.com/hrbohra/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/hrbohra/portfolio/actions/workflows/ci.yml)

Live: **https://hrbohra.vercel.app**

A portfolio built as evidence rather than assertion. Every page is written twice: a plain
version for recruiters and founders, an engineer version with the mechanisms named. The
toggle (top right on the site) switches every page between them; `?mode=eng` on any URL
shares a link that opens in engineer mode.

## Why this repo is public

The site's claims are about engineering discipline, so the repo practises what the pages
preach:

- **Architecture Decision Records** in [`docs/adr/`](docs/adr/) record the real decisions
  with the rejected alternatives, including one honest deviation from the original plan.
- **Editorial rules are executable.** The style guide's rules (banned punctuation, banned
  vocabulary, confidentiality tags) run as [`scripts/content-lint.mjs`](scripts/content-lint.mjs)
  on every push.
- **The numbers cannot drift.** Every metric the site cites lives in
  [`content/facts.ts`](content/facts.ts); [`scripts/facts-check.mjs`](scripts/facts-check.mjs)
  fails CI if any canonical value disappears.
- **Frontmatter is schema-validated** (Zod) at build time; malformed content fails the build.
- **Lighthouse floors and an internal link check** run in CI on the exported HTML.

## Architecture in one paragraph

Next.js App Router, fully static export, no server (ADR 0001). Content is MDX with paired
`<Plain>`/`<Eng>` voice components, both prerendered into the HTML and swapped by a root
`data-mode` attribute with zero layout shift (ADR 0002). Styling is ~250 lines of CSS
custom properties across four designed states, two themes times two voices (ADR 0005).
Media lives on Cloudflare R2 behind a manifest so the repo stays light (ADR 0004). Hosting
is Vercel's hobby tier; the cost ceiling of the whole site is a domain name.

## Run it

```bash
npm ci
npm run dev            # localhost:3000
npm run build          # static export to out/
npm run lint:content   # editorial rules
npm run check:facts    # metrics bank guard
```

## Content model

```
content/
  cases/      seven true incident write-ups (frontmatter: hook, stamps, metrics, media, confidentiality)
  projects/   eleven project pages (tiered, featured flags, cross-links to cases)
  pages/      ai-with-a-human, about, colophon
  facts.ts    the single source of truth for every number on the site
  canonical/  the guard list facts.ts is checked against in CI
```

Built with AI assistance under written constraints and verification rituals; how that
works, with receipts, is itself a page: https://hrbohra.vercel.app/ai-with-a-human/
