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

/** Proof readouts: a big value and a short label, in each voice. */
export const proof: { v: Voiced; l: Voiced }[] = [
  { v: { plain: '6,400', eng: '221kB' }, l: { plain: 'products live', eng: 'cart JS, down from 17.5MB' } },
  { v: { plain: '1,000+', eng: '131' }, l: { plain: 'customers served', eng: 'tests plus a written threat model' } },
  { v: { plain: '3', eng: '12' }, l: { plain: 'startups, sole or founding engineer', eng: 'source ETL, zero errors' } },
  { v: { plain: '0', eng: '25/25' }, l: { plain: 'orders lost, ever', eng: 'evals passing' } },
];

/** Hero side panel: what is true right now. */
export const now: { k: string; v: Voiced; href?: string }[] = [
  {
    k: 'now',
    v: { plain: 'Founding engineer at Nextus, identity before signup', eng: 'Nextus gateway: Node, Postgres/Prisma, Redis, OTP claim state machine' },
  },
  {
    k: 'in production',
    v: { plain: 'cwtchcomfort.com: 486k requests in 30 days', eng: 'cwtchcomfort.com: 486k requests / 30d, 0.42% server errors' },
    href: '/work/cwtch-store/',
  },
  {
    k: 'latest release',
    v: { plain: "Voiceprint, open source: an AI that writes in a brand's voice", eng: 'Voiceprint: stylometry, held-out verification, 6/6 planted rules recovered' },
    href: '/work/voiceprint/',
  },
  {
    k: 'open to',
    v: { plain: 'Full-time roles, UK. Replies within a day', eng: 'Full-stack, AI or forward-deployed roles, UK' },
  },
];

/** How the work goes, in three steps. */
export const approach: { k: string; t: string; d: Voiced }[] = [
  {
    k: '01',
    t: 'Embed',
    d: {
      plain:
        'I start where the work happens. I sold sofas on the Cwtch shop floor and worked a jewellers’ counter before writing a line of code for either.',
      eng: 'Requirements from the floor, not the ticket: shadow the users, map the real workflow, find the failure that costs money.',
    },
  },
  {
    k: '02',
    t: 'Build',
    d: {
      plain: 'Then I build the whole thing: the screens, the server, the data and the payments, so nothing falls between two people.',
      eng: 'End to end in TypeScript and Python: Next.js and React Native front ends, NestJS or FastAPI services, Postgres, Stripe, LLM integrations.',
    },
  },
  {
    k: '03',
    t: 'Prove',
    d: {
      plain: 'And I show it works with numbers, not adjectives: tests, evaluations and real production traffic.',
      eng: 'Evidence in the repo: integration tests against real Postgres and Redis, eval suites in CI, Sentry, post-mortems and ADRs.',
    },
  },
];

export const cta: { title: Voiced; sub: Voiced } = {
  title: {
    plain: 'Need someone who owns it end to end?',
    eng: 'Hiring a full-stack or AI engineer?',
  },
  sub: {
    plain: 'I reply within a day. The quickest route is email.',
    eng: 'CV, code and production numbers are all one click away.',
  },
};

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
  '486k requests, 0.42% errors',
  '6/6 planted rules recovered',
  '7,975 images classified for £0',
];

export const statusStrip = {
  left: 'cardiff, uk · freelance + founding engineer @ nextus · shipping since 2021',
  right: 'open to full-time roles · replies within a day',
};

export const availability = 'open to select work';
