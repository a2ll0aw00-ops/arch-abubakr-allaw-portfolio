import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import { services as fallbackServices, skillsData } from '../data/content';
import { useI18n } from '../i18n/I18nContext';
import { getLocalizedText } from '../types';
import { Building, Box, Eye, Layout } from 'lucide-react';

const iconMap: Record<string, any> = {
  building: Building,
  cube: Box,
  eye: Eye,
  layout: Layout,
};

export default function AboutPage() {
  const { t, lang } = useI18n();
  const services = fallbackServices;

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-bronze text-xs tracking-[0.3em] uppercase font-medium mb-4 block">
              {t('aboutPage.title')}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {t('aboutPage.heading')}
            </h1>
            <p className="text-white/60 max-w-2xl leading-relaxed text-lg">
              {t('aboutPage.role')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <AnimatedSection delay={0.1}>
              <div className="relative">
                <div className="aspect-[4/5] bg-offwhite border border-navy/10 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 mx-auto mb-6 bg-navy flex items-center justify-center">
                      <span className="text-bronze font-bold text-3xl tracking-wider">AA</span>
                    </div>
                    <p className="text-navy/60 text-sm tracking-wider uppercase">
                      {t('aboutPage.role')}
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-bronze/30 -z-10" />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div>
                <h2 className="text-2xl font-bold text-navy mb-6">
                  {t('aboutPage.role')}
                </h2>
                <div className="space-y-4 text-navy/70 leading-relaxed">
                  <p>{t('aboutPage.summary')}</p>
                  <p>{t('aboutPage.approach')}</p>
                  <p>{t('aboutPage.commitment')}</p>
                </div>

                {/* Skills */}
                <div className="mt-10">
                  <h3 className="text-sm tracking-widest uppercase text-navy font-semibold mb-4">
                    {t('cv.skillsHeading')}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {skillsData.personal.map((skill) => (
                          <span
                            key={skill.en}
                            className="text-xs bg-offwhite text-navy/70 px-4 py-2 border border-navy/10"
                          >
                            {getLocalizedText(skill, lang)}
                          </span>
                        ))}
                  </div>
                  <h3 className="text-sm tracking-widest uppercase text-navy font-semibold mb-4">
                    Software
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillsData.software.map((skill) => (
                          <span
                            key={skill.en}
                            className="text-xs bg-offwhite text-navy/70 px-4 py-2 border border-navy/10"
                          >
                            {getLocalizedText(skill, lang)}
                          </span>
                        ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 lg:py-24 bg-offwhite">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="text-bronze text-xs tracking-[0.3em] uppercase font-medium mb-4 block">
                {t('aboutPage.whatIDo')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy">
                {t('aboutPage.servicesHeading')}
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon || 'building'] || Building;
              return (
                <AnimatedSection key={service._id} delay={index * 0.1}>
                  <div className="bg-white p-8 border border-navy/5 h-full">
                    <div className="w-12 h-12 flex items-center justify-center bg-navy/5 mb-6">
                      <Icon size={20} className="text-bronze" />
                    </div>
                    <h3 className="text-lg font-bold text-navy mb-3">
                      {lang === 'ar' && service.titleAr ? service.titleAr : service.title}
                    </h3>
                    <p className="text-navy/60 text-sm leading-relaxed">
                      {lang === 'ar' && service.descriptionAr ? service.descriptionAr : service.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
