import {mkdir, readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';

const SITE_ORIGIN = 'https://arch-abubakrallaw.netlify.app';
const SANITY_PROJECT_ID = '0nta1uyv';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = '2026-10-22';
const DIST = path.resolve('dist');
const FALLBACK_IMAGE = `${SITE_ORIGIN}/images/hero.webp`;

const ROUTES_QUERY = `{
  "settings": *[_type == "siteSettings"][0]{
    siteName, fullNameEn, fullNameAr, roleEn, roleAr, summaryEn, summaryAr,
    seoTitleEn, seoTitleAr, seoDescriptionEn, seoDescriptionAr,
    "shareImage": shareImage.asset->url, socialLinks[]{url, enabled},
    "logoUrl": logo.asset->url, "logoLightUrl": logoLight.asset->url, logoScale,
    "profileImage": {"url": profileImage.asset->url, "hotspot": profileImage.hotspot},
    "heroBackground": {"url": heroBackground.asset->url, "hotspot": heroBackground.hotspot}
  },
  "projects": *[_type == "project" && visible != false && defined(slug.current)] | order(order asc, _createdAt asc){
    titleEn, titleAr, slug, subtitleEn, subtitleAr, descriptionEn, descriptionAr,
    categoryKey, categoryEn, categoryAr, categoryCustomEn, categoryCustomAr,
    "categoryLabels": *[_type == "siteSettings"][0].projectCategoryLabels[key == ^.categoryKey][0]{nameEn, nameAr},
    "image": coalesce(coverImage.asset->url, coverImageUrl),
    "altEn": coverImage.altEn, "altAr": coverImage.altAr,
    locationEn, locationAr, year, area, landDimensions, landArea,
    roleEn, roleAr, scopeEn, scopeAr, conceptEn, conceptAr,
    methodologyEn, methodologyAr, software, featured
  },
  "services": *[_type == "service" && visible != false] | order(order asc, _createdAt asc){
    titleEn, titleAr, descriptionEn, descriptionAr
  }
}`;

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function safeUrl(value) {
  if (typeof value !== 'string') return '';
  const trimmed = value.trim();
  return /^https:\/\//i.test(trimmed) || /^\//.test(trimmed) ? trimmed : '';
}

function excerpt(value, limit = 155) {
  const clean = String(value ?? '').replace(/\s+/g, ' ').trim();
  const chars = Array.from(clean);
  if (chars.length <= limit) return clean;
  const prefix = chars.slice(0, limit - 1).join('');
  const boundary = prefix.lastIndexOf(' ');
  return `${(boundary > limit * 0.6 ? prefix.slice(0, boundary) : prefix).trim()}…`;
}

function localized(en, ar, fallback = '') {
  const english = typeof en === 'string' ? en.trim() : '';
  const arabic = typeof ar === 'string' ? ar.trim() : '';
  return {en: english || fallback, ar: arabic || fallback};
}

function absoluteUrl(route) {
  return `${SITE_ORIGIN}${route === '/' ? '/' : route}`;
}

function setMeta(html, attribute, key, value) {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`<meta\\s+${attribute}="${escapedKey}"\\s+content="[^"]*"\\s*\\/?\\s*>`, 'i');
  const tag = `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`;
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `    ${tag}\n  </head>`);
}

function setCanonical(html, url) {
  const pattern = /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i;
  const tag = `<link rel="canonical" href="${escapeHtml(url)}" />`;
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `    ${tag}\n  </head>`);
}

function injectJsonLd(html, object) {
  const safeJson = JSON.stringify(object).replaceAll('<', '\\u003c');
  const script = `<script type="application/ld+json">${safeJson}</script>`;
  const existing = /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i;
  return existing.test(html) ? html.replace(existing, script) : html.replace('</head>', `    ${script}\n  </head>`);
}

function setDocumentLanguage(html) {
  return html.replace(/<html\s+lang="[^"]*"/i, '<html lang="en"');
}

