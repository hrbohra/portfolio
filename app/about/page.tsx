import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPage } from '@/lib/content';
import { mdxComponents } from '@/components/mdx-components';

export const metadata: Metadata = { title: 'About' };

export default function AboutPage() {
  const page = getPage('about');
  if (!page) return null;
  return (
    <article className="wrap prose">
      <section className="hero">
        <h1>{page.meta.title}</h1>
        {page.meta.strap && <p className="hook">{page.meta.strap}</p>}
      </section>
      <MDXRemote source={page.body} components={mdxComponents} />
    </article>
  );
}
