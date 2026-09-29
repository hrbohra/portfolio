import type { Metadata } from 'next';
import { getProjects } from '@/lib/content';
import { readouts } from '@/content/work-readouts';
import { WorkIndex, type WorkItem } from '@/components/work-index';

export const metadata: Metadata = { title: 'Work' };

export default function WorkPage() {
  const items: WorkItem[] = getProjects().map(({ meta }) => ({
    slug: meta.slug,
    title: meta.title,
    strap: meta.strap,
    role: meta.role,
    tier: meta.tier,
    featured: meta.featured,
    tags: meta.tags,
    stack: meta.stack,
    readout: readouts[meta.slug],
  }));
  const has = (t: string) => items.filter((p) => p.tags.some((x) => x.startsWith(t))).length;
  const stats = [
    { v: items.length, l: 'projects' },
    { v: has('live-product'), l: 'live in production' },
    { v: has('open-source'), l: 'open source' },
    { v: has('ai-ml'), l: 'with AI or ML inside' },
  ];

  return (
    <div className="wk">
      <section className="wk-hero">
        <div className="wrap">
          <div className="kicker">Project index</div>
          <h1>
            The work<span className="wk-period">.</span>
          </h1>
          <p className="hook">
            <span className="voice voice-plain">
              Live products first. Everything here was built by me, most of it alone, all of it
              real.
            </span>
            <span className="voice voice-eng">
              Ordered by outcome, not chronology. Stack chips are exhaustive on each project page,
              indicative here.
            </span>
          </p>
          <dl className="wk-stats">
            {stats.map((s) => (
              <div key={s.l}>
                <dt>{s.l}</dt>
                <dd>{String(s.v).padStart(2, '0')}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <div className="wrap">
        <WorkIndex items={items} />
      </div>
    </div>
  );
}
