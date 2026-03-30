-- ICF Insider — D1 Database Schema
-- Run this once after creating your D1 database:
--   wrangler d1 execute icfinsider-leads --file=schema.sql
-- Or paste into Cloudflare Dashboard > D1 > Your DB > Console

CREATE TABLE IF NOT EXISTS leads (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  lead_type    TEXT NOT NULL,          -- 'homeowner' | 'contractor' | 'manufacturer' | 'newsletter'
  name         TEXT,
  email        TEXT NOT NULL,
  phone        TEXT,
  company      TEXT,
  state        TEXT,
  project_type TEXT,                   -- homeowner: Single-family home, etc.
  brand        TEXT,                   -- contractor: ICF brand they use
  role         TEXT,                   -- manufacturer: their role (ICF Manufacturer, etc.)
  interest     TEXT,                   -- manufacturer: what they want (sponsorship, ads, etc.)
  message      TEXT,
  file_key     TEXT,                   -- R2 object key for uploaded project file (optional)
  file_link    TEXT,                   -- Google Drive / Dropbox / WeTransfer link for large files
  created_at   TEXT DEFAULT (datetime('now'))
);

-- Index for fast filtering by lead type (you'll use this often)
CREATE INDEX IF NOT EXISTS idx_leads_lead_type ON leads (lead_type);

-- Index for date-range queries
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at);


-- -------------------------------------------------------
-- LISTINGS — ICF contractor / distributor directory
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS listings (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  slug          TEXT NOT NULL UNIQUE,   -- URL-safe identifier e.g. gdp-industries-florida
  business_name TEXT NOT NULL,
  pro_type      TEXT NOT NULL,          -- 'contractor' | 'distributor' | 'architect' | 'engineer'
  state         TEXT NOT NULL,          -- e.g. 'Florida'
  city          TEXT,                   -- e.g. 'Tampa' or leave blank for statewide
  service_area  TEXT,                   -- plain-text e.g. 'All of Florida'
  phone         TEXT,
  website       TEXT,
  email         TEXT,
  brands        TEXT,                   -- comma-separated: 'Nudura,Fox Blocks'
  project_types TEXT,                   -- comma-separated: 'Residential,Commercial'
  description   TEXT,
  featured      INTEGER DEFAULT 0,      -- 1 = featured placement
  active        INTEGER DEFAULT 1,      -- 0 = hidden
  created_at    TEXT DEFAULT (datetime('now'))
);

-- Fast lookups by state and type
CREATE INDEX IF NOT EXISTS idx_listings_state    ON listings (state);
CREATE INDEX IF NOT EXISTS idx_listings_pro_type ON listings (pro_type);
CREATE INDEX IF NOT EXISTS idx_listings_active   ON listings (active);
