import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import BrandMark from './BrandMark';
import { useSiteSettings } from '../hooks';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t, lang, setLang } = useI18n();
  const { settings } = useSiteSettings();
  const navLinks = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.projects'), path: '/projects' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.services'), path: '/services' },
    { label: t('nav.cv'), path: '/cv' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleLang = () => {
    setLang(lang === 'en' ? 'ar' : 'en');
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <BrandMark className="w-10 h-10 shrink-0 text-bronze transition-transform duration-500 group-hover:-translate-y-0.5" />
              <div className="hidden sm:block">
                <span className={`font-semibold text-sm tracking-widest uppercase transition-colors ${
                  scrolled ? 'text-navy' : 'text-white'
                }`}>
                  {lang === 'ar'
                    ? settings?.fullNameAr || 'أبوبكر علاو'
                    : settings?.fullNameEn || settings?.siteName || 'Abubakr Allaw'}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-xs tracking-widest uppercase font-medium transition-all duration-300 relative group ${
                    location.pathname === link.path
                      ? 'text-bronze'
                      : scrolled ? 'text-navy/70 hover:text-navy' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${
                    location.pathname === link.path ? 'w-full bg-bronze' : 'w-0 bg-bronze group-hover:w-full'
                  }`} />
                </Link>
              ))}

              {/* Language Switch */}
              <button
                onClick={toggleLang}
                className={`text-xs tracking-wider font-medium px-3 py-1.5 border transition-all duration-300 ${
                  scrolled
                    ? 'border-navy/20 text-navy/70 hover:border-bronze hover:text-bronze'
                    : 'border-white/30 text-white/80 hover:border-bronze hover:text-bronze'
                }`}
                aria-label={lang === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
                title={lang === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
              >
                {lang === 'en' ? 'العربية' : 'EN'}
              </button>

              {/* Contact CTA */}
              <Link
                to="/contact"
                className="bg-bronze text-navy px-5 py-2 text-xs tracking-widest uppercase font-semibold hover:bg-bronze-light transition-all duration-300"
              >
                {t('nav.contact')}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={toggleLang}
                className={`p-2 text-xs font-medium transition-colors ${
                  scrolled ? 'text-navy/70' : 'text-white/80'
                }`}
                aria-label="Switch language"
              >
                {lang === 'en' ? 'عر' : 'EN'}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 transition-colors ${
                  scrolled ? 'text-navy' : 'text-white'
                }`}
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-navy flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Link
                    to={link.path}
                    className={`text-2xl tracking-widest uppercase font-light transition-colors ${
                      location.pathname === link.path ? 'text-bronze' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <Link
                  to="/contact"
                  className="mt-4 bg-bronze text-navy px-8 py-3 text-sm tracking-widest uppercase font-semibold hover:bg-bronze-light transition-all"
                >
                  {t('nav.contact')}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
