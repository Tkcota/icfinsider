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
  created_at   TEXT DEFAULT (datetime('now'))
);

-- Index for fast filtering by lead type (you'll use this often)
CREATE INDEX IF NOT EXISTS idx_leads_lead_type ON leads (lead_type);

-- Index for date-range queries
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at);
