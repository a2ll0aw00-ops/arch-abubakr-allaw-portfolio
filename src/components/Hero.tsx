import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useRef } from 'react';
import { useHeroSettings } from '../hooks';
import { urlFor } from '../lib/sanity';
import { siteMedia } from '../data/siteMedia';

// Text reveal animation component
const TextReveal = ({ children, delay = 0 }: { children: string; delay?: number }) => {
  const words = children.split(' ');
  return (
    <span className="inline-flex flex-wrap gap-x-2" aria-label={children}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: delay + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export default function Hero() {
  const { t, lang } = useI18n();
  const { hero } = useHeroSettings();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Use Sanity data if available, otherwise use translations
  const title = hero?.title || t('hero.title');
  const titleAr = hero?.titleAr || title;
  const subtitle = hero?.subtitle || t('hero.subtitle');
  const subtitleAr = hero?.subtitleAr || subtitle;
  const description = hero?.description || t('hero.description');
  const descriptionAr = hero?.descriptionAr || description;
  
  // Safe image URL generation
  let backgroundImage: string = siteMedia.mainHero;
  try {
    if (hero?.backgroundImage) {
      backgroundImage = urlFor(hero.backgroundImage).width(1920).height(1080).url();
    }
  } catch (error) {
    console.warn('Failed to generate hero image URL:', error);
  }

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 -top-20 -bottom-20"
      >
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
          }}
        />
      </motion.div>
      
      {/* Animated gradient overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/60 to-navy/30"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-navy/20"
      />
      
      {/* Decorative animated lines */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`absolute top-0 ${lang === 'ar' ? 'right-1/4' : 'left-1/4'} w-px h-full bg-bronze/10 origin-top hidden lg:block`}
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
        className={`absolute top-0 ${lang === 'ar' ? 'right-2/4' : 'left-2/4'} w-px h-full bg-bronze/10 origin-top hidden lg:block`}
      />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className={`relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full ${lang === 'ar' ? 'text-right' : 'text-left'}`}
      >
        <div className={`max-w-3xl ${lang === 'ar' ? 'ml-auto' : ''}`}>
          {/* Subtitle with line animation */}
          <motion.div
            initial={{ opacity: 0, x: lang === 'ar' ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-4 mb-6"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="h-px bg-bronze"
            />
            <span className="text-bronze text-xs tracking-[0.3em] uppercase font-medium">
              {lang === 'ar' ? subtitleAr : subtitle}
            </span>
          </motion.div>

          {/* Title with text reveal */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 overflow-hidden">
            <TextReveal delay={0.5}>{lang === 'ar' ? titleAr : title}</TextReveal>
          </h1>

          {/* Description with fade */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-white/70 text-base sm:text-lg leading-relaxed mb-10 max-w-xl"
          >
            {lang === 'ar' ? descriptionAr : description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className={`flex flex-wrap items-center gap-4 ${lang === 'ar' ? 'justify-start' : ''}`}
          >
            <Link
              to="/projects"
              className={`group inline-flex items-center gap-3 bg-bronze text-navy px-8 py-4 text-sm font-semibold tracking-wider uppercase hover:bg-bronze-light transition-all duration-300 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}
            >
              {t('hero.cta')}
              <ArrowRight size={16} className={`group-hover:translate-x-1 transition-transform ${lang === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </Link>
            <Link
              to="/cv"
              className="inline-flex items-center gap-2 text-white/80 text-sm tracking-wider uppercase hover:text-bronze transition-colors duration-300 border border-white/20 px-6 py-4 hover:border-bronze/50"
            >
              {t('hero.cv')}
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs tracking-widest uppercase">{t('hero.scroll')}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} className="text-bronze/60" />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
