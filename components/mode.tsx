'use client';

import { useEffect, useState } from 'react';

type Mode = 'plain' | 'eng';

function currentMode(): Mode {
  if (typeof document === 'undefined') return 'plain';
  return document.documentElement.dataset.mode === 'eng' ? 'eng' : 'plain';
}

/** Segmented voice toggle: PLAIN ENGLISH | UNDER THE HOOD (labels per design; mechanic unchanged). */
export function ModeToggle() {
  const [mode, setMode] = useState<Mode>('plain');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMode(currentMode());
    setMounted(true);
  }, []);

  function pick(next: Mode) {
    document.documentElement.dataset.mode = next;
    try {
      localStorage.setItem('voice-mode', next);
    } catch {}
    const url = new URL(window.location.href);
    url.searchParams.set('mode', next);
    window.history.replaceState(null, '', url.toString());
    setMode(next);
  }

  const active = mounted ? mode : 'plain';
  return (
    <div className="voice-toggle" role="group" aria-label="Reading voice">
      <button type="button" aria-pressed={active === 'plain'} onClick={() => pick('plain')}>
        PLAIN ENGLISH
      </button>
      <button type="button" aria-pressed={active === 'eng'} onClick={() => pick('eng')}>
        UNDER THE HOOD
      </button>
      <span aria-live="polite" className="visually-hidden">
        {active === 'plain' ? 'Now reading the plain English version' : 'Now reading the technical version'}
      </span>
    </div>
  );
}
