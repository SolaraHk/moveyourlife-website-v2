// Post-build prerender for the single-page SPA.
//
// Why: the app ships an empty <div id="root"> and renders all body content with
// React on the client. Googlebot executes JS and copes, but Bing, social/AI
// crawlers and "view source" see no content. This snapshots the fully-rendered
// DOM back into dist/index.html so the real text is in the served HTML, while
// keeping the module <script> so React still mounts and runs for real users.
//
// Safety: this NEVER hard-fails a deploy. On any error (no Chrome, render
// timeout, missing content) it logs a warning, leaves the normal SPA
// dist/index.html untouched, and exits 0. Requires Google Chrome on this Mac.

import { preview } from 'vite';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const DIST_INDEX = resolve('dist/index.html');
const MUST_CONTAIN = '無創徒手小顏術'; // page must render this or we keep the SPA build

async function run() {
  const original = readFileSync(DIST_INDEX, 'utf8');

  let chromium;
  try {
    ({ chromium } = await import('playwright'));
  } catch {
    console.warn('[prerender] playwright not installed — keeping SPA build');
    return;
  }

  const server = await preview({
    preview: { host: '127.0.0.1', port: 0 },
    logLevel: 'silent'
  });
  const url = server.resolvedUrls?.local?.[0];
  if (!url) {
    server.httpServer?.close?.();
    throw new Error('preview server gave no URL');
  }

  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForSelector('#root h1', { timeout: 15000 });

    // Trigger whileInView reveals so content settles to opacity:1, then reset.
    await page.evaluate(async () => {
      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
      const h = document.body.scrollHeight;
      for (let y = 0; y <= h; y += 500) { window.scrollTo(0, y); await sleep(50); }
      window.scrollTo(0, 0);
      await sleep(300);
    });
    await page.waitForTimeout(400);

    let html = await page.content();
    if (!html.includes(MUST_CONTAIN) || !html.includes('id="root"')) {
      throw new Error('rendered HTML missing expected content');
    }
    if (!/^<!doctype html>/i.test(html.trim())) html = '<!doctype html>\n' + html;

    writeFileSync(DIST_INDEX, html);
    console.log(`[prerender] wrote prerendered dist/index.html (${html.length.toLocaleString()} bytes, body now populated)`);
  } catch (err) {
    writeFileSync(DIST_INDEX, original); // restore the untouched SPA build
    throw err;
  } finally {
    await browser?.close().catch(() => {});
    server.httpServer?.close?.();
  }
}

run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.warn('[prerender] skipped (' + err.message + ') — SPA build kept, deploy is safe');
    process.exit(0);
  });
