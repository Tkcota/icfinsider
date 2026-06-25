// ICF Insider — Main Cloudflare Worker
// Handles all API routes. Everything else is served as a static asset.
//
// API routes:
//   POST /api/submit         — lead form submissions → D1 + R2
//   GET  /api/listings       — contractor directory  → D1
//   GET  /api/admin/leads    — admin: view leads (requires ADMIN_KEY)
//   POST /api/admin/approve  — admin: approve lead → listings
//   POST /api/admin/reject   — admin: reject lead
//
// To add a new endpoint: add a handler function and a route below.

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // CORS preflight
    const allowedOrigins = ['https://icfinsider.com', 'https://www.icfinsider.com'];
    const origin = request.headers.get('Origin') || '';
    const corsOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': corsOrigin,
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Accept',
        },
      });
    }

    // ── API routes ────────────────────────────────────────────
    if (url.pathname === '/api/listings')      return handleListings(request, env);
    if (url.pathname === '/api/submit')        return handleSubmit(request, env);
    if (url.pathname === '/api/admin/leads')         return handleAdminLeads(request, env);
    if (url.pathname === '/api/admin/approve')       return handleAdminApprove(request, env);
    if (url.pathname === '/api/admin/reject')        return handleAdminReject(request, env);
    if (url.pathname === '/api/admin/geocode-all')   return handleGeocodeAll(request, env);

    // ── Redirect retired URLs to get-connected ──
    // /list-your-business is now its own page (served as a static asset).
    if (url.pathname === '/early-access' || url.pathname === '/early-access.html') {
      const newUrl = new URL('/get-connected' + url.search, url.origin);
      return Response.redirect(newUrl.href, 301);
    }

    // ── Pro profile pages + their sitemap (server-rendered from D1) ──
    if (url.pathname.startsWith('/pro/')) return handleProPage(request, env);
    if (url.pathname === '/sitemap-pros.xml') return handleProSitemap(request, env);

    // ── Static assets (HTML, CSS, JS, images, etc.) ──────────
    return env.ASSETS.fetch(request);
  },
};


// ── GET /api/listings ─────────────────────────────────────────────────────────
// Returns active directory listings, optionally filtered by state/pro_type/brand.

async function handleListings(request, env) {
  const cors = { 'Access-Control-Allow-Origin': 'https://icfinsider.com', 'Content-Type': 'application/json' };

  try {
    const url      = new URL(request.url);
    const state    = (url.searchParams.get('state')    || '').trim();
    const pro_type = (url.searchParams.get('pro_type') || '').trim();
    const brand    = (url.searchParams.get('brand')    || '').trim();

    // Explicit public column list — never expose owner email (or internal
    // fields like slug/active) to the public directory API.
    let sql = 'SELECT id, slug, business_name, pro_type, state, zip_code, city, lat, lng, ' +
              'phone, website, brands, project_types, service_area, featured ' +
              'FROM listings WHERE active = 1';
    const params = [];

    if (state)    { sql += ' AND state = ?';    params.push(state); }
    if (pro_type) { sql += " AND (',' || pro_type || ',') LIKE ?"; params.push(`%,${pro_type},%`); }
    if (brand)    { sql += " AND (',' || brands || ',') LIKE ?"; params.push(`%,${brand},%`); }

    sql += ' ORDER BY featured DESC, business_name ASC';

    const { results } = await env.DB.prepare(sql).bind(...params).all();

    const listings = results.map(r => ({
      ...r,
      brands:        r.brands        ? r.brands.split(',').map(s => s.trim())        : [],
      project_types: r.project_types ? r.project_types.split(',').map(s => s.trim()) : [],
    }));

    return new Response(JSON.stringify({ ok: true, listings }), { headers: cors });

  } catch (err) {
    console.error('Listings error:', err);
    return new Response(JSON.stringify({ ok: false, error: 'Failed to load listings.' }), {
      status: 500, headers: cors,
    });
  }
}


