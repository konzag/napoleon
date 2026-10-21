// Tiny stand-in for games-hub, for the Playwright tests only (127.0.0.1, no dependencies):
//   /napoleon/...              -> the file of this repo (like the hub serves it), HTML with the hub's CSP
//   /                          -> a tiny "hub" page (the 🏠 button of hub-shell goes there)
//   /static/fonts/comfortaa.css -> empty stylesheet (the real one lives in the hub)
// Copied from konzag/games-template tests/serve.mjs; the repo root is served under /napoleon/ like the hub.
// It lives in tests/ui/ (not tests/) because CI runs every tests/*.mjs with node.
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gameCsp } from './hub-csp.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const port = Number(process.env.PORT || 4319);
const PREFIX = '/napoleon/';
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.mp3': 'audio/mpeg',
  '.ogg': 'audio/ogg',
};

http
  .createServer((req, res) => {
    const url = new URL(req.url, 'http://127.0.0.1');
    if (url.pathname === '/static/fonts/comfortaa.css') {
      res.writeHead(200, { 'Content-Type': 'text/css' });
      return res.end('');
    }
    if (url.pathname === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Content-Security-Policy': "default-src 'none'" });
      return res.end('<!doctype html><html lang="el"><title>hub</title><h1>Τα Παιχνίδια μας</h1></html>');
    }
    if (url.pathname === '/napoleon') {
      res.writeHead(301, { Location: PREFIX });
      return res.end();
    }
    if (!url.pathname.startsWith(PREFIX)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('not found');
    }
    const sub = url.pathname.slice(PREFIX.length);
    const rel = sub === '' ? 'index.html' : decodeURIComponent(sub);
    const file = path.resolve(root, rel);
    const type = TYPES[path.extname(file)];
    if (!file.startsWith(root + path.sep) || !type || rel.split('/').some((p) => p.startsWith('.') || p === 'tests' || p === 'node_modules') || !fs.existsSync(file)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('not found');
    }
    const body = fs.readFileSync(file);
    const headers = { 'Content-Type': type, 'Cache-Control': 'no-store' };
    if (type.startsWith('text/html')) headers['Content-Security-Policy'] = gameCsp(body.toString('utf8'));
    res.writeHead(200, headers);
    res.end(body);
  })
  .listen(port, '127.0.0.1', () => console.log(`napoleon test server on http://127.0.0.1:${port}${PREFIX}`));
