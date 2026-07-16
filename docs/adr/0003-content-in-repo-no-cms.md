# 0003 — Content lives in the repo, no CMS

Status: accepted, 2026-07-11

## Context
Fourteen content documents (cases, projects, pages) with structured frontmatter, one author,
and hard editorial rules (see 0006) that must never be violated in published copy.

## Decision
MDX files in `content/`, parsed at build time with gray-matter and validated with Zod
schemas in `lib/content.ts`. Invalid frontmatter fails the build. A single typed constants
module (`content/facts.ts`) holds every fact and metric; copy references it rather than
retyping numbers.

## Alternatives rejected
- **Headless CMS (Contentful, Sanity, Notion-as-CMS)**: an external dependency, a second
  login, no version control of the paired voices, and no way to run the editorial lint
  rules before publish. For one author, a CMS is pure overhead.
- **Frontmatter-less markdown with convention**: conventions decay; schemas enforce.

## Consequences
Editing requires a git commit, which is exactly the review checkpoint wanted. Content
history is code history. The Zod schemas double as documentation of the content model.
