/*
 * Voiceprint's measured results, drawn as server-rendered HTML (no chart library, no client
 * JavaScript). Charts are positioned by percentage so they read at full size on a phone; every mark
 * has a native tooltip and every number is also in the text. Two series colours (amber, blue) were
 * validated for colour-blind separation, contrast and lightness on this site's dark surface.
 * Source of every number: github.com/hrbohra/voiceprint/blob/main/RESULTS.md
 */

const pipeline = [
  { k: '01', t: 'Anonymise', s: 'names become placeholders, on the machine' },
  { k: '02', t: 'Measure', s: '~155 features per message, GPU' },
  { k: '03', t: 'Contrast', s: 'against comparable writers, with confidence intervals' },
  { k: '04', t: 'Propose', s: 'statistics, plus a frontier model reading a compressed brief' },
  { k: '05', t: 'Verify', s: 'blind, on held-out conversations, Fisher exact test' },
  { k: '06', t: 'Export', s: 'voice guide, prompt pack, scorer, fine-tuning files' },
];

function Pipeline() {
  return (
    <figure className="vp-fig">
      <figcaption className="tr-cap">How a voice is extracted</figcaption>
      <ol className="vp-pipe">
        {pipeline.map((p) => (
          <li key={p.k} className="vp-step">
            <span className="vp-step-k">{p.k}</span>
            <span className="vp-step-t">{p.t}</span>
            <span className="vp-step-s">{p.s}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

function Kpis() {
  const tiles = [
    { v: '6 / 6', l: 'planted rules found', s: 'and 0 false rules when nothing was planted' },
    { v: '75%', l: 'writer identified', s: 'from one held-out tweet, 10 brands (chance 10%)' },
    { v: '~400', l: 'messages needed', s: 'for the rule set to stop changing' },
    { v: '0.77', l: 'on-voice score', s: 'a model with the voice pack, up from 0.04 without it' },
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

function Attribution() {
  const rows = [
    { label: 'Voiceprint features', a: 75, b: 67 },
    { label: 'Surface features only (the in-app scorer)', a: 62, b: 52 },
    { label: 'Generic style embedding', a: 62, b: 36 },
  ];
  return (
    <figure className="vp-fig">
      <figcaption className="tr-cap">Which of ten brands wrote this tweet?</figcaption>
      <div className="vp-legend">
        <span><i className="vp-sw vp-s1" />With agent sign-offs</span>
        <span><i className="vp-sw vp-s2" />Sign-offs stripped</span>
      </div>
      <div className="vp-hbars" role="img" aria-label="Voiceprint features 75% with sign-offs, 67% stripped; surface features 62% and 52%; generic style embedding 62% and 36%; chance 10%.">
        {rows.map((r) => (
          <div key={r.label} className="vp-hgroup">
            <div className="vp-hlab">{r.label}</div>
            {[
              { v: r.a, c: 'vp-s1', t: 'with sign-offs' },
              { v: r.b, c: 'vp-s2', t: 'sign-offs stripped' },
            ].map((x) => (
              <div key={x.t} className="vp-hb" title={`${r.label}, ${x.t}: ${x.v}%`}>
                <span className="vp-track"><span className={`vp-fill ${x.c}`} style={{ width: `${x.v}%` }} /><span className="vp-chance" /></span>
                <span className="vp-hv">{x.v}%</span>
              </div>
            ))}
          </div>
        ))}
        <div className="vp-haxis"><span>0%</span><span className="vp-haxis-chance">chance 10%</span><span className="vp-mid">50%</span><span>100%</span></div>
      </div>
      <p className="tr-foot">
        One held-out tweet from each of ten brands&apos; support accounts. Over ten tweets the full feature set
        gets 100% (99% with sign-offs stripped). Removing agents&apos; initials costs Voiceprint 8 points and a
        generic style model 26: it measures how brands write, not how they sign. On eight novelists it
        reaches 47% per passage and 92% over ten (chance 12.5%).
      </p>
    </figure>
  );
}

function Curve() {
  const pts: [string, number][] = [['25', 23], ['50', 36], ['100', 64], ['200', 70], ['400', 100], ['800', 100], ['1,665', 100]];
  return (
    <figure className="vp-fig">
      <figcaption className="tr-cap">How much data does a voice need?</figcaption>
      <div className="vp-cols" role="img" aria-label="Agreement with the full-data rule set: 23% at 25 messages, 36% at 50, 64% at 100, 70% at 200, 100% from 400 on.">
        {pts.map(([x, v]) => (
          <div key={x} className="vp-col" title={`${x} messages: ${v}% of the full-data rules`}>
            <span className="vp-col-v">{v}%</span>
            <span className="vp-col-bar" style={{ height: `${v}%` }} />
            <span className="vp-col-x">{x}</span>
          </div>
        ))}
      </div>
      <p className="tr-foot">
        One brand&apos;s rules re-learned from growing samples (x: messages) and compared with the rules from all
        of its data. The measured profile is stable from 25 messages (rank agreement 0.92); the rule set is
        identical from 400 on.
      </p>
    </figure>
  );
}

function Fidelity() {
  const rows = [
    { label: 'On-voice score', base: 0.04, real: 0.73, voiced: 0.77 },
    { label: 'Style similarity', base: 0.82, real: 0.92, voiced: 0.96 },
  ];
  return (
    <figure className="vp-fig">
      <figcaption className="tr-cap">Does a model given the pack write in the voice?</figcaption>
      <div className="vp-legend">
        <span><i className="vp-sw vp-s0" />Without the pack</span>
        <span><i className="vp-sw vp-s1" />With the pack</span>
        <span><i className="vp-sw vp-s2" />The brand&apos;s real replies</span>
      </div>
      <div className="vp-dp" role="img" aria-label="On-voice score 0.04 without the pack, 0.77 with it, 0.73 real. Style similarity 0.82, 0.96, 0.92.">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="vp-hlab">{r.label}</div>
            <div className="vp-dtrack">
              {[
                { v: r.base, c: 'vp-s0', t: 'without the pack' },
                { v: r.real, c: 'vp-s2', t: 'real replies' },
                { v: r.voiced, c: 'vp-s1', t: 'with the pack' },
              ].map((d) => (
                <span key={d.t} className={`vp-dot ${d.c}`} style={{ left: `${d.v * 100}%` }} title={`${r.label}, ${d.t}: ${d.v.toFixed(2)}`} />
              ))}
            </div>
            <div className="vp-dvals">without {r.base.toFixed(2)} · real {r.real.toFixed(2)} · with {r.voiced.toFixed(2)}</div>
          </div>
        ))}
        <div className="vp-daxis"><span>0</span><span>0.5</span><span>1</span></div>
      </div>
      <p className="tr-foot">
        Forty held-out incoming messages, answered by the same model with and without the pack. Voiced replies
        land level with the brand&apos;s own. 70% say nothing the plain reply didn&apos;t; the rest added claims
        through rules that carry content, which is why facts-only products use style-only packs.
      </p>
    </figure>
  );
}

export function VoiceprintReport() {
  return (
    <section className="tr vp-report" aria-label="Voiceprint results">
      <div className="tr-head">
        <span className="kicker">MEASURED, NOT CLAIMED</span>
        <span className="tr-src">public and synthetic data · reproducible from the repo</span>
      </div>
      <Kpis />
      <Pipeline />
      <div className="tr-grid2">
        <Attribution />
        <div className="vp-stack">
          <Curve />
          <Fidelity />
        </div>
      </div>
      <p className="tr-legal">
        Tweets: ThoughtVector&apos;s <i>Customer Support on Twitter</i> (CC BY-NC-SA 4.0), used for evaluation
        only; no tweet text is published. Novels: Project Gutenberg. The LLM stages in these runs were answered by
        Claude Opus 5.5 in a Claude Code session, and the pairwise style judge was not independent, so the headline
        numbers above are model-free measures.
      </p>
    </section>
  );
}
