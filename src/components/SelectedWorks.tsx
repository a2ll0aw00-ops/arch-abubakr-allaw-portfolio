import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { projects as fallbackProjects } from '../data/content';
import { useI18n } from '../i18n/I18nContext';
import { useFeaturedProjects } from '../hooks';
import { urlFor } from '../lib/sanity';
import { getLocalizedText, getCategoryName, getEffectiveCoverImage, getProjectSlug } from '../types';

export default function SelectedWorks() {
  const { t, lang } = useI18n();
  const { projects: sanityProjects, hasData } = useFeaturedProjects();
  
  // Use Sanity data if available, otherwise fallback to local data
  const featuredProjects = (hasData && sanityProjects && Array.isArray(sanityProjects))
    ? sanityProjects.slice(0, 4)
    : fallbackProjects.filter(p => p.featured).slice(0, 4);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <AnimatedSection>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span className="text-bronze text-xs tracking-[0.3em] uppercase font-medium mb-4 block">
                {t('works.subtitle')}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight">
                {t('works.title')}
              </h2>
            </div>
            <Link
              to="/projects"
              className={`group inline-flex items-center gap-2 text-navy text-sm tracking-wider uppercase font-medium hover:text-bronze transition-colors ${lang === 'ar' ? 'flex-row-reverse' : ''}`}
            >
              {t('works.viewAll')}
              <ArrowRight size={16} className={`group-hover:translate-x-1 transition-transform ${lang === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </Link>
          </div>
        </AnimatedSection>

        {/* Projects Grid - 4 Images */}
        {featuredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {featuredProjects.map((project: any, index: number) => {
              const coverImage = getEffectiveCoverImage(project);
              const projectSlug = getProjectSlug(project);
              const title = getLocalizedText(project.title, lang);
              const category = getCategoryName(project.category, lang);
              const location = getLocalizedText(project.location, lang);

              return (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link to={`/projects/${projectSlug}`} className="group block">
                    <div className="relative aspect-[3/4] overflow-hidden bg-offwhite mb-4 rounded-sm">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full h-full"
                      >
                        {coverImage ? (
                          <img
                            src={typeof coverImage === 'string' ? coverImage : urlFor(coverImage).width(800).height(1000).url()}
                            alt={title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy/10 to-navy/20"><span class="text-4xl font-bold text-navy/20">AA</span></div>`;
                              }
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy/10 to-navy/20">
                            <span className="text-4xl font-bold text-navy/20">AA</span>
                          </div>
                        )}
                      </motion.div>
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Info on hover */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <span className="text-bronze text-xs tracking-wider uppercase block mb-1 font-medium">
                          {category}
                        </span>
                        <h3 className="text-white text-sm font-bold leading-tight">
                          {title}
                        </h3>
                        {location && (
                          <p className="text-white/60 text-xs mt-1">{location}</p>
                        )}
                      </div>
                      
                      {/* Corner accent */}
                      <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-bronze/0 group-hover:border-bronze/60 transition-all duration-500" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <AnimatedSection delay={0.2}>
            <div className="text-center py-20 border border-dashed border-navy/10">
              <div className="w-16 h-16 mx-auto mb-6 border-2 border-bronze/30 flex items-center justify-center">
                <div className="w-6 h-6 bg-bronze/20" />
              </div>
              <p className="text-navy/60 text-lg mb-3">
                {t('works.empty')}
              </p>
              <p className="text-navy/40 text-sm">
                {t('works.emptyNote')}
              </p>
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
