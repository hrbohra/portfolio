'use client';

// /work index: filter row + flagship cards + compact list. Renders every project on the
// server; filtering only toggles visibility, so the page is complete without JS.

import Link from 'next/link';
import { useState, type MouseEvent } from 'react';

export interface WorkItem {
  slug: string;
  title: string;
  strap: string;
  role: string;
  tier: number;
  featured: boolean;
  tags: string[];
  stack: string[];
  readout?: { value: string; label: string };
}

const FILTERS: { id: string; label: string; match: string[] }[] = [
  { id: 'all', label: 'All', match: [] },
  { id: 'live', label: 'In production', match: ['live-product', 'live-product-work'] },
  { id: 'ai', label: 'AI / ML', match: ['ai-ml', 'nlp'] },
  { id: 'oss', label: 'Open source', match: ['open-source'] },
  { id: 'data', label: 'Data', match: ['data-engineering', 'etl'] },
  { id: 'commerce', label: 'Commerce', match: ['e-commerce', 'web3', 'operations', 'internal-tools'] },
];

const matches = (p: WorkItem, f: string) => {
  const def = FILTERS.find((x) => x.id === f);
  return !def || def.match.length === 0 || p.tags.some((t) => def.match.includes(t));
};

function status(p: WorkItem): { text: string; live: boolean } {
  // live-product: anyone can open it. live-product-work: shipped and still in use, but not public.
  if (p.tags.includes('live-product')) return { text: 'Live', live: true };
  if (p.tags.includes('live-product-work')) return { text: 'In production', live: false };
  if (p.tags.includes('open-source')) return { text: 'Open source', live: false };
  if (p.tags.includes('client-work') || p.tags.includes('research')) return { text: 'Client work', live: false };
  return { text: p.tier === 1 ? 'Shipped' : 'Project', live: false };
}

// Deterministic "signal trace" per project: same slug, same line, every build.
function trace(slug: string, w = 320, h = 44, n = 40): string {
  let s = 2166136261;
  for (const c of slug) s = Math.imul(s ^ c.charCodeAt(0), 16777619);
  const rnd = () => ((s = Math.imul(s ^ (s >>> 15), 2246822507) ^ Math.imul(s ^ (s >>> 13), 3266489909)) >>> 0) / 4294967296;
  const f1 = 1 + rnd() * 3, f2 = 4 + rnd() * 6, ph = rnd() * 6.28;
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) {
    const x = (i / n) * w;
    const t = i / n;
    const y = h / 2 - (Math.sin(t * 6.28 * f1 + ph) * 0.55 + Math.sin(t * 6.28 * f2) * 0.25 + (rnd() - 0.5) * 0.4) * (h * 0.4) * (0.35 + t * 0.65);
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return `M${pts.join(' L')}`;
}

function spotlight(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
}

function FlagCard({ p, n, big }: { p: WorkItem; n: number; big?: boolean }) {
  const st = status(p);
  return (
    <Link href={`/work/${p.slug}/`} className={`wk-card${big ? ' wk-card-big' : ''}`} onMouseMove={spotlight}>
      <svg className="wk-trace" viewBox="0 0 320 44" preserveAspectRatio="none" aria-hidden="true">
        <path d={trace(p.slug)} pathLength={1} />
      </svg>
      <div className="wk-top">
        <span className="wk-n">{String(n).padStart(2, '0')}</span>
        <span className={`wk-status${st.live ? ' is-live' : ''}`}>
          {st.live && <span className="wk-dot" />}
          {st.text}
        </span>
      </div>
      <h3 className="wk-title">{p.title}</h3>
      <p className="wk-strap">{p.strap}</p>
      {p.readout && (
        <div className="wk-readout">
          <span className="wk-rv">{p.readout.value}</span>
          <span className="wk-rl">{p.readout.label}</span>
        </div>
      )}
      <div className="wk-foot">
        <span className="wk-role">{p.role}</span>
        <div className="wk-stack">
          {p.stack.slice(0, big ? 5 : 3).map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>
      <span className="wk-go" aria-hidden="true">→</span>
    </Link>
  );
}

export function WorkIndex({ items }: { items: WorkItem[] }) {
  const [f, setF] = useState('all');
  const featured = items.filter((p) => p.tier === 1 && p.featured);
  const flagships = items.filter((p) => p.tier === 1 && !p.featured);
  const more = items.filter((p) => p.tier !== 1);
  const count = (id: string) => items.filter((p) => matches(p, id)).length;
  const hide = (p: WorkItem) => (matches(p, f) ? undefined : true);
  let n = 0;

  return (
    <>
      <div className="wk-filters" role="toolbar" aria-label="Filter projects">
        {FILTERS.map((x) => (
          <button key={x.id} type="button" aria-pressed={f === x.id} onClick={() => setF(x.id)}>
            {x.label}
            <span className="wk-count">{count(x.id)}</span>
          </button>
        ))}
      </div>

      <div className="wk-section">
        <span className="section-label">Flagships</span>
        <span className="wk-rule" />
      </div>
      <div className="wk-grid-big">
        {featured.map((p) => (
          <div key={p.slug} hidden={hide(p)} className="wk-cell">
            <FlagCard p={p} n={++n} big />
          </div>
        ))}
      </div>
      <div className="wk-grid">
        {flagships.map((p) => (
          <div key={p.slug} hidden={hide(p)} className="wk-cell">
            <FlagCard p={p} n={++n} />
          </div>
        ))}
      </div>

      {more.some((p) => matches(p, f)) && (
        <>
          <div className="wk-section">
            <span className="section-label">Also built</span>
            <span className="wk-rule" />
          </div>
          <ul className="wk-list">
            {more.map((p) => (
              <li key={p.slug} hidden={hide(p)}>
                <Link href={`/work/${p.slug}/`} className="wk-row">
                  <span className="wk-row-n">{String(++n).padStart(2, '0')}</span>
                  <span className="wk-row-t">{p.title}</span>
                  <span className="wk-row-s">{p.strap}</span>
                  <span className="wk-row-go" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
