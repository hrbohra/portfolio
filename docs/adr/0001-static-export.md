# 0001 — Fully static export, no server

Status: accepted, 2026-07-11

## Context
A portfolio is a content site. Traffic is bursty (an application batch goes out, a recruiter
forwards a link), budget is zero, and the site itself is meant to be evidence of engineering
judgement.

## Decision
Next.js App Router with `output: 'export'`. Every page is prerendered HTML. No API routes,
no database, no forms, no server state. Contact is `mailto:` and LinkedIn.

## Alternatives rejected
- **SSR/ISR on Vercel functions**: nothing here is dynamic per-request. Paying runtime,
  cold starts and an attack surface for zero benefit.
- **A backend for a contact form**: a form is a spam surface and a data-protection duty.
  Email links achieve the goal with none of that.

## Consequences
Trivially cacheable, effectively unbreakable under load, free to host, nothing to patch at
3am. The cost accepted: any future dynamic feature (search, comments) forces a new decision;
that is the correct friction. Knowing when NOT to run a server is the point of the record.