// ── GET /pro/[slug] ─────────────────────────────────────────────────────────
// Server-rendered profile page for a single active listing, built from D1.

async function handleProPage(request, env) {
  const url  = new URL(request.url);
  const slug = decodeURIComponent(url.pathname.replace(/^\/pro\//, '').replace(/\/+$/, '')).trim();

  // No slug, or a deeper sub-path → send to the directory.
  if (!slug || slug.includes('/')) {
    return Response.redirect(new URL('/find-a-pro', url.origin).href, 302);
  }

  try {
    const listing = await env.DB
      .prepare('SELECT * FROM listings WHERE slug = ? AND active = 1')
      .bind(slug)
      .first();

    // Not found or inactive → redirect to the directory (no dead page).
    if (!listing) {
      return Response.redirect(new URL('/find-a-pro', url.origin).href, 302);
    }

    const relatedRes = await env.DB
      .prepare('SELECT business_name, pro_type, city, slug FROM listings WHERE state = ? AND slug != ? AND active = 1 ORDER BY featured DESC, business_name ASC LIMIT 3')
      .bind(listing.state, slug)
      .all();

    const html = renderProPage(listing, relatedRes.results || []);
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=300',
      },
    });
  } catch (err) {
    console.error('Pro page error:', err);
    return Response.redirect(new URL('/find-a-pro', url.origin).href, 302);
  }
}

