// ICF Insider — /api/listings
// GET /api/listings?state=Florida&pro_type=distributor&brand=Nudura
// Returns active listings as JSON, optionally filtered.

export async function onRequestGet({ request, env }) {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    const url   = new URL(request.url);
    const state    = (url.searchParams.get('state')    || '').trim();
    const pro_type = (url.searchParams.get('pro_type') || '').trim();
    const brand    = (url.searchParams.get('brand')    || '').trim();

    // Build query dynamically based on filters provided
    let sql    = 'SELECT * FROM listings WHERE active = 1';
    const params = [];

    if (state) {
      sql += ' AND state = ?';
      params.push(state);
    }
    if (pro_type) {
      sql += ' AND pro_type = ?';
      params.push(pro_type);
    }
    if (brand) {
      // brands is comma-separated so use LIKE
      sql += " AND (',' || brands || ',' LIKE ?)";
      params.push(`%,${brand},%`);
    }

    // Featured listings first, then alphabetical
    sql += ' ORDER BY featured DESC, business_name ASC';

    const { results } = await env.DB.prepare(sql).bind(...params).all();

    // Parse comma-separated fields back into arrays for the frontend
    const listings = results.map(r => ({
      ...r,
      brands:        r.brands        ? r.brands.split(',').map(s => s.trim())        : [],
      project_types: r.project_types ? r.project_types.split(',').map(s => s.trim()) : [],
    }));

    return new Response(JSON.stringify({ ok: true, listings }), { headers: cors });

  } catch (err) {
    console.error('Listings API error:', err);
    return new Response(
      JSON.stringify({ ok: false, error: 'Failed to load listings.' }),
      { status: 500, headers: cors }
    );
  }
}

// Handle preflight
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
