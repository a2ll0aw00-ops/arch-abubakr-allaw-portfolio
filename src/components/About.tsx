import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { useI18n } from '../i18n/I18nContext';
import { profileData, profileSummary } from '../data/content';
import { useSiteSettings } from '../hooks';
import BrandMark from './BrandMark';

export default function About() {
  const { t, lang } = useI18n();
  const { settings } = useSiteSettings();
  const profileTitle = lang === 'ar' ? settings?.roleAr || 'مهندس معماري ومصمم داخلي' : settings?.roleEn || profileData.title;
  const profileLocation = lang === 'ar' ? settings?.locationAr || 'إب، اليمن' : settings?.location || profileData.location;
  
  // Use Sanity data if available, otherwise fallback
  const aboutText = settings?.about || profileSummary.en;
  const aboutTextAr = settings?.aboutAr || profileSummary.ar;

  return (
    <section className="py-20 lg:py-24 bg-offwhite relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-bronze/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Side */}
          <AnimatedSection delay={0.1}>
            <div>
              <motion.div
                initial={{ opacity: 0, x: lang === 'ar' ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-4"
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 30 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="h-px bg-bronze"
                />
                <span className="text-bronze text-xs tracking-[0.3em] uppercase font-medium">
                  {t('about.title')}
                </span>
              </motion.div>
              
              <h2 className="text-3xl sm:text-4xl font-bold text-navy leading-tight mb-6">
                {t('about.heading')}<br />
                <span className="text-bronze">{t('about.headingAccent')}</span>
              </h2>
              <p className="text-navy/70 leading-relaxed mb-8 text-base">
                {t('about.description')}
              </p>

              <Link
                to="/cv"
                className={`group inline-flex items-center gap-3 text-bronze text-sm tracking-wider uppercase font-medium hover:text-bronze-dark transition-all ${lang === 'ar' ? 'flex-row-reverse' : ''}`}
              >
                <span className="relative">
                  <span className="block w-8 h-px bg-bronze group-hover:w-16 transition-all duration-500" />
                  <span className="absolute top-1/2 -translate-y-1/2 right-0 w-2 h-2 bg-bronze rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </span>
                {t('about.viewCv')}
              </Link>
            </div>
          </AnimatedSection>

          {/* Visual Side */}
          <AnimatedSection delay={0.2}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-offwhite to-white border border-navy/10 flex items-center justify-center overflow-hidden rounded-sm">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  className="text-center p-8 w-full h-full flex flex-col items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3, type: 'spring', stiffness: 100 }}
                    className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-navy to-navy-light flex items-center justify-center shadow-lg"
                  >
                    <BrandMark className="w-16 h-16 text-bronze" />
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-navy/60 text-sm tracking-wider uppercase font-medium"
                  >
                    {profileTitle}
                  </motion.p>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '60px' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="h-0.5 bg-bronze mt-3"
                  />
                </motion.div>
              </div>
              {/* Decorative frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute -bottom-4 -right-4 w-full h-full border-2 border-bronze/30 -z-10"
              />
              {/* Location badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-6 -left-6 bg-navy text-white p-5 shadow-xl"
              >
                <div className="text-xs text-white/60 uppercase tracking-wider mb-1">{t('cv.location')}</div>
                <div className="text-sm font-medium">{profileLocation}</div>
              </motion.div>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
