/**
 * Thirty days of production traffic on cwtchcomfort.com, from the store's Cloudflare analytics
 * (26 Aug to 24 Sep 2026). Aggregates only. Deliberately left out: client IP addresses, internal
 * and admin hostnames, the ports scanners probed, and the account the dashboard belongs to.
 *
 * `daily` was traced from the dashboard's "requests over time" chart against its own gridlines;
 * the thirty values sum to 486,200 against the reported 486,350 (within 0.1%). Every other number
 * is copied from the dashboard's panels.
 */

export const period = { from: '26 Aug 2026', to: '24 Sep 2026', days: 30 };

export const totals = {
  requests: 486_350,
  visits: 164_530,
  dataGB: 65.03,
  cacheHitRate: 25.63,
};

export const daily: [string, number][] = [
  ['2026-08-26', 10400], ['2026-08-27', 15700], ['2026-08-28', 12600], ['2026-08-29', 16200],
  ['2026-08-30', 16700], ['2026-08-31', 25100], ['2026-09-01', 13700], ['2026-09-02', 15600],
  ['2026-09-03', 14500], ['2026-09-04', 15800], ['2026-09-05', 27200], ['2026-09-06', 24000],
  ['2026-09-07', 14900], ['2026-09-08', 17100], ['2026-09-09', 14000], ['2026-09-10', 11800],
  ['2026-09-11', 11900], ['2026-09-12', 9100], ['2026-09-13', 15000], ['2026-09-14', 21200],
  ['2026-09-15', 18100], ['2026-09-16', 9200], ['2026-09-17', 13400], ['2026-09-18', 21200],
  ['2026-09-19', 14800], ['2026-09-20', 10400], ['2026-09-21', 16900], ['2026-09-22', 28600],
  ['2026-09-23', 17400], ['2026-09-24', 13700],
];

/** HTTP response classes, as the dashboard reports them. */
export const statusClasses: { label: string; note: string; n: number }[] = [
  { label: '2xx', note: 'served', n: 379_860 },
  { label: '3xx', note: 'redirected, for example the bare domain to www', n: 56_210 },
  { label: '4xx', note: 'refused or not found, much of it automated probing', n: 48_210 },
  { label: '5xx', note: 'server errors', n: 2_060 },
];

/** Where each response came from: answered at the edge, or fetched from an origin server. */
export const origin = { atEdge: 426_960, origin200: 55_560, origin404: 3_230, origin401: 601 };

/** Who was asking, grouped from the browser and user-agent panels. */
export const audience: { group: string; items: [string, number][] }[] = [
  { group: 'People, in a browser', items: [['Chrome', 122_290], ['Chrome on phones', 40_450], ['Safari on iPhone', 17_870], ['Safari', 5_870], ['Samsung Internet', 5_450], ['Edge', 2_360], ['Firefox', 2_090], ['Facebook in-app', 1_030]] },
  { group: 'Search and platform crawlers', items: [['Applebot', 32_510], ['Googlebot', 24_420], ['Meta ads crawler', 13_840], ['Bingbot', 1_740]] },
  { group: 'Uptime monitoring', items: [['Sentry uptime checks', 43_210]] },
];

export const countries: [string, number][] = [
  ['United States', 207_770], ['United Kingdom', 92_930], ['Germany', 63_600], ['Singapore', 25_590],
  ['Netherlands', 21_380], ['France', 13_550], ['China', 10_130],
];

export const devices: [string, number][] = [['Desktop', 389_900], ['Mobile', 94_230], ['Tablet', 2_220]];

export const protocols: [string, number][] = [['HTTP/1.1', 242_310], ['HTTP/2', 214_700], ['HTTP/3', 29_330]];

/** Share of requests by host (internal hostnames omitted). */
export const hosts: [string, number][] = [['www (the store)', 330_510], ['media (product images)', 108_560], ['bare domain', 46_060]];

export const topPages: [string, number][] = [['/ (home)', 52_630], ['/shop', 22_690], ['/robots.txt', 5_860]];
