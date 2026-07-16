import type { ReactNode } from 'react';
import { timeline } from '@/lib/timeline';

/* Voice pair: both voices are pre-rendered into static HTML; CSS shows one per data-mode. */
export function Plain({ children }: { children: ReactNode }) {
  return <div className="voice voice-plain">{children}</div>;
}

export function Eng({ children }: { children: ReactNode }) {
  return <div className="voice voice-eng">{children}</div>;
}

export function Step({
  n,
  phase,
  children,
}: {
  n: number;
  phase: string;
  children: ReactNode;
}) {
  const label = phase.replace(/-/g, ' ').toUpperCase();
  return (
    <section className="step" data-phase={phase}>
      <div className="step-rail">
        <span className="step-n">{n}</span>
      </div>
      <div className="step-body">
        <span className="stamp" data-stamp={phase}>
          {label}
        </span>
        {children}
      </div>
    </section>
  );
}

export function Takeaway({ children }: { children: ReactNode }) {
  return (
    <aside className="takeaway">
      <span className="stamp">WHAT THIS SHOWS</span>
      <div>{children}</div>
    </aside>
  );
}

/* Plain-mode only by design: the founder-facing close. */
export function ProductClose({ children }: { children: ReactNode }) {
  return (
    <aside className="product-close voice voice-plain">
      <span className="stamp">WHAT THIS MEANS FOR YOUR PRODUCT</span>
      <div>{children}</div>
    </aside>
  );
}

export function CatchLog({ children }: { children: ReactNode }) {
  return <div className="catch-log">{children}</div>;
}

export function Catch({
  title,
  stamp,
  children,
}: {
  title: string;
  stamp: string;
  children: ReactNode;
}) {
  return (
    <section className="catch">
      <header>
        <h3>{title}</h3>
        <span className="stamp stamp-accent">{stamp}</span>
      </header>
      {children}
    </section>
  );
}

export function Timeline(_props: { source?: string }) {
  return (
    <table className="timeline">
      <tbody>
        {timeline.map((row) => (
          <tr key={row.period}>
            <td className="timeline-period">{row.period}</td>
            <td>{row.what}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function ReceiptsWall({ note }: { status?: string; note?: string }) {
  if (process.env.NODE_ENV !== 'development') {
    return <p className="receipts-pending">Receipts land here after the first deploy.</p>;
  }
  return <div className="media-pending">{note ?? 'Receipts pending.'}</div>;
}

/* Media by id from the R2 manifest. Pending media renders nothing in production. */
export function MediaSlot({
  id,
  note,
  status = 'pending',
}: {
  id: string;
  note?: string;
  status?: 'ready' | 'pending';
}) {
  if (status !== 'ready') {
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className="media-pending">
          evidence pending capture: {id}
          {note ? ` (${note})` : ''}
        </div>
      );
    }
    return null;
  }
  return null; // R2 manifest wiring lands with first ready asset
}

export const mdxComponents = {
  Plain,
  Eng,
  Step,
  Takeaway,
  ProductClose,
  CatchLog,
  Catch,
  Timeline,
  ReceiptsWall,
  MediaSlot,
};
