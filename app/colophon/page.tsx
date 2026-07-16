import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPage } from '@/lib/content';
import { mdxComponents } from '@/components/mdx-components';

export const metadata: Metadata = { title: 'Colophon' };

export default function ColophonPage() {
  const page = getPage('colophon');
  if (!page) return null;
  return (
    <article className="prose">
      <section className="hero">
        <span className="stamp stamp-accent">CASE ZERO</span>
        <h1>{page.meta.title}</h1>
        {page.meta.strap && <p className="hook">{page.meta.strap}</p>}
      </section>
      <MDXRemote source={page.body} components={mdxComponents} />
    </article>
  );
}
