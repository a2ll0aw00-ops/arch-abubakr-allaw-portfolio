import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { projects as fallbackProjects } from '../data/content';
import { useI18n } from '../i18n/I18nContext';
import { useProjects, useSiteSettings } from '../hooks';
import { optimizeImageUrl, urlFor } from '../lib/sanity';
import { getLocalizedText, getEffectiveCoverImage, getProjectSlug, Project } from '../types';
import { getProjectCategoryDisplayName, getProjectCategoryKey, PROJECT_CATEGORY_OPTIONS } from '../lib/projectCategory';
import { siteMedia } from '../data/siteMedia';

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { t, lang } = useI18n();
  const { projects: sanityProjects, hasData } = useProjects();
  const { settings: siteSettings } = useSiteSettings();

  // Use Sanity data if available, otherwise fallback
  const projects = (hasData && sanityProjects && Array.isArray(sanityProjects)) ? sanityProjects : fallbackProjects;

  // Keep category identity independent from its translated and CMS-editable label.
  const categories = useMemo(() => {
    const labels = new Map<string, {nameAr?: string; nameEn?: string}>();
    if (Array.isArray(siteSettings?.projectCategoryLabels)) {
      siteSettings.projectCategoryLabels.forEach((item: any) => {
        if (typeof item?.key === 'string') labels.set(item.key, item);
      });
    }
    return PROJECT_CATEGORY_OPTIONS.map((category) => {
      const configured = labels.get(category.key);
      const customLabel = lang === 'ar' ? configured?.nameAr : configured?.nameEn;
      return {
        key: category.key,
        label: typeof customLabel === 'string' && customLabel.trim() ? customLabel.trim() : category[lang],
        imageKey: category.key,
      };
    });
  }, [siteSettings?.projectCategoryLabels, lang]);

  const activeHeaderKey = (activeCategory === 'All'
    ? 'all'
    : categories.find((category) => category.key === activeCategory)?.imageKey || 'all') as keyof typeof siteMedia.projectHeaders;
  const activeHeaderImage = siteMedia.projectHeaders[activeHeaderKey];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p: any) => {
        const category = p.category;
        const key = getProjectCategoryKey(category);
        return key === activeCategory;
      });

  return (
    <>
      {/* Page Header */}
      <section className="relative isolate overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-20 bg-navy text-white">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={activeHeaderImage}
            aria-hidden="true"
            initial={{ opacity: 0, scale: 1.025 }}
            animate={{ opacity: 0.55, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${activeHeaderImage}')` }}
          />
        </AnimatePresence>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/70 to-navy/55" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-bronze text-xs tracking-[0.3em] uppercase font-medium mb-4 block">
              {t('projects.title')}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {t('projects.heading')}
            </h1>
            <p className="text-white/60 max-w-2xl leading-relaxed">
              {t('projects.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      {categories.length > 0 && (
        <section className="py-8 bg-offwhite border-b border-navy/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-wrap gap-2">
              {[{ key: 'All', label: t('projects.all') }, ...categories].map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-5 py-2 text-xs tracking-wider uppercase font-medium transition-all duration-300 ${
                    cat.key === activeCategory
                      ? 'bg-navy text-white'
                      : 'bg-white text-navy/60 hover:text-navy hover:bg-navy/5'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {filteredProjects.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProjects.map((project: any, index: number) => {
                  const coverImage = getEffectiveCoverImage(project);
                  const projectSlug = getProjectSlug(project);
                  const title = getLocalizedText(project.title, lang);
                  const category = getProjectCategoryDisplayName(project.category, lang);
                  const location = getLocalizedText(project.location, lang);

                  return (
                    <motion.div
                      key={project._id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Link to={`/projects/${projectSlug}`} className="group block">
                        <div className="relative aspect-[4/3] overflow-hidden mb-5 bg-offwhite rounded-sm">
                          {coverImage ? (
                            <motion.img
                              src={optimizeImageUrl(typeof coverImage === 'string' ? coverImage : urlFor(coverImage).width(800).height(600).url(), { width: 800, height: 600, fit: 'crop' })}
                              alt={title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              decoding="async"
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.6 }}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy/10 to-navy/20">
                              <span className="text-4xl font-bold text-navy/20">AA</span>
                            </div>
                          )}
                          
                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          {/* Corner accent */}
                          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-bronze/0 group-hover:border-bronze/60 transition-all duration-500" />
                        </div>
                        <div>
                          <span className="text-bronze text-xs tracking-[0.2em] uppercase font-medium mb-2 block">
                            {category}
                          </span>
                          <h3 className="text-navy text-lg font-bold mb-1 group-hover:text-bronze transition-colors duration-300">
                            {title}
                          </h3>
                          {(location || project.year) && (
                            <p className="text-navy/50 text-sm">
                              {[location, project.year].filter(Boolean).join(' · ')}
                            </p>
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          ) : (
            <AnimatedSection>
              <div className="text-center py-20">
                <div className="w-16 h-16 mx-auto mb-6 border-2 border-bronze/30 flex items-center justify-center">
                  <div className="w-6 h-6 bg-bronze/20" />
                </div>
                <p className="text-navy/60 text-lg mb-3">
                  {activeCategory === 'All' ? t('works.empty') : lang === 'ar' ? 'لا توجد مشاريع منشورة في هذا القسم بعد.' : 'No published projects in this category yet.'}
                </p>
                <p className="text-navy/40 text-sm">
                  {activeCategory === 'All' ? t('works.emptyNote') : lang === 'ar' ? 'سيظهر هذا القسم بعد نشر مشروع ضمن فئته.' : 'This category will appear after a project in it is published.'}
                </p>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>
    </>
  );
}
