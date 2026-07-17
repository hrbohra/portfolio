# 0007 — Dark instrument shell, superseding the light "case file" direction

Status: accepted, 2026-07-17 (design handoff from the site owner)

## Context
The original design system (light paper aesthetic, two themes times two voices, four
designed states) shipped as the first build. A subsequent design exploration produced the
"instrument, personal" direction: a dark cockpit shell extending the PlainSheet product's
visual language into the personal brand, so the portfolio and its flagship demo read as one
hand. The owner selected option 1a with a receipts ticker.

## Decision
Commit to a single dark theme site-wide. Amber is reserved for proof and status; coral is
reserved for refusal moments (a rule inherited from PlainSheet, unused on the home page).
The voice toggle remains the only global state, relabelled PLAIN ENGLISH / UNDER THE HOOD
site-wide. Home-page copy lives in a typed content module with paired-voice fields; ticker
receipts are data. Scroll-in reveals are subtle, once-only, and disabled under reduced
motion.

## Alternatives rejected
- **Keeping the two-theme system**: doubled design and QA cost per state and diluted the
  brand link to PlainSheet. The dark instrument is the differentiated look; a light mode
  added surface without evidence anyone wanted it.
- **The other explored directions** (1b, 1c standalone, 2a as the home): rejected in the
  design phase; 2a ("Incident Room" mechanics) is retained as a reference for a future
  /cases treatment.

## Consequences
One theme to keep accessible instead of four states. The serif reading voice from the old
system is gone; both voices now share Space Grotesk with mono for data, which moves the
plain/engineer distinction entirely into the words, where it belonged. The handoff's
"41/41 evals" claim did not match reality (25/25 in the eval suite's RESULTS.md) and ships
as 25/25 per the metrics-bank rule.