function pageDocument(baseHtml, page, globalSchemas) {
  const url = absoluteUrl(page.path);
  const image = safeUrl(page.image) || FALLBACK_IMAGE;
  let html = baseHtml;
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(excerpt(page.title, 60))}</title>`);
  html = setDocumentLanguage(html);
  html = setMeta(html, 'name', 'description', excerpt(page.description));
  html = setMeta(html, 'property', 'og:type', page.type || 'website');
  html = setMeta(html, 'property', 'og:title', excerpt(page.title, 60));
  html = setMeta(html, 'property', 'og:description', excerpt(page.description));
  html = setMeta(html, 'property', 'og:url', url);
  html = setMeta(html, 'property', 'og:site_name', page.siteName || 'Abubakr Allaw');
  html = setMeta(html, 'property', 'og:image', image);
  html = setMeta(html, 'name', 'twitter:card', 'summary_large_image');
  html = setMeta(html, 'name', 'twitter:title', excerpt(page.title, 60));
  html = setMeta(html, 'name', 'twitter:description', excerpt(page.description));
  html = setMeta(html, 'name', 'twitter:image', image);
  html = setCanonical(html, url);
  const rootContent = `<main data-seo-prerender="true" style="max-width:72rem;margin:0 auto;padding:3rem 1.5rem;color:#17243b;font-family:Arial,sans-serif;line-height:1.7">
    ${page.body}
    <nav aria-label="Site navigation" style="margin-top:2rem"><a href="/">Home</a> · <a href="/projects">Projects</a> · <a href="/about">About</a> · <a href="/services">Services</a> · <a href="/cv">CV</a> · <a href="/contact">Contact</a></nav>
  </main>`;
  const emptyRoot = '<div id="root"></div>';
  if (!html.includes(emptyRoot)) throw new Error('Vite output no longer contains the expected empty React root; refusing to emit incomplete SEO pages.');
  html = html.replace(emptyRoot, `<div id="root">${rootContent}</div>`);
  const localSchemas = page.schema ? (Array.isArray(page.schema) ? page.schema : [page.schema]) : [];
  const graph = [...globalSchemas, ...localSchemas].map((item) => {
    const copy = {...item};
    delete copy['@context'];
    return copy;
  });
  html = injectJsonLd(html, {'@context': 'https://schema.org', '@graph': graph});
  return html;
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

function projectCard(project) {
  const slug = project.slug?.current;
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return '';
  const title = localized(project.titleEn, project.titleAr, slug);
  const description = localized(project.descriptionEn, project.descriptionAr);
  const image = safeUrl(project.image);
  const alt = localized(project.altEn, project.altAr, title.en);
  const imageMarkup = image
    ? `<a href="/projects/${encodeURIComponent(slug)}"><img src="${escapeHtml(image)}" alt="${escapeHtml(alt.en)}" loading="lazy" decoding="async" width="1200" style="display:block;max-width:min(100%,30rem);height:auto;margin:0.75rem 0" /></a>`
    : '';
  return `<li>${imageMarkup}<a href="/projects/${encodeURIComponent(slug)}"><strong>${escapeHtml(title.en)}</strong>${title.ar ? ` — <span lang="ar" dir="rtl">${escapeHtml(title.ar)}</span>` : ''}</a>${bilingualParagraph(description.en, description.ar)}</li>`;
}

async function fetchPublishedData() {
  const url = new URL(`https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`);
  url.searchParams.set('query', ROUTES_QUERY);
  url.searchParams.set('perspective', 'published');
  const response = await fetch(url, {headers: {Accept: 'application/json'}, signal: AbortSignal.timeout(15000)});
  if (!response.ok) throw new Error(`Sanity returned HTTP ${response.status}`);
  const payload = await response.json();
  if (!payload?.result || !Array.isArray(payload.result.projects)) throw new Error('Sanity returned an unexpected public content shape');
  return payload.result;
}

async function writeRoute(baseHtml, route, page, globalSchemas) {
  const relative = route === '/' ? 'index.html' : `${route.replace(/^\//, '')}/index.html`;
  const output = path.join(DIST, relative);
  await mkdir(path.dirname(output), {recursive: true});
  await writeFile(output, pageDocument(baseHtml, page, globalSchemas), 'utf8');
}

async function writeNotFoundPage(baseHtml) {
  let html = baseHtml;
  html = html.replace(/<title>[\s\S]*?<\/title>/i, '<title>Page not found | Abubakr Allaw</title>');
  html = setMeta(html, 'name', 'description', 'The requested page could not be found.');
  html = setMeta(html, 'name', 'robots', 'noindex,follow');
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?\s*>/i, '');
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?\s*>/i, '');
  html = html.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');
  const emptyRoot = '<div id="root"></div>';
  if (!html.includes(emptyRoot)) throw new Error('Vite output no longer contains the expected empty React root for the 404 page.');
  html = html.replace(emptyRoot, '<div id="root"><main style="max-width:72rem;margin:0 auto;padding:3rem 1.5rem;color:#17243b;font-family:Arial,sans-serif;line-height:1.7"><h1>Page not found</h1><p>The requested page could not be found.</p><a href="/">Return to home</a></main></div>');
  await writeFile(path.join(DIST, '404.html'), html, 'utf8');
}

