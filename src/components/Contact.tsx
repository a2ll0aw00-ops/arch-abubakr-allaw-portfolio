import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { profileData } from '../data/content';
import { useI18n } from '../i18n/I18nContext';
import { useSiteSettings } from '../hooks';

export default function Contact() {
  const { t, lang } = useI18n();
  const { settings } = useSiteSettings();
  
  // Use Sanity data if available, otherwise fallback
  const email = settings?.email || profileData.email;
  const phone = settings?.phone || profileData.phone;
  const location = lang === 'ar' ? settings?.locationAr || 'إب، اليمن' : settings?.location || profileData.location;
  const whatsapp = settings?.whatsapp || profileData.whatsapp;
  const whatsappUrl = whatsapp.startsWith('http') ? whatsapp : `https://wa.me/${whatsapp}`;

  return (
    <section className="py-20 lg:py-28 bg-navy text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 border border-white/20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 border border-white/20" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Content */}
          <AnimatedSection delay={0.1}>
            <div>
              <span className="text-bronze text-xs tracking-[0.3em] uppercase font-medium mb-4 block">
                {t('contact.title')}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                {t('contact.heading')}<br />
                <span className="text-bronze">{t('contact.headingAccent')}</span>
              </h2>
              <p className="text-white/60 leading-relaxed mb-8 max-w-md">
                {t('contact.description')}
              </p>

              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                <a
                  href={`mailto:${email}`}
                  className={`flex items-center gap-4 text-white/70 hover:text-bronze transition-colors group ${lang === 'ar' ? 'flex-row-reverse text-right' : ''}`}
                >
                  <div className="w-10 h-10 border border-white/20 flex items-center justify-center group-hover:border-bronze/50 transition-colors flex-shrink-0">
                    <Mail size={16} />
                  </div>
                  <span className="text-sm">{email}</span>
                </a>
                <a
                  href={`tel:${phone}`}
                  className={`flex items-center gap-4 text-white/70 hover:text-bronze transition-colors group ${lang === 'ar' ? 'flex-row-reverse text-right' : ''}`}
                >
                  <div className="w-10 h-10 border border-white/20 flex items-center justify-center group-hover:border-bronze/50 transition-colors flex-shrink-0">
                    <Phone size={16} />
                  </div>
                  <span className="text-sm" dir="ltr">{phone}</span>
                </a>
                <div className={`flex items-center gap-4 text-white/70 ${lang === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
                  <div className="w-10 h-10 border border-white/20 flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} />
                  </div>
                  <span className="text-sm">{location}</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* CTA Card */}
          <AnimatedSection delay={0.2}>
            <div className="bg-white/5 border border-white/10 p-8 lg:p-10">
              <h3 className="text-xl font-bold mb-4">{t('contact.startProject')}</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-8">
                {t('contact.startDescription')}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className={`group inline-flex items-center gap-3 bg-bronze text-navy px-8 py-4 text-sm font-semibold tracking-wider uppercase hover:bg-bronze-light transition-all duration-300 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}
                >
                  {t('contact.button')}
                  <ArrowRight size={16} className={`group-hover:translate-x-1 transition-transform ${lang === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 text-sm font-semibold tracking-wider uppercase hover:border-green-400 hover:text-green-400 transition-all duration-300 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}
                >
                  {t('whatsapp.label')}
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
