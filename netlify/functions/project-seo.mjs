const SITE_ORIGIN = 'https://arch-abubakrallaw.netlify.app';
const SANITY_PROJECT_ID = '0nta1uyv';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = '2026-10-22';
const FALLBACK_IMAGE = `${SITE_ORIGIN}/images/hero.webp`;
const CACHE_CONTROL = 'public, max-age=0, s-maxage=300, stale-while-revalidate=900';

const SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  siteName, fullNameEn, fullNameAr, roleEn, roleAr, summaryEn, summaryAr,
  seoTitleEn, seoDescriptionEn, "shareImage": shareImage.asset->url,
  socialLinks[]{url, enabled}
}`;

const PROJECT_FIELDS = `
  titleEn, titleAr, slug, subtitleEn, subtitleAr, descriptionEn, descriptionAr,
  categoryKey, categoryEn, categoryAr, categoryCustomEn, categoryCustomAr,
  "categoryLabels": *[_type == "siteSettings"][0].projectCategoryLabels[key == ^.categoryKey][0]{nameEn, nameAr},
  "image": coalesce(coverImage.asset->url, coverImageUrl),
  "altEn": coverImage.altEn, "altAr": coverImage.altAr,
  locationEn, locationAr, year, area, landDimensions, landArea,
  roleEn, roleAr, scopeEn, scopeAr, conceptEn, conceptAr,
  methodologyEn, methodologyAr, software, featured
`;

const ALL_PROJECTS_QUERY = `*[_type == "project" && visible != false && defined(slug.current)] | order(order asc, _createdAt asc){${PROJECT_FIELDS}}`;
const FEATURED_PROJECTS_QUERY = `*[_type == "project" && visible != false && featured == true && defined(slug.current)] | order(order asc, _createdAt asc)[0...6]{${PROJECT_FIELDS}}`;

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function excerpt(value, limit = 155) {
  const clean = String(value ?? '').replace(/\s+/g, ' ').trim();
  const chars = Array.from(clean);
  if (chars.length <= limit) return clean;
  const prefix = chars.slice(0, limit - 1).join('');
  const boundary = prefix.lastIndexOf(' ');
  return `${(boundary > limit * 0.6 ? prefix.slice(0, boundary) : prefix).trim()}…`;
}

function safeUrl(value) {
  if (typeof value !== 'string') return '';
  const trimmed = value.trim();
  return /^https:\/\//i.test(trimmed) || /^\//.test(trimmed) ? trimmed : '';
}

function localized(en, ar, fallback = '') {
  const english = typeof en === 'string' ? en.trim() : '';
  const arabic = typeof ar === 'string' ? ar.trim() : '';
  return {en: english || fallback, ar: arabic || fallback};
}

function metaTagMatches(tag, attribute, key) {
  const attr = new RegExp(`\\b${escapeRegExp(attribute)}\\s*=\\s*(["'])${escapeRegExp(key)}\\1`, 'i');
  return attr.test(tag);
}

function setMeta(html, attribute, key, value) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  for (const current of tags) {
    if (!metaTagMatches(current, attribute, key)) continue;
    const replacement = `<meta ${attribute}="${escapeHtml(key)}" content="${escapeHtml(value)}" />`;
    return html.replace(current, replacement);
  }
  return html.replace('</head>', `    <meta ${attribute}="${escapeHtml(key)}" content="${escapeHtml(value)}" />\n  </head>`);
}

