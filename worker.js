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

    // ── Redirect old URLs to get-connected ──
    if (url.pathname === '/early-access' || url.pathname === '/early-access.html' ||
        url.pathname === '/list-your-business' || url.pathname === '/list-your-business.html') {
      const newUrl = new URL('/get-connected.html' + url.search, url.origin);
      return Response.redirect(newUrl.href, 301);
    }

    // ── Redirect bare paths back to .html (fixes Google indexing) ──
    // Cloudflare Assets strips .html and redirects /brands → /brands
    // This sends Google back to the canonical .html URL
    const bare = url.pathname.match(/^\/([a-zA-Z0-9_-]+)$/);
    if (bare && bare[1] !== 'favicon') {
      const htmlUrl = url.pathname + '.html' + url.search;
      return Response.redirect(new URL(htmlUrl, url.origin).href, 301);
    }

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

    let sql = 'SELECT * FROM listings WHERE active = 1';
    const params = [];

    if (state)    { sql += ' AND state = ?';    params.push(state); }
    if (pro_type) { sql += ' AND pro_type = ?'; params.push(pro_type); }
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
  const role         = (formData.get('role')         || '').slice(0, 100);
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
    const pro_type = roleMap[lead.role] || 'contractor';

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
      INSERT INTO listings (slug, business_name, pro_type, state, zip_code, city, lat, lng, phone, website, email, brands, project_types, service_area, active, featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 0)
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
      lead.service_area || ''
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
