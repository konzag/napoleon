#!/usr/bin/env node
// Link check (L1-37): every link on the given pages must answer.
//   node tools/check-links.mjs [page.html ...]      (default: school-game/school.html)
// - http(s) links: GET, redirects followed, the final answer must be 2xx (a 3xx chain that ends in 2xx is fine),
//   and a redirect must not drop the page the link names (soft 404, see below); one retry after 3 s for a network error or a 5xx/429, then it fails.
// - relative links: the file must exist in the repo (the hub serves the repo as it is).
// Exit 0 = all answer, 1 = at least one does not. Needs network: CI job «links» (GitHub-hosted runner).
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pages = process.argv.slice(2).length ? process.argv.slice(2) : ['school-game/school.html'];
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchStatus(url) {
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(url, {
        redirect: 'follow',
        headers: { 'User-Agent': UA, 'Accept-Language': 'el-GR,el;q=0.9' },
        signal: AbortSignal.timeout(30_000),
      });
      await res.body?.cancel();
      if ((res.status >= 500 || res.status === 429) && attempt < 2) { await sleep(3000); continue; }
      const info = `${res.status}${res.redirected ? ` -> ${res.url}` : ''}`;
      // Soft 404: wordwall answers an unknown tag page with a redirect to its generic /community page (200).
      // A redirect that drops the last path segment of the link lands somewhere else, so it does not count.
      const last = decodeURIComponent(new URL(url).pathname.split('/').filter(Boolean).pop() || '').toLowerCase();
      if (res.redirected && last && !decodeURIComponent(new URL(res.url).pathname).toLowerCase().includes(last)) {
        return { ok: false, info: `${info} (soft 404: redirected away from "${last}")` };
      }
      return { ok: res.status >= 200 && res.status < 400, info };
    } catch (e) {
      if (attempt < 2) { await sleep(3000); continue; }
      return { ok: false, info: `error ${e.cause?.code || e.name}` };
    }
  }
}

let failed = 0;
for (const page of pages) {
  const html = readFileSync(join(ROOT, page), 'utf8');
  const hrefs = [...new Set([...html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)].map((m) => m[1]))];
  if (hrefs.length === 0) { console.log(`FAIL ${page}: no links found`); failed++; }
  for (const href of hrefs) {
    let result;
    if (/^https?:\/\//i.test(href)) result = await fetchStatus(href);
    else if (/^(#|mailto:|tel:)/i.test(href)) continue;
    else if (href.startsWith('/')) result = { ok: true, info: 'hub path (served by games-hub)' };
    else {
      const file = join(dirname(join(ROOT, page)), href.split(/[?#]/)[0]);
      result = { ok: existsSync(file), info: existsSync(file) ? 'file exists' : 'missing file' };
    }
    console.log(`${result.ok ? 'ok  ' : 'FAIL'} ${page}: ${href} (${result.info})`);
    if (!result.ok) failed++;
  }
}
console.log(failed ? `${failed} link(s) do not answer` : 'every link answers');
process.exit(failed ? 1 : 0);
