# 0006 — Editorial and factual rules enforced by CI

Status: accepted, 2026-07-16

## Context
The site's copy operates under hard rules that live in a private style guide: specific
punctuation bans, a banned-vocabulary list for describing client data work, a
confidentiality tag required on every case and project, and a metrics bank outside which no
number may appear. Rules that live in documents decay; every future edit (human or
AI-assisted) is a chance to violate one silently.

## Decision
The rules are executable and run on every push:
1. `scripts/content-lint.mjs` scans content and UI copy for banned punctuation and
   vocabulary, placeholder text, and missing confidentiality tags.
2. `scripts/facts-check.mjs` verifies the metrics bank (`content/facts.ts`) still contains
   every canonical value listed in `content/canonical/facts.json`, so the numbers the site
   cites cannot drift by accident.
3. Zod frontmatter validation fails the build on malformed content (see 0003).
4. Lighthouse CI asserts floor scores on three representative pages; an internal link
   check runs over the exported HTML.

CI asserts score floors (not hard 100s) because shared runners introduce variance;
the hard-100 target is verified manually against production and published on the colophon.

## Alternatives rejected
- **A checklist in the contributing docs**: this site is partly AI-assisted by design; the
  author's own working method (documented on the /ai-with-a-human page) is that constraints
  must be enforced by machinery, not memory.
- **Pre-commit hooks only**: easily skipped, invisible to a reader of the repo. CI runs are
  public receipts.

## Consequences
Every green check on a public commit is evidence the rules held. The first deployment
already proved the value of supply-chain gates in the other direction: Vercel refused the
initial build over a vulnerable dependency (next-mdx-remote 5.0.0), which was upgraded and
redeployed within minutes. Gates catch; that is what they are for.
