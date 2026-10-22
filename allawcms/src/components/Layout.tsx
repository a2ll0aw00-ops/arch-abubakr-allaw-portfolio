import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollProgress from './ScrollProgress';
import WhatsAppButton from './WhatsAppButton';
import { ErrorBoundary } from './ErrorBoundary';
import { useSiteSettings } from '../hooks';

export default function Layout() {
  const location = useLocation();
  const { settings } = useSiteSettings();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (!settings) return;
    if (settings.seoTitle) document.title = settings.seoTitle;
    if (settings.seoDescription) {
      let description = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (!description) {
        description = document.createElement('meta');
        description.name = 'description';
        document.head.appendChild(description);
      }
      description.content = settings.seoDescription;
    }
    if (settings.shareImageUrl) {
      let image = document.querySelector('meta[property="og:image"]') as HTMLMetaElement | null;
      if (!image) {
        image = document.createElement('meta');
        image.setAttribute('property', 'og:image');
        document.head.appendChild(image);
      }
      image.content = settings.shareImageUrl;
    }
  }, [settings]);

  return (
    <ErrorBoundary resetKey={location.pathname}>
      <div className="min-h-screen flex flex-col">
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">
          <ErrorBoundary resetKey={location.pathname}>
            <Outlet />
          </ErrorBoundary>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </ErrorBoundary>
  );
}
