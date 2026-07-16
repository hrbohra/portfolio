# 0004 — Media on Cloudflare R2, not in git or on Vercel

Status: accepted, 2026-07-11 (pipeline wiring pending first captured asset)

## Context
The evidence system calls for screenshots and 30 to 90 second demo videos per project.
Estimated total under 2 GB. The repo must stay clonable in seconds; Vercel's hobby tier has
a bandwidth allowance that video would burn; the git history must never hold a
mis-captured frame containing client data.

## Decision
Binary media lives in an R2 bucket behind a dedicated subdomain. The repo holds only a
manifest (id, URLs, dimensions, bytes). Content declares media by id with a status flag;
pending media renders a labelled placeholder in development and nothing in production, so
launches never block on capture.

## Alternatives rejected
- **Media in the repo**: bloats clones permanently; a bad frame committed once is in
  history forever (rewriting public history is worse).
- **Vercel-hosted assets**: video against the hobby bandwidth allowance is the one
  realistic way this site could cost money or get suspended.
- **YouTube embeds for video**: third-party scripts, cookies, consent complexity, and a
  CSP hole, for hosting we do not control.

## Consequences
One extra moving part (bucket + upload script) and eventual-consistency between manifest
and bucket, guarded by the link checker in CI. Zero egress fees make the cost ceiling of
the whole site effectively the £10/yr domain.
