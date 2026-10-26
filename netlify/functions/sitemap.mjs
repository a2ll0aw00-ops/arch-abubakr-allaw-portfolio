const SITE_ORIGIN = 'https://arch-abubakrallaw.netlify.app';
const SANITY_PROJECT_ID = '0nta1uyv';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = '2026-10-22';

const STATIC_PATHS = [
  '/',
  '/projects',
  '/about',
  '/services',
  '/cv',
  '/contact',
];

const PROJECTS_QUERY = `*[_type == "project" && visible != false && defined(slug.current)] | order(order asc, _createdAt asc) {
  "slug": slug.current,
  _updatedAt
}`;

function xmlEscape(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function urlEntry(path, lastmod) {
  const loc = `${SITE_ORIGIN}${path}`;
  const lastmodTag = lastmod ? `<lastmod>${xmlEscape(lastmod.slice(0, 10))}</lastmod>` : '';
  return `<url><loc>${xmlEscape(loc)}</loc>${lastmodTag}</url>`;
}

export default async function sitemap(request) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response('Method not allowed', {
      status: 405,
      headers: {Allow: 'GET, HEAD', 'Content-Type': 'text/plain; charset=utf-8'},
    });
  }

  const queryUrl = new URL(
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`,
  );
  queryUrl.searchParams.set('query', PROJECTS_QUERY);
  queryUrl.searchParams.set('perspective', 'published');

  try {
    const response = await fetch(queryUrl, {
      headers: {Accept: 'application/json'},
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`Sanity query failed with ${response.status}`);

    const payload = await response.json();
    const projects = Array.isArray(payload.result) ? payload.result : [];
    const entries = [
      ...STATIC_PATHS.map((path) => urlEntry(path)),
      ...projects
        .filter((project) => typeof project.slug === 'string' && project.slug.trim())
        .map((project) => urlEntry(`/projects/${encodeURIComponent(project.slug.trim())}`, project._updatedAt)),
    ];

    const xml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...entries,
      '</urlset>',
    ].join('\n');

    return new Response(request.method === 'HEAD' ? null : xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error('Unable to generate sitemap from Sanity:', error);
    return new Response('Sitemap temporarily unavailable', {
      status: 503,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
        'Retry-After': '300',
      },
    });
  }
}
