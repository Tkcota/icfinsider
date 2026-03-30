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
  const file_link    = (formData.get('file_link')    || '').trim();

  // ----------------------------------------------------------
  // 2. Basic server-side validation
  // ----------------------------------------------------------
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return jsonResponse({ error: 'A valid email address is required.' }, 400);
  }

  // ----------------------------------------------------------
  // 3. Handle optional file upload → R2
  // ----------------------------------------------------------
  let file_key = '';
  const uploadedFile = formData.get('project_file');

  if (uploadedFile && typeof uploadedFile === 'object' && uploadedFile.size > 0) {
    if (!env.BUCKET) {
      // R2 bucket not bound — skip file storage, still save the lead
      console.warn('R2 BUCKET binding not configured; skipping file upload.');
    } else {
      try {
        // Build a unique key: uploads/{timestamp}-{sanitised-filename}
        const safeName = uploadedFile.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
        file_key = `uploads/${Date.now()}-${safeName}`;

        await env.BUCKET.put(file_key, uploadedFile.stream(), {
          httpMetadata: { contentType: uploadedFile.type || 'application/octet-stream' },
          customMetadata: {
            originalName: uploadedFile.name,
            submittedBy:  email,
            leadState:    state,
          },
        });
      } catch (err) {
        console.error('R2 upload failed:', err);
        // Don't block the lead save if file upload fails
        file_key = '';
      }
    }
  }

  // ----------------------------------------------------------
  // 4. Insert into D1
  // ----------------------------------------------------------
  try {
    await env.DB.prepare(`
      INSERT INTO leads
        (lead_type, name, email, phone, company, state, project_type, brand, role, interest, message, file_key, file_link)
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    .bind(lead_type, name, email, phone, company, state, project_type, brand, role, interest, message, file_key, file_link)
    .run();
  } catch (err) {
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
