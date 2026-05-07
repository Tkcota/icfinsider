/**
 * fix-dashes.js
 * Removes unnecessary em/en dashes (— –) from prose across all HTML pages.
 *
 * Rules:
 *   KEEP  - numeric/currency ranges:  5–15%, $160–$280, $3.50–$6.00, etc.
 *   KEEP  - standalone table placeholders: <td>—</td>
 *   COLON - headings (h1-h6) and page <title> / og:title
 *   COLON - <strong>Label</strong> — description  →  <strong>Label</strong>: description
 *   COMMA - all other prose:  word — word  →  word, word
 *
 * Skips: brands/nudura/states/ (already cleaned), .wrangler, node_modules, .git
 */

const fs   = require('fs');
const path = require('path');

const BASE_DIR = 'C:\\Users\\tkcot\\Project ICFInsider';

// ─── File discovery ──────────────────────────────────────────────────────────

function findHtmlFiles(dir, results = []) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); }
  catch (e) { return results; }

  for (const entry of entries) {
    // Skip build/tool directories
    if (['.wrangler', 'node_modules', '.git'].includes(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Skip Nudura brand+state pages — already clean
      const rel = fullPath.replace(BASE_DIR, '').replace(/\\/g, '/');
      if (rel.startsWith('/brands/nudura/states/')) continue;
      findHtmlFiles(fullPath, results);
    } else if (entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

// ─── Line-level dash fixer ───────────────────────────────────────────────────

function fixLine(line) {
  // Fast exit — no dash characters present
  if (!/[–—]/.test(line)) return line;

  // ── Step 1: protect things we must NOT change ──────────────────────────────
  const tokens = [];
  const protect = str => {
    tokens.push(str);
    return `XPROTX${tokens.length - 1}X`;
  };

  let r = line;

  // Protect numeric/currency ranges  e.g. 5–15%  $160–$280  $3.50–$6.00
  r = r.replace(/\$?[\d,]+\.?\d*\s*[–—]\s*\$?[\d,]+\.?\d*%?/g, protect);

  // Protect standalone table-cell placeholder  <td>—</td>
  r = r.replace(/<td[^>]*>\s*[–—]\s*<\/td>/g, protect);

  // Nothing left to change? Restore and return
  if (!/[–—]/.test(r)) {
    tokens.forEach((t, i) => { r = r.split(`XPROTX${i}X`).join(t); });
    return r;
  }

  // ── Step 2: context-aware replacement ─────────────────────────────────────
  const inHeading  = /<h[1-6][^>]*>/i.test(r);
  const inTitle    = /<title>/i.test(r) || /og:title/i.test(r);

  if (inHeading || inTitle) {
    // Headings and page titles: dash becomes a colon
    // e.g.  Step 1 — Foundation  →  Step 1: Foundation
    r = r.replace(/\s*[–—]\s*/g, ': ');

  } else {
    // List items with bold label:  </strong> — text  →  </strong>: text
    r = r.replace(/<\/strong>\s*[–—]\s*/g, '</strong>: ');

    // General prose:  word — word  →  word, word
    r = r.replace(/\s+[–—]\s+/g, ', ');

    // Trailing dash before a closing tag  e.g.  "...alone —</p>"
    r = r.replace(/\s*[–—]\s*(<\/)/g, ' $1');

    // Any remaining stray dashes
    r = r.replace(/\s*[–—]\s*/g, ', ');
  }

  // ── Step 3: restore protected tokens ──────────────────────────────────────
  tokens.forEach((t, i) => { r = r.split(`XPROTX${i}X`).join(t); });

  return r;
}

// ─── File processor ──────────────────────────────────────────────────────────

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fixed   = content.split('\n').map(fixLine).join('\n');

  if (fixed !== content) {
    fs.writeFileSync(filePath, fixed, 'utf8');
    return true;
  }
  return false;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const files   = findHtmlFiles(BASE_DIR);
let   changed = 0;

files.forEach(fp => {
  if (processFile(fp)) {
    console.log(`✓  ${path.relative(BASE_DIR, fp)}`);
    changed++;
  }
});

console.log(`\nDone — ${changed} of ${files.length} files updated.`);
