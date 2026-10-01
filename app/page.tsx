import Link from 'next/link';
import { approach, cta, hero, now, proof, projects, receipts } from '@/content/home';
import { person } from '@/content/facts';
import { Reveal } from '@/components/reveal';
import { ReceiptsTicker } from '@/components/ticker';
import { SpotLink } from '@/components/spot-link';
import { trace } from '@/lib/trace';
import { getProjects } from '@/lib/content';

function Voiced({ plain, eng }: { plain: string; eng: string }) {
  return (
    <>
      <span className="voice-plain">{plain}</span>
      <span className="voice-eng">{eng}</span>
    </>
  );
}

export default function Home() {
  return (
    <div className="home">
      {/* Above the fold renders statically: wrapping it in a reveal would hide the LCP
          element until hydration. Reveals start at the featured grid. */}
      <section className="hm-hero">
        <div className="hm-hero-in">
          <div className="hm-hero-main">
            <div className="kicker">{hero.kicker}</div>
            <h1>
              <Voiced {...hero.title} />
            </h1>
            <p className="home-sub">
              <Voiced {...hero.sub} />
            </p>
            <div className="hm-ctas">
              <Link href="/work/" className="hm-btn hm-btn-primary">
                See the work <span aria-hidden="true">→</span>
              </Link>
              <a href="/Harsh_Bohra_CV.pdf" className="hm-btn">
                Résumé (PDF)
              </a>
            </div>
          </div>

          <aside className="hm-now" aria-label="Right now">
            <div className="hm-now-head">
              <span className="hm-now-dot" />
              status
              <span className="hm-now-date">Oct 2026</span>
            </div>
            <svg className="hm-now-trace" viewBox="0 0 320 44" preserveAspectRatio="none" aria-hidden="true">
              <path d={trace('harsh-now', 320, 44, 64)} />
            </svg>
            <dl>
              {now.map((r) => (
                <div key={r.k} className="hm-now-row">
                  <dt>{r.k}</dt>
                  <dd>
                    {r.href ? (
                      <Link href={r.href}>
                        <Voiced {...r.v} />
                      </Link>
                    ) : (
                      <Voiced {...r.v} />
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <dl className="hm-proof">
          {proof.map((p, i) => (
            <div key={i}>
              <dd>
                <Voiced {...p.v} />
              </dd>
              <dt>
                <Voiced {...p.l} />
              </dt>
            </div>
          ))}
        </dl>
      </section>

      <section className="featured">
        <Reveal>
          <div className="featured-head">
            <span className="section-label">Featured work</span>
            <span className="wk-rule" />
            <Link href="/work/">all {getProjects().length} projects →</Link>
          </div>
        </Reveal>
        <div className="project-grid">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 60}>
              <SpotLink href={p.href} className="wk-card hm-card">
                <svg className="wk-trace" viewBox="0 0 320 44" preserveAspectRatio="none" aria-hidden="true">
                  <path d={trace(p.href + p.name)} pathLength={1} />
                </svg>
                <div className="wk-top">
                  <span className="wk-n">{String(i + 1).padStart(2, '0')}</span>
                  <span className={`wk-status${p.tag.plain.startsWith('live') ? ' is-live' : ''}`}>
                    {p.tag.plain.startsWith('live') && <span className="wk-dot" />}
                    <Voiced {...p.tag} />
                  </span>
                </div>
                <h3 className="wk-title">{p.name}</h3>
                <p className="wk-strap">
                  <Voiced {...p.body} />
                </p>
                <div className="hm-card-meta">
                  <Voiced {...p.meta} />
                </div>
                <span className="wk-go" aria-hidden="true">→</span>
              </SpotLink>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="hm-approach">
        <Reveal>
          <div className="featured-head">
            <span className="section-label">How I work</span>
            <span className="wk-rule" />
          </div>
        </Reveal>
        <ol className="hm-steps">
          {approach.map((s, i) => (
            <li key={s.k}>
              <Reveal delay={i * 80}>
                <div className="hm-step">
                  <span className="hm-step-k">{s.k}</span>
                  <h3>{s.t}</h3>
                  <p>
                    <Voiced {...s.d} />
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <ReceiptsTicker items={receipts} />

      <section className="hm-cta">
        <Reveal>
          <div className="hm-cta-in">
            <div>
              <h2>
                <Voiced {...cta.title} />
              </h2>
              <p>
                <Voiced {...cta.sub} />
              </p>
            </div>
            <div className="hm-ctas">
              <a href={`mailto:${person.email}`} className="hm-btn hm-btn-primary">
                Email me <span aria-hidden="true">→</span>
              </a>
              <a href={person.github} className="hm-btn">
                GitHub
              </a>
              <a href={person.linkedin} className="hm-btn">
                LinkedIn
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
