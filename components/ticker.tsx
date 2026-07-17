// Receipts ticker: pure CSS marquee, content rendered twice (second copy aria-hidden),
// paused on hover and under reduced motion. Items are data (content/home.ts).

function Run({ items, hidden }: { items: string[]; hidden?: boolean }) {
  return (
    <span aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <span key={i} className="ticker-item">
          <span className="ticker-check">✓</span>
          {item}
          <span className="ticker-sep"> ···</span>
        </span>
      ))}
    </span>
  );
}

export function ReceiptsTicker({ items }: { items: string[] }) {
  return (
    <div className="ticker">
      <div className="ticker-inner">
        <Run items={items} />
        <Run items={items} hidden />
      </div>
    </div>
  );
}
