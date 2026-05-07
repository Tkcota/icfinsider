/**
 * fix-html-links.js
 * Removes .html from all internal href links across the site.
 * External links (http/https) are left untouched.
 *
 * e.g.  href="icf-101.html"              →  href="icf-101"
 *        href="/get-connected.html?tab=x"  →  href="/get-connected?tab=x"
 */

const fs   = require('fs');
const path = require('path');

const BASE_DIR = 'C:\\Users\\tkcot\\Project ICFInsider';

function findHtmlFiles(dir, results = []) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); }
  catch (e) { return results; }

  for (const entry of entries) {
    if (['.wrangler', 'node_modules', '.git'].includes(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findHtmlFiles(fullPath, results);
    } else if (entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

function fixLinks(content) {
  // Match href="..." where the value is an internal link ending in .html
  // Internal = does NOT start with http:// or https://
  return content.replace(
    /href="(?!https?:\/\/)([^"]*?)\.html([?#][^"]*)?"/g,
    (match, path, suffix) => `href="${path}${suffix || ''}"`
  );
}

const files   = findHtmlFiles(BASE_DIR);
let   changed = 0;

files.forEach(fp => {
  const content = fs.readFileSync(fp, 'utf8');
  const fixed   = fixLinks(content);

  if (fixed !== content) {
    fs.writeFileSync(fp, fixed, 'utf8');
    console.log(`✓  ${path.relative(BASE_DIR, fp)}`);
    changed++;
  }
});

console.log(`\nDone — ${changed} of ${files.length} files updated.`);
