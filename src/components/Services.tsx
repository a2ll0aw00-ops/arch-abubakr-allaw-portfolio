import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { services as fallbackServices } from '../data/content';
import { useI18n } from '../i18n/I18nContext';
import { useServices } from '../hooks';

export default function Services() {
  const { t, lang } = useI18n();
  const { services: sanityServices, hasData } = useServices();
  
  // Use Sanity data if available, otherwise fallback
  const services = (hasData && sanityServices && Array.isArray(sanityServices)) ? sanityServices : fallbackServices;

  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <AnimatedSection>
          <div className="text-center mb-12 lg:mb-16">
            <span className="text-bronze text-xs tracking-[0.3em] uppercase font-medium mb-4 block">
              {t('services.title')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight mb-6">
              {t('services.heading')}
            </h2>
            <p className="text-navy/60 max-w-2xl mx-auto leading-relaxed">
              {t('services.description')}
            </p>
          </div>
        </AnimatedSection>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <AnimatedSection key={service._id} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group relative p-8 border border-navy/10 hover:border-bronze/30 transition-all duration-500 bg-white hover:bg-cream h-full overflow-hidden rounded-sm shadow-sm hover:shadow-lg"
              >
                {/* Animated background gradient */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="absolute top-0 right-0 w-32 h-32 bg-bronze/5 rounded-full blur-2xl"
                />
                
                {/* Animated border accent */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.4 }}
                  className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-bronze to-bronze-light"
                />
                
                {/* Corner accent */}
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-bronze/0 group-hover:border-bronze/40 transition-all duration-500" />
                
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-navy mb-3 group-hover:text-navy transition-colors">
                    {lang === 'ar' && service.titleAr ? service.titleAr : service.title}
                  </h3>
                  <p className="text-navy/60 leading-relaxed text-sm">
                    {lang === 'ar' && service.descriptionAr ? service.descriptionAr : service.description}
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA after services */}
        <AnimatedSection delay={0.4}>
          <div className="mt-12 text-center">
            <Link
              to="/contact"
              className={`group inline-flex items-center gap-3 bg-navy text-white px-8 py-4 text-sm font-semibold tracking-wider uppercase hover:bg-navy-light transition-all duration-300 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}
            >
              {t('services.cta.button')}
              <ArrowRight size={16} className={`group-hover:translate-x-1 transition-transform ${lang === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
