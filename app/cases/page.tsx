import Link from 'next/link';
import type { Metadata } from 'next';
import { getCases } from '@/lib/content';

export const metadata: Metadata = { title: 'The cases' };

export default function CasesIndex() {
  const cases = getCases();
  return (
    <div className="wrap">
      <section className="hero">
        <h1>The cases</h1>
        <p className="hook">
          <span className="voice voice-plain">
            Real incidents from real products, told with the dead ends left in. Every portfolio
            shows finished screenshots. This one shows the debugging.
          </span>
          <span className="voice voice-eng">
            Production incidents and design decisions with root causes, failed hypotheses and
            verification. Sanitised where client confidentiality requires; never embellished.
          </span>
        </p>
      </section>
      <div className="card-grid">
        {cases.map((c) => (
          <Link key={c.meta.slug} href={`/cases/${c.meta.slug}/`} className="card">
            <span className="stamp">CASE</span>
            <h3>{c.meta.title}</h3>
            <p>{c.meta.hook}</p>
            <div className="chips">
              {c.meta.metrics.slice(0, 2).map(
                (m, i) =>
                  m.label &&
                  m.value && (
                    <span key={i} className="chip metric-chip">
                      {m.label}: {m.value}
                    </span>
                  ),
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
