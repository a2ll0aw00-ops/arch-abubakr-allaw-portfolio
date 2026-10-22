import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Building, Box, Eye, Layout, ExternalLink } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { services as fallbackServices } from '../data/content';
import { useI18n } from '../i18n/I18nContext';
import { useServices } from '../hooks';

const iconMap: Record<string, any> = {
  building: Building,
  cube: Box,
  eye: Eye,
  layout: Layout,
};

export default function ServicesPage() {
  const { t, lang } = useI18n();
  const { services: cmsServices, hasData } = useServices();
  const services = hasData && cmsServices.length > 0 ? cmsServices : fallbackServices;

  return (
    <>
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-bronze text-xs tracking-[0.3em] uppercase font-medium mb-4 block">{t('servicesPage.title')}</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">{t('servicesPage.heading')}</h1>
            <p className="text-white/60 max-w-2xl leading-relaxed text-lg">{t('servicesPage.description')}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="space-y-12">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon || 'building'] || Building;
              const title = lang === 'ar' && service.titleAr ? service.titleAr : service.title;
              const description = lang === 'ar' && service.descriptionAr ? service.descriptionAr : service.description;
              const images = Array.from(new Set([service.image, ...(service.gallery || [])].filter(Boolean))) as string[];
              const packages = service.packages || [];

              return (
                <AnimatedSection key={service._id} delay={index * 0.1}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                      <div className="w-14 h-14 flex items-center justify-center bg-navy/5 mb-4"><Icon size={24} className="text-bronze" /></div>
                      <h2 className="text-xl lg:text-2xl font-bold text-navy mb-3">{title}</h2>
                      <p className="text-navy/70 leading-relaxed mb-5">{description}</p>

                      {(service.startingPrice || packages.length > 0) && (
                        <div className="mb-6 border border-navy/10 bg-offwhite/70 p-5">
                          {service.startingPrice && (
                            <p className="text-sm text-navy/70 mb-4">
                              <span className="font-semibold text-navy">{t('services.priceStart')}</span>{' '}
                              <span dir="auto">{service.startingPrice} {service.currency || ''}</span>
                            </p>
                          )}
                          {packages.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {packages.map((item: NonNullable<typeof service.packages>[number], packageIndex: number) => (
                                <article key={`${item.nameEn || item.nameAr || 'package'}-${packageIndex}`} className="bg-white border border-navy/10 p-4">
                                  <div className="flex items-start justify-between gap-3 mb-2">
                                    <h3 className="font-semibold text-navy">{lang === 'ar' ? item.nameAr || item.nameEn : item.nameEn || item.nameAr}</h3>
                                    {item.price && <span className="text-bronze text-sm font-semibold whitespace-nowrap" dir="auto">{item.price} {item.currency || service.currency || ''}</span>}
                                  </div>
                                  {(item.descriptionEn || item.descriptionAr) && <p className="text-xs text-navy/60 leading-relaxed mb-3">{lang === 'ar' ? item.descriptionAr || item.descriptionEn : item.descriptionEn || item.descriptionAr}</p>}
                                  {item.deliveryTime && <p className="text-xs text-navy/55 mb-2">{t('services.delivery')} {item.deliveryTime}</p>}
                                  {item.features?.length ? <ul className="space-y-1 text-xs text-navy/65 list-disc pl-4">{item.features.map((feature: string, featureIndex: number) => <li key={`${feature}-${featureIndex}`}>{feature}</li>)}</ul> : null}
                                </article>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {service.upworkUrl ? (
                        <a href={service.upworkUrl} target="_blank" rel="noopener noreferrer" className={`group inline-flex items-center gap-2 text-bronze text-sm tracking-wider uppercase font-medium hover:text-bronze-dark transition-colors ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                          {t('services.upwork')}
                          <ExternalLink size={14} />
                        </a>
                      ) : (
                        <Link to="/contact" className={`group inline-flex items-center gap-2 text-bronze text-sm tracking-wider uppercase font-medium hover:text-bronze-dark transition-colors ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                          {t('services.discussProject')}
                          <ArrowRight size={14} className={`group-hover:translate-x-1 transition-transform ${lang === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                        </Link>
                      )}
                    </div>

                    <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                      {images.length > 0 ? (
                        <div className={`grid gap-2 ${images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                          {images.map((image, imageIndex) => (
                            <div key={`${image}-${imageIndex}`} className={`relative aspect-[4/3] bg-offwhite border border-navy/5 overflow-hidden ${images.length > 2 && imageIndex === 0 ? 'col-span-2' : ''}`}>
                              <img src={image} alt={`${title} ${imageIndex + 1}`} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="relative aspect-[4/3] bg-offwhite flex items-center justify-center border border-navy/5 overflow-hidden"><Icon size={48} className="text-navy/10" /></div>
                      )}
                    </div>
                  </div>
                  {index < services.length - 1 && <div className="border-t border-navy/5 mt-12" />}
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-navy text-white text-center">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t('services.cta.heading')}</h2>
            <p className="text-white/60 mb-8 leading-relaxed">{t('services.cta.description')}</p>
            <Link to="/contact" className={`group inline-flex items-center gap-3 bg-bronze text-navy px-8 py-4 text-sm font-semibold tracking-wider uppercase hover:bg-bronze-light transition-all duration-300 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
              {t('services.cta.button')}
              <ArrowRight size={16} className={`group-hover:translate-x-1 transition-transform ${lang === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
