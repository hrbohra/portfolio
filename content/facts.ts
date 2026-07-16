/**
 * Single source of truth for every fact and metric used in site copy.
 * MDX must reference these constants, never retype numbers.
 * CI diffs this file against /content/canonical/ (raw master CV extract).
 * Source: 00_RAW_MASTER_CV_Harsh_Bohra_July2026.md (metrics bank). Never invent numbers.
 */

export const person = {
  name: 'Harsh R. Bohra',
  email: 'harshrbohra@gmail.com',
  location: 'Cardiff, Wales, UK',
  github: 'https://github.com/hrbohra',
  linkedin: 'https://www.linkedin.com/in/harshrbohra',
} as const;

export const roles = {
  nextus: {
    title: 'Founding Engineer',
    org: 'an identity-infrastructure startup', // named on About only when CEO approves a fuller mention
    period: 'May 2026 to present',
  },
  cache: {
    title: 'Founding Engineer (freelance)',
    org: 'Cache Wallet',
    period: 'Jan 2026 to May 2026',
    engagementLine:
      'A fixed freelance engagement to get the product launch-ready. It ended when that was delivered.',
  },
  freelance: {
    title: 'Software Engineer (freelance)',
    period: 'Mar 2025 to present',
  },
} as const;

export const cache = {
  chains: 7,
  vulnsBefore: 60,
  vulnsAfter: 8,
  mainnetSwap: 'USDC to WETH on Base, live funds',
  stack: 'TypeScript, NestJS, PostgreSQL, React Native (Expo), Solidity, Thirdweb, Ethers.js',
} as const;

export const cwtchStore = {
  url: 'https://cwtchcomfort.com',
  skus: 6434,
  supplierBrands: 12,
  catalogueMb: 17.5,
  cartFirstLoadKb: 221,
  pdpFirstLoadKb: 286,
  cartResolveCap: 60,
  client: 'Technicon Furnishers Ltd t/a Cwtch Comfort, two branches (Tonypandy and Pontypridd)',
} as const;

export const etl = {
  seconique: {
    products: 1015,
    images: 9968,
    imagesSizeMb: 395,
    errors: 0,
    snapshotPasses: [562, 970, 1012, 1015],
    concurrencyCap: 4,
  },
  newTrend: { models: 192, variants: 3075, hdImages: 814, schematics: 2327, errors: 0 },
  brochurePdfs: 9,
  mattressImages: 1000, // "~1,000" in copy
} as const;

export const vision = {
  images: 7975, // "~8,000" acceptable in Plain copy
  categories: 7,
  uncategorised: 0,
  model: 'qwen2.5vl:7b via Ollama, local',
  runtime: 'multi-hour batch, checkpointed and resume-safe',
} as const;

export const billing = {
  pytests: 17,
  e2eAssertions: 21,
  invoicePrefixes: ['CC-T-####', 'CC-P-####'],
} as const;

export const dissertation = {
  name: 'Little Investigators',
  client: 'Built Environment Trust',
  period: 'Jun 2024 to Sep 2024',
} as const;

export const internship = {
  org: 'Cardiff University, School of Architecture',
  throughput: '2,900+ entries/sec',
  improvement: '+25%',
} as const;

export const pawtrove = { url: 'https://pawtrove.shop', seoScore: 100 } as const;

export const plainsheet = {
  url: 'https://plainsheet-demo.vercel.app',
  repo: 'https://github.com/hrbohra/plainsheet',
  evals: '25/25 green in CI, adversarial cases included',
  latencyTuning: '18s to 2s tool-step latency after model-split tuning',
  origin:
    '2.5 years reviewing participant information sheets by hand on a Cardiff University Public Advisory Group',
} as const;

/** Approved metric deltas for MetricDelta components. Nothing else may animate. */
export const deltas = {
  cacheVulns: { before: 60, after: 8, label: 'known dependency vulnerabilities' },
  cartBundle: { before: '17.5 MB', after: '221 kB', label: 'cart first-load JavaScript' },
  seconiqueCompleteness: { before: '562', after: '1,015 of 1,015', label: 'products captured' },
  plainsheetLatency: { before: '18 s', after: '2 s', label: 'agent tool-step latency' },
} as const;
