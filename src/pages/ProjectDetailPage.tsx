import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, MapPin, Calendar, Maximize, Briefcase } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { projects as fallbackProjects } from '../data/content';
import { useI18n } from '../i18n/I18nContext';
import { useProjectBySlug, useProjects } from '../hooks';
import { urlFor } from '../lib/sanity';
import { getLocalizedText, getCategoryName, getEffectiveCoverImage, getProjectSlug } from '../types';

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, lang } = useI18n();
  const { project: sanityProject, hasData, loading } = useProjectBySlug(slug || '');
  const { projects: allProjects } = useProjects();

  // Use Sanity data if available, otherwise fallback
  let project = null;
  if (hasData && sanityProject) {
    project = sanityProject;
  } else if (!loading) {
    // Try to find in fallback projects
    project = fallbackProjects.find(p => p.slug?.current === slug) || null;
  }
  
  const projects = (hasData && allProjects && Array.isArray(allProjects) && allProjects.length > 0) ? allProjects : fallbackProjects;

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-4 border-bronze/20 border-t-bronze rounded-full animate-spin" />
          <p className="text-navy/60">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-navy mb-4">{t('projects.projectNotFound')}</h1>
          <Link to="/projects" className="text-bronze hover:text-bronze-dark transition-colors">
            ← {t('projects.backToProjects')}
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = projects.findIndex((p: any) => p._id === project._id || getProjectSlug(p) === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const coverImage = getEffectiveCoverImage(project);
  const title = getLocalizedText(project.title, lang);
  const subtitle = getLocalizedText(project.subtitle, lang);
  const description = getLocalizedText(project.description, lang);
  const designConcept = getLocalizedText(project.designConcept, lang);
  const methodology = getLocalizedText(project.methodology, lang);
  const category = getCategoryName(project.category, lang);
  const location = getLocalizedText(project.location, lang);
  const role = getLocalizedText(project.role, lang);
  const scope = getLocalizedText(project.scope, lang);
  const gallery: string[] = Array.isArray(project.gallery) ? project.gallery.filter((g: any) => typeof g === 'string') : [];

  // Safe image URL generation
  let coverImageUrl = '';
  try {
    if (coverImage) {
      coverImageUrl = typeof coverImage === 'string' 
        ? coverImage 
        : urlFor(coverImage).width(1920).height(1080).url();
    }
  } catch (error) {
    console.warn('Failed to generate cover image URL:', error);
  }

  return (
    <>
      {/* Hero Image */}
      <section className="relative h-[50vh] min-h-[350px] bg-navy flex items-center justify-center">
        {/* Background Image */}
        {coverImageUrl && (
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${coverImageUrl})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/80 to-navy/90" />
        
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-bronze text-xs tracking-[0.3em] uppercase font-medium mb-3 block">
              {category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
              {title}
            </h1>
            {subtitle && (
              <p className="text-white/70 text-lg">{subtitle}</p>
            )}
          </motion.div>
        </div>

        {/* Back button */}
        <div className={`absolute top-28 ${lang === 'ar' ? 'right-6 lg:right-12' : 'left-6 lg:left-12'} z-10`}>
          <Link
            to="/projects"
            className={`inline-flex items-center gap-2 text-white/80 hover:text-bronze text-sm transition-colors ${lang === 'ar' ? 'flex-row-reverse' : ''}`}
          >
            <ArrowLeft size={16} className={lang === 'ar' ? 'rotate-180' : ''} />
            {t('projects.backToProjects')}
          </Link>
        </div>
      </section>

      {/* Project Info Bar */}
      <section className="bg-offwhite border-b border-navy/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {location && (
              <div className={`flex items-center gap-3 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                <MapPin size={16} className="text-bronze flex-shrink-0" />
                <div>
                  <div className="text-xs text-navy/50 uppercase tracking-wider">{t('projects.location')}</div>
                  <div className="text-sm font-medium text-navy">{location}</div>
                </div>
              </div>
            )}
            {project.year && (
              <div className={`flex items-center gap-3 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                <Calendar size={16} className="text-bronze flex-shrink-0" />
                <div>
                  <div className="text-xs text-navy/50 uppercase tracking-wider">{t('projects.year')}</div>
                  <div className="text-sm font-medium text-navy">{project.year}</div>
                </div>
              </div>
            )}
            {project.area && (
              <div className={`flex items-center gap-3 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                <Maximize size={16} className="text-bronze flex-shrink-0" />
                <div>
                  <div className="text-xs text-navy/50 uppercase tracking-wider">{t('projects.area')}</div>
                  <div className="text-sm font-medium text-navy">{project.area}</div>
                </div>
              </div>
            )}
            {project.status && (
              <div className={`flex items-center gap-3 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                <Briefcase size={16} className="text-bronze flex-shrink-0" />
                <div>
                  <div className="text-xs text-navy/50 uppercase tracking-wider">{t('projects.status')}</div>
                  <div className="text-sm font-medium text-navy">{project.status === 'Completed' ? t('projects.completed') : project.status === 'In Progress' ? t('projects.inProgress') : project.status}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Project Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {description && (
                <AnimatedSection>
                  <h2 className="text-2xl font-bold text-navy mb-4">{t('projects.overview')}</h2>
                  <p className="text-navy/70 leading-relaxed mb-8">{description}</p>
                </AnimatedSection>
              )}

              {designConcept && (
                <AnimatedSection delay={0.1}>
                  <h2 className="text-2xl font-bold text-navy mb-4">{t('projects.designConcept')}</h2>
                  <p className="text-navy/70 leading-relaxed mb-8">{designConcept}</p>
                </AnimatedSection>
              )}

              {methodology && (
                <AnimatedSection delay={0.2}>
                  <h2 className="text-2xl font-bold text-navy mb-4">{t('projects.methodology')}</h2>
                  <p className="text-navy/70 leading-relaxed mb-8">{methodology}</p>
                </AnimatedSection>
              )}
            </div>

            <div className="lg:col-span-1">
              <AnimatedSection delay={0.2}>
                <div className="bg-offwhite p-6 space-y-5">
                  {role && (
                    <div>
                      <div className="text-xs text-navy/50 uppercase tracking-wider mb-1">{t('projects.role')}</div>
                      <div className="text-sm font-medium text-navy">{role}</div>
                    </div>
                  )}
                  {scope && (
                    <div>
                      <div className="text-xs text-navy/50 uppercase tracking-wider mb-1">{t('projects.scope')}</div>
                      <div className="text-sm text-navy/70">{scope}</div>
                    </div>
                  )}
                  {project.client && (
                    <div>
                      <div className="text-xs text-navy/50 uppercase tracking-wider mb-1">{t('projects.client')}</div>
                      <div className="text-sm font-medium text-navy">{project.client}</div>
                    </div>
                  )}
                  {project.software && project.software.length > 0 && (
                    <div>
                      <div className="text-xs text-navy/50 uppercase tracking-wider mb-3">{t('projects.software')}</div>
                      <div className="flex flex-wrap gap-2">
                        {project.software.map((sw: string) => (
                          <span key={sw} className="text-xs bg-navy/5 text-navy/70 px-3 py-1.5 border border-navy/10">
                            {sw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="py-16 lg:py-24 bg-offwhite">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <AnimatedSection>
              <h2 className="text-2xl font-bold text-navy mb-8">{t('projects.gallery')}</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {gallery.map((src, i) => (
                <AnimatedSection key={src} delay={i * 0.1} className={i === 0 ? 'md:col-span-2' : ''}>
                  <div className={`group relative overflow-hidden bg-white ${i === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                    <img src={src} alt={`${title} ${i + 1}`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Navigation */}
      {(prevProject || nextProject) && (
        <section className="py-12 bg-navy text-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between">
              {prevProject ? (
                <Link
                  to={`/projects/${getProjectSlug(prevProject)}`}
                  className={`group flex items-center gap-4 hover:text-bronze transition-colors ${lang === 'ar' ? 'flex-row-reverse' : ''}`}
                >
                  <ArrowLeft size={20} className={`group-hover:-translate-x-1 transition-transform ${lang === 'ar' ? 'rotate-180 group-hover:translate-x-1' : ''}`} />
                  <div className={lang === 'ar' ? 'text-right' : ''}>
                    <div className="text-xs text-white/40 uppercase tracking-wider mb-1">{t('projects.previous')}</div>
                    <div className="text-sm font-medium">{getLocalizedText(prevProject.title, lang)}</div>
                  </div>
                </Link>
              ) : <div />}
              {nextProject ? (
                <Link
                  to={`/projects/${getProjectSlug(nextProject)}`}
                  className={`group flex items-center gap-4 text-right hover:text-bronze transition-colors ${lang === 'ar' ? 'flex-row-reverse' : ''}`}
                >
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-wider mb-1">{t('projects.next')}</div>
                    <div className="text-sm font-medium">{getLocalizedText(nextProject.title, lang)}</div>
                  </div>
                  <ArrowRight size={20} className={`group-hover:translate-x-1 transition-transform ${lang === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                </Link>
              ) : <div />}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
