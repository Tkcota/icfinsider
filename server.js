// ============================================================
// ICF INSIDER — server.js
// Simple static file server for local development.
// Run with: node server.js
// Then open: http://localhost:3000
//
// This uses only Node.js built-in modules — no npm install needed.
// ============================================================

const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

// Map file extensions to the correct Content-Type header.
// Browsers need this to know how to handle each file.
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
};

const server = http.createServer(function (req, res) {
  // Strip query strings (?foo=bar) from the URL path
  let urlPath = req.url.split('?')[0];

  // Default to index.html for root and any directory path (trailing slash)
  if (urlPath === '/' || urlPath.endsWith('/')) urlPath = urlPath + 'index.html';

  // Build the full file path on disk
  const filePath = path.join(__dirname, urlPath);

  fs.readFile(filePath, function (err, data) {
    if (err) {
      // File not found — return a simple 404
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 — Page Not Found</h1>');
      return;
    }

    // Determine Content-Type from file extension
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, function () {
  console.log('ICF Insider dev server running at http://localhost:' + PORT);
});
