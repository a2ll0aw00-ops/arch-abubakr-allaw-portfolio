import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollProgress from './ScrollProgress';
import WhatsAppButton from './WhatsAppButton';
import { ErrorBoundary } from './ErrorBoundary';
import { useSiteSettings } from '../hooks';
import { useI18n } from '../i18n/I18nContext';
import { optimizeImageUrl } from '../lib/sanity';
import CustomContentSections from './CustomContentSections';

export default function Layout() {
  const location = useLocation();
  const { settings } = useSiteSettings();
  const { lang } = useI18n();
  const normalizedPath = location.pathname.replace(/\/+$/, '') || '/';
  const customSectionPage = /^\/projects\/[^/]+$/.test(normalizedPath)
    ? 'projectDetail'
    : ({
      '/': 'home',
      '/about': 'about',
      '/projects': 'projects',
      '/services': 'services',
      '/cv': 'cv',
      '/contact': 'contact',
    } as Record<string, string>)[normalizedPath] || null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const baseTitle = lang === 'ar'
      ? settings?.seoTitleAr || settings?.seoTitle || 'أبوبكر علاو | مهندس معماري · Revit وBIM'
      : settings?.seoTitleEn || settings?.seoTitle || 'Abubakr Allaw | Architectural Engineer · Revit BIM';
    const baseDescription = lang === 'ar'
      ? settings?.seoDescriptionAr || settings?.seoDescription || 'أبوبكر علاو مهندس معماري في إب، اليمن، يقدم خدمات التصميم المعماري والمخططات السكنية والتصميم الداخلي ونمذجة وتوثيق Revit وBIM.'
      : settings?.seoDescriptionEn || settings?.seoDescription || 'Abubakr Allaw is an Architectural Engineer in Ibb, Yemen, specializing in architectural design, plans, interior design, Revit modeling and BIM.';
    const routePath = location.pathname.split('?')[0].replace(/\/+$/, '') || '/';
    const isProjectDetail = /^\/projects\/[^/]+/.test(routePath);
    const fullNameEn = settings?.fullNameEn || 'Abubakr Allaw';
    const fullNameAr = settings?.fullNameAr || 'أبوبكر علاو';
    const roleEn = settings?.roleEn || 'Architectural Engineer';
    const roleAr = settings?.roleAr || 'مهندس معماري';
    const localizedPageMetadata: Record<string, {title: string; description: string}> = lang === 'ar'
      ? {
        '/projects': {title: `المشاريع المعمارية | ${fullNameAr}`, description: `مشاريع ${fullNameAr} في التصميم المعماري والمخططات السكنية والتصميم الداخلي وRevit وBIM.`},
        '/about': {title: `عن ${fullNameAr} | ${roleAr}`, description: `${fullNameAr} ${roleAr} في إب، اليمن، يعمل في التصميم المعماري والمخططات والتصميم الداخلي وRevit وBIM.`},
        '/services': {title: `الخدمات المعمارية | ${fullNameAr}`, description: `خدمات ${fullNameAr} تشمل التصميم المعماري والمخططات السكنية والتصميم الداخلي ونمذجة وتوثيق Revit وBIM.`},
        '/cv': {title: `السيرة الذاتية | ${fullNameAr} | ${roleAr}`, description: `السيرة الذاتية لـ${fullNameAr}، ${roleAr} في إب، اليمن، بخبرة في التصميم المعماري وRevit وBIM والتصميم الداخلي.`},
        '/contact': {title: `تواصل مع ${fullNameAr} | ${roleAr}`, description: `تواصل مع ${fullNameAr} في إب، اليمن، لمناقشة خدمات التصميم المعماري والمخططات والتصميم الداخلي وRevit وBIM.`},
      }
      : {
        '/projects': {title: `Architectural Projects | ${fullNameEn}`, description: `Architectural design, residential plans, Revit BIM and interior design projects by ${fullNameEn}.`},
        '/about': {title: `About ${fullNameEn} | ${roleEn}`, description: `${fullNameEn} is an ${roleEn} in Ibb, Yemen, working in architectural design, plans, interior design, Revit and BIM.`},
        '/services': {title: `Architectural Services | ${fullNameEn}`, description: `Architectural design, residential plans, interior design, Revit modeling and BIM documentation services by ${fullNameEn}.`},
        '/cv': {title: `CV | ${fullNameEn} | ${roleEn}`, description: `View the CV of ${fullNameEn}, an ${roleEn} in Ibb, Yemen, with experience in architectural design, Revit, BIM and interior design.`},
        '/contact': {title: `Contact ${fullNameEn} | ${roleEn}`, description: `Contact ${fullNameEn} in Ibb, Yemen to discuss architectural design, plans, interior design, Revit and BIM services.`},
      };
    const pageMetadata = localizedPageMetadata[routePath];
    const title = isProjectDetail
      ? document.title || baseTitle
      : pageMetadata?.title || baseTitle;
    const pageDescription = isProjectDetail
      ? document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content || baseDescription
      : pageMetadata?.description || baseDescription;

    document.title = title;
    document.documentElement.lang = lang;
    const siteOrigin = 'https://arch-abubakrallaw.netlify.app';
    const canonicalUrl = `${siteOrigin}${routePath === '/' ? '/' : routePath}`;
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
    const setMeta = (selector: string, attribute: string, key: string, content: string) => {
      let meta = document.querySelector(selector) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, key);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };
    setMeta('meta[name="description"]', 'name', 'description', pageDescription);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', pageDescription);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMeta('meta[property="og:type"]', 'property', 'og:type', isProjectDetail ? 'article' : 'website');
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'Abubakr Allaw');
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', pageDescription);
    setMeta('meta[name="twitter:url"]', 'name', 'twitter:url', canonicalUrl);
    const cmsShareImage = settings?.shareImage?.url || settings?.shareImageUrl;
    const shareImage = cmsShareImage || `${siteOrigin}/images/hero.webp`;
    if (shareImage && !isProjectDetail) {
      const imageUrl = optimizeImageUrl(shareImage, {
        width: 1200,
        height: 630,
        fit: 'crop',
        focusX: settings?.shareImage?.hotspot?.x,
        focusY: settings?.shareImage?.hotspot?.y,
      });
      for (const [selector, attribute, value] of [
        ['meta[property="og:image"]', 'property', imageUrl],
        ['meta[name="twitter:image"]', 'name', imageUrl],
      ] as const) {
        let image = document.querySelector(selector) as HTMLMetaElement | null;
        if (!image) {
          image = document.createElement('meta');
          image.setAttribute(attribute, selector.includes('og:image') ? 'og:image' : 'twitter:image');
          document.head.appendChild(image);
        }
        image.content = value;
      }
      setMeta('meta[property="og:image:width"]', 'property', 'og:image:width', cmsShareImage ? '1200' : '2200');
      setMeta('meta[property="og:image:height"]', 'property', 'og:image:height', cmsShareImage ? '630' : '1238');
    }

    const schemaId = 'abubakr-professional-schema';
    let schema = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (!schema) {
      schema = document.createElement('script');
      schema.id = schemaId;
      schema.type = 'application/ld+json';
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${siteOrigin}/#person`,
      name: lang === 'ar' ? 'أبوبكر علاو' : 'Abubakr Allaw',
      jobTitle: lang === 'ar' ? settings?.roleAr || 'مهندس معماري' : settings?.roleEn || 'Architectural Engineer',
      description: pageDescription,
      knowsAbout: ['Architectural Design', 'Plans and Elevations', 'Revit', 'BIM', 'Interior Design', 'Architectural Visualization'],
      areaServed: 'Yemen',
      sameAs: Array.isArray(settings?.socialLinks) ? settings.socialLinks.filter((item: any) => item.enabled !== false && item.url).map((item: any) => item.url) : [],
    });
  }, [lang, location.pathname, location.hash, settings]);

  return (
    <ErrorBoundary resetKey={location.pathname}>
      <div className="min-h-screen flex flex-col">
        <div className="no-print">
          <ScrollProgress />
          <Navbar />
        </div>
        <main className="flex-1">
          <ErrorBoundary resetKey={location.pathname}>
            <>
              <Outlet />
              {customSectionPage && <CustomContentSections page={customSectionPage} />}
            </>
          </ErrorBoundary>
        </main>
        <div className="no-print">
          <Footer />
          <WhatsAppButton />
        </div>
      </div>
    </ErrorBoundary>
  );
}