async function main() {
  let baseHtml = await readFile(path.join(DIST, 'index.html'), 'utf8');
  const emptyRoot = '<div id="root"></div>';
  if (!baseHtml.includes(emptyRoot)) throw new Error('Expected Vite build output with an empty React root.');

  let data;
  try {
    data = await fetchPublishedData();
  } catch (error) {
    throw new Error(`SEO prerender requires published Sanity content; refusing to publish incomplete HTML. ${error instanceof Error ? error.message : 'Sanity query failed.'}`);
  }

  const settings = data.settings || {};
  const bootstrapMeta = [
    ['site-logo-url', settings.logoUrl],
    ['site-logo-light-url', settings.logoLightUrl],
    ['site-logo-scale', settings.logoScale],
    ['site-profile-image-url', settings.profileImage?.url],
    ['site-profile-image-focus-x', settings.profileImage?.hotspot?.x],
    ['site-profile-image-focus-y', settings.profileImage?.hotspot?.y],
    ['site-hero-background-url', settings.heroBackground?.url],
    ['site-hero-background-focus-x', settings.heroBackground?.hotspot?.x],
    ['site-hero-background-focus-y', settings.heroBackground?.hotspot?.y],
  ];
  for (const [name, value] of bootstrapMeta) {
    if (value !== undefined && value !== null && String(value).trim()) {
      baseHtml = setMeta(baseHtml, 'name', name, String(value));
    }
  }
  const fullNameEn = settings.fullNameEn || 'Abubakr Allaw';
  const fullNameAr = settings.fullNameAr || 'أبوبكر علاو';
  const roleEn = settings.roleEn || 'Architectural Engineer';
  const roleAr = settings.roleAr || 'مهندس معماري';
  const siteName = settings.siteName || 'Abubakr Allaw';
  const summary = localized(settings.summaryEn, settings.summaryAr,
    'Architectural design, plans, Revit, BIM and interior design in Ibb, Yemen.');
  const projects = data.projects.filter((item) => item?.slug?.current && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug.current));
  const services = Array.isArray(data.services) ? data.services : [];
  const shareImage = safeUrl(settings.shareImage) || FALLBACK_IMAGE;
  const personId = `${SITE_ORIGIN}/#person`;
  const titleRoot = settings.seoTitleEn || `${fullNameEn} | Architectural Engineer · Revit BIM`;
  const rootDescription = settings.seoDescriptionEn || `${fullNameEn} is an Architectural Engineer in Ibb, Yemen, specializing in architectural design, plans, interior design, Revit modeling and BIM.`;
  const personSchema = {
    '@type': 'Person', '@id': personId, name: fullNameEn,
    alternateName: [fullNameAr, 'Abubakr Abdullah Allaw'], jobTitle: roleEn,
    description: summary.en, url: `${SITE_ORIGIN}/`, image: shareImage,
    address: {'@type': 'PostalAddress', addressLocality: 'Ibb', addressCountry: 'YE'},
    knowsAbout: ['Architectural Design', 'Architectural Plans', 'Revit', 'Building Information Modeling', 'Interior Design', 'Architectural Documentation'],
    sameAs: Array.isArray(settings.socialLinks) ? settings.socialLinks.filter((item) => item?.enabled !== false && /^https:\/\//i.test(item?.url || '')).map((item) => item.url) : [],
  };
  const siteSchema = {
    '@type': 'WebSite', '@id': `${SITE_ORIGIN}/#website`, url: `${SITE_ORIGIN}/`,
    name: `${fullNameEn} | Architecture · BIM · Design`, inLanguage: ['en', 'ar'],
    publisher: {'@id': personId},
  };
  const globalSchemas = [personSchema, siteSchema];

  const rootProjects = projects.filter((project) => project.featured).slice(0, 6);
  const rootBody = `${bilingualHeading(fullNameEn, fullNameAr)}${bilingualParagraph(roleEn, roleAr)}${bilingualParagraph(summary.en, summary.ar)}
    <h2>Selected architectural projects · مشاريع معمارية مختارة</h2><ul>${rootProjects.map(projectCard).join('')}</ul>`;
  await writeRoute(baseHtml, '/', {
    path: '/', title: titleRoot, description: rootDescription, image: shareImage, siteName,
    body: rootBody,
    schema: { '@type': 'WebPage', name: titleRoot, description: excerpt(rootDescription), url: `${SITE_ORIGIN}/`, isPartOf: {'@id': `${SITE_ORIGIN}/#website`}, about: {'@id': personId}, inLanguage: ['en', 'ar'] },
  }, globalSchemas);

  const staticPages = [
    {path: '/projects', title: `Architectural Projects | ${fullNameEn}`, description: `Architectural design, residential plans, Revit BIM and interior design projects by ${fullNameEn}.`, body: `${bilingualHeading('Projects', 'المشاريع')}${bilingualParagraph('Explore architectural design, residential plans, Revit BIM documentation and interior design projects.', 'استعرض مشاريع التصميم المعماري والمخططات السكنية وتوثيق Revit وBIM والتصميم الداخلي.')}<ul>${projects.map(projectCard).join('')}</ul>`, image: shareImage, type: 'website'},
    {path: '/about', title: `About ${fullNameEn} | ${roleEn}`, description: `${fullNameEn} is an ${roleEn} in Ibb, Yemen, working in architectural design, plans, interior design, Revit and BIM.`, body: `${bilingualHeading(`About ${fullNameEn}`, `عن ${fullNameAr}`)}${bilingualParagraph(roleEn, roleAr)}${bilingualParagraph(summary.en, summary.ar)}`, image: shareImage, type: 'profile'},
    {path: '/services', title: `Architectural Services | ${fullNameEn}`, description: `Architectural design, residential plans, interior design, Revit modeling and BIM documentation services by ${fullNameEn}.`, body: `${bilingualHeading('Architectural Services', 'الخدمات المعمارية')}<ul>${services.map((service) => `<li><h2>${escapeHtml(service.titleEn || 'Architectural service')} ${service.titleAr ? `— <span lang="ar" dir="rtl">${escapeHtml(service.titleAr)}</span>` : ''}</h2>${bilingualParagraph(service.descriptionEn, service.descriptionAr)}</li>`).join('')}</ul>`, image: shareImage, type: 'website'},
    {path: '/cv', title: `CV | ${fullNameEn} | ${roleEn}`, description: `View the CV of ${fullNameEn}, an ${roleEn} in Ibb, Yemen, with experience in architectural design, Revit, BIM and interior design.`, body: `<p><strong lang="en">Curriculum Vitae</strong> <span aria-hidden="true">·</span> <strong lang="ar" dir="rtl">السيرة الذاتية</strong></p>${bilingualHeading(fullNameEn, fullNameAr)}${bilingualParagraph(roleEn, roleAr)}${bilingualParagraph(summary.en, summary.ar)}<p><a href="/cv">View the full CV · عرض السيرة الذاتية</a></p>`, image: shareImage, type: 'profile'},
    {path: '/contact', title: `Contact ${fullNameEn} | ${roleEn}`, description: `Contact ${fullNameEn} in Ibb, Yemen to discuss architectural design, plans, interior design, Revit and BIM services.`, body: `${bilingualHeading('Contact', 'تواصل')}${bilingualParagraph(`Discuss an architectural project or collaboration with ${fullNameEn}.`, `تواصل مع ${fullNameAr} لمناقشة مشروع معماري أو فرصة تعاون.`)}`, image: shareImage, type: 'website'},
  ];
  for (const page of staticPages) {
    await writeRoute(baseHtml, page.path, {...page, siteName, schema: {
      '@type': page.path === '/projects' ? 'CollectionPage' : 'WebPage',
      name: page.title, description: excerpt(page.description), url: absoluteUrl(page.path),
      isPartOf: {'@id': `${SITE_ORIGIN}/#website`}, about: {'@id': personId}, inLanguage: ['en', 'ar'],
    }}, globalSchemas);
  }

  for (const project of projects) {
    const slug = project.slug.current;
    const route = `/projects/${encodeURIComponent(slug)}`;
    const title = localized(project.titleEn, project.titleAr, slug);
    const description = localized(project.descriptionEn, project.descriptionAr, '');
    const subtitle = localized(project.subtitleEn, project.subtitleAr, '');
    const categoryEn = categoryName(project, 'en');
    const categoryAr = categoryName(project, 'ar');
    const image = safeUrl(project.image) || shareImage;
    const metaDescription = excerpt(project.descriptionEn || `${title.en} — ${categoryEn} by ${fullNameEn}.`);
    const suffix = ` | ${fullNameEn}`;
    const seoTitle = `${excerpt(title.en, Math.max(20, 60 - Array.from(suffix).length))}${suffix}`;
    const details = [
      project.locationEn && `<li><strong>Location:</strong> ${escapeHtml(project.locationEn)}${project.locationAr ? ` / ${escapeHtml(project.locationAr)}` : ''}</li>`,
      project.year && `<li><strong>Year:</strong> ${escapeHtml(project.year)}</li>`,
      project.area && `<li><strong>Area:</strong> ${escapeHtml(project.area)}</li>`,
      project.landDimensions && `<li><strong>Land dimensions:</strong> ${escapeHtml(project.landDimensions)}</li>`,
      project.landArea && `<li><strong>Land area:</strong> ${escapeHtml(project.landArea)}</li>`,
      Array.isArray(project.software) && project.software.length && `<li><strong>Software:</strong> ${project.software.map(escapeHtml).join(', ')}</li>`,
    ].filter(Boolean).join('');
    const alt = localized(project.altEn, project.altAr, title.en);
    const body = `${bilingualHeading(title.en, title.ar)}<p><strong>${escapeHtml(categoryEn)}</strong>${categoryAr ? ` · <span lang="ar" dir="rtl">${escapeHtml(categoryAr)}</span>` : ''}</p>${bilingualParagraph(subtitle.en, subtitle.ar)}${bilingualParagraph(description.en, description.ar)}${image ? `<figure><img src="${escapeHtml(image)}" alt="${escapeHtml(alt.en)}" width="1200" loading="eager" /><figcaption>${escapeHtml(alt.en)}${alt.ar ? ` — <span lang="ar" dir="rtl">${escapeHtml(alt.ar)}</span>` : ''}</figcaption></figure>` : ''}${details ? `<ul>${details}</ul>` : ''}${bilingualParagraph(project.scopeEn, project.scopeAr)}${bilingualParagraph(project.conceptEn, project.conceptAr)}${bilingualParagraph(project.methodologyEn, project.methodologyAr)}`;
    const schema = {
      '@type': 'CreativeWork', '@id': `${SITE_ORIGIN}${route}#project`,
      name: title.en, ...(title.ar ? {alternateName: title.ar} : {}), description: metaDescription,
      url: absoluteUrl(route), image, creator: {'@id': personId}, genre: categoryEn,
      ...(project.year ? {dateCreated: project.year} : {}), inLanguage: ['en', 'ar'],
    };
    await writeRoute(baseHtml, route, {path: route, title: seoTitle, description: metaDescription, image, siteName, type: 'article', body, schema}, globalSchemas);
  }

  await writeNotFoundPage(baseHtml);

  const sitemapEntries = [
    {route: '/', priority: '1.0'},
    {route: '/projects', priority: '0.9'},
    {route: '/about', priority: '0.7'},
    {route: '/services', priority: '0.8'},
    {route: '/cv', priority: '0.6'},
    {route: '/contact', priority: '0.8'},
    ...projects.map((project) => ({route: `/projects/${encodeURIComponent(project.slug.current)}`})),
  ];
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries.map(({route, priority}) => `  <url><loc>${escapeHtml(absoluteUrl(route))}</loc>${priority ? `<priority>${priority}</priority>` : ''}</url>`).join('\n')}\n</urlset>\n`;
  await writeFile(path.join(DIST, 'sitemap.xml'), sitemapXml, 'utf8');

  const redirectsPath = path.join(DIST, '_redirects');
  const redirectsText = await readFile(redirectsPath, 'utf8');
  const routePaths = [...staticPages.map((page) => page.path), ...projects.map((project) => `/projects/${project.slug.current}`)];
  const prerenderRules = [...new Set(routePaths.flatMap((route) => [
    `${route} ${route}/index.html 200`,
    `${route}/ ${route}/index.html 200`,
  ]))];
  const redirectLines = redirectsText.split(/\r?\n/);
  const spaFallbackIndex = redirectLines.findIndex((line) => /^\s*\/\*\s+\/index\.html\s+200\s*$/.test(line));
  if (spaFallbackIndex < 0) throw new Error('Expected the existing SPA fallback in dist/_redirects; refusing to change routing silently.');
  redirectLines[spaFallbackIndex] = '/* /404.html 404';
  redirectLines.splice(spaFallbackIndex, 0, '# SEO prerender routes', ...prerenderRules);
  await writeFile(redirectsPath, `${redirectLines.join('\n').replace(/\n+$/, '')}\n`, 'utf8');

  console.log(`SEO prerender wrote ${staticPages.length + 1 + projects.length} static HTML pages (${projects.length} published projects).`);
}

main().catch((error) => {
  console.error('SEO prerender failed after Vite build:', error instanceof Error ? error.stack || error.message : error);
  process.exitCode = 1;
});
