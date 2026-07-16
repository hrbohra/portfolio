# 0002 — Dual-voice content as paired semantic components

Status: accepted, 2026-07-11

## Context
The site's signature feature: every piece of content is written twice, a plain version for
recruiters and founders and a technical version for engineers. The toggle must be instant,
shareable, SEO-visible and impossible to half-implement (a page with only one voice written
is a broken page).

## Decision
Voices are semantic MDX components (`<Plain>`, `<Eng>`) authored side by side in the same
file. Both are prerendered into the static HTML; a `data-mode` attribute on the root element
plus two lines of CSS select which one displays. Mode persists in localStorage and is
shareable via a `?mode=` query parameter read before first paint.

## Alternatives rejected
- **Two page trees** (`/plain/...`, `/eng/...`): doubles the routing surface, splits
  analytics, and lets the two versions drift apart structurally.
- **Client-side fetch of the alternate voice**: adds runtime state and layout shift, and
  hides half the content from crawlers.
- **LLM-generated summaries of the technical voice**: the entire point is that both voices
  are deliberately written. Generating one would demonstrate the opposite skill.

## Consequences
Both voices ship in every page's HTML, so pages are roughly 1.6x the text weight; accepted,
text is cheap. Authoring cost doubles per section; accepted, that cost IS the feature.
The toggle swap has zero layout shift and works with JavaScript disabled (default voice
renders fine).
