'use client';

// A card link whose amber spotlight follows the cursor (CSS reads --mx/--my).

import Link from 'next/link';
import type { MouseEvent, ReactNode } from 'react';

function spotlight(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
}

export function SpotLink({ href, className, children }: { href: string; className: string; children: ReactNode }) {
  return (
    <Link href={href} className={className} onMouseMove={spotlight}>
      {children}
    </Link>
  );
}
