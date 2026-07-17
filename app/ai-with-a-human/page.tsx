import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPage } from '@/lib/content';
import { mdxComponents } from '@/components/mdx-components';

export const metadata: Metadata = {
  title: 'AI with a human in the loop',
  description: 'AI writes a lot of my code. Here is what it cannot do, with receipts.',
};

export default function AiPage() {
  const page = getPage('ai-with-a-human');
  if (!page) return null;
  return (
    <article className="wrap prose">
      <section className="hero">
        <span className="stamp stamp-accent">METHOD</span>
        <h1>{page.meta.title}</h1>
        {page.meta.strap && <p className="hook">{page.meta.strap}</p>}
      </section>
      <MDXRemote source={page.body} components={mdxComponents} />
    </article>
  );
}
