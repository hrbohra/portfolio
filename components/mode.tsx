'use client';

import { useEffect, useState } from 'react';

type Mode = 'plain' | 'eng';

function currentMode(): Mode {
  if (typeof document === 'undefined') return 'plain';
  return document.documentElement.dataset.mode === 'eng' ? 'eng' : 'plain';
}

export function ModeToggle() {
  const [mode, setMode] = useState<Mode>('plain');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMode(currentMode());
    setMounted(true);
  }, []);

  function toggle() {
    const next: Mode = mode === 'plain' ? 'eng' : 'plain';
    document.documentElement.dataset.mode = next;
    try {
      localStorage.setItem('voice-mode', next);
    } catch {}
    const url = new URL(window.location.href);
    url.searchParams.set('mode', next);
    window.history.replaceState(null, '', url.toString());
    setMode(next);
  }

  return (
    <button
      type="button"
      className="mode-toggle"
      onClick={toggle}
      aria-pressed={mode === 'eng'}
      title="This whole site is written twice. Try me."
    >
      <span className="mode-toggle-label">Reading as</span>
      <span className="mode-toggle-value">
        {mounted ? (mode === 'plain' ? 'Recruiter' : 'Engineer') : 'Recruiter'}
      </span>
      <span aria-live="polite" className="visually-hidden">
        {mode === 'plain' ? 'Now reading the plain version' : 'Now reading the engineer version'}
      </span>
    </button>
  );
}
