import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import './globals.css';
import { ModeToggle } from '@/components/mode';
import { person } from '@/content/facts';

export const metadata: Metadata = {
  title: { default: 'Harsh R. Bohra', template: '%s · Harsh R. Bohra' },
  description:
    'Software engineer. These are true stories: real products, real debugging, written twice, once for recruiters and once for engineers.',
};

const modeInit = `
try {
  var m = new URLSearchParams(location.search).get('mode') || localStorage.getItem('voice-mode');
  if (m === 'eng' || m === 'plain') document.documentElement.dataset.mode = m;
} catch (e) {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" data-mode="plain" suppressHydrationWarning>
      <body>
        <Script id="mode-init" strategy="beforeInteractive">
          {modeInit}
        </Script>
        <header className="site-header">
          <Link href="/" className="site-name">
            harsh r. bohra
          </Link>
          <nav className="site-nav">
            <Link href="/work/">Work</Link>
            <Link href="/cases/">Cases</Link>
            <Link href="/ai-with-a-human/">AI + human</Link>
            <Link href="/about/">About</Link>
            <Link href="/colophon/">Colophon</Link>
          </nav>
          <ModeToggle />
        </header>
        <main className="wrap">{children}</main>
        <footer className="site-footer wrap">
          <span>Currently: Founding Engineer at an identity-infrastructure startup.</span>
          <a href={person.github}>GitHub</a>
          <a href={person.linkedin}>LinkedIn</a>
          <a href={`mailto:${person.email}`}>{person.email}</a>
        </footer>
      </body>
    </html>
  );
}
