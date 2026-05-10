/**
 * update-cost-seo.js
 * Updates title, meta description, og:title, and og:description
 * on all 50 state cost pages to improve Google click-through rate.
 *
 * New title:       How Much Does ICF Cost in [State]? Real Numbers + Local Experts | ICF Insider
 * New description: ICF homes in [State] run $160–$280/sq ft finished. See what drives
 *                  the price, why [State] builders choose ICF, and find a local ICF contractor free.
 */

const fs   = require('fs');
const path = require('path');

const BASE_DIR    = 'C:\\Users\\tkcot\\Project ICFInsider';
const STATES_DIR  = path.join(BASE_DIR, 'states');

// Slug → proper state name
const STATES = {
  alabama:        'Alabama',
  alaska:         'Alaska',
  arizona:        'Arizona',
  arkansas:       'Arkansas',
  california:     'California',
  colorado:       'Colorado',
  connecticut:    'Connecticut',
  delaware:       'Delaware',
  florida:        'Florida',
  georgia:        'Georgia',
  hawaii:         'Hawaii',
  idaho:          'Idaho',
  illinois:       'Illinois',
  indiana:        'Indiana',
  iowa:           'Iowa',
  kansas:         'Kansas',
  kentucky:       'Kentucky',
  louisiana:      'Louisiana',
  maine:          'Maine',
  maryland:       'Maryland',
  massachusetts:  'Massachusetts',
  michigan:       'Michigan',
  minnesota:      'Minnesota',
  mississippi:    'Mississippi',
  missouri:       'Missouri',
  montana:        'Montana',
  nebraska:       'Nebraska',
  nevada:         'Nevada',
  'new-hampshire':'New Hampshire',
  'new-jersey':   'New Jersey',
  'new-mexico':   'New Mexico',
  'new-york':     'New York',
  'north-carolina':'North Carolina',
  'north-dakota': 'North Dakota',
  ohio:           'Ohio',
  oklahoma:       'Oklahoma',
  oregon:         'Oregon',
  pennsylvania:   'Pennsylvania',
  'rhode-island': 'Rhode Island',
  'south-carolina':'South Carolina',
  'south-dakota': 'South Dakota',
  tennessee:      'Tennessee',
  texas:          'Texas',
  utah:           'Utah',
  vermont:        'Vermont',
  virginia:       'Virginia',
  washington:     'Washington',
  'west-virginia':'West Virginia',
  wisconsin:      'Wisconsin',
  wyoming:        'Wyoming',
};

let updated = 0;

Object.entries(STATES).forEach(([slug, name]) => {
  const filePath = path.join(STATES_DIR, slug, 'cost.html');
  if (!fs.existsSync(filePath)) {
    console.log(`⚠  Missing: ${slug}/cost.html`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  const title       = `How Much Does ICF Cost in ${name}? Real Numbers + Local Experts | ICF Insider`;
  const description = `ICF homes in ${name} run $160–$280/sq ft finished. See what drives the price, why ${name} builders choose ICF, and find a local ICF contractor free.`;
  const ogTitle     = `How Much Does ICF Cost in ${name}? Real Numbers + Local Experts`;

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

console.log(`\nDone — ${updated} state cost pages updated.`);
