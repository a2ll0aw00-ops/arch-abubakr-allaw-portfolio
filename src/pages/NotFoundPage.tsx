import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

export default function NotFoundPage() {
  const { t, lang } = useI18n();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="text-8xl font-bold text-navy/10 mb-4">{t('notFound.code')}</div>
        <h1 className="text-3xl font-bold text-navy mb-4">{t('notFound.heading')}</h1>
        <p className="text-navy/60 mb-8 max-w-md mx-auto">
          {t('notFound.description')}
        </p>
        <Link
          to="/"
          className={`group inline-flex items-center gap-2 bg-navy text-white px-8 py-4 text-sm font-semibold tracking-wider uppercase hover:bg-navy-light transition-all duration-300 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}
        >
          <ArrowLeft size={16} className={`group-hover:-translate-x-1 transition-transform ${lang === 'ar' ? 'rotate-180' : ''}`} />
          {t('notFound.back')}
        </Link>
      </motion.div>
    </div>
  );
}
