# 0005 — Hand-rolled CSS tokens instead of Tailwind

Status: accepted, 2026-07-11 (a deviation from the original architecture plan, recorded
honestly)

## Context
The original architecture document specified Tailwind v4. At build time the real shape of
the styling problem was clearer: a bespoke token system with four designed states (light and
dark themes, times plain and engineer voices), roughly ten components, and a voice-switching
mechanic driven by a root attribute.

## Decision
One global stylesheet (~250 lines) built on CSS custom properties. Theme switching is a
media query; voice switching is two attribute selectors. No CSS framework, no build-step
plugin.

## Alternatives rejected
- **Tailwind v4**: excellent at scale and in teams, where utility vocabulary beats a shared
  stylesheet. Here it added a dependency and a compile step to produce what ten components
  need, and the 4-state theming would still have lived in custom properties underneath.
- **CSS-in-JS**: runtime cost and hydration coupling on a site whose whole design is
  static.

## Consequences
Zero styling dependencies; the entire design system is one readable file; the voice
mechanic is visible in two selectors rather than spread across utility classes. Cost
accepted: no utility vocabulary if the component count grows substantially, at which point
this record gets superseded rather than silently ignored.
