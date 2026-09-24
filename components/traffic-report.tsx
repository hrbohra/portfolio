import { period, totals, daily, statusClasses, origin, audience, countries, protocols, hosts } from '@/content/cwtch-traffic';

/*
 * Thirty days of cwtchcomfort.com in production, drawn from its Cloudflare analytics. Server-
 * rendered SVG and HTML, no chart library, no client JavaScript: every mark has a native tooltip
 * (<title>) and every chart has its numbers in text beside it, so nothing depends on colour or
 * hover alone. One measure per chart and one hue (the site's amber) throughout.
 */

const fmt = (n: number) => n.toLocaleString('en-GB');
const k = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(n >= 100_000 ? 0 : 1).replace(/\.0$/, '')}k` : String(n));
const pct = (n: number, of: number, dp = 1) => `${((n / of) * 100).toFixed(dp)}%`;
const day = (iso: string) => {
  const d = new Date(iso + 'T00:00:00Z');
  return `${d.getUTCDate()} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getUTCMonth()]}`;
};

function Kpis() {
  const errors = statusClasses.find((s) => s.label === '5xx')!.n;
  const tiles = [
    { v: k(totals.requests), l: 'requests', s: `${fmt(Math.round(totals.requests / period.days))} a day on average` },
    { v: k(totals.visits), l: 'visits', s: 'people and crawlers together' },
    { v: `${totals.dataGB.toFixed(0)} GB`, l: 'served', s: `about ${Math.round((totals.dataGB * 1_000_000) / totals.requests)} kB per request` },
    { v: pct(errors, totals.requests, 2), l: 'server errors', s: `${fmt(errors)} of ${fmt(totals.requests)}` },
  ];
  return (
    <div className="tr-kpis">
      {tiles.map((t) => (
        <div key={t.l} className="tr-kpi">
          <span className="tr-kpi-v">{t.v}</span>
          <span className="tr-kpi-l">{t.l}</span>
          <span className="tr-kpi-s">{t.s}</span>
        </div>
      ))}
    </div>
  );
}

function Daily() {
  const W = 720, H = 226, padL = 44, padB = 32, padT = 18, padR = 8;
  const max = 30_000;
  const n = daily.length;
  const slot = (W - padL - padR) / n;
  const bw = Math.max(6, slot - 6);
  const y = (v: number) => padT + (H - padT - padB) * (1 - v / max);
  const peak = daily.reduce((a, b) => (b[1] > a[1] ? b : a));
  const low = daily.reduce((a, b) => (b[1] < a[1] ? b : a));
  const avg = totals.requests / n;
  return (
    <figure className="tr-fig">
      <figcaption className="tr-cap">Requests per day, {period.from} to {period.to}</figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} className="tr-svg" role="img" aria-label={`Daily requests ranged from ${fmt(low[1])} on ${day(low[0])} to ${fmt(peak[1])} on ${day(peak[0])}, averaging ${fmt(Math.round(avg))}.`}>
        {[0, 10_000, 20_000, 30_000].map((g) => (
          <g key={g}>
            <line x1={padL} x2={W - padR} y1={y(g)} y2={y(g)} className="tr-grid" />
            <text x={padL - 8} y={y(g) + 4} className="tr-axis" textAnchor="end">{g === 0 ? '0' : `${g / 1000}k`}</text>
          </g>
        ))}
        <line x1={padL} x2={W - padR} y1={y(avg)} y2={y(avg)} className="tr-avg" />
        <text x={padL + 4} y={y(avg) - 6} className="tr-axis tr-avg-label" textAnchor="start">average {k(Math.round(avg))}</text>
        {daily.map(([d, v], i) => {
          const x = padL + i * slot + (slot - bw) / 2;
          const isPeak = d === peak[0];
          return (
            <g key={d} className="tr-barg">
              <path d={`M${x},${y(0)} V${y(v) + 4} a4,4 0 0 1 4,-4 h${bw - 8} a4,4 0 0 1 4,4 V${y(0)} Z`} className={isPeak ? 'tr-bar tr-bar-peak' : 'tr-bar'}>
                <title>{`${day(d)}: ${fmt(v)} requests`}</title>
              </path>
              {(i % 7 === 0 && i < n - 3) || i === n - 1 ? <text x={i === 0 ? x : i === n - 1 ? x + bw : x + bw / 2} y={H - 6} className="tr-axis" textAnchor={i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle'}>{day(d)}</text> : null}
            </g>
          );
        })}
        <text x={padL + daily.findIndex((d) => d[0] === peak[0]) * slot + slot / 2} y={y(peak[1]) - 6} className="tr-label" textAnchor="middle">{k(peak[1])}</text>
      </svg>
      <p className="tr-foot">Busiest day {day(peak[0])} at {fmt(peak[1])}; quietest {day(low[0])} at {fmt(low[1])}. Traffic comes in waves: the busiest day carried about three times the quietest.</p>
    </figure>
  );
}

function Rows({ title, rows, total, note }: { title: string; rows: { label: string; sub?: string; n: number }[]; total: number; note?: string }) {
  const max = Math.max(...rows.map((r) => r.n));
  return (
    <figure className="tr-fig">
      <figcaption className="tr-cap">{title}</figcaption>
      <div className="tr-rows">
        {rows.map((r) => (
          <div key={r.label} className="tr-row" title={`${r.label}: ${fmt(r.n)} (${pct(r.n, total)})`}>
            <span className="tr-row-l">{r.label}{r.sub ? <span className="tr-row-sub">{r.sub}</span> : null}</span>
            <span className="tr-track"><span className="tr-fill" style={{ width: `${Math.max(1.2, (r.n / max) * 100)}%` }} /></span>
            <span className="tr-row-v">{k(r.n)}<span className="tr-row-p">{pct(r.n, total)}</span></span>
          </div>
        ))}
      </div>
      {note ? <p className="tr-foot">{note}</p> : null}
    </figure>
  );
}

export function TrafficReport() {
  const people = audience[0].items.reduce((a, [, n]) => a + n, 0);
  const crawlers = audience[1].items.reduce((a, [, n]) => a + n, 0);
  const monitor = audience[2].items[0][1];
  const edgeShare = pct(origin.atEdge, totals.requests);
  const modern = protocols.filter(([p]) => p !== 'HTTP/1.1').reduce((a, [, n]) => a + n, 0);
  return (
    <section className="tr" aria-label="Thirty days of production traffic">
      <div className="tr-head">
        <span className="stamp">PRODUCTION · LAST 30 DAYS</span>
        <span className="tr-src">cwtchcomfort.com · Cloudflare analytics · {period.from} to {period.to}</span>
      </div>
      <Kpis />
      <Daily />
      <div className="tr-grid2">
        <Rows
          title="How every request was answered"
          total={totals.requests}
          rows={statusClasses.map((s) => ({ label: s.label, sub: s.note, n: s.n }))}
          note={`${edgeShare} of requests were answered at the edge without reaching an origin server; the origin returned ${fmt(origin.origin200)} successful pages.`}
        />
        <Rows
          title="Who was asking"
          total={totals.requests}
          rows={[
            { label: 'People, in a browser', sub: 'Chrome, Safari, Samsung, Edge, Firefox', n: people },
            { label: 'Search and platform crawlers', sub: 'Apple, Google, Meta, Bing', n: crawlers },
            { label: 'Uptime monitoring', sub: 'one Sentry check a minute, all month', n: monitor },
          ]}
          note="The rest is traffic the dashboard cannot classify. Apple, Google and Meta crawling the catalogue is how 6,400 products get found."
        />
        <Rows
          title="Where requests came from"
          total={totals.requests}
          rows={countries.map(([label, n]) => ({ label, n }))}
          note="A shop in South Wales, so the UK is the audience. Much of the US, German, Singaporean and Dutch share is likely crawlers and monitors, which run from data centres there."
        />
        <Rows
          title="What was requested, by host"
          total={totals.requests}
          rows={hosts.map(([label, n]) => ({ label, n }))}
          note={`Product photography comes from its own image host on a CDN, separate from the pages. ${pct(modern, totals.requests, 0)} of requests used HTTP/2 or HTTP/3.`}
        />
      </div>
      <p className="tr-legal">Aggregates only. Individual IP addresses, internal hostnames and account details are left out. Daily values are traced from the dashboard chart and sum to within 0.1% of its reported total.</p>
    </section>
  );
}
