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

export default function Layout() {
  const location = useLocation();
  const { settings } = useSiteSettings();
  const { lang } = useI18n();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const baseTitle = lang === 'ar'
      ? settings?.seoTitleAr || settings?.seoTitle || 'أبوبكر علاو | مهندس معماري'
      : settings?.seoTitleEn || settings?.seoTitle || 'Abubakr Allaw | Architect · BIM · Design';
    const baseDescription = lang === 'ar'
      ? settings?.seoDescriptionAr || settings?.seoDescription || 'التصميم المعماري، المخططات والواجهات، التصميم الداخلي، Revit وBIM، والإظهار المعماري.'
      : settings?.seoDescriptionEn || settings?.seoDescription || 'Architectural design, plans and elevations, interior design, Revit and BIM, and architectural visualization.';

    const pageLabels = lang === 'ar'
      ? {projects: 'المشاريع', about: 'عن المهندس', services: 'الخدمات', cv: 'السيرة الذاتية', contact: 'تواصل'}
      : {projects: 'Projects', about: 'About', services: 'Services', cv: 'CV', contact: 'Contact'};
    const routePath = location.pathname.split('?')[0] || '/';
    const segment = routePath.split('/').filter(Boolean)[0] as keyof typeof pageLabels | undefined;
    const isProjectDetail = /^\/projects\/[^/]+/.test(routePath);
    const title = !isProjectDetail && segment && pageLabels[segment] ? `${pageLabels[segment]} | ${baseTitle}` : baseTitle;
    const pageDescription = segment === 'projects'
      ? (lang === 'ar' ? 'معرض مشاريع أبوبكر علاو في التصميم المعماري والتصميم الداخلي والإظهار المعماري.' : 'A portfolio of Abubakr Allaw projects in architectural design, interior design and architectural visualization.')
      : segment === 'services'
        ? (lang === 'ar' ? 'خدمات التصميم المعماري والمخططات والواجهات وRevit وBIM والتصميم الداخلي والإظهار المعماري.' : 'Architectural design, plans and elevations, Revit and BIM, interior design and architectural visualization services.')
        : baseDescription;

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
    for (const [language, href] of [['en', canonicalUrl], ['ar', canonicalUrl]] as const) {
      let alternate = document.querySelector(`link[rel="alternate"][hreflang="${language}"]`) as HTMLLinkElement | null;
      if (!alternate) {
        alternate = document.createElement('link');
        alternate.rel = 'alternate';
        alternate.hreflang = language;
        document.head.appendChild(alternate);
      }
      alternate.href = href;
    }
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
    setMeta('meta[property="og:type"]', 'property', 'og:type', segment === 'projects' ? 'website' : 'profile');
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'Abubakr Allaw');
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', pageDescription);
    setMeta('meta[name="twitter:url"]', 'name', 'twitter:url', canonicalUrl);
    const cmsShareImage = settings?.shareImage?.url || settings?.shareImageUrl;
    const shareImage = cmsShareImage || `${siteOrigin}/images/hero.webp`;
    if (shareImage) {
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
      name: lang === 'ar' ? 'أبوبكر علاو' : 'Abubakr Allaw',
      jobTitle: lang === 'ar' ? 'مهندس معماري ومصمم داخلي' : 'Architectural Engineer & Interior Designer',
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
            <Outlet />
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
