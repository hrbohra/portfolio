import Link from 'next/link';
import { getCases, getProjects } from '@/lib/content';

const FEATURED_CASES = [
  'swap-failure-on-every-chain',
  'the-17-megabyte-page',
  'the-order-that-must-never-disappear',
];

export default function Home() {
  const cases = getCases().filter((c) => FEATURED_CASES.includes(c.meta.slug));
  const work = getProjects().filter((p) => p.meta.featured);

  return (
    <>
      <section className="hero">
        <h1>Software engineer. These are true stories.</h1>
        <p className="hero-rewrite">
          <span className="voice voice-plain">
            I build complete products on my own, and when something breaks three weeks before
            launch, I am the person who fixes it before dinner.
          </span>
          <span className="voice voice-eng">
            Full-stack TypeScript and Python. EIP-712 signing flows, persist-before-notify
            invariants, idempotent ETL, checkpointed batch inference. Receipts on every claim.
          </span>
        </p>
        <div className="cta-row">
          <Link className="btn btn-primary" href="/cases/">
            Read a case
          </Link>
          <Link className="btn btn-ghost" href="/work/">
            See the work
          </Link>
          <Link className="btn btn-ghost" href="/ai-with-a-human/">
            How I use AI
          </Link>
        </div>
      </section>

      <h2 className="section-title">Featured cases</h2>
      <div className="card-grid">
        {cases.map((c) => (
          <Link key={c.meta.slug} href={`/cases/${c.meta.slug}/`} className="card">
            <span className="stamp">CASE</span>
            <h3>{c.meta.title}</h3>
            <p>{c.meta.hook}</p>
            <div className="chips">
              {c.meta.tags.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <h2 className="section-title">Featured work</h2>
      <div className="card-grid">
        {work.map((p) => (
          <Link key={p.meta.slug} href={`/work/${p.meta.slug}/`} className="card">
            <span className="stamp">PROJECT</span>
            <h3>{p.meta.title}</h3>
            <p>{p.meta.strap}</p>
            <div className="chips">
              {p.meta.stack.slice(0, 5).map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <h2 className="section-title">About, briefly</h2>
      <div className="prose">
        <p className="voice voice-plain">
          Cardiff-based engineer. Two founding-engineer roles, a live e-commerce platform built
          solo for a real retailer, and a master&apos;s dissertation delivered to a real client.
          The long version, including how a psychology graduate ended up here, is on the about
          page.
        </p>
        <p className="voice voice-eng">
          TypeScript and Python centre of gravity. Next.js, NestJS, FastAPI, PostgreSQL, Redis,
          Solidity where the job is on-chain, PyTorch and local LLM tooling where it is not.
          Timeline and referee-safe history on the about page.
        </p>
      </div>
    </>
  );
}
