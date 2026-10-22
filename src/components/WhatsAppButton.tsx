import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { profileData } from '../data/content';
import { useI18n } from '../i18n/I18nContext';
import { useSiteSettings } from '../hooks';

export default function WhatsAppButton() {
  const { t, dir } = useI18n();
  const { settings } = useSiteSettings();
  
  // Use Sanity data if available, otherwise fallback
  const whatsapp = settings?.whatsapp || profileData.whatsapp;
  const whatsappUrl = whatsapp.startsWith('http') ? whatsapp : `https://wa.me/${whatsapp}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.1, boxShadow: '0 10px 25px rgba(34, 197, 94, 0.4)' }}
      whileTap={{ scale: 0.95 }}
      className={`fixed bottom-6 z-40 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transition-colors ${
        dir === 'rtl' ? 'left-6' : 'right-6'
      }`}
      aria-label={t('whatsapp.label')}
      title={t('whatsapp.label')}
    >
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
        }}
      >
        <MessageCircle size={24} />
      </motion.div>
    </motion.a>
  );
}
