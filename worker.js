// ICF Insider — Main Cloudflare Worker
// Handles all API routes. Everything else is served as a static asset.
//
// API routes:
//   POST /api/submit   — lead form submissions → D1 + R2
//   GET  /api/listings — contractor directory  → D1
//
// To add a new endpoint: add a handler function and a route below.

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Accept',
        },
      });
    }

    // ── API routes ────────────────────────────────────────────
    if (url.pathname === '/api/listings') return handleListings(request, env);
    if (url.pathname === '/api/submit')   return handleSubmit(request, env);

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
  const cors = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' };

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
  const cors = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' };

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
  const state        = (formData.get('state')        || '').slice(0, 100);
  const project_type = (formData.get('project_type') || '').slice(0, 100);
  const message      = (formData.get('message')      || '').slice(0, 2000);
  const company      = (formData.get('company')      || '').slice(0, 200);
  const brand        = (formData.get('brand')        || '').slice(0, 100);
  const role         = (formData.get('role')         || '').slice(0, 100);
  const interest     = (formData.get('interest')     || '').slice(0, 200);
  const file_link    = (formData.get('file_link')    || '').slice(0, 500);

  // Validate email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid email' }), {
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
        (lead_type, name, email, phone, company, state, project_type, brand, role, interest, message, file_key, file_link)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(lead_type, name, email, phone, company, state, project_type, brand, role, interest, message, file_key, file_link).run();
  } catch (e) {
    console.error('DB insert error:', e);
    return new Response(JSON.stringify({ ok: false, error: 'Database error' }), {
      status: 500, headers: cors,
    });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: cors });
}
