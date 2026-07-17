import Link from 'next/link';
import type { Metadata } from 'next';
import { getProjects } from '@/lib/content';

export const metadata: Metadata = { title: 'Work' };

export default function WorkIndex() {
  const projects = getProjects();
  return (
    <div className="wrap">
      <section className="hero">
        <h1>The work</h1>
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
      </section>
      <div className="card-grid">
        {projects.map((p) => (
          <Link key={p.meta.slug} href={`/work/${p.meta.slug}/`} className="card">
            <span className="stamp">{p.meta.tier === 1 ? 'FLAGSHIP' : 'PROJECT'}</span>
            <h3>{p.meta.title}</h3>
            <p>{p.meta.strap}</p>
            <div className="chips">
              {p.meta.tags.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
