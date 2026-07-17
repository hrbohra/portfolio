import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ModeToggle } from '@/components/mode';
import { person } from '@/content/facts';
import { statusStrip, availability } from '@/content/home';

const grotesk = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-ui' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: { default: 'Harsh Bohra', template: '%s · Harsh Bohra' },
  description:
    'Full-stack engineer, Cardiff UK. Real products, real users, real money; every claim written twice, once in plain English and once for engineers.',
};

const modeInit = `
try {
  var m = new URLSearchParams(location.search).get('mode') || localStorage.getItem('voice-mode');
  if (m === 'eng' || m === 'plain') document.documentElement.dataset.mode = m;
} catch (e) {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" data-mode="plain" suppressHydrationWarning className={`${grotesk.variable} ${mono.variable}`}>
      <body>
        <Script id="mode-init" strategy="beforeInteractive">
          {modeInit}
        </Script>
        <header className="shell-header">
          <div className="shell-left">
            <Link href="/" className="shell-name">
              Harsh Bohra<span style={{ color: 'var(--amber)' }}>.</span>
            </Link>
            <div className="shell-divider" />
            <div className="avail">
              <span className="avail-dot" />
              {availability}
            </div>
          </div>
          <div className="shell-right">
            <nav className="shell-nav">
              <Link href="/work/">work</Link>
              <Link href="/cases/">cases</Link>
              <Link href="/ai-with-a-human/">ai + human</Link>
              <Link href="/about/">about</Link>
              <Link href="/colophon/">colophon</Link>
            </nav>
            <ModeToggle />
          </div>
        </header>
        <div className="status-strip">
          <div>{statusStrip.left}</div>
          <div>{statusStrip.right}</div>
        </div>
        <main>{children}</main>
        <footer className="shell-footer">
          <div>
            <a href="/Harsh_Bohra_CV.pdf">résumé</a> · <a href={person.github}>github</a> ·{' '}
            <a href={person.linkedin}>linkedin</a> · <a href={`mailto:${person.email}`}>{person.email}</a>
          </div>
          <div>built by harsh bohra</div>
        </footer>
      </body>
    </html>
  );
}
