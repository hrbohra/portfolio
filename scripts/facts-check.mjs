/**
 * Facts guard (ADR 0006): the metrics bank in content/facts.ts must still contain every
 * canonical token in content/canonical/facts.json. Protects the numbers the site cites
 * from accidental edits. Add to the canonical list when a new fact is approved; never
 * remove to make CI pass.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const factsSource = fs.readFileSync(path.join(ROOT, 'content', 'facts.ts'), 'utf8');
const canonical = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'content', 'canonical', 'facts.json'), 'utf8'),
);

const missing = canonical.tokens.filter((t) => !factsSource.includes(t));

if (missing.length) {
  console.error(`facts-check: ${missing.length} canonical value(s) missing from content/facts.ts:`);
  for (const t of missing) console.error(`  ${t}`);
  process.exit(1);
}
console.log(`facts-check: all ${canonical.tokens.length} canonical values present`);
