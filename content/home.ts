/**
 * Home-page copy, dual voice, per the "instrument, personal" design handoff (option 1a).
 * Every string carries both voices; numbers must trace to content/facts.ts.
 * Note: the handoff said "41/41 evals"; reality (plainsheet evals/RESULTS.md) is 25/25,
 * so 25/25 ships. Update here and in facts.ts together if the suite grows.
 */

export interface Voiced {
  plain: string;
  eng: string;
}

export const hero: { kicker: string; title: Voiced; sub: Voiced } = {
  kicker: 'FULL-STACK ENGINEER, CARDIFF UK',
  title: {
    plain: 'I turn a half-written spec into something people pay for.',
    eng: 'Full-stack delivery: the API, the data model, the integrations, the security pass, and the 2am bug.',
  },
  sub: {
    plain:
      'Freelance full-stack engineer in Cardiff, currently a founding engineer at an identity-infrastructure startup. Four products shipped, real users, real money.',
    eng: 'TypeScript and Python by default: Next.js, NestJS, React Native, Postgres, Redis. Founding engineer at two early-stage startups.',
  },
};

export const proof: Voiced[] = [
  { plain: '6,400 products live', eng: '221kB cart JS, down from 17.5MB' },
  { plain: '1,000+ customers served', eng: '131 tests plus a written threat model' },
  { plain: '3 startups, sole or founding engineer', eng: '12-source ETL, zero errors' },
  { plain: '0 orders lost, ever', eng: '25/25 evals passing' },
];

export interface HomeProject {
  name: string;
  href: string;
  tag: Voiced;
  body: Voiced;
  meta: Voiced;
}

export const projects: HomeProject[] = [
  {
    name: 'PlainSheet',
    href: '/work/plainsheet/',
    tag: { plain: 'live demo', eng: 'RAG agent' },
    body: {
      plain:
        "An AI tool that knows what it's not allowed to say. Helps clinical trial participants understand consent forms in plain English, never medical advice.",
      eng: 'Hybrid retrieval (BM25 + pgvector), cite-or-refuse verification, an adversarial eval suite in CI.',
    },
    meta: {
      plain: 'consent forms, explained honestly',
      eng: 'Next.js · Postgres/pgvector · 25/25 evals',
    },
  },
  {
    name: 'Cwtch Comfort',
    href: '/work/cwtch-store/',
    tag: { plain: 'live, production', eng: 'sole engineer' },
    body: {
      plain:
        "A real UK furniture retailer's entire online store, live and selling: 6,400 products, built and run solo.",
      eng: 'Next.js 14 storefront, a 12-supplier ETL pipeline, three configurators, Stripe webhooks. Cart JS cut from 17.5MB to 221kB.',
    },
    meta: {
      plain: '6,400 products, 2 branches',
      eng: 'Next.js · Stripe · Upstash KV · Sentry',
    },
  },
  {
    name: 'Nextus',
    href: '/about/',
    tag: { plain: 'founding engineer', eng: 'founding engineer' },
    body: {
      plain: 'Identity infrastructure where a phone number works before anyone signs up.',
      eng: 'Gateway service: E.164 addressing, an OTP claim state machine, an immutable event log. 131 tests plus a written threat model.',
    },
    meta: { plain: 'identity before signup', eng: 'Node · Postgres/Prisma · Redis' },
  },
  {
    name: 'Cache Wallet',
    href: '/work/cache-wallet/',
    tag: { plain: 'founding engineer', eng: 'founding engineer' },
    body: {
      plain: 'A crypto wallet rebuilt from an abandoned codebase into a product tested with real money.',
      eng: 'Gasless swaps across 7 EVM chains, EIP-712 signed orders. Cut dependency vulnerabilities from 60 to 8.',
    },
    meta: { plain: 'swap, ramp, and a wallet that works', eng: 'NestJS · React Native · Solidity' },
  },
];

/** Receipts ticker items: data, not component copy. Append new receipts here. */
export const receipts: string[] = [
  'shipped cwtchcomfort.com',
  '25/25 evals passing',
  'vulnerabilities 60 → 8',
  '131 tests green',
  'cart JS 17.5MB → 221kB',
  '6,400 products indexed',
];

export const statusStrip = {
  left: 'cardiff, uk · freelance + founding engineer @ nextus · shipping since 2021',
  right: 'open to full-time roles · replies within a day',
};

export const availability = 'open to select work';
