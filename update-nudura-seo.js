/**
 * update-nudura-seo.js
 * Updates title, meta description, og:title, and og:description
 * on all 50 Nudura brand+state pages to improve Google click-through rate.
 *
 * New title:       Nudura ICF in [State]: Specs, Costs & Find Contractors Free | ICF Insider
 * New description: Building with Nudura ICF in [State]? Get full specs, real cost expectations,
 *                  and connect with certified Nudura contractors near you — free.
 *                  Hurricane-rated walls, R-22 to R-28 insulation, and 50–70% lower energy bills.
 */

const fs   = require('fs');
const path = require('path');

const BASE_DIR   = 'C:\\Users\\tkcot\\Project ICFInsider';
const NUDURA_DIR = path.join(BASE_DIR, 'brands', 'nudura', 'states');

const STATES = {
  alabama:         'Alabama',
  alaska:          'Alaska',
  arizona:         'Arizona',
  arkansas:        'Arkansas',
  california:      'California',
  colorado:        'Colorado',
  connecticut:     'Connecticut',
  delaware:        'Delaware',
  florida:         'Florida',
  georgia:         'Georgia',
  hawaii:          'Hawaii',
  idaho:           'Idaho',
  illinois:        'Illinois',
  indiana:         'Indiana',
  iowa:            'Iowa',
  kansas:          'Kansas',
  kentucky:        'Kentucky',
  louisiana:       'Louisiana',
  maine:           'Maine',
  maryland:        'Maryland',
  massachusetts:   'Massachusetts',
  michigan:        'Michigan',
  minnesota:       'Minnesota',
  mississippi:     'Mississippi',
  missouri:        'Missouri',
  montana:         'Montana',
  nebraska:        'Nebraska',
  nevada:          'Nevada',
  'new-hampshire': 'New Hampshire',
  'new-jersey':    'New Jersey',
  'new-mexico':    'New Mexico',
  'new-york':      'New York',
  'north-carolina':'North Carolina',
  'north-dakota':  'North Dakota',
  ohio:            'Ohio',
  oklahoma:        'Oklahoma',
  oregon:          'Oregon',
  pennsylvania:    'Pennsylvania',
  'rhode-island':  'Rhode Island',
  'south-carolina':'South Carolina',
  'south-dakota':  'South Dakota',
  tennessee:       'Tennessee',
  texas:           'Texas',
  utah:            'Utah',
  vermont:         'Vermont',
  virginia:        'Virginia',
  washington:      'Washington',
  'west-virginia': 'West Virginia',
  wisconsin:       'Wisconsin',
  wyoming:         'Wyoming',
};

let updated = 0;

Object.entries(STATES).forEach(([slug, name]) => {
  const filePath = path.join(NUDURA_DIR, slug, 'index.html');
  if (!fs.existsSync(filePath)) {
    console.log(`⚠  Missing: ${slug}/index.html`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  const title       = `Nudura ICF in ${name}: Specs, Costs &amp; Find Contractors Free | ICF Insider`;
  const ogTitle     = `Nudura ICF in ${name}: Specs, Costs &amp; Find Contractors Free`;
  const description = `Building with Nudura ICF in ${name}? Get full specs, real cost expectations, and connect with certified Nudura contractors near you, free. Hurricane-rated walls, R-22 to R-28 insulation, and 50–70% lower energy bills.`;

  // Update <title>
  content = content.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);

  // Update meta description
  content = content.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${description}">`
  );

  // Update og:title
  content = content.replace(
    /<meta property="og:title" content="[^"]*">/,
    `<meta property="og:title" content="${ogTitle}">`
  );

  // Update og:description
  content = content.replace(
    /<meta property="og:description" content="[^"]*">/,
    `<meta property="og:description" content="${description}">`
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓  ${slug}`);
  updated++;
});

console.log(`\nDone — ${updated} Nudura state pages updated.`);