// ── Pro page helpers ──
function proEsc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function proTypeLabel(t) {
  const map = { contractor: 'Contractor / Builder', distributor: 'Distributor', architect: 'Architect / Designer', engineer: 'Structural Engineer', pool: 'ICF Pool Contractor' };
  return map[(t || '').trim().toLowerCase()] || (t || '').trim();
}
function proTypeLabels(proType) {
  return (proType || '').split(',').map(t => proTypeLabel(t)).filter(Boolean).join(' · ');
}
function proInitials(name) {
  const parts = (name || '').trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return 'IC';
  return (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
}
function proEnsureUrl(u) { return !u ? '' : (/^https?:\/\//i.test(u) ? u : 'https://' + u); }
function proFormatPhone(p) {
  const d = (p || '').replace(/\D/g, '');
  if (d.length === 10) return '(' + d.slice(0,3) + ') ' + d.slice(3,6) + '-' + d.slice(6);
  if (d.length === 11 && d[0] === '1') return '(' + d.slice(1,4) + ') ' + d.slice(4,7) + '-' + d.slice(7);
  return p || '';
}
function proList(csv) { return (csv || '').split(',').map(s => s.trim()).filter(Boolean); }

function renderProPage(l, related) {
  const name = l.business_name || 'ICF Professional';
  const location = l.city ? (l.city + ', ' + l.state) : l.state;
  const typeLabels = proTypeLabels(l.pro_type);
  const primaryType = proTypeLabel((l.pro_type || '').split(',')[0]);
  const brands = proList(l.brands);
  const projects = proList(l.project_types);
  const website = proEnsureUrl(l.website);
  const phoneFmt = proFormatPhone(l.phone);
  const phoneDigits = (l.phone || '').replace(/\D/g, '');

  let desc = (l.description || '').trim();
  if (!desc) {
    const b = brands.length ? (', working with ' + brands.join(' and ')) : '';
    const p = projects.length ? (' on ' + projects.join(' and ').toLowerCase() + ' projects') : '';
    desc = name + ' is an Insulated Concrete Form ' + primaryType.toLowerCase() + ' serving ' + location + b + p + '. Contact them directly to learn more or request a quote.';
  }

  const metaTitle = name + ' | ICF ' + primaryType + ' in ' + location;
  const metaDesc  = desc.length > 155 ? desc.slice(0, 152) + '...' : desc;

  const websiteBtn  = website ? '<a href="' + proEsc(website) + '" target="_blank" rel="noopener" class="btn btn-primary">Visit Website</a>' : '';
  const callBtn     = phoneDigits ? '<a href="tel:' + proEsc(phoneDigits) + '" class="btn btn-outline">Call ' + proEsc(phoneFmt) + '</a>' : '';
  const sideCallBtn = phoneDigits ? '<a href="tel:' + proEsc(phoneDigits) + '" class="btn btn-outline-dark">Call ' + proEsc(phoneFmt) + '</a>' : '';
  const badges = '<span class="pro-badge verified">Verified ICF Pro</span>' + (l.featured ? '<span class="pro-badge">Featured</span>' : '');

  const detailRows = [
    typeLabels ? '<li><span>Business type</span><span>' + proEsc(typeLabels) + '</span></li>' : '',
    brands.length ? '<li><span>ICF brands</span><span>' + proEsc(brands.join(', ')) + '</span></li>' : '',
    projects.length ? '<li><span>Project types</span><span>' + proEsc(projects.join(', ')) + '</span></li>' : '',
    l.service_area ? '<li><span>Service area</span><span>' + proEsc(l.service_area) + '</span></li>' : '',
    location ? '<li><span>Based in</span><span>' + proEsc(location) + '</span></li>' : '',
  ].join('');

  const relatedCards = (related || []).map(function (r) {
    return '<a href="/pro/' + proEsc(r.slug) + '" class="pro-rel-card"><div class="pro-rel-name">' + proEsc(r.business_name) + '</div><div class="pro-rel-meta">' + proEsc(proTypeLabels(r.pro_type)) + (r.city ? ' · ' + proEsc(r.city) + ', ' + proEsc(l.state) : '') + '</div></a>';
  }).join('');

  const relatedSection = relatedCards ?
    '<section class="pro-related"><div class="container"><h2>More ICF Pros in ' + proEsc(l.state) + '</h2><div class="pro-related-grid">' + relatedCards + '</div><div style="text-align:center;margin-top:var(--space-8);"><a href="/find-a-pro?state=' + encodeURIComponent(l.state) + '" class="btn btn-primary btn-lg">See All ICF Pros in ' + proEsc(l.state) + ' &rarr;</a></div></div></section>' : '';

  const ldJson = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "name": name,
    "description": desc,
    "url": "https://icfinsider.com/pro/" + l.slug,
    "telephone": l.phone || undefined,
    "areaServed": l.state || undefined,
    "address": { "@type": "PostalAddress", "addressLocality": l.city || undefined, "addressRegion": l.state || undefined, "addressCountry": "US" }
  });

  return '<!DOCTYPE html>\n<html lang="en">\n<head>\n'
    + '<script async src="https://www.googletagmanager.com/gtag/js?id=G-RF8D8L7VCV"></script>\n'
    + '<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","G-RF8D8L7VCV");</script>\n'
    + '<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
    + '<title>' + proEsc(metaTitle) + '</title>\n'
    + '<meta name="description" content="' + proEsc(metaDesc) + '">\n'
    + '<link rel="canonical" href="https://icfinsider.com/pro/' + proEsc(l.slug) + '">\n'
    + '<link rel="icon" type="image/svg+xml" href="/favicon.svg">\n'
    + '<meta property="og:type" content="website">\n'
    + '<meta property="og:title" content="' + proEsc(name) + ' | ICF Insider">\n'
    + '<meta property="og:description" content="' + proEsc(metaDesc) + '">\n'
    + '<meta property="og:url" content="https://icfinsider.com/pro/' + proEsc(l.slug) + '">\n'
    + '<link rel="preconnect" href="https://fonts.googleapis.com">\n'
    + '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
    + '<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">\n'
    + '<link rel="stylesheet" href="/css/main.css">\n<link rel="stylesheet" href="/css/components.css">\n'
    + '<script type="application/ld+json">' + ldJson + '</script>\n'
    + '</head>\n<body>\n'
    + '<nav class="nav" id="main-nav" aria-label="Main navigation"><div class="container nav-inner">'
    + '<a href="/" class="nav-logo" aria-label="ICF Insider home"><span class="nav-logo-text">ICF <span>Insider</span></span></a>'
    + '<ul class="nav-links" role="list"><li><a href="/icf-101" class="nav-link">ICF 101</a></li><li><a href="/cost-guide" class="nav-link">Cost Guide</a></li><li><a href="/brands" class="nav-link">Brand Comparison</a></li><li><a href="/find-a-pro" class="nav-link">Find a Pro</a></li></ul>'
    + '<div class="nav-cta"><a href="/get-connected" class="btn btn-primary">Get Connected</a></div>'
    + '<button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="nav-mobile"><span></span><span></span><span></span></button>'
    + '</div></nav>'
    + '<div class="nav-mobile" id="nav-mobile" role="navigation" aria-label="Mobile navigation"><a href="/icf-101" class="nav-link">ICF 101</a><a href="/cost-guide" class="nav-link">Cost Guide</a><a href="/brands" class="nav-link">Brand Comparison</a><a href="/find-a-pro" class="nav-link">Find a Pro</a><a href="/get-connected" class="btn btn-primary">Get Connected</a></div>'
    + '<section class="pro-hero"><div class="container">'
    + '<nav class="pro-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> &rsaquo; <a href="/find-a-pro">Find a Pro</a> &rsaquo; <a href="/find-a-pro?state=' + encodeURIComponent(l.state) + '">' + proEsc(l.state) + '</a> &rsaquo; ' + proEsc(name) + '</nav>'
    + '<div class="pro-header"><div class="pro-logo">' + proEsc(proInitials(name)) + '</div><div class="pro-header-main">'
    + '<h1 class="pro-name">' + proEsc(name) + '</h1>'
    + '<div class="pro-meta">'
    + '<span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> ' + proEsc(location) + '</span>'
    + (typeLabels ? '<span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg> ' + proEsc(typeLabels) + '</span>' : '')
    + (l.service_area ? '<span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg> ' + proEsc(l.service_area) + '</span>' : '')
    + '</div>'
    + '<div class="pro-badges">' + badges + '</div>'
    + '<div class="pro-actions">' + websiteBtn + callBtn + '</div>'
    + '</div></div></div></section>'
    + '<section class="pro-body"><div class="container"><div class="pro-layout">'
    + '<div class="pro-main"><h2>About ' + proEsc(name) + '</h2><p>' + proEsc(desc) + '</p><ul class="pro-details">' + detailRows + '</ul></div>'
    + '<aside class="pro-side"><div class="pro-side-card"><div class="pro-side-card-body">'
    + '<h3>Get in Touch</h3>'
    + '<p class="pro-side-card-note">Reach out to ' + proEsc(name) + ' directly to discuss your project or request a quote.</p>'
    + '<div class="pro-contact-row">' + websiteBtn + sideCallBtn + '</div>'
    + '</div></div></aside>'
    + '</div></div></section>'
    + relatedSection
    + '<footer class="footer" role="contentinfo"><div class="container"><div class="footer-grid">'
    + '<div class="footer-brand"><a href="/" class="nav-logo" aria-label="ICF Insider home"><span class="nav-logo-text">ICF <span>Insider</span></span></a><p>The independent authority on Insulated Concrete Form construction. Real data, unbiased comparisons, and a vetted network of ICF pros.</p></div>'
    + '<div class="footer-col"><h4>Learn</h4><ul class="footer-links" role="list"><li><a href="/icf-101" class="footer-link">ICF 101</a></li><li><a href="/cost-guide" class="footer-link">Cost Guide</a></li><li><a href="/brands" class="footer-link">Brand Comparison</a></li></ul></div>'
    + '<div class="footer-col"><h4>Directory</h4><ul class="footer-links" role="list"><li><a href="/find-a-pro" class="footer-link">Find a Pro</a></li><li><a href="/list-your-business" class="footer-link">List Your Business</a></li></ul></div>'
    + '<div class="footer-col"><h4>Company</h4><ul class="footer-links" role="list"><li><a href="/about" class="footer-link">About</a></li><li><a href="/privacy-policy" class="footer-link">Privacy Policy</a></li><li><a href="/terms-of-use" class="footer-link">Terms of Use</a></li></ul></div>'
    + '<div class="footer-col"><h4>Contact</h4><ul class="footer-links" role="list"><li><a href="mailto:tyler@icfinsider.com" class="footer-link" style="color:var(--color-accent);">tyler@icfinsider.com</a></li><li><a href="mailto:tyler@icfinsider.com?subject=Partnership%20Inquiry" class="footer-link">Partner With Us &rarr;</a></li></ul></div>'
    + '</div><div class="footer-bottom"><p>&copy; 2026 ICF Insider. All rights reserved.</p></div></div></footer>'
    + '<script src="/js/main.js"></script>\n</body>\n</html>';
}


// ── GET /sitemap-pros.xml ──
// Dynamic sitemap of all active pro profile pages, generated from D1 so it
// always reflects the current listings.
async function handleProSitemap(request, env) {
  try {
    const { results } = await env.DB.prepare('SELECT slug FROM listings WHERE active = 1 ORDER BY slug').all();
    const urls = (results || []).map(function (r) {
      return '  <url>\n    <loc>https://icfinsider.com/pro/' + r.slug + '</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.6</priority>\n  </url>';
    }).join('\n');
    const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls + '\n</urlset>\n';
    return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
  } catch (err) {
    console.error('Pro sitemap error:', err);
    return new Response('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>\n', { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
  }
}


// ── POST /api/submit ──────────────────────────────────────────────────────────
// Accepts lead form submissions, stores in D1, uploads files to R2.

async function handleSubmit(request, env) {
  const cors = { 'Access-Control-Allow-Origin': 'https://icfinsider.com', 'Content-Type': 'application/json' };

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  let formData;
  try {
    formData = await request.formData();
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid form data' }), {
      status: 400, headers: cors,
    });
  }

  // Extract fields
  const lead_type    = (formData.get('lead_type')    || 'homeowner').slice(0, 50);
  const name         = (formData.get('name')         || '').slice(0, 200);
  const email        = (formData.get('email')        || '').trim().slice(0, 200);
  const phone        = (formData.get('phone')        || '').slice(0, 50);
  const zip_code     = (formData.get('zip_code')      || '').slice(0, 20);
  const state        = (formData.get('state')        || '').slice(0, 100);
  const project_type = (formData.get('project_type') || '').slice(0, 100);
  const message      = (formData.get('message')      || '').slice(0, 2000);
  const company      = (formData.get('company')      || '').slice(0, 200);
  const brand        = (formData.get('brand')        || '').slice(0, 100);
  const role         = formData.getAll('role').map(r => r.trim().slice(0, 100)).filter(Boolean).join(',') || '';
  const interest     = (formData.get('interest')     || '').slice(0, 200);
  const file_link    = (formData.get('file_link')    || '').slice(0, 500);
  const website      = (formData.get('website')      || '').slice(0, 500);
  const service_area = (formData.get('service_area') || '').slice(0, 500);

  // Validate email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid email' }), {
      status: 400, headers: cors,
    });
  }

  // Validate website if provided — must look like a real domain
  if (website) {
    const stripped = website.replace(/^https?:\/\//i, '').replace(/\/.*$/, '').toLowerCase();
    const domainPattern = /^[a-z0-9]([a-z0-9\-]{0,61}[a-z0-9])?(\.[a-z]{2,})+$/i;
    if (!domainPattern.test(stripped)) {
      return new Response(JSON.stringify({ ok: false, error: 'Please enter a valid website (e.g. yourwebsite.com)' }), {
        status: 400, headers: cors,
      });
    }
  }

  // Validate required fields by lead type
  const missing = [];
  if (!name)  missing.push('name');
  if (!phone) missing.push('phone');
  if (lead_type === 'contractor') {
    if (!company)  missing.push('company');
    if (!role)     missing.push('role (Business Type)');
    if (!zip_code) missing.push('zip code');
  }
  if (missing.length > 0) {
    return new Response(JSON.stringify({ ok: false, error: 'Missing required fields: ' + missing.join(', ') }), {
      status: 400, headers: cors,
    });
  }

  // Handle file upload to R2
  let file_key = null;
  const file = formData.get('project_file');
  if (file && file.size > 0) {
    if (file.size > 100 * 1024 * 1024) {
      return new Response(JSON.stringify({ ok: false, error: 'File too large. Max 100MB.' }), {
        status: 400, headers: cors,
      });
    }
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 100);
    file_key = `leads/${Date.now()}-${safeName}`;
    try {
      await env.BUCKET.put(file_key, file.stream(), {
        httpMetadata: { contentType: file.type || 'application/octet-stream' },
      });
    } catch (e) {
      return new Response(JSON.stringify({ ok: false, error: 'File upload failed' }), {
        status: 500, headers: cors,
      });
    }
  }

  // Insert lead into D1
  try {
    await env.DB.prepare(`
      INSERT INTO leads
        (lead_type, name, email, phone, company, zip_code, state, project_type, brand, role, interest, message, website, service_area, file_key, file_link)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(lead_type, name, email, phone, company, zip_code, state, project_type, brand, role, interest, message, website, service_area, file_key, file_link).run();
  } catch (e) {
    console.error('DB insert error:', e);
    return new Response(JSON.stringify({ ok: false, error: 'Database error' }), {
      status: 500, headers: cors,
    });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: cors });
}


// ── ADMIN AUTH CHECK ──────────────────────────────────────────────────────────
function checkAdminAuth(request, env) {
  const key = request.headers.get('X-Admin-Key') || '';
  return key === (env.ADMIN_KEY || '');
}

const adminCors = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};


// ── GET /api/admin/leads ──────────────────────────────────────────────────────
// Returns all contractor leads filtered by status (pending/approved/rejected/all)

async function handleAdminLeads(request, env) {
  if (!checkAdminAuth(request, env)) {
    return new Response(JSON.stringify({ ok: false, error: 'Unauthorized' }), { status: 401, headers: adminCors });
  }

  const url    = new URL(request.url);
  const status = url.searchParams.get('status') || 'pending';

  try {
    let sql = `SELECT * FROM leads WHERE lead_type = 'contractor'`;
    if (status !== 'all') sql += ` AND (status = ? OR (status IS NULL AND ? = 'pending'))`;
    sql += ` ORDER BY created_at DESC`;

    const stmt = status !== 'all'
      ? env.DB.prepare(sql).bind(status, status)
      : env.DB.prepare(sql);

    const { results } = await stmt.all();
    return new Response(JSON.stringify({ ok: true, leads: results }), { headers: adminCors });
  } catch (e) {
    console.error('Admin leads error:', e);
    return new Response(JSON.stringify({ ok: false, error: 'Database error' }), { status: 500, headers: adminCors });
  }
}


// ── POST /api/admin/approve ───────────────────────────────────────────────────
// Approves a lead: inserts into listings table, marks lead as approved

async function handleAdminApprove(request, env) {
  if (!checkAdminAuth(request, env)) {
    return new Response(JSON.stringify({ ok: false, error: 'Unauthorized' }), { status: 401, headers: adminCors });
  }

  let body;
  try { body = await request.json(); } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid JSON' }), { status: 400, headers: adminCors });
  }

  const { id } = body;
  if (!id) return new Response(JSON.stringify({ ok: false, error: 'Missing id' }), { status: 400, headers: adminCors });

  try {
    // Fetch the lead
    const lead = await env.DB.prepare(`SELECT * FROM leads WHERE id = ?`).bind(id).first();
    if (!lead) return new Response(JSON.stringify({ ok: false, error: 'Lead not found' }), { status: 404, headers: adminCors });

    // Map role to pro_type
    const roleMap = {
      'Contractor / Builder': 'contractor',
      'ICF Distributor':      'distributor',
      'Architect / Designer': 'architect',
      'Structural Engineer':  'engineer',
      'ICF Pool Contractor':  'pool',
    };
    const pro_type = (lead.role || '').split(',').map(r => roleMap[r.trim()] || 'contractor').filter(Boolean).join(',');

    // Generate unique slug
    const baseSlug = (lead.company || 'business').toLowerCase()
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const stateSlug = (lead.state || 'us').toLowerCase()
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    let slug = `${baseSlug}-${stateSlug}`;

    // Check for duplicate listing by email
    const duplicate = await env.DB.prepare(
      `SELECT id, business_name FROM listings WHERE email = ? AND active = 1`
    ).bind(lead.email).first();
    if (duplicate) {
      return new Response(JSON.stringify({
        ok: false,
        error: `Already listed: "${duplicate.business_name}" (listing #${duplicate.id}) uses this email.`
      }), { status: 409, headers: adminCors });
    }

    // Check for slug collision and append id if needed
    const existing = await env.DB.prepare(`SELECT id FROM listings WHERE slug = ?`).bind(slug).first();
    if (existing) slug = `${slug}-${id}`;

    // Ensure website has a protocol prefix
    const website = lead.website
      ? (lead.website.match(/^https?:\/\//i) ? lead.website : 'https://' + lead.website)
      : '';

    // Look up city name and coordinates from zip code
    let city = '';
    let lat = null, lng = null;
    if (lead.zip_code && /^\d{5}/.test(lead.zip_code.trim())) {
      const zip5 = lead.zip_code.trim().slice(0, 5);
      try {
        const zipRes = await fetch(`https://api.zippopotam.us/us/${zip5}`);
        if (zipRes.ok) {
          const zipData = await zipRes.json();
          if (zipData.places?.[0]) {
            city = zipData.places[0]['place name'] || '';
            lat  = parseFloat(zipData.places[0].latitude)  || null;
            lng  = parseFloat(zipData.places[0].longitude) || null;
          }
        }
      } catch (e) { /* ignore */ }
    }
    // Fall back to state-level geocode if no zip coords
    if (!lat || !lng) {
      try {
        const geoQuery = encodeURIComponent((lead.state || 'USA') + ', USA');
        const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${geoQuery}&format=json&limit=1`, {
          headers: { 'User-Agent': 'ICFInsider/1.0 (icfinsider.com)' }
        });
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          if (geoData?.[0]) { lat = parseFloat(geoData[0].lat); lng = parseFloat(geoData[0].lon); }
        }
      } catch (e) { /* ignore */ }
    }

    // Insert into listings
    await env.DB.prepare(`
      INSERT INTO listings (slug, business_name, pro_type, state, zip_code, city, lat, lng, phone, website, email, brands, project_types, service_area, description, active, featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 0)
    `).bind(
      slug,
      lead.company || lead.name,
      pro_type,
      lead.state || '',
      lead.zip_code || '',
      city,
      lat,
      lng,
      lead.phone || '',
      website,
      lead.email || '',
      lead.brand || '',
      lead.project_type || '',
      lead.service_area || '',
      lead.message || ''
    ).run();

    // Mark lead as approved
    await env.DB.prepare(`UPDATE leads SET status = 'approved' WHERE id = ?`).bind(id).run();

    return new Response(JSON.stringify({ ok: true, slug }), { headers: adminCors });
  } catch (e) {
    console.error('Approve error:', e);
    return new Response(JSON.stringify({ ok: false, error: e.message || 'Database error' }), { status: 500, headers: adminCors });
  }
}


// ── POST /api/admin/reject ────────────────────────────────────────────────────
// Marks a lead as rejected

async function handleAdminReject(request, env) {
  if (!checkAdminAuth(request, env)) {
    return new Response(JSON.stringify({ ok: false, error: 'Unauthorized' }), { status: 401, headers: adminCors });
  }

  let body;
  try { body = await request.json(); } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid JSON' }), { status: 400, headers: adminCors });
  }

  const { id } = body;
  if (!id) return new Response(JSON.stringify({ ok: false, error: 'Missing id' }), { status: 400, headers: adminCors });

  try {
    await env.DB.prepare(`UPDATE leads SET status = 'rejected' WHERE id = ?`).bind(id).run();
    return new Response(JSON.stringify({ ok: true }), { headers: adminCors });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: 'Database error' }), { status: 500, headers: adminCors });
  }
}


// ── GET /api/admin/geocode-all ────────────────────────────────────────────────
// One-time: geocode all listings missing lat/lng and store coordinates in DB.

async function handleGeocodeAll(request, env) {
  if (!checkAdminAuth(request, env)) {
    return new Response(JSON.stringify({ ok: false, error: 'Unauthorized' }), { status: 401, headers: adminCors });
  }

  const { results } = await env.DB.prepare(
    `SELECT id, zip_code, state FROM listings WHERE lat IS NULL OR lng IS NULL`
  ).all();

  const updated = [];
  const failed  = [];

  // Canadian provinces — used to detect country and route geocoding correctly
  const canadianProvinces = new Set([
    'Alberta','British Columbia','Manitoba','New Brunswick','Newfoundland and Labrador',
    'Nova Scotia','Ontario','Prince Edward Island','Quebec','Saskatchewan',
    'Northwest Territories','Nunavut','Yukon'
  ]);

  for (const listing of results) {
    let lat = null, lng = null;
    const isCanada = canadianProvinces.has(listing.state || '');
    const postal   = (listing.zip_code || '').trim();

    // Try zippopotam.us first — supports US zip codes and Canadian postal codes
    if (postal) {
      try {
        let res;
        if (!isCanada && /^\d{5}/.test(postal)) {
          // US zip code (5 digits)
          res = await fetch(`https://api.zippopotam.us/us/${postal.slice(0, 5)}`);
        } else if (isCanada && /^[A-Za-z]\d[A-Za-z]/.test(postal)) {
          // Canadian postal code — use first 3 chars (FSA)
          res = await fetch(`https://api.zippopotam.us/ca/${postal.slice(0, 3).toUpperCase()}`);
        }
        if (res && res.ok) {
          const data = await res.json();
          if (data.places?.[0]) {
            lat = parseFloat(data.places[0].latitude);
            lng = parseFloat(data.places[0].longitude);
          }
        }
      } catch (e) {}
    }

    // Fall back to Nominatim (province/state-level) with delay to respect rate limit
    if (!lat || !lng) {
      try {
        const country = isCanada ? 'Canada' : 'USA';
        const query = encodeURIComponent((listing.state || country) + ', ' + country);
        const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`, {
          headers: { 'User-Agent': 'ICFInsider/1.0 (icfinsider.com)' }
        });
        if (res.ok) {
          const data = await res.json();
          if (data?.[0]) { lat = parseFloat(data[0].lat); lng = parseFloat(data[0].lon); }
        }
      } catch (e) {}
      // Respect Nominatim 1 req/sec limit
      await new Promise(r => setTimeout(r, 1100));
    }

    if (lat && lng) {
      await env.DB.prepare(`UPDATE listings SET lat = ?, lng = ? WHERE id = ?`).bind(lat, lng, listing.id).run();
      updated.push(listing.id);
    } else {
      failed.push(listing.id);
    }
  }

  return new Response(JSON.stringify({ ok: true, updated, failed }), { headers: adminCors });
}
