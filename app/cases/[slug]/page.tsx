import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getCase, getCases } from '@/lib/content';
import { mdxComponents, MediaSlot } from '@/components/mdx-components';

export function generateStaticParams() {
  return getCases().map((c) => ({ slug: c.meta.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getCase(slug);
  return { title: entry?.meta.title ?? 'Case', description: entry?.meta.hook };
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getCase(slug);
  if (!entry) notFound();

  const all = getCases();
  const idx = all.findIndex((c) => c.meta.slug === slug);
  const next = all[(idx + 1) % all.length];

  return (
    <article className="prose">
      <section className="hero">
        <span className="stamp stamp-accent">CASE FILE</span>
        <h1>{entry.meta.title}</h1>
        <p className="hook">{entry.meta.hook}</p>
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

      <Link className="next-case" href={`/cases/${next.meta.slug}/`}>
        NEXT CASE: {next.meta.title} →
      </Link>
    </article>
  );
}
