import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getProject, getProjects, getCases } from '@/lib/content';
import { mdxComponents, MediaSlot } from '@/components/mdx-components';

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.meta.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getProject(slug);
  return { title: entry?.meta.title ?? 'Project', description: entry?.meta.strap };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getProject(slug);
  if (!entry) notFound();

  const allCases = getCases();
  const related = allCases.filter((c) => entry.meta.cases.includes(c.meta.slug));

  return (
    <article className="wrap prose">
      <section className="hero">
        <span className="stamp stamp-accent">
          {entry.meta.tier === 1 ? 'FLAGSHIP PROJECT' : 'PROJECT'}
        </span>
        <h1>{entry.meta.title}</h1>
        <p className="hook">{entry.meta.strap}</p>
        <div className="meta-row">
          <span className="chip">{entry.meta.role}</span>
          {entry.meta.links.map((l) => (
            <a key={l.url} className="chip metric-chip" href={l.url}>
              {l.label} ↗
            </a>
          ))}
        </div>
        <div className="meta-row">
          {entry.meta.metrics.map(
            (m, i) =>
              m.label &&
              m.value && (
                <span key={i} className="chip metric-chip">
                  {m.label}: {m.value}
                </span>
              ),
          )}
        </div>
      </section>

      <MDXRemote source={entry.body} components={mdxComponents} />

      {entry.meta.media.map((m) => (
        <MediaSlot key={m.id} id={m.id} status={m.status} note={m.capture_note} />
      ))}

      {related.length > 0 && (
        <>
          <h2 className="section-title">Cases from this project</h2>
          <div className="card-grid">
            {related.map((c) => (
              <Link key={c.meta.slug} href={`/cases/${c.meta.slug}/`} className="card">
                <span className="stamp">CASE</span>
                <h3>{c.meta.title}</h3>
                <p>{c.meta.hook}</p>
              </Link>
            ))}
          </div>
        </>
      )}

      <div className="meta-row">
        <span className="stamp">STACK</span>
      </div>
      <div className="chips">
        {entry.meta.stack.map((s) => (
          <span key={s} className="chip">
            {s}
          </span>
        ))}
      </div>
    </article>
  );
}
