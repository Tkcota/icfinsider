/* ============================================================
   ICF INSIDER — Cloudflare Pages Function: /api/submit
   Receives form POSTs and stores leads in Cloudflare D1.

   How it works:
   - All 4 forms (homeowner, contractor, manufacturer, newsletter)
     POST here with a hidden `lead_type` field.
   - We insert one row per submission into the `leads` table.
   - Returns JSON so the front-end fetch() can check response.ok.

   D1 binding name: DB  (set in Cloudflare Pages > Settings > Functions > D1)
   ============================================================ */

export async function onRequestPost(context) {
  const { request, env } = context;

  // ----------------------------------------------------------
  // 1. Parse the incoming form data
  // ----------------------------------------------------------
  let formData;
  try {
    formData = await request.formData();
  } catch {
    return jsonResponse({ error: 'Invalid request body' }, 400);
  }

  const lead_type    = (formData.get('lead_type')    || 'unknown').trim();
  const name         = (formData.get('name')         || '').trim();
  const email        = (formData.get('email')        || '').trim();
  const phone        = (formData.get('phone')        || '').trim();
  const company      = (formData.get('company')      || '').trim();
  const state        = (formData.get('state')        || '').trim();
  const project_type = (formData.get('project_type') || '').trim();
  const brand        = (formData.get('brand')        || '').trim();
  const role         = (formData.get('role')         || '').trim();
  const interest     = (formData.get('interest')     || '').trim();
  const message      = (formData.get('message')      || '').trim();

  // ----------------------------------------------------------
  // 2. Basic server-side validation
  // ----------------------------------------------------------
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return jsonResponse({ error: 'A valid email address is required.' }, 400);
  }

  // ----------------------------------------------------------
  // 3. Insert into D1
  // ----------------------------------------------------------
  try {
    await env.DB.prepare(`
      INSERT INTO leads
        (lead_type, name, email, phone, company, state, project_type, brand, role, interest, message)
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    .bind(lead_type, name, email, phone, company, state, project_type, brand, role, interest, message)
    .run();
  } catch (err) {
    // Log server-side but don't expose internals to client
    console.error('D1 insert failed:', err);
    return jsonResponse({ error: 'Database error — please try again.' }, 500);
  }

  return jsonResponse({ ok: true }, 200);
}

// ----------------------------------------------------------
// Helper: build a JSON response with the right headers
// ----------------------------------------------------------
function jsonResponse(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      // Allow same-origin requests (Pages serves everything on one domain)
      'Access-Control-Allow-Origin': 'https://icfinsider.com',
    },
  });
}
