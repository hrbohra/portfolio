// Deterministic "signal trace" per key: same key, same line, every build. Decorative only.
export function trace(key: string, w = 320, h = 44, n = 40): string {
  let s = 2166136261;
  for (const c of key) s = Math.imul(s ^ c.charCodeAt(0), 16777619);
  const rnd = () => ((s = Math.imul(s ^ (s >>> 15), 2246822507) ^ Math.imul(s ^ (s >>> 13), 3266489909)) >>> 0) / 4294967296;
  const f1 = 1 + rnd() * 3, f2 = 4 + rnd() * 6, ph = rnd() * 6.28;
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) {
    const x = (i / n) * w;
    const t = i / n;
    const y = h / 2 - (Math.sin(t * 6.28 * f1 + ph) * 0.55 + Math.sin(t * 6.28 * f2) * 0.25 + (rnd() - 0.5) * 0.4) * (h * 0.4) * (0.35 + t * 0.65);
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return `M${pts.join(' L')}`;
}
