// Build-time prerender: writes a static HTML file per route with the correct
// <title>, meta description, canonical and Open Graph tags, and regenerates
// sitemap.xml. Runs after `vite build`. No headless browser required — it
// injects the per-route head (sourced from src/seo/routes.json) into the built
// index.html shell. The app body still hydrates client-side.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const config = JSON.parse(readFileSync('src/seo/routes.json', 'utf8'));
const SITE = config.site;
const baseHtml = readFileSync(join(DIST, 'index.html'), 'utf8');

const escapeAttr = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const urlFor = (path) => (path === '/' ? `${SITE}/` : `${SITE}${path}`);

function renderRoute(route) {
  const url = urlFor(route.path);
  let html = baseHtml;

  // Title + description + canonical
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(route.title)}</title>`);
  html = html.replace(/\s*<meta name="description"[^>]*>/g, '');
  html = html.replace(/\s*<link rel="canonical"[^>]*>/g, '');
  html = html.replace(
    /(<title>[\s\S]*?<\/title>)/,
    `$1\n    <meta name="description" content="${escapeAttr(route.description)}" />\n    <link rel="canonical" href="${url}" />`,
  );

  // Per-route Open Graph
  html = html.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${escapeAttr(route.title)}$2`);
  html = html.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${escapeAttr(route.description)}$2`);
  html = html.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`);

  return html;
}

const today = new Date().toISOString().slice(0, 10);
const sitemapEntries = [];

for (const route of config.routes) {
  const html = renderRoute(route);
  const outDir = route.path === '/' ? DIST : join(DIST, route.path);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), html);

  sitemapEntries.push(
    [
      '  <url>',
      `    <loc>${urlFor(route.path)}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      `    <changefreq>${route.changefreq}</changefreq>`,
      `    <priority>${route.priority}</priority>`,
      '  </url>',
    ].join('\n'),
  );
}

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapEntries,
  '</urlset>',
  '',
].join('\n');

writeFileSync(join(DIST, 'sitemap.xml'), sitemap);
console.log(`Prerendered ${config.routes.length} routes and wrote dist/sitemap.xml`);
