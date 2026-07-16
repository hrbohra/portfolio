/**
 * Content lint: the editorial rules, executable (ADR 0006).
 * Scans site copy (content/, app/, components/) for:
 *  - banned punctuation (em dash)
 *  - banned vocabulary (data-acquisition language rules, placeholder text)
 *  - missing confidentiality tag on cases/projects
 * Exits 1 with a findings list on any violation.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SCAN_DIRS = ['content', 'app', 'components'];
const EXTS = new Set(['.mdx', '.md', '.tsx', '.ts', '.css']);

const RULES = [
  { re: /—/, why: 'em dash banned in site copy (style guide)' },
  { re: /\bscrap(?:e[dr]?|ers?|ing)\b/i, why: 'banned vocabulary: use consent/ETL language' },
  { re: /\bstealth\b/i, why: 'banned vocabulary: anti-detection tooling is never described' },
  { re: /\banti-?bot\b/i, why: 'banned vocabulary: anti-detection tooling is never described' },
  { re: /\bcaptcha\b/i, why: 'banned vocabulary: anti-detection tooling is never described' },
  { re: /\blorem\b|\bTODO\b|\bFIXME\b/, why: 'placeholder text must not ship' },
];

const findings = [];

function scanFile(file) {
  const rel = path.relative(ROOT, file);
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    for (const rule of RULES) {
      if (rule.re.test(line)) {
        findings.push(`${rel}:${i + 1} - ${rule.why}\n    ${line.trim().slice(0, 120)}`);
      }
    }
  });
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (EXTS.has(path.extname(entry.name))) scanFile(full);
  }
}

for (const dir of SCAN_DIRS) {
  const full = path.join(ROOT, dir);
  if (fs.existsSync(full)) walk(full);
}

// Confidentiality tag required on every case and project.
for (const sub of ['content/cases', 'content/projects']) {
  const full = path.join(ROOT, sub);
  if (!fs.existsSync(full)) continue;
  for (const f of fs.readdirSync(full).filter((f) => f.endsWith('.mdx'))) {
    const head = fs.readFileSync(path.join(full, f), 'utf8').split('---')[1] ?? '';
    if (!/^confidentiality:\s*\S+/m.test(head)) {
      findings.push(`${sub}/${f} - missing confidentiality tag in frontmatter`);
    }
  }
}

if (findings.length) {
  console.error(`content-lint: ${findings.length} violation(s)\n`);
  for (const f of findings) console.error(`  ${f}\n`);
  process.exit(1);
}
console.log('content-lint: clean');
