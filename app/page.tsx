import Link from 'next/link';
import { hero, proof, projects, receipts } from '@/content/home';
import { Reveal } from '@/components/reveal';
import { ReceiptsTicker } from '@/components/ticker';

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
    <div className="hero-glow">
      <section className="home-hero">
        <Reveal>
          <div className="kicker">{hero.kicker}</div>
          <h1>
            <Voiced {...hero.title} />
          </h1>
          <p className="home-sub">
            <Voiced {...hero.sub} />
          </p>
        </Reveal>
      </section>

      <section className="proof-strip">
        {proof.map((p, i) => (
          <Reveal key={i} delay={i * 60}>
            <div className="proof-card">
              <Voiced {...p} />
            </div>
          </Reveal>
        ))}
      </section>

      <section className="featured">
        <Reveal>
          <div className="featured-head">
            <span className="section-label">FEATURED WORK</span>
            <Link href="/work/">see all →</Link>
          </div>
        </Reveal>
        <div className="project-grid">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 60}>
              <Link href={p.href} className="project-card">
                <div className="project-title-row">
                  <h3>{p.name}</h3>
                  <span className="project-tag">
                    <Voiced {...p.tag} />
                  </span>
                </div>
                <p className="project-body">
                  <Voiced {...p.body} />
                </p>
                <div className="project-meta">
                  <Voiced {...p.meta} />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <ReceiptsTicker items={receipts} />
    </div>
  );
}