function setCanonical(html, url) {
  const links = html.match(/<link\b[^>]*>/gi) || [];
  const existing = links.find((tag) => /\brel\s*=\s*(["'])canonical\1/i.test(tag));
  const replacement = `<link rel="canonical" href="${escapeHtml(url)}" />`;
  return existing ? html.replace(existing, replacement) : html.replace('</head>', `    ${replacement}\n  </head>`);
}

function setJsonLd(html, object) {
  const safeJson = JSON.stringify(object).replaceAll('<', '\\u003c');
  const script = `<script type="application/ld+json">${safeJson}</script>`;
  const pattern = /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i;
  return pattern.test(html) ? html.replace(pattern, script) : html.replace('</head>', `    ${script}\n  </head>`);
}

function setRootContent(html, body) {
  const rootStart = html.indexOf('<div id="root">');
  const bodyEnd = rootStart >= 0 ? html.indexOf('</body>', rootStart) : -1;
  const rootEnd = bodyEnd >= 0 ? html.lastIndexOf('</div>', bodyEnd) : -1;
  if (rootStart < 0 || rootEnd < rootStart) throw new Error('The published HTML template has no expected React root.');
  return `${html.slice(0, rootStart)}<div id="root">${body}</div>${html.slice(rootEnd + '</div>'.length)}`;
}

function absoluteUrl(route) {
  return `${SITE_ORIGIN}${route === '/' ? '/' : route}`;
}

function bilingualHeading(en, ar) {
  return `<h1><span lang="en">${escapeHtml(en)}</span>${ar ? ` <span aria-hidden="true">·</span> <span lang="ar" dir="rtl">${escapeHtml(ar)}</span>` : ''}</h1>`;
}

function bilingualParagraph(en, ar) {
  return `${en ? `<p lang="en">${escapeHtml(en)}</p>` : ''}${ar ? `<p lang="ar" dir="rtl">${escapeHtml(ar)}</p>` : ''}`;
}

function categoryName(project, language) {
  const labels = project.categoryLabels || {};
  const custom = language === 'ar'
    ? project.categoryCustomAr || labels.nameAr || project.categoryAr
    : project.categoryCustomEn || labels.nameEn || project.categoryEn;
  if (custom) return custom;
  const defaults = {
    'architectural-design': {en: 'Architectural Design', ar: 'التصميم المعماري'},
    'architectural-plans': {en: 'Architectural Plans', ar: 'المخططات المعمارية'},
    'revit-bim-documentation': {en: 'Revit BIM Modeling & Documentation', ar: 'نمذجة Revit وBIM والتوثيق المعماري'},
    'interior-design': {en: 'Interior Design', ar: 'التصميم الداخلي'},
  };
  return defaults[project.categoryKey]?.[language] || (language === 'ar' ? 'مشروع معماري' : 'Architecture Project');
}

function validSlug(value) {
  return typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function projectCard(project) {
  const slug = project.slug?.current;
  if (!validSlug(slug)) return '';
  const title = localized(project.titleEn, project.titleAr, slug);
  const description = localized(project.descriptionEn, project.descriptionAr);
  const image = safeUrl(project.image);
  const alt = localized(project.altEn, project.altAr, title.en);
  const imageMarkup = image
    ? `<a href="/projects/${encodeURIComponent(slug)}"><img src="${escapeHtml(image)}" alt="${escapeHtml(alt.en)}" loading="lazy" decoding="async" width="1200" style="display:block;max-width:min(100%,30rem);height:auto;margin:0.75rem 0" /></a>`
    : '';
  return `<li>${imageMarkup}<a href="/projects/${encodeURIComponent(slug)}"><strong>${escapeHtml(title.en)}</strong>${title.ar ? ` — <span lang="ar" dir="rtl">${escapeHtml(title.ar)}</span>` : ''}</a>${bilingualParagraph(description.en, description.ar)}</li>`;
}

function globalSchemas(settings) {
  const fullNameEn = settings.fullNameEn || 'Abubakr Allaw';
  const fullNameAr = settings.fullNameAr || 'أبوبكر علاو';
  const roleEn = settings.roleEn || 'Architectural Engineer & Interior Designer';
  const summary = localized(settings.summaryEn, settings.summaryAr, 'Architectural design, plans, Revit, BIM and interior design in Ibb, Yemen.');
  const shareImage = safeUrl(settings.shareImage) || FALLBACK_IMAGE;
  const personId = `${SITE_ORIGIN}/#person`;
  const person = {
    '@type': 'Person', '@id': personId, name: fullNameEn,
    alternateName: [fullNameAr, 'Abubakr Abdullah Allaw'], jobTitle: roleEn,
    description: summary.en, url: `${SITE_ORIGIN}/`, image: shareImage,
    address: {'@type': 'PostalAddress', addressLocality: 'Ibb', addressCountry: 'YE'},
    knowsAbout: ['Architectural Design', 'Architectural Plans', 'Revit', 'Building Information Modeling', 'Interior Design', 'Architectural Documentation'],
    sameAs: Array.isArray(settings.socialLinks)
      ? settings.socialLinks.filter((item) => item?.enabled !== false && /^https:\/\//i.test(item?.url || '')).map((item) => item.url)
      : [],
  };
  const website = {
    '@type': 'WebSite', '@id': `${SITE_ORIGIN}/#website`, url: `${SITE_ORIGIN}/`,
    name: `${fullNameEn} | Architecture · BIM · Design`, inLanguage: ['en', 'ar'],
    publisher: {'@id': personId},
  };
  return {fullNameEn, fullNameAr, roleEn, summary, shareImage, personId, schemas: [person, website]};
}

function pageDocument(baseHtml, page, schemas, route) {
  const canonical = absoluteUrl(route);
  const image = safeUrl(page.image) || FALLBACK_IMAGE;
  let html = baseHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(excerpt(page.title, 60))}</title>`);
  html = setMeta(html, 'name', 'description', excerpt(page.description));
  html = setMeta(html, 'property', 'og:type', page.type || 'website');
  html = setMeta(html, 'property', 'og:title', excerpt(page.title, 60));
  html = setMeta(html, 'property', 'og:description', excerpt(page.description));
  html = setMeta(html, 'property', 'og:url', canonical);
  html = setMeta(html, 'property', 'og:site_name', page.siteName || 'Abubakr Allaw');
  html = setMeta(html, 'property', 'og:image', image);
  html = setMeta(html, 'name', 'twitter:card', 'summary_large_image');
  html = setMeta(html, 'name', 'twitter:title', excerpt(page.title, 60));
  html = setMeta(html, 'name', 'twitter:description', excerpt(page.description));
  html = setMeta(html, 'name', 'twitter:image', image);
  html = setCanonical(html, canonical);
  html = setRootContent(html, `<main data-seo-prerender="true" style="max-width:72rem;margin:0 auto;padding:3rem 1.5rem;color:#17243b;font-family:Arial,sans-serif;line-height:1.7">${page.body}<nav aria-label="Site navigation" style="margin-top:2rem"><a href="/">Home</a> · <a href="/projects">Projects</a> · <a href="/about">About</a> · <a href="/services">Services</a> · <a href="/cv">CV</a> · <a href="/contact">Contact</a></nav></main>`);
  const pageSchema = page.schema ? (Array.isArray(page.schema) ? page.schema : [page.schema]) : [];
  const graph = [...schemas, ...pageSchema].map((item) => {
    const copy = {...item};
    delete copy['@context'];
    return copy;
  });
  return setJsonLd(html, {'@context': 'https://schema.org', '@graph': graph});
}

function renderHome(settings, projects) {
  const {fullNameEn, fullNameAr, roleEn, roleAr, summary, shareImage, personId, schemas} = globalSchemas(settings);
  const title = settings.seoTitleEn || `${fullNameEn} | ${fullNameAr} — Architect · BIM · Design`;
  const description = settings.seoDescriptionEn || `${fullNameEn} (${fullNameAr}), ${roleEn} based in Ibb, Yemen. Architectural design, plans, interiors, Revit and BIM.`;
  const selected = projects.filter((project) => project.featured).slice(0, 6);
  const body = `${bilingualHeading(fullNameEn, fullNameAr)}${bilingualParagraph(roleEn, roleAr || 'مهندس معماري ومصمم داخلي')}${bilingualParagraph(summary.en, summary.ar)}<h2>Selected architectural projects · مشاريع معمارية مختارة</h2><ul>${selected.map(projectCard).join('')}</ul>`;
  return {
    page: {title, description, image: shareImage, siteName: settings.siteName || fullNameEn, body, type: 'website', schema: {
      '@type': 'WebPage', name: title, description: excerpt(description), url: absoluteUrl('/'),
      isPartOf: {'@id': `${SITE_ORIGIN}/#website`}, about: {'@id': personId}, inLanguage: ['en', 'ar'],
    }},
    schemas,
  };
}

function renderProjectList(settings, projects) {
  const {fullNameEn, fullNameAr, shareImage, personId, schemas} = globalSchemas(settings);
  const title = `Projects | ${fullNameEn} — ${fullNameAr}`;
  const description = 'Architectural design, residential plans, Revit BIM and interior design projects by Abubakr Allaw.';
  const body = `${bilingualHeading('Projects', 'المشاريع')}${bilingualParagraph('Explore architectural design, residential plans, Revit BIM documentation and interior design projects.', 'استعرض مشاريع التصميم المعماري والمخططات السكنية وتوثيق Revit وBIM والتصميم الداخلي.')}<ul>${projects.map(projectCard).join('')}</ul>`;
  return {
    page: {title, description, image: shareImage, siteName: settings.siteName || fullNameEn, body, type: 'website', schema: {
      '@type': 'CollectionPage', name: title, description: excerpt(description), url: absoluteUrl('/projects'),
      isPartOf: {'@id': `${SITE_ORIGIN}/#website`}, about: {'@id': personId}, inLanguage: ['en', 'ar'],
    }},
    schemas,
  };
}

function renderProject(settings, project, slug) {
  const {fullNameEn, personId, schemas} = globalSchemas(settings);
  const title = localized(project.titleEn, project.titleAr, slug);
  const description = localized(project.descriptionEn, project.descriptionAr);
  const subtitle = localized(project.subtitleEn, project.subtitleAr);
  const categoryEn = categoryName(project, 'en');
  const categoryAr = categoryName(project, 'ar');
  const image = safeUrl(project.image) || safeUrl(settings.shareImage) || FALLBACK_IMAGE;
  const alt = localized(project.altEn, project.altAr, title.en);
  const details = [
    project.locationEn && `<li><strong>Location:</strong> ${escapeHtml(project.locationEn)}${project.locationAr ? ` / ${escapeHtml(project.locationAr)}` : ''}</li>`,
    project.year && `<li><strong>Year:</strong> ${escapeHtml(project.year)}</li>`,
    project.area && `<li><strong>Area:</strong> ${escapeHtml(project.area)}</li>`,
    project.landDimensions && `<li><strong>Land dimensions:</strong> ${escapeHtml(project.landDimensions)}</li>`,
    project.landArea && `<li><strong>Land area:</strong> ${escapeHtml(project.landArea)}</li>`,
    Array.isArray(project.software) && project.software.length && `<li><strong>Software:</strong> ${project.software.map(escapeHtml).join(', ')}</li>`,
  ].filter(Boolean).join('');
  const route = `/projects/${encodeURIComponent(slug)}`;
  const pageDescription = excerpt(project.descriptionEn || project.descriptionAr || `${title.en} — ${categoryEn} by ${fullNameEn}.`);
  const pageTitle = `${excerpt(title.en, Math.max(20, 60 - Array.from(` | ${fullNameEn}`).length))} | ${fullNameEn}`;
  const body = `${bilingualHeading(title.en, title.ar)}<p><strong>${escapeHtml(categoryEn)}</strong>${categoryAr ? ` · <span lang="ar" dir="rtl">${escapeHtml(categoryAr)}</span>` : ''}</p>${bilingualParagraph(subtitle.en, subtitle.ar)}${bilingualParagraph(description.en, description.ar)}<figure><img src="${escapeHtml(image)}" alt="${escapeHtml(alt.en)}" width="1200" loading="eager" /><figcaption>${escapeHtml(alt.en)}${alt.ar ? ` — <span lang="ar" dir="rtl">${escapeHtml(alt.ar)}</span>` : ''}</figcaption></figure>${details ? `<ul>${details}</ul>` : ''}${bilingualParagraph(project.scopeEn, project.scopeAr)}${bilingualParagraph(project.conceptEn, project.conceptAr)}${bilingualParagraph(project.methodologyEn, project.methodologyAr)}`;
  return {
    page: {title: pageTitle, description: pageDescription, image, siteName: settings.siteName || fullNameEn, body, type: 'article', schema: {
      '@type': 'CreativeWork', '@id': `${SITE_ORIGIN}${route}#project`, name: title.en,
      ...(title.ar ? {alternateName: title.ar} : {}), description: pageDescription,
      url: absoluteUrl(route), image, creator: {'@id': personId}, genre: categoryEn,
      ...(project.year ? {dateCreated: project.year} : {}), inLanguage: ['en', 'ar'],
    }},
    schemas,
  };
}

async function sanityQuery(query) {
  const url = new URL(`https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`);
  url.searchParams.set('query', query);
  url.searchParams.set('perspective', 'published');
  const response = await fetch(url, {headers: {Accept: 'application/json'}, signal: AbortSignal.timeout(8000)});
  if (!response.ok) throw new Error(`Sanity returned HTTP ${response.status}`);
  const payload = await response.json();
  if (!Object.prototype.hasOwnProperty.call(payload || {}, 'result')) throw new Error('Sanity returned an unexpected response.');
  return payload.result;
}

async function fetchBaseHtml(path = '/index.html') {
  const response = await fetch(`${SITE_ORIGIN}${path}`, {
    headers: {Accept: 'text/html'},
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`The static HTML template returned HTTP ${response.status}.`);
  return response.text();
}

function htmlResponse(request, html, status = 200, cacheControl = CACHE_CONTROL) {
  return new Response(request.method === 'HEAD' ? null : html, {
    status,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': cacheControl,
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

async function notFoundResponse(request) {
  let html;
  try {
    html = await fetchBaseHtml('/404.html');
  } catch {
    html = '<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="robots" content="noindex,follow"><title>Page not found | Abubakr Allaw</title></head><body><main><h1>Page not found</h1><p>The requested project could not be found.</p><a href="/projects">Return to projects</a></main></body></html>';
  }
  if (!/<meta\b[^>]*\bname\s*=\s*(["'])robots\1/i.test(html)) {
    html = html.replace('</head>', '  <meta name="robots" content="noindex,follow" />\n</head>');
  }
  return htmlResponse(request, html, 404, 'no-store');
}

async function errorResponse(request) {
  const html = '<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="robots" content="noindex,follow"><title>Temporarily unavailable</title></head><body><main><h1>Page temporarily unavailable</h1><p>Please try again shortly.</p></main></body></html>';
  return htmlResponse(request, html, 503, 'no-store');
}

export default async function projectSeo(request, context) {
  if (!['GET', 'HEAD'].includes(request.method)) {
    return new Response('Method not allowed', {status: 405, headers: {Allow: 'GET, HEAD', 'Content-Type': 'text/plain; charset=utf-8'}});
  }

  const pathname = new URL(request.url).pathname.replace(/\/+$/, '') || '/';
  const slugParam = context?.params?.slug;
  const isProjectDetail = pathname.startsWith('/projects/') && Boolean(slugParam);

  try {
    if (pathname === '/') {
      const [settings, projects] = await Promise.all([sanityQuery(SETTINGS_QUERY), sanityQuery(FEATURED_PROJECTS_QUERY)]);
      const rendered = renderHome(settings || {}, Array.isArray(projects) ? projects : []);
      const baseHtml = await fetchBaseHtml();
      return htmlResponse(request, pageDocument(baseHtml, rendered.page, rendered.schemas, '/'));
    }

    if (pathname === '/projects') {
      const [settings, projects] = await Promise.all([sanityQuery(SETTINGS_QUERY), sanityQuery(ALL_PROJECTS_QUERY)]);
      const rendered = renderProjectList(settings || {}, Array.isArray(projects) ? projects.filter((item) => validSlug(item?.slug?.current)) : []);
      const baseHtml = await fetchBaseHtml();
      return htmlResponse(request, pageDocument(baseHtml, rendered.page, rendered.schemas, '/projects'));
    }

    if (isProjectDetail) {
      let slug;
      try {
        slug = decodeURIComponent(String(slugParam));
      } catch {
        return notFoundResponse(request);
      }
      if (!validSlug(slug)) return notFoundResponse(request);
      const projectPromise = sanityQuery(`*[_type == "project" && visible != false && slug.current == ${JSON.stringify(slug)}][0]{${PROJECT_FIELDS}}`);
      const [settings, project] = await Promise.all([sanityQuery(SETTINGS_QUERY), projectPromise]);
      if (!project || !project.slug?.current || !validSlug(project.slug.current)) return notFoundResponse(request);
      const rendered = renderProject(settings || {}, project, slug);
      const baseHtml = await fetchBaseHtml();
      return htmlResponse(request, pageDocument(baseHtml, rendered.page, rendered.schemas, `/projects/${encodeURIComponent(slug)}`));
    }

    return notFoundResponse(request);
  } catch (error) {
    console.error('Unable to render current public Sanity content for SEO:', error);
    return errorResponse(request);
  }
}

export const config = {
  path: ['/', '/projects', '/projects/:slug'],
  method: ['GET', 'HEAD'],
  preferStatic: false,
};
